# Quackro

VS Code extension workspace for Quackro, with language support and tooling for BMD macro development.

## Coding Guidelines

## Makrotyp

A macro is program code that is interpreted and executed at runtime within another application. The macro is embedded by the user within a program context, which we call **Makrotyp**.

Common Makrotyp are:

- **Fenstermakro** – Manual execution. The macro is embedded in a window/context for manual execution. A data model for dataretreival is available
- **Aktionsmakro** – Execution within a program event. The macro is executed like code injection at runtime and can influence the standard program flow. Typical action timing is "Create before End" and "Edit before End", which relate to data record creation.
- **Feldmakro** – Execution when leaving a field in the application's user interface.
- **Stapelmakro** – Has no data model available and must always retrieve data via database query.

## Mandatory Comment Header

Every new macro must begin with this comment header template:

```basic
//==============================================
// Kundennummer : <Kundennummer>
// Erstelldatum : <TT.MM.JJJJ>
// Ersteller    : <userkuerzel>
// Beschreibung : Makrotyp, Tabelle und Kurzbeschreibung
//
// Ausführliche Beschreibung des Makros.
//
// Änderungen   : <TT.MM.JJJJ> <userkuerzel> – <Beschreibung der Änderung>
//==============================================
```

Replace placeholders as follows:
- `<Kundennummer>` – Customer/client number
- `<TT.MM.JJJJ>` – Creation date (DD.MM.YYYY format)
- `<userkuerzel>` – User initials or ID
- `Makrotyp` – Entry point type (Window/Action/Field/Batch)
- Include detailed macro description after the header
- Log all changes with timestamp and description in the `Änderungen` section

---

## Variable & Constant Naming

| Type | Prefix | Examples | Notes |
|------|--------|----------|-------|
| Local variables | `l` | `lCompanyNr`, `lName`, `lCount` | |
| Constants | `c` | `cLogFile`, `cTimeout` | Immutable, use `=` assignment |
| Function parameters | `a` | `aParam`, `aCompanyNr`, `aPath` | |
| Loop counters | `i`, `j`, `k` | | Use in `for` and `while` loops |
| Stack variables | `v` | `vDate`, `vAmount` | Avoid `STP_` prefix (collision risk) |
| Stack parameters | `p` | `pPath`, `pValue` | Avoid `STP_` prefix (collision risk) |

**Type inference from name:** No underscores. Let data type be clear from name:
- Integer: `lLength`, `lAmount`
- String: `lFileName`, `lText`
- Boolean: `lHasNumbers`, `lIsActive`
- StringList: `lCustomerList`, `lOrderList`
- Objects: `lTaskMgr`, `lFileMgr`

## Functions & Procedures

- Function names start with `FUNC_`, return a result
- Procedure names start with `PROC_`, no return value
- Use imperative verbs: `FUNC_GetValue()`, `PROC_ProcessData()`
- Parameters comma-separated, no type declarations
- Specify return type: `: String`, `: Integer`, `: StringList`

## Variable Declarations

**Do NOT use explicit `var` blocks** – direct assignment is allowed in runtime execution:
```basic
lName := 'value';  // Valid - implicit declaration
```

## Critical Coding Rules

### Control Structures
- **All `if`, `for`, `while`, `case` blocks require `begin`/`end`** – even single-line blocks
- `begin`/`end` pairs are **mandatory**

### Multi-line Strings
Join lines with `+`, not embedded newlines:
```basic
lQuery.setSQLText(' SELECT field1, field2' +
                  ' FROM table' +
                  ' WHERE id = 1');
```
Each SQL line must start with a space; no inline SQL comments (`--`)

### Line Breaks
Use `bmd_lineBreak()` not `\n` or `#13#10`

### Type Conversion for Comparisons
When reading values via `Model.getValue()` or `Query.getAsString()`, results are strings. For numeric comparisons, convert explicitly with `BMD_TEXTTONUMDEF()`:
```basic
lValue := BMD_TEXTTONUMDEF(lStringValue);
if (lValue > 10) then begin
    // ...
end;
```

### Dialog Prefixes
Prefix dialog titles with `[Macro]` for macro-originated dialogs

### Logging
Use `BMD_WRITETOLOGFILE(cMakroLog, 'message')` – the function handles timestamps and file I/O

### Error Handling
- **No `try..except` blocks** unless explicitly required
- Handle errors with `if` conditions + logging

### No Standard Try-Except
Error handling via conditional checks and logging only

## Macro Structure Pattern

```basic
//==============================================
// Constants
//==============================================
const
    cMakroLog = '_MAKRO_.log';

//==============================================
// Functions / Procedures
//==============================================

//==============================================
// MAIN
//==============================================
bmd_writeToLogFile(cMakroLog, 'Start');
Result := true;

// Main logic here

bmd_writeToLogFile(cMakroLog, 'End');
```

## Loop & Condition Guidelines

**While loops** for boolean conditions:
```basic
while (not lQuery.eof()) do begin
    lValue := lQuery.getAsString('field');
    lQuery.next();
end;
```

**For loops** for known iterations:
```basic
for i := 0 to lList.Count()-1 do begin
    lItem := lList.getItem(i);
end;
```

**Case statements** for clear value branches:
```basic
case lType of
    'A': lResult := 'TypeA';
    'B': lResult := 'TypeB';
    else lResult := 'Other';
end;
```

**Multiple conditions** – align operators:
```basic
if (lValue <> '')
and ((lStatus = '1') or (lStatus = '2'))
then begin
    // ...
end;
```

## Best Practices

- Code reads **top to bottom** without jumping to earlier procedures
- Main logic remains in the **MAIN block** for clarity
- Extract to functions/procedures only if **reused multiple times**
- Functions have **single, clear purpose**
- Comments describe intent, not obvious operations:
  ```basic
  // ✓ Good: Retrieve customer data by external system ID
  // ✗ Bad: Open the query
  ```
- Indentation: **4 spaces** consistent
