/*
 * Settings UI template builder for runtime configuration.
 *
 * This file owns only webview HTML rendering and escaping helpers.
 * It does not handle validation rules or persistence logic.
 * Runtime orchestration lives in runtime.js.
 */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildSettingsWebviewHtml(current) {
  const checked = flag => (flag ? 'checked' : '');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BMD Macro Settings</title>
  <style>
    :root {
      --bg: #141617;
      --panel: #1c1f20;
      --border: #313638;
      --text: #f4f5f6;
      --muted: #a8b0b3;
      --accent: #1da57a;
      --accent-2: #15795a;
      --error: #ff6a6a;
    }

    body {
      margin: 0;
      padding: 16px;
      color: var(--text);
      background: radial-gradient(circle at top right, #21332d 0%, var(--bg) 45%);
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }

    .container {
      max-width: 760px;
      margin: 0 auto;
      display: grid;
      gap: 16px;
    }

    .card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 18px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
    }

    .card h2 {
      margin: 0 0 14px;
      color: var(--muted);
      font-size: 13px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 12px;
    }

    label {
      display: block;
      margin-bottom: 6px;
      color: var(--muted);
      font-size: 12px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    input[type="text"] {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid var(--border);
      border-radius: 8px;
      background: #111314;
      color: var(--text);
      padding: 10px 12px;
    }

    .check-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding-top: 10px;
    }

    .check-row label {
      margin: 0;
      text-transform: none;
      color: var(--text);
      font-size: 13px;
      letter-spacing: 0;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }

    button {
      border: 1px solid var(--border);
      background: #252a2c;
      color: var(--text);
      padding: 8px 14px;
      border-radius: 8px;
      cursor: pointer;
    }

    button.primary {
      background: var(--accent);
      border-color: var(--accent);
    }

    button.primary:hover {
      background: var(--accent-2);
    }

    .status {
      min-height: 20px;
      color: var(--muted);
      font-size: 12px;
    }

    .status.error {
      color: var(--error);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2>Macro Config</h2>
      <div class="grid">
        <div>
          <label for="macroUserShort">MACRO_USER_SHORT</label>
          <input id="macroUserShort" type="text" value="${escapeHtml(current.macroUserShort)}" />
        </div>
      </div>
      <div class="check-row">
        <input id="macroUseLogProc" type="checkbox" ${checked(current.macroUseLogProc)} />
        <label for="macroUseLogProc">MACRO_USE_LOG_PROC</label>
      </div>
      <div class="check-row">
        <input id="validateOnSave" type="checkbox" ${checked(current.validateOnSave)} />
        <label for="validateOnSave">VALIDATE_ON_SAVE</label>
      </div>
    </div>

    <div class="card">
      <h2>SQL Config</h2>
      <div class="grid">
        <div>
          <label for="sqlServer">SQL_SERVER</label>
          <input id="sqlServer" type="text" value="${escapeHtml(current.sqlServer)}" />
        </div>
        <div>
          <label for="sqlDatabase">SQL_DATABASE</label>
          <input id="sqlDatabase" type="text" value="${escapeHtml(current.sqlDatabase)}" />
        </div>
        <div>
          <label for="sqlFormulaId">SQL_FORMULA_ID</label>
          <input id="sqlFormulaId" type="text" value="${escapeHtml(current.sqlFormulaId)}" />
        </div>
      </div>
    </div>

    <div class="actions">
      <button id="reset">Reset Defaults</button>
      <button id="save" class="primary">Save</button>
    </div>
    <div id="status" class="status"></div>
  </div>

  <script>
    const vscode = acquireVsCodeApi();
    const status = document.getElementById('status');

    function setStatus(message, isError) {
      status.textContent = message || '';
      status.classList.toggle('error', !!isError);
    }

    function collect() {
      return {
        sqlServer: document.getElementById('sqlServer').value,
        sqlDatabase: document.getElementById('sqlDatabase').value,
        sqlFormulaId: document.getElementById('sqlFormulaId').value,
        macroUserShort: document.getElementById('macroUserShort').value,
        macroUseLogProc: document.getElementById('macroUseLogProc').checked,
        validateOnSave: document.getElementById('validateOnSave').checked
      };
    }

    document.getElementById('save').addEventListener('click', () => {
      setStatus('Saving...', false);
      vscode.postMessage({ type: 'save', payload: collect() });
    });

    document.getElementById('reset').addEventListener('click', () => {
      vscode.postMessage({ type: 'reset' });
    });

    window.addEventListener('message', event => {
      const message = event.data || {};
      if (message.type === 'saved') {
        setStatus('Saved to user settings.', false);
      } else if (message.type === 'error') {
        setStatus(message.payload || 'Failed to save settings.', true);
      }
    });
  </script>
</body>
</html>`;
}

module.exports = {
  buildSettingsWebviewHtml
};
