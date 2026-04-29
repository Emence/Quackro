const { buildSettingsWebviewHtml } = require('./runtime-settings-webview');

//Cog-Wheel Button - Settings Menü
function openSettingsWebview(context) {
  const panel = vscode.window.createWebviewPanel(
    'bmdmacroSettings',
    'BMD Macro Config',
    vscode.ViewColumn.Active,
    { enableScripts: true }
  );

  const render = () => {
    panel.webview.html = buildSettingsWebviewHtml(getRuntimeConfig());
  };

  render();

  panel.webview.onDidReceiveMessage(
    async message => {
      try {
        const config = getExtensionConfig();

        if (message.type === 'reset') {
          await config.update('sqlServer', DEFAULT_SQL_SERVER, vscode.ConfigurationTarget.Global);
          await config.update('sqlDatabase', DEFAULT_SQL_DATABASE, vscode.ConfigurationTarget.Global);
          await config.update('sqlFormulaId', DEFAULT_SQL_FORMULA_ID, vscode.ConfigurationTarget.Global);
          await config.update('macroUserShort', DEFAULT_MACRO_USER_SHORT, vscode.ConfigurationTarget.Global);
          await config.update('macroUseLogProc', DEFAULT_MACRO_USE_LOG_PROC, vscode.ConfigurationTarget.Global);
          await config.update('validateOnSave', DEFAULT_VALIDATE_ON_SAVE, vscode.ConfigurationTarget.Global);
          render();
          panel.webview.postMessage({ type: 'saved' });
          return;
        }

        if (message.type !== 'save' || !message.payload) {
          return;
        }

        const payload = message.payload;
        await config.update('sqlServer', String(payload.sqlServer || '').trim(), vscode.ConfigurationTarget.Global);
        await config.update('sqlDatabase', String(payload.sqlDatabase || '').trim(), vscode.ConfigurationTarget.Global);
        await config.update('sqlFormulaId', String(payload.sqlFormulaId || '').trim(), vscode.ConfigurationTarget.Global);
        await config.update('macroUserShort', String(payload.macroUserShort || '').trim(), vscode.ConfigurationTarget.Global);
        await config.update('macroUseLogProc', Boolean(payload.macroUseLogProc), vscode.ConfigurationTarget.Global);
        await config.update('validateOnSave', Boolean(payload.validateOnSave), vscode.ConfigurationTarget.Global);
        panel.webview.postMessage({ type: 'saved' });
      } catch (error) {
        const messageText = error && error.message ? error.message : String(error);
        panel.webview.postMessage({ type: 'error', payload: messageText });
      }
    },
    undefined,
    context.subscriptions
  );
}


async function uploadMacroToFormula(macroText) {
  const runtimeConfig = getRuntimeConfig();
  const macroBase64 = Buffer.from(macroText, 'utf8').toString('base64');
  const script = `
$macroText = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('${macroBase64}'))
$connectionString = 'Server=${runtimeConfig.sqlServer};Database=${runtimeConfig.sqlDatabase};Integrated Security=True;TrustServerCertificate=True;'
$connection = New-Object System.Data.SqlClient.SqlConnection $connectionString

try {
  $connection.Open()
  $command = $connection.CreateCommand()
  $command.CommandText = @'
UPDATE BMD.FOX_FORMELTEXT
SET FOX_FORMELTEXT = @bmdmacro
WHERE FOX_FORMELNR = @formulaNr
'@

  $null = $command.Parameters.Add('@bmdmacro', [System.Data.SqlDbType]::NVarChar, -1)
  $command.Parameters['@bmdmacro'].Value = $macroText
  $null = $command.Parameters.Add('@formulaNr', [System.Data.SqlDbType]::BigInt)
  $command.Parameters['@formulaNr'].Value = ${runtimeConfig.sqlFormulaId}

  $rows = $command.ExecuteNonQuery()
  Write-Output $rows
}
finally {
  if ($connection.State -ne [System.Data.ConnectionState]::Closed) {
    $connection.Close()
  }
  $connection.Dispose()
}
`;

  const encodedScript = Buffer.from(script, 'utf16le').toString('base64');
  const result = await execFile(
    'powershell.exe',
    ['-NoProfile', '-NonInteractive', '-EncodedCommand', encodedScript],
    { maxBuffer: 10 * 1024 * 1024 }
  );

  return (result.stdout || '').trim();
}

async function executeMacroForFormula(formulaNr) {
  const args = [
    '/PRODUCT=BMDNTCS',
    '/DBALIAS=NB-WER979\\BMD:BMD',
    '/USERID=vsc',
    '/PWD=vvsscc',
    '/FUNC=MCS_MACRO_EXECUTE',
    `/FOR_FORMELNR=${formulaNr}`,
    '/PARAM1=abc123',
    '/FINISH'
  ];

  await new Promise((resolve, reject) => {
    const child = childProcess.spawn(BMD_EXECUTABLE, args, {
      detached: true,
      stdio: 'ignore',
      windowsHide: false
    });

    child.once('error', reject);
    child.once('spawn', () => {
      child.unref();
      resolve();
    });
  });
}

function getDebugSqlConfig() {
  const runtimeConfig = getRuntimeConfig();
  return {
    enabled: DEBUG_SQL_ENABLED,
    server: runtimeConfig.sqlServer || DEBUG_SQL_SERVER,
    database: runtimeConfig.sqlDatabase || DEBUG_SQL_DATABASE,
    useIntegratedSecurity: DEBUG_SQL_USE_INTEGRATED_SECURITY,
    username: DEBUG_SQL_USERNAME,
    password: DEBUG_SQL_PASSWORD,
    trustServerCertificate: DEBUG_SQL_TRUST_SERVER_CERTIFICATE,
    timeoutSeconds: DEBUG_SQL_TIMEOUT_SECONDS,
    maxRows: DEBUG_SQL_MAX_ROWS
  };
}

async function executeDebugSql(sqlText, parameters = {}) {
  const config = getDebugSqlConfig();
  if (!config.enabled) {
    throw new Error('Debug SQL execution is disabled in extension.js');
  }

  const trimmedSql = typeof sqlText === 'string' ? sqlText.trim() : '';
  if (!trimmedSql) {
    throw new Error('SQL text is empty.');
  }

  const sqlBase64 = Buffer.from(trimmedSql, 'utf8').toString('base64');
  const paramsJsonBase64 = Buffer.from(JSON.stringify(parameters || {}), 'utf8').toString('base64');
  const script = `
  [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
  $OutputEncoding = [System.Text.UTF8Encoding]::new($false)
  $ProgressPreference = 'SilentlyContinue'
$sqlText = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('${sqlBase64}'))
$paramsJson = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('${paramsJsonBase64}'))
  $params = @{}
  if (-not [string]::IsNullOrWhiteSpace($paramsJson)) {
    $parsedParams = ConvertFrom-Json $paramsJson
    if ($parsedParams -is [System.Collections.IDictionary]) {
      foreach ($k in $parsedParams.Keys) {
        $params[[string]$k] = $parsedParams[$k]
      }
    }
    else {
      foreach ($p in $parsedParams.PSObject.Properties) {
        $params[[string]$p.Name] = $p.Value
      }
    }
  }
$useIntegratedSecurity = ${config.useIntegratedSecurity ? '$true' : '$false'}
$trustServerCertificate = ${config.trustServerCertificate ? '$true' : '$false'}
$timeoutSeconds = ${config.timeoutSeconds}
$maxRows = ${config.maxRows}

if ($useIntegratedSecurity) {
  $connectionString = 'Server=${config.server};Database=${config.database};Integrated Security=True;TrustServerCertificate=' + $trustServerCertificate + ';'
}
else {
  $connectionString = 'Server=${config.server};Database=${config.database};User ID=${config.username};Password=${config.password};TrustServerCertificate=' + $trustServerCertificate + ';'
}

$connection = New-Object System.Data.SqlClient.SqlConnection $connectionString
$result = $null

try {
  $connection.Open()
  $command = $connection.CreateCommand()
  $normalizedSql = [System.Text.RegularExpressions.Regex]::Replace($sqlText, ':([A-Za-z_][A-Za-z0-9_]*)', '@$1')
  $command.CommandText = $normalizedSql
  $command.CommandTimeout = $timeoutSeconds

  foreach ($entry in $params.GetEnumerator()) {
    $paramName = [string]$entry.Key
    if (-not $paramName.StartsWith('@')) {
      $paramName = '@' + $paramName
    }

    $parameter = $command.Parameters.Add($paramName, [System.Data.SqlDbType]::NVarChar, -1)
    if ($null -eq $entry.Value -or [string]::IsNullOrEmpty([string]$entry.Value)) {
      $parameter.Value = [System.DBNull]::Value
    }
    else {
      $parameter.Value = [string]$entry.Value
    }
  }

  $trimmed = $normalizedSql.TrimStart()
  $isReaderQuery = $trimmed.StartsWith('SELECT', [System.StringComparison]::OrdinalIgnoreCase) -or $trimmed.StartsWith('WITH', [System.StringComparison]::OrdinalIgnoreCase)

  if ($isReaderQuery) {
    $reader = $command.ExecuteReader()
    try {
      $columns = @()
      for ($i = 0; $i -lt $reader.FieldCount; $i++) {
        $columns += $reader.GetName($i)
      }

      $rows = @()
      $count = 0
      while ($reader.Read() -and $count -lt $maxRows) {
        $row = @{}
        foreach ($col in $columns) {
          $value = $reader[$col]
          if ($null -eq $value -or $value -is [System.DBNull]) {
            $row[$col] = $null
          }
          else {
            $row[$col] = [string]$value
          }
        }
        $rows += $row
        $count++
      }

      $result = @{
        kind = 'resultSet'
        sql = $normalizedSql
        columns = $columns
        rows = $rows
        rowCount = $rows.Count
        truncated = $reader.Read()
      }
    }
    finally {
      $reader.Close()
    }
  }
  else {
    $rowsAffected = $command.ExecuteNonQuery()
    $result = @{
      kind = 'nonQuery'
      sql = $normalizedSql
      rowsAffected = $rowsAffected
    }
  }

  $json = $result | ConvertTo-Json -Depth 10 -Compress
  Write-Output $json
}
finally {
  if ($connection.State -ne [System.Data.ConnectionState]::Closed) {
    $connection.Close()
  }
  $connection.Dispose()
}
`;

  const encodedScript = Buffer.from(script, 'utf16le').toString('base64');
  const result = await execFile(
    'powershell.exe',
    ['-NoProfile', '-NonInteractive', '-EncodedCommand', encodedScript],
    { maxBuffer: 20 * 1024 * 1024 }
  );

  const stdout = (result.stdout || '').trim();
  if (!stdout) {
    throw new Error('SQL command returned no output.');
  }

  return JSON.parse(stdout);
}

function parseAffectedRows(outputText) {
  if (!outputText) return 0;
  const match = outputText.match(/-?\d+/);
  return match ? Number.parseInt(match[0], 10) : 0;
}

module.exports = {
  openSettingsWebview,
  getDebugSqlConfig,
  executeDebugSql,
  uploadMacroToFormula
};