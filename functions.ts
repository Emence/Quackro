// Auto-generated from 04_Makro-Toolbar-Funktionen.txt

export interface MacroParam {
  label: string;
  optional: boolean;
}

export interface MacroFunction {
  name: string;
  bmdSignature: string;
  category: string;
  availability: string;
  parameters: MacroParam[];
  isMethod: boolean;
}

export const MACRO_FUNCTIONS: MacroFunction[] = [
  {
    "name": "Time",
    "bmdSignature": "BMD_TIME()",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Date",
    "bmdSignature": "BMD_DATE()",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "DayOfWeek",
    "bmdSignature": "BMD_DAYOFWEEK('Datum')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "DayOfWeekAsText",
    "bmdSignature": "BMD_DAYOFWEEKASTEXT('Datum')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "WeekOfYear",
    "bmdSignature": "BMD_WEEKOFYEAR('Datum')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Day",
    "bmdSignature": "BMD_DAY('Datum')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Month",
    "bmdSignature": "BMD_MONTH('Datum')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Year",
    "bmdSignature": "BMD_YEAR('Datum')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Hour",
    "bmdSignature": "BMD_HOUR('Datum')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Minute",
    "bmdSignature": "BMD_MINUTE('Datum')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Second",
    "bmdSignature": "BMD_SECOND('Datum')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "DateDiff",
    "bmdSignature": "BMD_DATEDIFF('Datum1','Datum2')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum1",
        "optional": false
      },
      {
        "label": "Datum2",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "DateSum",
    "bmdSignature": "BMD_DATESUM('Datum',<Zahl>)",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      },
      {
        "label": "Zahl",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "MonthDiff",
    "bmdSignature": "BMD_MONTHDIFF('Datum1','Datum2')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum1",
        "optional": false
      },
      {
        "label": "Datum2",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "LastDayOfMonth",
    "bmdSignature": "BMD_LASTDAY(<Monat>,<Jahr>)",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Monat",
        "optional": false
      },
      {
        "label": "Jahr",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "IsLeapYear",
    "bmdSignature": "BMD_ISLEAPYEAR(<Jahr>)",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Jahr",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "DateToISOFormat",
    "bmdSignature": "BMD_DATETOISOFORMAT('Datum')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "FormatDate",
    "bmdSignature": "BMD_FORMATDATE('Datum','Eingabeformat','Ausgabeformat')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      },
      {
        "label": "Eingabeformat",
        "optional": false
      },
      {
        "label": "Ausgabeformat",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "UTCDateTimeToLocal",
    "bmdSignature": "BMD_UTCDATETIMETOLOCAL('Datum')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "LocalDateTimeToUTC",
    "bmdSignature": "BMD_LOCALDATETIMETOUTC('Datum')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "FormatDateByLanguage",
    "bmdSignature": "BMD_FORMATDATEBYLANGUAGE('Datum',<Sprachnr>)",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      },
      {
        "label": "Sprachnr",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "StrToDate",
    "bmdSignature": "BMD_STRTODATE('Datum')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "AmazonDateToDateTime",
    "bmdSignature": "BMD_AMAZONDATETODATETIME('Datum',<LocaleID>)",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      },
      {
        "label": "LocaleID",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "DateToStr",
    "bmdSignature": "BMD_DATETOSTR(<Datum>)",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "IsValidDateStr",
    "bmdSignature": "BMD_ISVALIDDATESTR('Datum')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "DecMonth",
    "bmdSignature": "BMD_DECMONTH('Datum','Count')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      },
      {
        "label": "Count",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "IncMonth",
    "bmdSignature": "BMD_INCMONTH('Datum','Count')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      },
      {
        "label": "Count",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "IncDay",
    "bmdSignature": "BMD_INCDAY('Datum','Count')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      },
      {
        "label": "Count",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "IncHour",
    "bmdSignature": "BMD_INCHOUR('Datum','Count')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      },
      {
        "label": "Count",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "IncMin",
    "bmdSignature": "BMD_INCMIN('Datum','Count')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      },
      {
        "label": "Count",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "IncSec",
    "bmdSignature": "BMD_INCSEC('Datum','Count')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      },
      {
        "label": "Count",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "RoundPeriod",
    "bmdSignature": "BMD_ROUNDPERIOD('Dauer','Einheit','Modus')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Dauer",
        "optional": false
      },
      {
        "label": "Einheit",
        "optional": false
      },
      {
        "label": "Modus",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "RecodeYear",
    "bmdSignature": "BMD_RECODEYEAR('Datum','Year')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      },
      {
        "label": "Year",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "RecodeMonth",
    "bmdSignature": "BMD_RECODEMONTH('Datum','Month')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      },
      {
        "label": "Month",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "RecodeDay",
    "bmdSignature": "BMD_RECODEDAY('Datum','Day')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      },
      {
        "label": "Day",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "RecodeHour",
    "bmdSignature": "BMD_RECODEHOUR('Datum','Hour')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      },
      {
        "label": "Hour",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "RecodeMinute",
    "bmdSignature": "BMD_RECODEMINUTE('Datum','Minute')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      },
      {
        "label": "Minute",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "RecodeSecond",
    "bmdSignature": "BMD_RECODESECOND('Datum','Second')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      },
      {
        "label": "Second",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "DateOf",
    "bmdSignature": "BMD_DATEOF('Datum')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "TimeOf",
    "bmdSignature": "BMD_TIMEOF('Datum')",
    "category": "Datum & Zeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "TextToNumDef",
    "bmdSignature": "BMD_TEXTTONUMDEF('Text')",
    "category": "Mathematische Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "FloatToStrF",
    "bmdSignature": "BMD_FLOATTOSTRF('Text',<Kind>,<Precision>,<Digits>)",
    "category": "Mathematische Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      },
      {
        "label": "Kind",
        "optional": false
      },
      {
        "label": "Precision",
        "optional": false
      },
      {
        "label": "Digits",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Min",
    "bmdSignature": "BMD_MIN(<Zahl>,<Zahl>)",
    "category": "Mathematische Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Zahl",
        "optional": false
      },
      {
        "label": "Zahl",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Max",
    "bmdSignature": "BMD_MAX(<Zahl>,<Zahl>)",
    "category": "Mathematische Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Zahl",
        "optional": false
      },
      {
        "label": "Zahl",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Round",
    "bmdSignature": "BMD_ROUND(<Zahl>,<Stellen>)",
    "category": "Mathematische Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Zahl",
        "optional": false
      },
      {
        "label": "Stellen",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "RoundX",
    "bmdSignature": "BMD_ROUNDX(<Zahl>,<Basis>,<Rundungsart (opt)>)",
    "category": "Mathematische Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Zahl",
        "optional": false
      },
      {
        "label": "Basis",
        "optional": false
      },
      {
        "label": "Rundungsart",
        "optional": true
      }
    ],
    "isMethod": false
  },
  {
    "name": "Abs",
    "bmdSignature": "BMD_ABS(<Zahl>)",
    "category": "Mathematische Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Zahl",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Trunc",
    "bmdSignature": "BMD_TRUNC(<Zahl>)",
    "category": "Mathematische Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Zahl",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Power",
    "bmdSignature": "BMD_POWER(<Base>,<Exp>)",
    "category": "Mathematische Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Base",
        "optional": false
      },
      {
        "label": "Exp",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Sqrt",
    "bmdSignature": "BMD_SQRT(<Zahl>)",
    "category": "Mathematische Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Zahl",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Modulo",
    "bmdSignature": "BMD_MODULO(<Zahl>,<Zahl>)",
    "category": "Mathematische Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Zahl",
        "optional": false
      },
      {
        "label": "Zahl",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Div0",
    "bmdSignature": "BMD_DIV0(<Dividend>,<Divisor>)",
    "category": "Mathematische Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Dividend",
        "optional": false
      },
      {
        "label": "Divisor",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "GetGUID",
    "bmdSignature": "BMD_GETGUID()",
    "category": "Mathematische Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "GetSEQID",
    "bmdSignature": "BMD_GETSEQID()",
    "category": "Mathematische Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "ConvertNumber",
    "bmdSignature": "BMD_CONVERTNUMBER(<Value>,<Length (opt)>,<Language (opt)>,<InThousand (opt)>,<StarBeforeNumber (opt)>,<LineAfterNumber (opt)>,<ShowSeperator (opt)>)",
    "category": "Mathematische Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Value",
        "optional": false
      },
      {
        "label": "Length",
        "optional": true
      },
      {
        "label": "Language",
        "optional": true
      },
      {
        "label": "InThousand",
        "optional": true
      },
      {
        "label": "StarBeforeNumber",
        "optional": true
      },
      {
        "label": "LineAfterNumber",
        "optional": true
      },
      {
        "label": "ShowSeperator",
        "optional": true
      }
    ],
    "isMethod": false
  },
  {
    "name": "ConvertAmount",
    "bmdSignature": "BMD_CONVERTAMOUNT(<Kurstabelle>,<Kursdatum>,<Betrag>,'Basiswährung','Zielwährung',<Nachkommastellen (opt)>)",
    "category": "Mathematische Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Kurstabelle",
        "optional": false
      },
      {
        "label": "Kursdatum",
        "optional": false
      },
      {
        "label": "Betrag",
        "optional": false
      },
      {
        "label": "Basiswährung",
        "optional": false
      },
      {
        "label": "Zielwährung",
        "optional": false
      },
      {
        "label": "Nachkommastellen",
        "optional": true
      }
    ],
    "isMethod": false
  },
  {
    "name": "FormatNum",
    "bmdSignature": "BMD_FORMATNUM('Format',<Wert>,<Language (opt)>)",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Format",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      },
      {
        "label": "Language",
        "optional": true
      }
    ],
    "isMethod": false
  },
  {
    "name": "MD5",
    "bmdSignature": "BMD_MD5('Text')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Upper",
    "bmdSignature": "BMD_UPPER('Text',<ChangeSharpS (opt)>,'SharpS (opt)')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      },
      {
        "label": "ChangeSharpS",
        "optional": true
      },
      {
        "label": "SharpS",
        "optional": true
      }
    ],
    "isMethod": false
  },
  {
    "name": "Lower",
    "bmdSignature": "BMD_LOWER('Text')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Copy",
    "bmdSignature": "BMD_COPY('Text',<Ab Position>,<Länge>)",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      },
      {
        "label": "Ab Position",
        "optional": false
      },
      {
        "label": "Länge",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Trim",
    "bmdSignature": "BMD_TRIM('Text')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "RTrim",
    "bmdSignature": "BMD_RTRIM('Text')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "LTrim",
    "bmdSignature": "BMD_LTRIM('Text')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "TrimSpace",
    "bmdSignature": "BMD_TRIMSPACE('Text')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "RTrimSpace",
    "bmdSignature": "BMD_RTRIMSPACE('Text')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "LTrimSpace",
    "bmdSignature": "BMD_LTRIMSPACE('Text')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Concat",
    "bmdSignature": "BMD_CONCAT('Text1','Text2')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text1",
        "optional": false
      },
      {
        "label": "Text2",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Pos",
    "bmdSignature": "BMD_POS('Text','Teilstring')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      },
      {
        "label": "Teilstring",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Len",
    "bmdSignature": "BMD_LEN('Text')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "EAN",
    "bmdSignature": "BMD_EAN(<Länge>,'Text')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Länge",
        "optional": false
      },
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "UTF8Encode",
    "bmdSignature": "BMD_UTF8Encode('Text')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "UTF8Decode",
    "bmdSignature": "BMD_UTF8Decode('Text')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "URLEncode",
    "bmdSignature": "BMD_URLEncode('Text')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Base64Encode",
    "bmdSignature": "BMD_Base64Encode('Text')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Base64Decode",
    "bmdSignature": "BMD_Base64Decode('Text')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Encode",
    "bmdSignature": "BMD_Encode('Text',<Codepage>)",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      },
      {
        "label": "Codepage",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Decode",
    "bmdSignature": "BMD_Decode('Text',<Codepage>)",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      },
      {
        "label": "Codepage",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "LineBreak",
    "bmdSignature": "BMD_LineBreak()",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "LineFeed",
    "bmdSignature": "BMD_LineFeed()",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Tabulator",
    "bmdSignature": "BMD_Tabulator()",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Ext_Field",
    "bmdSignature": "BMD_EXT_FIELD('Datenquelle','Externes Feld','Bedingung1','Wert1','Bedingung2','Wert2','Bedingung3','Wert3')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datenquelle",
        "optional": false
      },
      {
        "label": "Externes Feld",
        "optional": false
      },
      {
        "label": "Bedingung1",
        "optional": false
      },
      {
        "label": "Wert1",
        "optional": false
      },
      {
        "label": "Bedingung2",
        "optional": false
      },
      {
        "label": "Wert2",
        "optional": false
      },
      {
        "label": "Bedingung3",
        "optional": false
      },
      {
        "label": "Wert3",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "StringReplace",
    "bmdSignature": "BMD_STRINGREPLACE('Wert','OldPattern','NewPattern',<AllOccurrences (opt)>,<CaseSensitive (opt)>)",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Wert",
        "optional": false
      },
      {
        "label": "OldPattern",
        "optional": false
      },
      {
        "label": "NewPattern",
        "optional": false
      },
      {
        "label": "AllOccurrences",
        "optional": true
      },
      {
        "label": "CaseSensitive",
        "optional": true
      }
    ],
    "isMethod": false
  },
  {
    "name": "ReplaceSeparator",
    "bmdSignature": "BMD_REPLACESEPARATOR('Wert')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "GetAnsiChr",
    "bmdSignature": "BMD_GETANSICHR(<Zahl>)",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Zahl",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Korrektur Dezimaltrennzeichen",
    "bmdSignature": "BMD_CORRECT_COMMA('Wert / Funktion')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Wert / Funktion",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "HIBCCheckDigit",
    "bmdSignature": "BMD_HIBCCHECKDIGIT('')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "HIBCTrim",
    "bmdSignature": "BMD_HIBCTRIM('')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "HIBCTrimAlphaNum",
    "bmdSignature": "BMD_HIBCTRIMALPHANUM('')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "GetNote",
    "bmdSignature": "BMD_GETNOTE('')",
    "category": "Textfunktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "ExtWertBez",
    "bmdSignature": "BMD_EXTWERT_NAME('Paket','Kategorie','Wert')",
    "category": "Externe Werte",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Paket",
        "optional": false
      },
      {
        "label": "Kategorie",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "ExtWertLJ",
    "bmdSignature": "BMD_EXTWERT_LJ('Paket','Kategorie','Wert')",
    "category": "Externe Werte",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Paket",
        "optional": false
      },
      {
        "label": "Kategorie",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "ExtWertVJ1",
    "bmdSignature": "BMD_EXTWERT_VJ1('Paket','Kategorie','Wert')",
    "category": "Externe Werte",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Paket",
        "optional": false
      },
      {
        "label": "Kategorie",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "ExtWertVJ2",
    "bmdSignature": "BMD_EXTWERT_VJ2('Paket','Kategorie','Wert')",
    "category": "Externe Werte",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Paket",
        "optional": false
      },
      {
        "label": "Kategorie",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "ExtWertVJ3",
    "bmdSignature": "BMD_EXTWERT_VJ3('Paket','Kategorie','Wert')",
    "category": "Externe Werte",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Paket",
        "optional": false
      },
      {
        "label": "Kategorie",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "ExtWertVJ4",
    "bmdSignature": "BMD_EXTWERT_VJ4('Paket','Kategorie','Wert')",
    "category": "Externe Werte",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Paket",
        "optional": false
      },
      {
        "label": "Kategorie",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "ExtWertNJ",
    "bmdSignature": "BMD_EXTWERT_NJ('Paket','Kategorie','Wert')",
    "category": "Externe Werte",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Paket",
        "optional": false
      },
      {
        "label": "Kategorie",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "UserName",
    "bmdSignature": "BMD_USERNAME()",
    "category": "Tools Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "UserNameFull",
    "bmdSignature": "BMD_USERNAMEFULL()",
    "category": "Tools Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "SystemUserName",
    "bmdSignature": "BMD_SYSTEMUSERNAME()",
    "category": "Tools Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "ComputerName",
    "bmdSignature": "BMD_COMPUTERNAME()",
    "category": "Tools Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "DatabaseName",
    "bmdSignature": "BMD_DATABASENAME()",
    "category": "Tools Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "DateTimeFromSeqID",
    "bmdSignature": "BMD_DATETIMEFROMSEQID(<Seq-ID>)",
    "category": "Tools Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Seq-ID",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "PgmVersion",
    "bmdSignature": "BMD_PGMVERSION()",
    "category": "Tools Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "DbVersion",
    "bmdSignature": "BMD_DBVERSION()",
    "category": "Tools Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "ExecuteMacro",
    "bmdSignature": "BMD_EXECUTEMACRO('Macro-No','Parameter')",
    "category": "Tools Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Macro-No",
        "optional": false
      },
      {
        "label": "Parameter",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "GetNav_CompanyNo",
    "bmdSignature": "BMD_GETNAV_COMPANYNO()",
    "category": "Tools Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "GetNav_CustomerNo",
    "bmdSignature": "BMD_GETNAV_CUSTOMERNO()",
    "category": "Tools Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "GetNav_ArtCompanyNo",
    "bmdSignature": "BMD_GETNAV_ARTCOMPANYNO()",
    "category": "Tools Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "GetNav_ArticleNo",
    "bmdSignature": "BMD_GETNAV_ARTICLENO()",
    "category": "Tools Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "GetNav_ProjectCompanyNo",
    "bmdSignature": "BMD_GETNAV_PROJCOMPANYNO()",
    "category": "Tools Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "GetNav_ProjectNo",
    "bmdSignature": "BMD_GETNAV_PROJECTNO()",
    "category": "Tools Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "GetNav_EmployeeCompanyNo",
    "bmdSignature": "BMD_GETNAV_EMPCOMPANYNO()",
    "category": "Tools Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "GetNav_EmployeeNo",
    "bmdSignature": "BMD_GETNAV_EMPLOYEENO()",
    "category": "Tools Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "GetNav_ClientCompanyNo",
    "bmdSignature": "BMD_GETNAV_CLIENTCOMPANYNO()",
    "category": "Tools Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "GetNav_ClientNo",
    "bmdSignature": "BMD_GETNAV_CLIENTNO()",
    "category": "Tools Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "GetIntDBValue",
    "bmdSignature": "BMD_GETINTDBVALUE('Feldname')",
    "category": "Tools Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Feldname",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "GetPhraseForWeOrI",
    "bmdSignature": "BMD_GETPHRASEFORWEORI('Ich-Form','Wir-Form')",
    "category": "Tools Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Ich-Form",
        "optional": false
      },
      {
        "label": "Wir-Form",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Rate",
    "bmdSignature": "BMD_SAVEINTEREST_BEST_SPARZIEL(<Endwert>,<Anfangskapital>,<Gesamtanzahl Raten>,<Jahreszinssatz [%]>,<Kapitalertragsteuer [%]>,<Zahlungen erfolgen>,<Zahlungsweise>)",
    "category": "Zins- und Sparfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Endwert",
        "optional": false
      },
      {
        "label": "Anfangskapital",
        "optional": false
      },
      {
        "label": "Gesamtanzahl Raten",
        "optional": false
      },
      {
        "label": "Jahreszinssatz [%]",
        "optional": false
      },
      {
        "label": "Kapitalertragsteuer [%]",
        "optional": false
      },
      {
        "label": "Zahlungen erfolgen",
        "optional": false
      },
      {
        "label": "Zahlungsweise",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Endwert bei Raten",
    "bmdSignature": "BMD_SAVEINTEREST_EW_REGEL_ZAHLUNGEN(<Anfangskapital>,<Rate>,<Gesamtanzahl Raten>,<Jahreszinssatz [%]>,<Kapitalertragsteuer [%]>,<Zahlungen erfolgen>,<Zahlungsweise>,<Anzeige von>)",
    "category": "Zins- und Sparfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Anfangskapital",
        "optional": false
      },
      {
        "label": "Rate",
        "optional": false
      },
      {
        "label": "Gesamtanzahl Raten",
        "optional": false
      },
      {
        "label": "Jahreszinssatz [%]",
        "optional": false
      },
      {
        "label": "Kapitalertragsteuer [%]",
        "optional": false
      },
      {
        "label": "Zahlungen erfolgen",
        "optional": false
      },
      {
        "label": "Zahlungsweise",
        "optional": false
      },
      {
        "label": "Anzeige von",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Barwert bei Raten",
    "bmdSignature": "BMD_SAVEINTEREST_BW_REGEL_ZAHLUNGEN(<Rate>,<Gesamtanzahl Raten>,<Jahreszinssatz [%]>,<Kapitalertragsteuer [%]>,<Zahlungen erfolgen>,<Zahlungsweise>)",
    "category": "Zins- und Sparfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Rate",
        "optional": false
      },
      {
        "label": "Gesamtanzahl Raten",
        "optional": false
      },
      {
        "label": "Jahreszinssatz [%]",
        "optional": false
      },
      {
        "label": "Kapitalertragsteuer [%]",
        "optional": false
      },
      {
        "label": "Zahlungen erfolgen",
        "optional": false
      },
      {
        "label": "Zahlungsweise",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Anfangskapital (Zinseszinsrechnung)",
    "bmdSignature": "BMD_SAVEINTEREST_ANGANGSWERT(<Endwert>,<Anzahl der Zinsperioden>,<Jahreszinssatz [%]>,<Kapitalertragsteuer [%]>,<Verzinsung>,<Anzeige von>)",
    "category": "Zins- und Sparfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Endwert",
        "optional": false
      },
      {
        "label": "Anzahl der Zinsperioden",
        "optional": false
      },
      {
        "label": "Jahreszinssatz [%]",
        "optional": false
      },
      {
        "label": "Kapitalertragsteuer [%]",
        "optional": false
      },
      {
        "label": "Verzinsung",
        "optional": false
      },
      {
        "label": "Anzeige von",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Endwert",
    "bmdSignature": "BMD_SAVEINTEREST_ENDWERT(<Anfangskapital>,<Anzahl der Zinsperioden>,<Jahreszinssatz [%]>,<Kapitalertragsteuer [%]>,<Verzinsung>,<Anzeige von>)",
    "category": "Zins- und Sparfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Anfangskapital",
        "optional": false
      },
      {
        "label": "Anzahl der Zinsperioden",
        "optional": false
      },
      {
        "label": "Jahreszinssatz [%]",
        "optional": false
      },
      {
        "label": "Kapitalertragsteuer [%]",
        "optional": false
      },
      {
        "label": "Verzinsung",
        "optional": false
      },
      {
        "label": "Anzeige von",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Verdoppelung des Anfangskapitals",
    "bmdSignature": "BMD_SAVEINTEREST_JAHRE_VERDOPPLUNG(<Jahreszinssatz [%]>,<Kapitalertragsteuer [%]>,<Verzinsung>)",
    "category": "Zins- und Sparfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Jahreszinssatz [%]",
        "optional": false
      },
      {
        "label": "Kapitalertragsteuer [%]",
        "optional": false
      },
      {
        "label": "Verzinsung",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Zinsen",
    "bmdSignature": "BMD_SAVEINTEREST_ZINSEN_NACH_TAGEN(<Anfangskapital>,<Jahreszinssatz [%]>,<Anfangsdatum>,<Enddatum>,<Oder Tage>,<Tage>,<Jahr>,<Monat>)",
    "category": "Zins- und Sparfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Anfangskapital",
        "optional": false
      },
      {
        "label": "Jahreszinssatz [%]",
        "optional": false
      },
      {
        "label": "Anfangsdatum",
        "optional": false
      },
      {
        "label": "Enddatum",
        "optional": false
      },
      {
        "label": "Oder Tage",
        "optional": false
      },
      {
        "label": "Tage",
        "optional": false
      },
      {
        "label": "Jahr",
        "optional": false
      },
      {
        "label": "Monat",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Laufzeit",
    "bmdSignature": "BMD_SAVEINTEREST_ZEITRAUM(<Anfangskapital>,<Jahreszinssatz [%]>,<Zinsen>,<Jahr>)",
    "category": "Zins- und Sparfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Anfangskapital",
        "optional": false
      },
      {
        "label": "Jahreszinssatz [%]",
        "optional": false
      },
      {
        "label": "Zinsen",
        "optional": false
      },
      {
        "label": "Jahr",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Jahreszinssatz (einfache Zinsrechnung)",
    "bmdSignature": "BMD_SAVEINTEREST_ZINSFUSS(<Anfangskapital>,<Zinsen>,<Anfangsdatum>,<Enddatum>,<Oder Tage>,<Tage>,<Jahr>,<Monat>)",
    "category": "Zins- und Sparfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Anfangskapital",
        "optional": false
      },
      {
        "label": "Zinsen",
        "optional": false
      },
      {
        "label": "Anfangsdatum",
        "optional": false
      },
      {
        "label": "Enddatum",
        "optional": false
      },
      {
        "label": "Oder Tage",
        "optional": false
      },
      {
        "label": "Tage",
        "optional": false
      },
      {
        "label": "Jahr",
        "optional": false
      },
      {
        "label": "Monat",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Anfangskapital (einfache Zinsrechnung)",
    "bmdSignature": "BMD_SAVEINTEREST_KAPITAL(<Jahreszinssatz [%]>,<Zinsen>,<Anfangsdatum>,<Enddatum>,<Oder Tage>,<Tage>,<Jahr>,<Monat>)",
    "category": "Zins- und Sparfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Jahreszinssatz [%]",
        "optional": false
      },
      {
        "label": "Zinsen",
        "optional": false
      },
      {
        "label": "Anfangsdatum",
        "optional": false
      },
      {
        "label": "Enddatum",
        "optional": false
      },
      {
        "label": "Oder Tage",
        "optional": false
      },
      {
        "label": "Tage",
        "optional": false
      },
      {
        "label": "Jahr",
        "optional": false
      },
      {
        "label": "Monat",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Jahreszinssatz (Zinseszinsrechnung)",
    "bmdSignature": "BMD_SAVEINTEREST_PROZ_GEWINN(<Anfangskapital>,<Endwert>,<Laufzeit [Monate]>,<Verzinsung>)",
    "category": "Zins- und Sparfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Anfangskapital",
        "optional": false
      },
      {
        "label": "Endwert",
        "optional": false
      },
      {
        "label": "Laufzeit [Monate]",
        "optional": false
      },
      {
        "label": "Verzinsung",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Prozentannuität",
    "bmdSignature": "BMD_SAVEINTEREST_RATE_EFFZINS_ANNUI(<Darlehen>,<Jahreszinssatz [%]>,<Tilgungssatz in der ersten Periode [%]>,<Zahlungen erfolgen>)",
    "category": "Zins- und Sparfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Darlehen",
        "optional": false
      },
      {
        "label": "Jahreszinssatz [%]",
        "optional": false
      },
      {
        "label": "Tilgungssatz in der ersten Periode [%]",
        "optional": false
      },
      {
        "label": "Zahlungen erfolgen",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Effektivzinssatz",
    "bmdSignature": "BMD_SAVEINTEREST_EFFZINS_AUS_NOMZINS(<Nominalzinssatz [%]>,<Verzinsung>)",
    "category": "Zins- und Sparfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Nominalzinssatz [%]",
        "optional": false
      },
      {
        "label": "Verzinsung",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Wenn",
    "bmdSignature": "BMD_IF(<Ausdruck>,'Wenn wahr','Wenn falsch')",
    "category": "Formel",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Ausdruck",
        "optional": false
      },
      {
        "label": "Wenn wahr",
        "optional": false
      },
      {
        "label": "Wenn falsch",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "AskValueStr",
    "bmdSignature": "BMD_ASKVALUESTR('Fenstertitel','Anzeigetext','Defaultwert')",
    "category": "Abfragen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Fenstertitel",
        "optional": false
      },
      {
        "label": "Anzeigetext",
        "optional": false
      },
      {
        "label": "Defaultwert",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "AskValueDate",
    "bmdSignature": "BMD_ASKVALUEDATE(<Startdatum>)",
    "category": "Abfragen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Startdatum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "AskValueBool",
    "bmdSignature": "BMD_ASKVALUEBOOL('Anzeigetext','Fenstertitel')",
    "category": "Abfragen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Anzeigetext",
        "optional": false
      },
      {
        "label": "Fenstertitel",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "AskValueList",
    "bmdSignature": "BMD_ASKVALUELIST('Wert1,Wert2,...','Text1,Text2,...')",
    "category": "Abfragen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Wert1",
        "optional": false
      },
      {
        "label": "Wert2",
        "optional": false
      },
      {
        "label": "...",
        "optional": false
      },
      {
        "label": "Text1",
        "optional": false
      },
      {
        "label": "Text2",
        "optional": false
      },
      {
        "label": "...",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "AskMultipleValues",
    "bmdSignature": "BMD_ASKMULTIPLEVALUES('Fenstertitel','One,Two,Three','Three',',')",
    "category": "Abfragen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Fenstertitel",
        "optional": false
      },
      {
        "label": "One",
        "optional": false
      },
      {
        "label": "Two",
        "optional": false
      },
      {
        "label": "Three",
        "optional": false
      },
      {
        "label": "Three",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "AskValueFile",
    "bmdSignature": "BMD_ASKVALUEFILE('Anzeigetext','Filter','Filename','StartPath')",
    "category": "Abfragen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Anzeigetext",
        "optional": false
      },
      {
        "label": "Filter",
        "optional": false
      },
      {
        "label": "Filename",
        "optional": false
      },
      {
        "label": "StartPath",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "AskValueDir",
    "bmdSignature": "BMD_ASKVALUEDIR('Anzeigetext','StartPath')",
    "category": "Abfragen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Anzeigetext",
        "optional": false
      },
      {
        "label": "StartPath",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "InputQuery",
    "bmdSignature": "BMD_INPUTQUERY('Fenstertitel','Anzeigetext','Text')",
    "category": "Abfragen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Fenstertitel",
        "optional": false
      },
      {
        "label": "Anzeigetext",
        "optional": false
      },
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "WriteToLogFile",
    "bmdSignature": "BMD_WRITETOLOGFILE('FileName','Text')",
    "category": "Dateizugriff",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FileName",
        "optional": false
      },
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "AssignFile",
    "bmdSignature": "BMD_ASSIGNFILE(<FileNo>,'FileName',<StreamAccess (opt)>,<OpenFlag (opt)>,<CreateFlag (opt)>,<CodePage (opt)>)",
    "category": "Dateizugriff",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FileNo",
        "optional": false
      },
      {
        "label": "FileName",
        "optional": false
      },
      {
        "label": "StreamAccess",
        "optional": true
      },
      {
        "label": "OpenFlag",
        "optional": true
      },
      {
        "label": "CreateFlag",
        "optional": true
      },
      {
        "label": "CodePage",
        "optional": true
      }
    ],
    "isMethod": false
  },
  {
    "name": "OpenFile_Reset",
    "bmdSignature": "BMD_OPENFILE_RESET(<FileNo>)",
    "category": "Dateizugriff",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FileNo",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "OpenFile_Append",
    "bmdSignature": "BMD_OPENFILE_APPEND(<FileNo>)",
    "category": "Dateizugriff",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FileNo",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "CreateFile",
    "bmdSignature": "BMD_CREATEFILE('FileName')",
    "category": "Dateizugriff",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FileName",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "DeleteFile",
    "bmdSignature": "BMD_DELETEFILE('FileName')",
    "category": "Dateizugriff",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FileName",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "DeleteFiles",
    "bmdSignature": "BMD_DELETEFILES('FileName','WildCard')",
    "category": "Dateizugriff",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FileName",
        "optional": false
      },
      {
        "label": "WildCard",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "RemoveDir",
    "bmdSignature": "BMD_REMOVEDIR('FileName')",
    "category": "Dateizugriff",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FileName",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "CloseFile",
    "bmdSignature": "BMD_CLOSEFILE(<FileNo>)",
    "category": "Dateizugriff",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FileNo",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "ReadLn",
    "bmdSignature": "BMD_READLN(<FileNo>)",
    "category": "Dateizugriff",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FileNo",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "WriteLn",
    "bmdSignature": "BMD_WRITELN(<FileNo>,'Text',<Base64Decode (opt)>,<DoLineFeed (opt)>)",
    "category": "Dateizugriff",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FileNo",
        "optional": false
      },
      {
        "label": "Text",
        "optional": false
      },
      {
        "label": "Base64Decode",
        "optional": true
      },
      {
        "label": "DoLineFeed",
        "optional": true
      }
    ],
    "isMethod": false
  },
  {
    "name": "Eof",
    "bmdSignature": "BMD_EOF(<FileNo>)",
    "category": "Dateizugriff",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FileNo",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "FileExists",
    "bmdSignature": "BMD_FILEEXISTS('FileName')",
    "category": "Dateizugriff",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FileName",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "CopyFile",
    "bmdSignature": "BMD_COPYFILE('Source FileName','Destination FileName')",
    "category": "Dateizugriff",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Source FileName",
        "optional": false
      },
      {
        "label": "Destination FileName",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "RenameFile",
    "bmdSignature": "BMD_RENAMEFILE('FileName','New FileName')",
    "category": "Dateizugriff",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FileName",
        "optional": false
      },
      {
        "label": "New FileName",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "DirectoryExists",
    "bmdSignature": "BMD_DIRECTORYEXISTS('DirectoryName')",
    "category": "Dateizugriff",
    "availability": "Tools",
    "parameters": [
      {
        "label": "DirectoryName",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "ForceDirectories",
    "bmdSignature": "BMD_FORCEDIRECTORIES('DirectoryName')",
    "category": "Dateizugriff",
    "availability": "Tools",
    "parameters": [
      {
        "label": "DirectoryName",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "DownloadFile",
    "bmdSignature": "BMD_DOWNLOADFILE('URL','Username','Password','Destination FileName')",
    "category": "Dateizugriff",
    "availability": "Tools",
    "parameters": [
      {
        "label": "URL",
        "optional": false
      },
      {
        "label": "Username",
        "optional": false
      },
      {
        "label": "Password",
        "optional": false
      },
      {
        "label": "Destination FileName",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "CurrentSequenceID",
    "bmdSignature": "BMD_CURRSEQID(<CompanyNo>,'Sequence','Category1','Category2')",
    "category": "Nummernkreise",
    "availability": "Tools",
    "parameters": [
      {
        "label": "CompanyNo",
        "optional": false
      },
      {
        "label": "Sequence",
        "optional": false
      },
      {
        "label": "Category1",
        "optional": false
      },
      {
        "label": "Category2",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "NextSequenceID",
    "bmdSignature": "BMD_NEXTSEQID(<CompanyNo>,'Sequence','Category1','Category2')",
    "category": "Nummernkreise",
    "availability": "Tools",
    "parameters": [
      {
        "label": "CompanyNo",
        "optional": false
      },
      {
        "label": "Sequence",
        "optional": false
      },
      {
        "label": "Category1",
        "optional": false
      },
      {
        "label": "Category2",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "StartFunction",
    "bmdSignature": "BMD_STARTFUNCTION('Funktionskonstante','Parameter')",
    "category": "Start Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Funktionskonstante",
        "optional": false
      },
      {
        "label": "Parameter",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "StartPrintFunction",
    "bmdSignature": "BMD_STARTPRINTFUNCTION('Funktionskonstante','Parameter')",
    "category": "Start Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Funktionskonstante",
        "optional": false
      },
      {
        "label": "Parameter",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "StartSpecialFunction",
    "bmdSignature": "BMD_STARTSPECIALFUNCTION('Funktionskonstante','Parameter')",
    "category": "Start Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Funktionskonstante",
        "optional": false
      },
      {
        "label": "Parameter",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "StartExtFunction",
    "bmdSignature": "BMD_STARTEXTFUNCTION('FileName','Parameter')",
    "category": "Start Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FileName",
        "optional": false
      },
      {
        "label": "Parameter",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "StartHelpFunction",
    "bmdSignature": "BMD_STARTHELPFUNCTION('FileName','Anchor','Language','ID')",
    "category": "Start Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FileName",
        "optional": false
      },
      {
        "label": "Anchor",
        "optional": false
      },
      {
        "label": "Language",
        "optional": false
      },
      {
        "label": "ID",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "StartExportDocument",
    "bmdSignature": "BMD_STARTEXPORTDOCUMENT('ID','FileName',<Silent>)",
    "category": "Start Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "ID",
        "optional": false
      },
      {
        "label": "FileName",
        "optional": false
      },
      {
        "label": "Silent",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "StartExportDocumentList",
    "bmdSignature": "BMD_STARTEXPORTDOCUMENTLIST('ID','FileDir',<Silent>)",
    "category": "Start Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "ID",
        "optional": false
      },
      {
        "label": "FileDir",
        "optional": false
      },
      {
        "label": "Silent",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "StartProgressBar",
    "bmdSignature": "BMD_STARTPROGRESSBAR()",
    "category": "Start Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "ShowProgressBar",
    "bmdSignature": "BMD_SHOWPROGRESSBAR(<Percent>,'Text')",
    "category": "Start Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Percent",
        "optional": false
      },
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "ThousandSeparator",
    "bmdSignature": "BMD_MacroSettings.ThousandSeparator()",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "DecimalSeparator",
    "bmdSignature": "BMD_MacroSettings.DecimalSeparator()",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "DateSeparator",
    "bmdSignature": "BMD_MacroSettings.DateSeparator()",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "TimeSeparator",
    "bmdSignature": "BMD_MacroSettings.TimeSeparator()",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "ShortDateFormat",
    "bmdSignature": "BMD_MacroSettings.ShortDateFormat()",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "LongDateFormat",
    "bmdSignature": "BMD_MacroSettings.LongDateFormat()",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "ShortTimeFormat",
    "bmdSignature": "BMD_MacroSettings.ShortTimeFormat()",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "LongTimeFormat",
    "bmdSignature": "BMD_MacroSettings.LongTimeFormat()",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetEnvironmentVar",
    "bmdSignature": "BMD_GETENVIRONMENTVAR('Name')",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "SetIntParamValue",
    "bmdSignature": "BMD_SETINTPARAMVALUE('ParameterName','Key','Value')",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "ParameterName",
        "optional": false
      },
      {
        "label": "Key",
        "optional": false
      },
      {
        "label": "Value",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "GetIntParamValue",
    "bmdSignature": "BMD_GETINTPARAMVALUE('ParameterName','Key','DefaultValue')",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "ParameterName",
        "optional": false
      },
      {
        "label": "Key",
        "optional": false
      },
      {
        "label": "DefaultValue",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "DelIntParamValue",
    "bmdSignature": "BMD_DELINTPARAMVALUE('ParameterName','Key')",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "ParameterName",
        "optional": false
      },
      {
        "label": "Key",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "ClearIntParamCache",
    "bmdSignature": "BMD_CLEARINTPARAMCache()",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "GetBlobValue",
    "bmdSignature": "BMD_GETBLOBVALUE(<BlobNo>,<LanguageNo>,<ShowPlainText>)",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "BlobNo",
        "optional": false
      },
      {
        "label": "LanguageNo",
        "optional": false
      },
      {
        "label": "ShowPlainText",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "GetApplicationType",
    "bmdSignature": "BMD_GETAPPLICATIONTYPE()",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "GetCurrLanguage",
    "bmdSignature": "BMD_GETCURRLANGUAGE()",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "LoadNlsString",
    "bmdSignature": "BMD_LOADNLSSTRING('Language',<GroupNo>,<TextNo>)",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Language",
        "optional": false
      },
      {
        "label": "GroupNo",
        "optional": false
      },
      {
        "label": "TextNo",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "IsLicenced",
    "bmdSignature": "BMD_ISLICENCED(<PackageNo>)",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "PackageNo",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "GetLicencePackageText",
    "bmdSignature": "BMD_GETLICENCEPACKAGETEXT(<PackageNo>)",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "PackageNo",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "GetLicenceCount",
    "bmdSignature": "BMD_GETLICENCECOUNT(<PackageNo>)",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "PackageNo",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "GetLicenceClientCount",
    "bmdSignature": "BMD_GETLICENCECLIENTCOUNT(<PackageNo>)",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "PackageNo",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "GetLicenceConsumed",
    "bmdSignature": "BMD_GETLICENCECONSUMED(<PackageNo>)",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "PackageNo",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "IsAllowed",
    "bmdSignature": "BMD_ISALLOWED(<FunctionNo>,<CompanyNo (opt)>,<FieldDescNo (opt)>,'UserID (opt)')",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FunctionNo",
        "optional": false
      },
      {
        "label": "CompanyNo",
        "optional": true
      },
      {
        "label": "FieldDescNo",
        "optional": true
      },
      {
        "label": "UserID",
        "optional": true
      }
    ],
    "isMethod": false
  },
  {
    "name": "IsZero",
    "bmdSignature": "BMD_ISZERO(<Zahl>,<Epsilon>)",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Zahl",
        "optional": false
      },
      {
        "label": "Epsilon",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "SameValue",
    "bmdSignature": "BMD_SAMEVALUE(<Zahl1>,<Zahl2>,<Epsilon>)",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Zahl1",
        "optional": false
      },
      {
        "label": "Zahl2",
        "optional": false
      },
      {
        "label": "Epsilon",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "GetAutoLoginParamStr",
    "bmdSignature": "BMD_GETAUTOLOGINPARAMSTR('Alias','UserID','Password','FunctionName')",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Alias",
        "optional": false
      },
      {
        "label": "UserID",
        "optional": false
      },
      {
        "label": "Password",
        "optional": false
      },
      {
        "label": "FunctionName",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "ConsiderAttrDataType",
    "bmdSignature": "BMD_CONSIDERATTRDATATYPE(<MustConsider>)",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "MustConsider",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "MergeImageFiles",
    "bmdSignature": "BMD_MERGEIMAGEFILES('Source FileName 1','Source FileName 2','Destination FileName')",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Source FileName 1",
        "optional": false
      },
      {
        "label": "Source FileName 2",
        "optional": false
      },
      {
        "label": "Destination FileName",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "MergePDFFiles",
    "bmdSignature": "BMD_MERGEPDFFILES('Source FileName 1','Source FileName 2','Destination FileName')",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Source FileName 1",
        "optional": false
      },
      {
        "label": "Source FileName 2",
        "optional": false
      },
      {
        "label": "Destination FileName",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "TextFileToPDF",
    "bmdSignature": "BMD_TEXTFILETOPDF('Source FileName 1','Destination FileName')",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Source FileName 1",
        "optional": false
      },
      {
        "label": "Destination FileName",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "UnZipFile",
    "bmdSignature": "BMD_UNZIPFILE('Source FileName','Destination DirectoryName','Pwd (opt)')",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Source FileName",
        "optional": false
      },
      {
        "label": "Destination DirectoryName",
        "optional": false
      },
      {
        "label": "Pwd",
        "optional": true
      }
    ],
    "isMethod": false
  },
  {
    "name": "ZipFile",
    "bmdSignature": "BMD_ZIPFILE('Source DirectoryName','Destination FileName','Pwd (opt)')",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Source DirectoryName",
        "optional": false
      },
      {
        "label": "Destination FileName",
        "optional": false
      },
      {
        "label": "Pwd",
        "optional": true
      }
    ],
    "isMethod": false
  },
  {
    "name": "ModelAssigned",
    "bmdSignature": "BMD_MODELASSIGNED('Classname')",
    "category": "Tools-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Classname",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "CreateMacroQuery",
    "bmdSignature": "BMD_VarMyQuery := MacroObject.CreateMacroQuery('Name')",
    "category": "MacroQuery",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "FindMacroQuery",
    "bmdSignature": "BMD_VarMyQuery := MacroObject.FindMacroQuery('Name')",
    "category": "MacroQuery",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetSQLText",
    "bmdSignature": "BMD_VarMyQuery.GetSQLText()",
    "category": "MacroQuery",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetSQLText",
    "bmdSignature": "BMD_VarMyQuery.SetSQLText('SQL-Text')",
    "category": "MacroQuery",
    "availability": "Tools",
    "parameters": [
      {
        "label": "SQL-Text",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Open",
    "bmdSignature": "BMD_VarMyQuery.Open()",
    "category": "MacroQuery",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Close",
    "bmdSignature": "BMD_VarMyQuery.Close()",
    "category": "MacroQuery",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "First",
    "bmdSignature": "BMD_VarMyQuery.First()",
    "category": "MacroQuery",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Next",
    "bmdSignature": "BMD_VarMyQuery.Next()",
    "category": "MacroQuery",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Prior",
    "bmdSignature": "BMD_VarMyQuery.Prior()",
    "category": "MacroQuery",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Eof",
    "bmdSignature": "BMD_VarMyQuery.Eof()",
    "category": "MacroQuery",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetDisplayText",
    "bmdSignature": "BMD_VarMyQuery.GetDisplayText()",
    "category": "MacroQuery",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "IsActive",
    "bmdSignature": "BMD_VarMyQuery.IsActive()",
    "category": "MacroQuery",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "RecordCount",
    "bmdSignature": "BMD_VarMyQuery.RecordCount()",
    "category": "MacroQuery",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetAsString",
    "bmdSignature": "BMD_VarMyQuery.GetAsString('Name')",
    "category": "MacroQuery",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SQLAddCondition",
    "bmdSignature": "BMD_VarMyQuery.SQLAddCondition('Bedingung')",
    "category": "MacroQuery",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Bedingung",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SQLAddOrder",
    "bmdSignature": "BMD_VarMyQuery.SQLAddOrder('OrderBy-Text')",
    "category": "MacroQuery",
    "availability": "Tools",
    "parameters": [
      {
        "label": "OrderBy-Text",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetParamAsString",
    "bmdSignature": "BMD_VarMyQuery.SetParamAsString('ParamName','ParamValue')",
    "category": "MacroQuery",
    "availability": "Tools",
    "parameters": [
      {
        "label": "ParamName",
        "optional": false
      },
      {
        "label": "ParamValue",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "ExecSQL",
    "bmdSignature": "BMD_VarMyQuery.ExecSQL()",
    "category": "MacroQuery",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Free",
    "bmdSignature": "BMD_VarMyQuery.Free()",
    "category": "MacroQuery",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "CreateMacroModel",
    "bmdSignature": "BMD_VarMyMacroModel := MacroObject.CreateMacroModel('NumberOrCompNameOrClassName')",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [
      {
        "label": "NumberOrCompNameOrClassName",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetModelClassName",
    "bmdSignature": "BMD_ModelClassName := MacroObject.GetModelClassName('Number')",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Number",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetValue",
    "bmdSignature": "BMD_VarMyMacroModel.GetValue('Feldname')",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Feldname",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetValue",
    "bmdSignature": "BMD_VarMyMacroModel.SetValue('Feldname','Wert')",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Feldname",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetPostItText",
    "bmdSignature": "BMD_VarMyMacroModel.GetPostItText()",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetPostItText",
    "bmdSignature": "BMD_VarMyMacroModel.SetPostItText('Text')",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "LockModel",
    "bmdSignature": "BMD_VarMyMacroModel.LockModel()",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "UnlockModel",
    "bmdSignature": "BMD_VarMyMacroModel.UnlockModel()",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetState",
    "bmdSignature": "BMD_VarMyMacroModel.GetState()",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Open",
    "bmdSignature": "BMD_VarMyMacroModel.Open()",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Close",
    "bmdSignature": "BMD_VarMyMacroModel.Close()",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Next",
    "bmdSignature": "BMD_VarMyMacroModel.Next()",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Prior",
    "bmdSignature": "BMD_VarMyMacroModel.Prior()",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "First",
    "bmdSignature": "BMD_VarMyMacroModel.First()",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Eof",
    "bmdSignature": "BMD_VarMyMacroModel.Eof()",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "New",
    "bmdSignature": "BMD_VarMyMacroModel.New()",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Edit",
    "bmdSignature": "BMD_VarMyMacroModel.Edit()",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Save",
    "bmdSignature": "BMD_VarMyMacroModel.Save()",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Delete",
    "bmdSignature": "BMD_VarMyMacroModel.Delete()",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "RefreshRow",
    "bmdSignature": "BMD_VarMyMacroModel.RefreshRow()",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetOldDataValue",
    "bmdSignature": "BMD_VarMyMacroModel.GetOldDataValue('FieldName')",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FieldName",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetUserValue",
    "bmdSignature": "BMD_VarMyMacroModel.GetUserValue('FirmenNr','FieldName')",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FirmenNr",
        "optional": false
      },
      {
        "label": "FieldName",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetModelQuery",
    "bmdSignature": "BMD_VarMyModelQuery := VarMyMacroModel.GetModelQuery()",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetSelectedCount",
    "bmdSignature": "BMD_VarMyMacroModel.GetSelectedCount()",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetSelectedValue",
    "bmdSignature": "BMD_VarMyMacroModel.GetSelectedValue(<Index>,'Feldname')",
    "category": "MacroModel",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      },
      {
        "label": "Feldname",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateMacroCSVFile",
    "bmdSignature": "BMD_VarMyCSVFile := MacroObject.CreateMacroCSVFile('Name')",
    "category": "MacroCSVFile",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Open",
    "bmdSignature": "BMD_VarMyCSVFile.Open()",
    "category": "MacroCSVFile",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Close",
    "bmdSignature": "BMD_VarMyCSVFile.Close()",
    "category": "MacroCSVFile",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Exists",
    "bmdSignature": "BMD_VarMyCSVFile.Exists()",
    "category": "MacroCSVFile",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetNoOfLines",
    "bmdSignature": "BMD_VarMyCSVFile.GetNoOfLines()",
    "category": "MacroCSVFile",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetNoOfCols",
    "bmdSignature": "BMD_VarMyCSVFile.GetNoOfCols()",
    "category": "MacroCSVFile",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetValue",
    "bmdSignature": "BMD_VarMyCSVFile.GetValue('Line','Column')",
    "category": "MacroCSVFile",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Line",
        "optional": false
      },
      {
        "label": "Column",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetSeparator",
    "bmdSignature": "BMD_VarMyCSVFile.SetSeparator('Separator')",
    "category": "MacroCSVFile",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Separator",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetQuoteChar",
    "bmdSignature": "BMD_VarMyCSVFile.SetQuoteChar('QuoteChar')",
    "category": "MacroCSVFile",
    "availability": "Tools",
    "parameters": [
      {
        "label": "QuoteChar",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetCodepage",
    "bmdSignature": "BMD_VarMyCSVFile.SetCodepage('Codepage')",
    "category": "MacroCSVFile",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Codepage",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateMacroFileMgr",
    "bmdSignature": "BMD_VarMyFile := MacroObject.CreateMacroFileMgr('Name')",
    "category": "MacroFileMgr",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "FindFirstFile",
    "bmdSignature": "BMD_VarMyFile.FindFirstFile('d:\\*.*')",
    "category": "MacroFileMgr",
    "availability": "Tools",
    "parameters": [
      {
        "label": "d:\\*.*",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "FindNextFile",
    "bmdSignature": "BMD_VarMyFile.FindNextFile()",
    "category": "MacroFileMgr",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "FileName",
    "bmdSignature": "BMD_VarMyFile.FileName()",
    "category": "MacroFileMgr",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "FileAttributes",
    "bmdSignature": "BMD_VarMyFile.FileAttributes()",
    "category": "MacroFileMgr",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "CreationTime",
    "bmdSignature": "BMD_VarMyFile.CreationTime()",
    "category": "MacroFileMgr",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "LastAccessTime",
    "bmdSignature": "BMD_VarMyFile.LastAccessTime()",
    "category": "MacroFileMgr",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "LastWriteTime",
    "bmdSignature": "BMD_VarMyFile.LastWriteTime()",
    "category": "MacroFileMgr",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "FileSize",
    "bmdSignature": "BMD_VarMyFile.FileSize()",
    "category": "MacroFileMgr",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "CloseFile",
    "bmdSignature": "BMD_VarMyFile.CloseFile()",
    "category": "MacroFileMgr",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "CreateMacroList",
    "bmdSignature": "BMD_VarMacroList := MacroObject.CreateMacroList('Name')",
    "category": "MacroList",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetMacroList",
    "bmdSignature": "BMD_VarMacroList := MacroObject.GetMacroList('Name')",
    "category": "MacroList",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Add",
    "bmdSignature": "BMD_VarMacroList.Add(Item)",
    "category": "MacroList",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Item",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetItem",
    "bmdSignature": "BMD_VarMacroList.GetItem(<Index>)",
    "category": "MacroList",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Delete",
    "bmdSignature": "BMD_VarMacroList.Delete(<Index>)",
    "category": "MacroList",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Count",
    "bmdSignature": "BMD_VarMacroList.Count()",
    "category": "MacroList",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Clear",
    "bmdSignature": "BMD_VarMacroList.Clear()",
    "category": "MacroList",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "IndexOf",
    "bmdSignature": "BMD_VarMacroList.IndexOf(Item)",
    "category": "MacroList",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Item",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateMacroStringList",
    "bmdSignature": "BMD_VarMacroStringList := MacroObject.CreateMacroStringList('Name')",
    "category": "MacroStringList",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Add",
    "bmdSignature": "BMD_VarMacroStringList.Add('Item')",
    "category": "MacroStringList",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Item",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetItem",
    "bmdSignature": "BMD_VarMacroStringList.GetItem(<Index>)",
    "category": "MacroStringList",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetName",
    "bmdSignature": "BMD_VarMacroStringList.GetName(<Index>)",
    "category": "MacroStringList",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetValue",
    "bmdSignature": "BMD_VarMacroStringList.GetValue(<Index>)",
    "category": "MacroStringList",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Delete",
    "bmdSignature": "BMD_VarMacroStringList.Delete(<Index>)",
    "category": "MacroStringList",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Count",
    "bmdSignature": "BMD_VarMacroStringList.Count()",
    "category": "MacroStringList",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Clear",
    "bmdSignature": "BMD_VarMacroStringList.Clear()",
    "category": "MacroStringList",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Sort",
    "bmdSignature": "BMD_VarMacroStringList.Sort()",
    "category": "MacroStringList",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "IndexOf",
    "bmdSignature": "BMD_VarMacroStringList.IndexOf('Item')",
    "category": "MacroStringList",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Item",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "IndexOfName",
    "bmdSignature": "BMD_VarMacroStringList.IndexOfName('Name')",
    "category": "MacroStringList",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "IndexOfValue",
    "bmdSignature": "BMD_VarMacroStringList.IndexOfValue('Value')",
    "category": "MacroStringList",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Value",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetKeyValue",
    "bmdSignature": "BMD_VarMacroStringList.SetKeyValue('Key','Value')",
    "category": "MacroStringList",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Key",
        "optional": false
      },
      {
        "label": "Value",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetKeyValue",
    "bmdSignature": "BMD_VarMacroStringList.GetKeyValue('Key')",
    "category": "MacroStringList",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Key",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetSeparatedText",
    "bmdSignature": "BMD_VarMacroStringList.SetSeparatedText('Text','Separator','QuoteChar (opt)')",
    "category": "MacroStringList",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      },
      {
        "label": "Separator",
        "optional": false
      },
      {
        "label": "QuoteChar",
        "optional": true
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetSeparatedText",
    "bmdSignature": "BMD_VarMacroStringList.GetSeparatedText('Separator','QuoteChar (opt)')",
    "category": "MacroStringList",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Separator",
        "optional": false
      },
      {
        "label": "QuoteChar",
        "optional": true
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateGlobalMacroStringList",
    "bmdSignature": "BMD_VarMyQuery := MacroObject.CreateGlobalMacroStringList('Name')",
    "category": "MacroStringList",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "FindGlobalMacroStringList",
    "bmdSignature": "BMD_VarMyQuery := MacroObject.FindGlobalMacroStringList('Name')",
    "category": "MacroStringList",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateMacroXMLDocument",
    "bmdSignature": "BMD_VarMyXMLDoc := MacroObject.CreateMacroXMLDocument('Name')",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetMacroXMLDocument",
    "bmdSignature": "BMD_VarMyXMLDoc := MacroObject.GetMacroXMLDocument('Name')",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "LoadXMLFile",
    "bmdSignature": "BMD_VarMyXMLDoc.LoadXMLFile('FileName')",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FileName",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "LoadXMLText",
    "bmdSignature": "BMD_VarMyXMLDoc.LoadXMLText('XMLText')",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "XMLText",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SaveXMLFile",
    "bmdSignature": "BMD_VarMyXMLDoc.SaveXMLFile('FileName')",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FileName",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "ValidateXMLFile",
    "bmdSignature": "BMD_VarMyXMLDoc.ValidateXMLFile('FileName')",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FileName",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "ValidateXMLText",
    "bmdSignature": "BMD_VarMyXMLDoc.ValidateXMLText('XMLText')",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "XMLText",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetXMLText",
    "bmdSignature": "BMD_VarMyXMLDoc.GetXMLText()",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "LoadXMLBuffer",
    "bmdSignature": "BMD_VarMyXMLDoc.LoadXMLBuffer('BufferName')",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "BufferName",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SaveXMLBuffer",
    "bmdSignature": "BMD_VarMyXMLDoc.SaveXMLBuffer('BufferName')",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "BufferName",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "ClearXMLBuffer",
    "bmdSignature": "BMD_VarMyXMLDoc.ClearXMLBuffer('BufferName')",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "BufferName",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "DeleteXMLBuffer",
    "bmdSignature": "BMD_VarMyXMLDoc.DeleteXMLBuffer('BufferName')",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "BufferName",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "NewXMLDoc",
    "bmdSignature": "BMD_VarMyXMLDoc.NewXMLDoc('1.0','UTF-8')",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "1.0",
        "optional": false
      },
      {
        "label": "UTF-8",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "AddXMLNode",
    "bmdSignature": "BMD_VarMyNode := BMD_VarMyXMLDoc.AddXMLNode(VarMyParentNode,'NodeName','NodeValue')",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "VarMyParentNode",
        "optional": false
      },
      {
        "label": "NodeName",
        "optional": false
      },
      {
        "label": "NodeValue",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "InsertBeforeXMLNode",
    "bmdSignature": "BMD_VarMyNode := BMD_VarMyXMLDoc.InsertBeforeXMLNode(VarMyNode,'NodeName','NodeValue')",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "VarMyNode",
        "optional": false
      },
      {
        "label": "NodeName",
        "optional": false
      },
      {
        "label": "NodeValue",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "AddXMLAttribute",
    "bmdSignature": "BMD_VarMyNode := BMD_VarMyXMLDoc.AddXMLAttribute(VarMyNode,'AttrName','AttrValue')",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "VarMyNode",
        "optional": false
      },
      {
        "label": "AttrName",
        "optional": false
      },
      {
        "label": "AttrValue",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "RemoveXMLNode",
    "bmdSignature": "BMD_VarMyNode := BMD_VarMyXMLDoc.RemoveXMLNode(VarMyNode)",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "VarMyNode",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFirstXMLNode",
    "bmdSignature": "BMD_VarMyNode := GetFirstXMLNode()",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "GetNextXMLNode",
    "bmdSignature": "BMD_VarMyNode := BMD_VarMyXMLDoc.GetNextXMLNode(VarMyParentNode)",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "VarMyParentNode",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFirstChildXMLNode",
    "bmdSignature": "BMD_VarMyNode := BMD_VarMyXMLDoc.GetFirstChildXMLNode(VarMyParentNode)",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "VarMyParentNode",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetLastChildXMLNode",
    "bmdSignature": "BMD_VarMyNode := BMD_VarMyXMLDoc.GetLastChildXMLNode(VarMyParentNode)",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "VarMyParentNode",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetNextSiblingXMLNode",
    "bmdSignature": "BMD_VarMyNode := BMD_VarMyXMLDoc.GetNextSiblingXMLNode(VarMyNode)",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "VarMyNode",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetPrevSiblingXMLNode",
    "bmdSignature": "BMD_VarMyNode := BMD_VarMyXMLDoc.GetPrevSiblingXMLNode(VarMyNode)",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "VarMyNode",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SearchXMLNode",
    "bmdSignature": "BMD_VarMyNode := BMD_VarMyXMLDoc.SearchXMLNode('NodeName')",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "NodeName",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SearchXMLAttribute",
    "bmdSignature": "BMD_VarMyNode := BMD_VarMyXMLDoc.SearchXMLAttribute('NodeName','AttributeName')",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "NodeName",
        "optional": false
      },
      {
        "label": "AttributeName",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetXMLNameSpace",
    "bmdSignature": "BMD_VarMyNode := BMD_VarMyXMLDoc.SetXMLNameSpace(VarMyNode,'AttrName','AttrValue')",
    "category": "MacroXML",
    "availability": "Tools",
    "parameters": [
      {
        "label": "VarMyNode",
        "optional": false
      },
      {
        "label": "AttrName",
        "optional": false
      },
      {
        "label": "AttrValue",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "NodeName",
    "bmdSignature": "BMD_VarMyNode.NodeName()",
    "category": "MacroXMLNode",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "NodeText",
    "bmdSignature": "BMD_VarMyNode.NodeText()",
    "category": "MacroXMLNode",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "NodeType",
    "bmdSignature": "BMD_VarMyNode.NodeType()",
    "category": "MacroXMLNode",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "NodeXml",
    "bmdSignature": "BMD_VarMyNode.NodeXml()",
    "category": "MacroXMLNode",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "NodeParsed",
    "bmdSignature": "BMD_VarMyNode.NodeParsed()",
    "category": "MacroXMLNode",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "NodeNamespaceURI",
    "bmdSignature": "BMD_VarMyNode.NodeNamespaceURI()",
    "category": "MacroXMLNode",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "NodePrefix",
    "bmdSignature": "BMD_VarMyNode.NodePrefix()",
    "category": "MacroXMLNode",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "NodeAttributesCount",
    "bmdSignature": "BMD_VarMyNode.NodeAttributesCount()",
    "category": "MacroXMLNode",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "NodeAttributeName",
    "bmdSignature": "BMD_VarMyNode.NodeAttributeName(<Index>)",
    "category": "MacroXMLNode",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "NodeAttributeValue",
    "bmdSignature": "BMD_VarMyNode.NodeAttributeValue(<Index>)",
    "category": "MacroXMLNode",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "NodeAttributeValueByName",
    "bmdSignature": "BMD_VarMyNode.NodeAttributeValueByName('Attribute')",
    "category": "MacroXMLNode",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Attribute",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateMacroBarCodeReader",
    "bmdSignature": "BMD_VarMacroBarCodeReader := MacroObject.CreateMacroBarCodeReader('Name')",
    "category": "MacroBarCodeReader",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "ReadFile",
    "bmdSignature": "BMD_VarMacroBarCodeReader.ReadFile('FileName')",
    "category": "MacroBarCodeReader",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FileName",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Count",
    "bmdSignature": "BMD_VarMacroBarCodeReader.Count()",
    "category": "MacroBarCodeReader",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetBarCodeText",
    "bmdSignature": "BMD_VarMacroBarCodeReader.GetBarCodeText(<Index>)",
    "category": "MacroBarCodeReader",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateMacroExcelReader",
    "bmdSignature": "BMD_VarMacroExcelReader := MacroObject.CreateMacroExcelReader()",
    "category": "MacroExcelReader",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Open",
    "bmdSignature": "BMD_VarMacroExcelReader.Open('FileName')",
    "category": "MacroExcelReader",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FileName",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SheetCount",
    "bmdSignature": "BMD_VarMacroExcelReader.SheetCount()",
    "category": "MacroExcelReader",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "ActivateSheetByName",
    "bmdSignature": "BMD_VarMacroExcelReader.ActivateSheetByName('Worksheet')",
    "category": "MacroExcelReader",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Worksheet",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "ActivateSheetByIndex",
    "bmdSignature": "BMD_VarMacroExcelReader.ActivateSheetByIndex(<Index>)",
    "category": "MacroExcelReader",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "ActiveSheet",
    "bmdSignature": "BMD_VarMacroExcelReader.ActiveSheet()",
    "category": "MacroExcelReader",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetValueByName",
    "bmdSignature": "BMD_VarMacroExcelReader.GetValueByName('Cell','ResultOnError')",
    "category": "MacroExcelReader",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Cell",
        "optional": false
      },
      {
        "label": "ResultOnError",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetValueByCoords",
    "bmdSignature": "BMD_VarMacroExcelReader.GetValueByCoords(<Column>,<Row>,'ResultOnError')",
    "category": "MacroExcelReader",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Column",
        "optional": false
      },
      {
        "label": "Row",
        "optional": false
      },
      {
        "label": "ResultOnError",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateMacroApiCall",
    "bmdSignature": "BMD_VarMacroApiCall := MacroObject.CreateMacroApiCall()",
    "category": "MacroApiCall",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetRequestHeader",
    "bmdSignature": "BMD_VarMacroApiCall.SetRequestHeader('Name','Value')",
    "category": "MacroApiCall",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      },
      {
        "label": "Value",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "ClearRequestBody",
    "bmdSignature": "BMD_VarMacroApiCall.ClearRequestBody()",
    "category": "MacroApiCall",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "AddRequestBody",
    "bmdSignature": "BMD_VarMacroApiCall.AddRequestBody('Data','Content-Type')",
    "category": "MacroApiCall",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Data",
        "optional": false
      },
      {
        "label": "Content-Type",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetResponseBody",
    "bmdSignature": "BMD_VarMacroApiCall.GetResponseBody(<Position>)",
    "category": "MacroApiCall",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Position",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetResponseFile",
    "bmdSignature": "BMD_VarMacroApiCall.SetResponseFile('Dateinamen')",
    "category": "MacroApiCall",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Dateinamen",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetResponseHeaders",
    "bmdSignature": "BMD_VarMacroResponsHeaderStringList := VarMyMacroModel.GetResponseHeaders()",
    "category": "MacroApiCall",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetCredentials",
    "bmdSignature": "BMD_VarMacroApiCall.SetCredentials('Benutzername','Passwort')",
    "category": "MacroApiCall",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Benutzername",
        "optional": false
      },
      {
        "label": "Passwort",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetProxy",
    "bmdSignature": "BMD_VarMacroApiCall.SetProxy('Proxy','Benutzername','Passwort')",
    "category": "MacroApiCall",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Proxy",
        "optional": false
      },
      {
        "label": "Benutzername",
        "optional": false
      },
      {
        "label": "Passwort",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "EnableLog",
    "bmdSignature": "BMD_VarMacroApiCall.EnableLog(<Value>)",
    "category": "MacroApiCall",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Value",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "DoCall",
    "bmdSignature": "\"BMD_VarMacroApiCall.DoCall('Methode \"\"GET\"\", \"\"POST\"\", ...','URL')\"",
    "category": "MacroApiCall",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Methode GET",
        "optional": false
      },
      {
        "label": "POST",
        "optional": false
      },
      {
        "label": "...",
        "optional": false
      },
      {
        "label": "URL",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateMacroJsonVal",
    "bmdSignature": "BMD_VarMacroJsonVal := MacroObject.CreateMacroJsonVal()",
    "category": "MacroJsonVal",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "ParseJson",
    "bmdSignature": "BMD_VarMacroJsonVal.ParseJson('Value')",
    "category": "MacroJsonVal",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Value",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetValueAsString",
    "bmdSignature": "BMD_VarMacroJsonVal.GetValueAsString('Path')",
    "category": "MacroJsonVal",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Path",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "JsonEncode",
    "bmdSignature": "BMD_VarMacroJsonVal.JsonEncode('Value')",
    "category": "MacroJsonVal",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Value",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "KeyExists",
    "bmdSignature": "BMD_VarMacroJsonVal.KeyExists('Path')",
    "category": "MacroJsonVal",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Path",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetCount",
    "bmdSignature": "BMD_VarMacroJsonVal.GetCount('Path')",
    "category": "MacroJsonVal",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Path",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "ExecRegExpr",
    "bmdSignature": "BMD_EXECREGEXPR('RegExpr','InputString')",
    "category": "Reguläre Ausdrücke",
    "availability": "Tools",
    "parameters": [
      {
        "label": "RegExpr",
        "optional": false
      },
      {
        "label": "InputString",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "RegExprGetAllResultsWithSubs",
    "bmdSignature": "BMD_REGEXPRGETALLRESULTSWITHSUBS('RegExpr','InputString','NotFound')",
    "category": "Reguläre Ausdrücke",
    "availability": "Tools",
    "parameters": [
      {
        "label": "RegExpr",
        "optional": false
      },
      {
        "label": "InputString",
        "optional": false
      },
      {
        "label": "NotFound",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "RegExprGetAllResults",
    "bmdSignature": "BMD_REGEXPRGETALLRESULTS('RegExpr','InputString',<ResultNo>)",
    "category": "Reguläre Ausdrücke",
    "availability": "Tools",
    "parameters": [
      {
        "label": "RegExpr",
        "optional": false
      },
      {
        "label": "InputString",
        "optional": false
      },
      {
        "label": "ResultNo",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "ReplaceRegExpr",
    "bmdSignature": "BMD_REPLACEREGEXPR('RegExpr','InputString','ReplaceString',<UseSubstituion>)",
    "category": "Reguläre Ausdrücke",
    "availability": "Tools",
    "parameters": [
      {
        "label": "RegExpr",
        "optional": false
      },
      {
        "label": "InputString",
        "optional": false
      },
      {
        "label": "ReplaceString",
        "optional": false
      },
      {
        "label": "UseSubstituion",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "SplitRegExpr",
    "bmdSignature": "BMD_SPLITREGEXPR('RegExpr','InputString','Pieces')",
    "category": "Reguläre Ausdrücke",
    "availability": "Tools",
    "parameters": [
      {
        "label": "RegExpr",
        "optional": false
      },
      {
        "label": "InputString",
        "optional": false
      },
      {
        "label": "Pieces",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "SendMail",
    "bmdSignature": "BMD_SENDMAIL('An','CC','Betreff','E-Mail-Text',<Absender-Account (opt)>)",
    "category": "Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "An",
        "optional": false
      },
      {
        "label": "CC",
        "optional": false
      },
      {
        "label": "Betreff",
        "optional": false
      },
      {
        "label": "E-Mail-Text",
        "optional": false
      },
      {
        "label": "Absender-Account",
        "optional": true
      }
    ],
    "isMethod": false
  },
  {
    "name": "SendMail_Ext",
    "bmdSignature": "BMD_SENDMAIL_EXT('An','CC','Betreff','E-Mail-Text','Attachment_Filename','Silent',<Absender-Account (opt)>)",
    "category": "Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "An",
        "optional": false
      },
      {
        "label": "CC",
        "optional": false
      },
      {
        "label": "Betreff",
        "optional": false
      },
      {
        "label": "E-Mail-Text",
        "optional": false
      },
      {
        "label": "Attachment_Filename",
        "optional": false
      },
      {
        "label": "Silent",
        "optional": false
      },
      {
        "label": "Absender-Account",
        "optional": true
      }
    ],
    "isMethod": false
  },
  {
    "name": "SendSMS",
    "bmdSignature": "BMD_SENDSMS('TelNo','SMSText')",
    "category": "Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "TelNo",
        "optional": false
      },
      {
        "label": "SMSText",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "ShowMessage",
    "bmdSignature": "BMD_SHOWMESSAGE('Text')",
    "category": "Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "SendToClipboard",
    "bmdSignature": "BMD_SENDTOCLIPBOARD('Text')",
    "category": "Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "SendToClipboardFormatted",
    "bmdSignature": "BMD_SENDTOCLIPBOARDFORMATTED('Text',<Format>)",
    "category": "Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      },
      {
        "label": "Format",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "IsCurrUserInGroup",
    "bmdSignature": "BMD_ISCURRUSERINGROUP('Gruppe')",
    "category": "Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Gruppe",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "IsCurrUserInDOG",
    "bmdSignature": "BMD_ISCURRUSERINDOG('Gruppe')",
    "category": "Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Gruppe",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "CreateAbsenceMgr",
    "bmdSignature": "BMD_Absence := CRMMacroObject.CreateAbsenceMgr('Eindeutige AbwesenheitObj-ID')",
    "category": "Abwesenheit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Eindeutige AbwesenheitObj-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "New",
    "bmdSignature": "BMD_Absence.New(<Firmen-Nr.>,'Mitarb-ID',<Stellvertretungs-Firmen-Nr.>,'Stellvertretung Mitarb-ID','Von-Datum','Bis-Datum','Abwesenheitstext')",
    "category": "Abwesenheit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firmen-Nr.",
        "optional": false
      },
      {
        "label": "Mitarb-ID",
        "optional": false
      },
      {
        "label": "Stellvertretungs-Firmen-Nr.",
        "optional": false
      },
      {
        "label": "Stellvertretung Mitarb-ID",
        "optional": false
      },
      {
        "label": "Von-Datum",
        "optional": false
      },
      {
        "label": "Bis-Datum",
        "optional": false
      },
      {
        "label": "Abwesenheitstext",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetDeputy",
    "bmdSignature": "BMD_Absence.GetDeputy(Ergebnislistenobjekt,<Firmen-Nr.>,'Mitarb-ID')",
    "category": "Abwesenheit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Ergebnislistenobjekt",
        "optional": false
      },
      {
        "label": "Firmen-Nr.",
        "optional": false
      },
      {
        "label": "Mitarb-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateTaskMgr",
    "bmdSignature": "BMD_Task := CRMMacroObject.CreateTaskMgr('Name')",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "New",
    "bmdSignature": "BMD_Task.New()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Load",
    "bmdSignature": "BMD_Task.Load(<Aufgabe-Nummer>)",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Aufgabe-Nummer",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Save",
    "bmdSignature": "BMD_Task.Save()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SaveNoMail",
    "bmdSignature": "BMD_Task.SaveNoMail()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Finish",
    "bmdSignature": "BMD_Task.Finish(<Aufgabe-Nummer>,<Workflowstatus>,'Workflownotiz')",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Aufgabe-Nummer",
        "optional": false
      },
      {
        "label": "Workflowstatus",
        "optional": false
      },
      {
        "label": "Workflownotiz",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetNr",
    "bmdSignature": "BMD_Task.GetNr()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetCaption",
    "bmdSignature": "BMD_Task.GetCaption()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetCaption",
    "bmdSignature": "BMD_Task.SetCaption('Betreff')",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Betreff",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetText",
    "bmdSignature": "BMD_Task.GetText()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetText",
    "bmdSignature": "BMD_Task.SetText('Text')",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "AddTextHtml",
    "bmdSignature": "BMD_Task.AddTextHtml('Text mit HTML-Formatierung',<Einfügen, Anhängen>)",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text mit HTML-Formatierung",
        "optional": false
      },
      {
        "label": "Einfügen",
        "optional": false
      },
      {
        "label": "Anhängen",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetTextHtml",
    "bmdSignature": "BMD_Task.GetTextHtml()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetTextHtml",
    "bmdSignature": "BMD_Task.SetTextHtml('Text')",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetEmployeeCompanyNo",
    "bmdSignature": "BMD_Task.GetEmployeeCompanyNo()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetEmployeeID",
    "bmdSignature": "BMD_Task.GetEmployeeID()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetEmployee",
    "bmdSignature": "BMD_Task.SetEmployee(<Firmen-Nr.>,'Mitarb-ID')",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firmen-Nr.",
        "optional": false
      },
      {
        "label": "Mitarb-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetUserID",
    "bmdSignature": "BMD_Task.GetUserID()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetUserID",
    "bmdSignature": "BMD_Task.SetUserID('User-ID')",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "User-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetResponsibleCompanyNo",
    "bmdSignature": "BMD_Task.GetResponsibleCompanyNo()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetResponsibleID",
    "bmdSignature": "BMD_Task.GetResponsibleID()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetResponsible",
    "bmdSignature": "BMD_Task.SetResponsible(<Firmen-Nr.>,'Mitarb-ID')",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firmen-Nr.",
        "optional": false
      },
      {
        "label": "Mitarb-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetPersonCompanyNo",
    "bmdSignature": "BMD_Task.GetPersonCompanyNo()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetPersonID",
    "bmdSignature": "BMD_Task.GetPersonID()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetPerson",
    "bmdSignature": "BMD_Task.SetPerson(<Firmen-Nr.>,'Person ID')",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firmen-Nr.",
        "optional": false
      },
      {
        "label": "Person ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "AddNotification",
    "bmdSignature": "BMD_Task.AddNotification(<Firmen-Nr.>,'Mitarb-ID')",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firmen-Nr.",
        "optional": false
      },
      {
        "label": "Mitarb-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetStartDate",
    "bmdSignature": "BMD_Task.GetStartDate()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetStartDate",
    "bmdSignature": "BMD_Task.SetStartDate(<Datum>)",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetDueDate",
    "bmdSignature": "BMD_Task.GetDueDate()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetDueDate",
    "bmdSignature": "BMD_Task.SetDueDate(<Datum>)",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetMainCategory",
    "bmdSignature": "BMD_Task.GetMainCategory()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetMainCategory",
    "bmdSignature": "BMD_Task.SetMainCategory(<Hauptkategorie>)",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Hauptkategorie",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetSubCategory",
    "bmdSignature": "BMD_Task.GetSubCategory()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetSubCategory",
    "bmdSignature": "BMD_Task.SetSubCategory(<Unterkategorie>)",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Unterkategorie",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetPriority",
    "bmdSignature": "BMD_Task.GetPriority()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetPriority",
    "bmdSignature": "BMD_Task.SetPriority(<Priorität>)",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Priorität",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetColorCode",
    "bmdSignature": "BMD_Task.GetColorCode()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetColorCode",
    "bmdSignature": "BMD_Task.SetColorCode(<Farbcode>)",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Farbcode",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetProjectComp",
    "bmdSignature": "BMD_Task.GetProjectComp()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetProjectNo",
    "bmdSignature": "BMD_Task.GetProjectNo()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetProjectType",
    "bmdSignature": "BMD_Task.GetProjectType()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetProject",
    "bmdSignature": "BMD_Task.SetProject(<ProjektFirma>,<Projektnummer>,<Projekttyp>)",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "ProjektFirma",
        "optional": false
      },
      {
        "label": "Projektnummer",
        "optional": false
      },
      {
        "label": "Projekttyp",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetInstitutionNo",
    "bmdSignature": "BMD_Task.GetInstitutionNo()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetInstitutionCountry",
    "bmdSignature": "BMD_Task.GetInstitutionCountry()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetInstitutionType",
    "bmdSignature": "BMD_Task.GetInstitutionType()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetInstitution",
    "bmdSignature": "BMD_Task.SetInstitution(<Institutionsnummer>,<Institutionsland>,'Art der Institution (FM=Firma, FA=Finanzamt ....')",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Institutionsnummer",
        "optional": false
      },
      {
        "label": "Institutionsland",
        "optional": false
      },
      {
        "label": "Art der Institution (FM=Firma",
        "optional": false
      },
      {
        "label": "FA=Finanzamt ....",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "AddDocument",
    "bmdSignature": "BMD_Task.AddDocument(<Aufgabennummer>,<Archiv-Nr.>,<Dokumenten-Nr.>)",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Aufgabennummer",
        "optional": false
      },
      {
        "label": "Archiv-Nr.",
        "optional": false
      },
      {
        "label": "Dokumenten-Nr.",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetShowDog",
    "bmdSignature": "BMD_Task.GetShowDog()",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetShowDog",
    "bmdSignature": "BMD_Task.SetShowDog('Datenbesitzer Ansehen')",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datenbesitzer Ansehen",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFreeField",
    "bmdSignature": "BMD_Task.GetFreeField(<Freifeldnummer>)",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Freifeldnummer",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetFreeField",
    "bmdSignature": "BMD_Task.SetFreeField(<Freifeldnummer>,'Feldwert')",
    "category": "Aufgabe",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Freifeldnummer",
        "optional": false
      },
      {
        "label": "Feldwert",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateWorkflowToolMgr",
    "bmdSignature": "BMD_Workflow := CRMMacroObject.CreateWorkflowToolMgr('Eindeutige CRMWorkflowToolObj-ID')",
    "category": "CRM Workflow",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Eindeutige CRMWorkflowToolObj-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SearchWorkflow",
    "bmdSignature": "BMD_Workflow.SearchWorkflow(<Workflowtyp>,'Instanzparameter (durch Strichpunkt getrennt)')",
    "category": "CRM Workflow",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Workflowtyp",
        "optional": false
      },
      {
        "label": "Instanzparameter (durch Strichpunkt getrennt)",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "NewInstance",
    "bmdSignature": "BMD_Workflow.NewInstance(<Workflow-ID>,'Instanzparameter (durch Strichpunkt getrennt)')",
    "category": "CRM Workflow",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Workflow-ID",
        "optional": false
      },
      {
        "label": "Instanzparameter (durch Strichpunkt getrennt)",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "LoadWorkflowInstance",
    "bmdSignature": "BMD_Workflow.LoadWorkflowInstance(<Diagramm-Nr>,<Instanz-Nr>)",
    "category": "CRM Workflow",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Diagramm-Nr",
        "optional": false
      },
      {
        "label": "Instanz-Nr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetFreifeld",
    "bmdSignature": "BMD_Workflow.SetFreifeld('STP_FREIFELD01','Feldwert')",
    "category": "CRM Workflow",
    "availability": "Tools",
    "parameters": [
      {
        "label": "STP_FREIFELD01",
        "optional": false
      },
      {
        "label": "Feldwert",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "UpdateInstanzInfo",
    "bmdSignature": "BMD_Workflow.UpdateInstanzInfo()",
    "category": "CRM Workflow",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetValueInstanzinfo",
    "bmdSignature": "BMD_Workflow.GetValueInstanzinfo('STP_FREIFELD01')",
    "category": "CRM Workflow",
    "availability": "Tools",
    "parameters": [
      {
        "label": "STP_FREIFELD01",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateZustaendigkeitMgr",
    "bmdSignature": "BMD_Zustaendigkeit := CRMMacroObject.CreateZustaendigkeitMgr('Name')",
    "category": "Zuständigkeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetMitarbeiter",
    "bmdSignature": "BMD_Zustaendigkeit.GetMitarbeiter(<Bereich>,<Firmen-Nr.>,'Personen-ID des Kunden',<ProjektFirma>,<Projektnummer>)",
    "category": "Zuständigkeit",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Bereich",
        "optional": false
      },
      {
        "label": "Firmen-Nr.",
        "optional": false
      },
      {
        "label": "Personen-ID des Kunden",
        "optional": false
      },
      {
        "label": "ProjektFirma",
        "optional": false
      },
      {
        "label": "Projektnummer",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateDokumentMgr",
    "bmdSignature": "BMD_DMS := CRMMacroObject.CreateDokumentMgr('Eindeutige Dokumenttool-Object-ID')",
    "category": "DMS",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Eindeutige Dokumenttool-Object-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "AddDocRelation",
    "bmdSignature": "BMD_DMS.AddDocRelation(<Archiv-Nr.>,<Dokumenten-Nr.>,<Kategorie>,<DKZ-ID>)",
    "category": "DMS",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Archiv-Nr.",
        "optional": false
      },
      {
        "label": "Dokumenten-Nr.",
        "optional": false
      },
      {
        "label": "Kategorie",
        "optional": false
      },
      {
        "label": "DKZ-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetCategoryByTableName",
    "bmdSignature": "BMD_DMS.GetCategoryByTableName('Tabellenname')",
    "category": "DMS",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Tabellenname",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "ExportDocument",
    "bmdSignature": "BMD_DMS.ExportDocument(<Archiv-Nr.>,<Dokumenten-Nr.>,'Export-Verzeichnis',<Exportformat>,<Versionsnummer>)",
    "category": "DMS",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Archiv-Nr.",
        "optional": false
      },
      {
        "label": "Dokumenten-Nr.",
        "optional": false
      },
      {
        "label": "Export-Verzeichnis",
        "optional": false
      },
      {
        "label": "Exportformat",
        "optional": false
      },
      {
        "label": "Versionsnummer",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "AssignDocumentToPerson",
    "bmdSignature": "BMD_DMS.AssignDocumentToPerson(<Von Archiv-Nr.>,<Von Dokumenten-Nr.>,<Personenfirma>,'PersonenID','Kategorie',<Projekt-Firma>,<ProjektNr>)",
    "category": "DMS",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Von Archiv-Nr.",
        "optional": false
      },
      {
        "label": "Von Dokumenten-Nr.",
        "optional": false
      },
      {
        "label": "Personenfirma",
        "optional": false
      },
      {
        "label": "PersonenID",
        "optional": false
      },
      {
        "label": "Kategorie",
        "optional": false
      },
      {
        "label": "Projekt-Firma",
        "optional": false
      },
      {
        "label": "ProjektNr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "AssignDocumentToArchive",
    "bmdSignature": "BMD_DMS.AssignDocumentToArchive(<Von Archiv-Nr.>,<Von Dokumenten-Nr.>,<Auf Archiv-Nr.>,<Personenfirma>,'PersonenID','Kategorie',<Projekt-Firma>,<ProjektNr>)",
    "category": "DMS",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Von Archiv-Nr.",
        "optional": false
      },
      {
        "label": "Von Dokumenten-Nr.",
        "optional": false
      },
      {
        "label": "Auf Archiv-Nr.",
        "optional": false
      },
      {
        "label": "Personenfirma",
        "optional": false
      },
      {
        "label": "PersonenID",
        "optional": false
      },
      {
        "label": "Kategorie",
        "optional": false
      },
      {
        "label": "Projekt-Firma",
        "optional": false
      },
      {
        "label": "ProjektNr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "MoveDocToArchive",
    "bmdSignature": "BMD_DMS.MoveDocToArchive(<Von Archiv-Nr.>,<Von Dokumenten-Nr.>,<Auf Archiv-Nr.>,<Personenfirma>,'PersonenID','Kategorie')",
    "category": "DMS",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Von Archiv-Nr.",
        "optional": false
      },
      {
        "label": "Von Dokumenten-Nr.",
        "optional": false
      },
      {
        "label": "Auf Archiv-Nr.",
        "optional": false
      },
      {
        "label": "Personenfirma",
        "optional": false
      },
      {
        "label": "PersonenID",
        "optional": false
      },
      {
        "label": "Kategorie",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetTextFromDocument",
    "bmdSignature": "BMD_DMS.GetTextFromDocument(<Archiv-Nr.>,<Dokumenten-Nr.>)",
    "category": "DMS",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Archiv-Nr.",
        "optional": false
      },
      {
        "label": "Dokumenten-Nr.",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetSummaryToDoc",
    "bmdSignature": "BMD_DMS.SetSummaryToDoc(<Archiv-Nr.>,<Dokumenten-Nr.>,'Zusammenfassung')",
    "category": "DMS",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Archiv-Nr.",
        "optional": false
      },
      {
        "label": "Dokumenten-Nr.",
        "optional": false
      },
      {
        "label": "Zusammenfassung",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateFristMgr",
    "bmdSignature": "BMD_Frist := CRMMacroObject.CreateFristMgr('Name')",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "New",
    "bmdSignature": "BMD_Frist.New()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Load",
    "bmdSignature": "BMD_Frist.Load(<FristNr>)",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FristNr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "LoadWithoutDog",
    "bmdSignature": "BMD_Frist.LoadWithoutDog(<FristNr>)",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FristNr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Save",
    "bmdSignature": "BMD_Frist.Save()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SaveNoMail",
    "bmdSignature": "BMD_Frist.SaveNoMail()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "ErledigenHintergrund",
    "bmdSignature": "BMD_Frist.ErledigenHintergrund(<FristNr>,<Verteilte Fristen erledigen?>,<Firma (Erledigtstatus)>,<Erledigtstatus>)",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FristNr",
        "optional": false
      },
      {
        "label": "Verteilte Fristen erledigen?",
        "optional": false
      },
      {
        "label": "Firma (Erledigtstatus)",
        "optional": false
      },
      {
        "label": "Erledigtstatus",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetNr",
    "bmdSignature": "BMD_Frist.GetNr()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetCaption",
    "bmdSignature": "BMD_Frist.GetCaption()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetCaption",
    "bmdSignature": "BMD_Frist.SetCaption('Betreff')",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Betreff",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetText",
    "bmdSignature": "BMD_Frist.GetText()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetText",
    "bmdSignature": "BMD_Frist.SetText('Text')",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetEmployeeCompanyNo",
    "bmdSignature": "BMD_Frist.GetEmployeeCompanyNo()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetEmployeeID",
    "bmdSignature": "BMD_Frist.GetEmployeeID()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetEmployee",
    "bmdSignature": "BMD_Frist.SetEmployee(<Firmen-Nr.>,'Mitarb-ID')",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firmen-Nr.",
        "optional": false
      },
      {
        "label": "Mitarb-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetResponsibleCompanyNo",
    "bmdSignature": "BMD_Frist.GetResponsibleCompanyNo()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetResponsibleID",
    "bmdSignature": "BMD_Frist.GetResponsibleID()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetResponsible",
    "bmdSignature": "BMD_Frist.SetResponsible(<Firmen-Nr.>,'Mitarb-ID')",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firmen-Nr.",
        "optional": false
      },
      {
        "label": "Mitarb-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetPersonCompanyNo",
    "bmdSignature": "BMD_Frist.GetPersonCompanyNo()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetPersonID",
    "bmdSignature": "BMD_Frist.GetPersonID()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetPerson",
    "bmdSignature": "BMD_Frist.SetPerson(<Firmen-Nr.>,'Person ID')",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firmen-Nr.",
        "optional": false
      },
      {
        "label": "Person ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFristart",
    "bmdSignature": "BMD_Frist.GetFristart()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFristart",
    "bmdSignature": "BMD_Frist.SetFristart('Fristart')",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Fristart",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFristDatum",
    "bmdSignature": "BMD_Frist.GetFristDatum()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFristDatum",
    "bmdSignature": "BMD_Frist.SetFristDatum('Datum')",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFristBeginn",
    "bmdSignature": "BMD_Frist.GetFristBeginn()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFristBeginn",
    "bmdSignature": "BMD_Frist.SetFristBeginn('Datum')",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetVorwarndatum",
    "bmdSignature": "BMD_Frist.GetVorwarndatum()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetVorwarndatum",
    "bmdSignature": "BMD_Frist.SetVorwarndatum('Datum')",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetProjectComp",
    "bmdSignature": "BMD_Frist.GetProjectComp()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetProjectNo",
    "bmdSignature": "BMD_Frist.GetProjectNo()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetProjectType",
    "bmdSignature": "BMD_Frist.GetProjectType()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetProject",
    "bmdSignature": "BMD_Frist.SetProject(<ProjektFirma>,<Projektnummer>,<Projekttyp>)",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [
      {
        "label": "ProjektFirma",
        "optional": false
      },
      {
        "label": "Projektnummer",
        "optional": false
      },
      {
        "label": "Projekttyp",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetInstitutionNo",
    "bmdSignature": "BMD_Frist.GetInstitutionNo()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetInstitutionCountry",
    "bmdSignature": "BMD_Frist.GetInstitutionCountry()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetInstitutionType",
    "bmdSignature": "BMD_Frist.GetInstitutionType()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetInstitution",
    "bmdSignature": "BMD_Frist.SetInstitution(<Institutionsnummer>,<Institutionsland>,'Art der Institution (FM=Firma, FA=Finanzamt ....')",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Institutionsnummer",
        "optional": false
      },
      {
        "label": "Institutionsland",
        "optional": false
      },
      {
        "label": "Art der Institution (FM=Firma",
        "optional": false
      },
      {
        "label": "FA=Finanzamt ....",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetKontaktpersonCompanyNo",
    "bmdSignature": "BMD_Frist.GetKontaktpersonCompanyNo()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetKontaktpersonID",
    "bmdSignature": "BMD_Frist.GetKontaktpersonID()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetKontaktperson",
    "bmdSignature": "BMD_Frist.SetKontaktperson(<Firmen-Nr.>,'Person ID')",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firmen-Nr.",
        "optional": false
      },
      {
        "label": "Person ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFreifeld01",
    "bmdSignature": "BMD_Frist.GetFreifeld01()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFreifeld01",
    "bmdSignature": "BMD_Frist.SetFreifeld01('Datum')",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFreifeld07",
    "bmdSignature": "BMD_Frist.GetFreifeld07()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFreifeld07",
    "bmdSignature": "BMD_Frist.SetFreifeld07(<Zahl>)",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Zahl",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetJahr",
    "bmdSignature": "BMD_Frist.GetJahr()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetJahr",
    "bmdSignature": "BMD_Frist.SetJahr(<Jahr>)",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Jahr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetShowDog",
    "bmdSignature": "BMD_Frist.GetShowDog()",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetShowDog",
    "bmdSignature": "BMD_Frist.SetShowDog('Datenbesitzer Ansehen')",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datenbesitzer Ansehen",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "AddDocument",
    "bmdSignature": "BMD_Frist.AddDocument(<FristNr>,<Archiv-Nr.>,<Dokumenten-Nr.>)",
    "category": "Frist",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FristNr",
        "optional": false
      },
      {
        "label": "Archiv-Nr.",
        "optional": false
      },
      {
        "label": "Dokumenten-Nr.",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateTerminMgr",
    "bmdSignature": "BMD_Termin := CRMMacroObject.CreateTerminMgr('Name')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "New",
    "bmdSignature": "BMD_Termin.New()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Load",
    "bmdSignature": "BMD_Termin.Load(<Terminnr>)",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Terminnr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Save",
    "bmdSignature": "BMD_Termin.Save()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SaveNoMail",
    "bmdSignature": "BMD_Termin.SaveNoMail()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetNr",
    "bmdSignature": "BMD_Termin.GetNr()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetVon",
    "bmdSignature": "BMD_Termin.GetVon()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetVon",
    "bmdSignature": "BMD_Termin.SetVon('Letzter Aktivierungszeitpunkt des Protokolls')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Letzter Aktivierungszeitpunkt des Protokolls",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetBis",
    "bmdSignature": "BMD_Termin.GetBis()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetBis",
    "bmdSignature": "BMD_Termin.SetBis('Zeitpunkt der Deaktivierung des Protokolls')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Zeitpunkt der Deaktivierung des Protokolls",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetCaption",
    "bmdSignature": "BMD_Termin.GetCaption()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetCaption",
    "bmdSignature": "BMD_Termin.SetCaption('Betreff')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Betreff",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetText",
    "bmdSignature": "BMD_Termin.GetText()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetText",
    "bmdSignature": "BMD_Termin.SetText('Text')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "AddTextHtml",
    "bmdSignature": "BMD_Termin.AddTextHtml('Text mit HTML-Formatierung',<Einfügen, Anhängen>)",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text mit HTML-Formatierung",
        "optional": false
      },
      {
        "label": "Einfügen",
        "optional": false
      },
      {
        "label": "Anhängen",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetTextHtml",
    "bmdSignature": "BMD_Termin.GetTextHtml()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetTextHtml",
    "bmdSignature": "BMD_Termin.SetTextHtml('Text')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetEmployeeCompanyNo",
    "bmdSignature": "BMD_Termin.GetEmployeeCompanyNo()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetEmployeeID",
    "bmdSignature": "BMD_Termin.GetEmployeeID()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetEmployee",
    "bmdSignature": "BMD_Termin.SetEmployee(<Firmen-Nr.>,'Mitarb-ID')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firmen-Nr.",
        "optional": false
      },
      {
        "label": "Mitarb-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetPersonCompanyNo",
    "bmdSignature": "BMD_Termin.GetPersonCompanyNo()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetPersonID",
    "bmdSignature": "BMD_Termin.GetPersonID()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetPerson",
    "bmdSignature": "BMD_Termin.SetPerson(<Firmen-Nr.>,'Person ID')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firmen-Nr.",
        "optional": false
      },
      {
        "label": "Person ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetTerminKz",
    "bmdSignature": "BMD_Termin.GetTerminKz()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetTerminKz",
    "bmdSignature": "BMD_Termin.SetTerminKz('Termin-Kz')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Termin-Kz",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetProjectComp",
    "bmdSignature": "BMD_Termin.GetProjectComp()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetProjectNo",
    "bmdSignature": "BMD_Termin.GetProjectNo()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetProjectType",
    "bmdSignature": "BMD_Termin.GetProjectType()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetProject",
    "bmdSignature": "BMD_Termin.SetProject(<ProjektFirma>,<Projektnummer>,<Projekttyp>)",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "ProjektFirma",
        "optional": false
      },
      {
        "label": "Projektnummer",
        "optional": false
      },
      {
        "label": "Projekttyp",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetTerminOrt",
    "bmdSignature": "BMD_Termin.GetTerminOrt()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetTerminOrt",
    "bmdSignature": "BMD_Termin.SetTerminOrt('Terminort')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Terminort",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFreifeld01",
    "bmdSignature": "BMD_Termin.GetFreifeld01()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFreifeld01",
    "bmdSignature": "BMD_Termin.SetFreifeld01(<Freifeld 01>)",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Freifeld 01",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFreifeld02",
    "bmdSignature": "BMD_Termin.GetFreifeld01()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFreifeld02",
    "bmdSignature": "BMD_Termin.SetFreifeld02('Freifeld 02')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Freifeld 02",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFreifeld03",
    "bmdSignature": "BMD_Termin.GetFreifeld03()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFreifeld03",
    "bmdSignature": "BMD_Termin.SetFreifeld03(<Freifeld 03>)",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Freifeld 03",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFreifeld04",
    "bmdSignature": "BMD_Termin.GetFreifeld04()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFreifeld04",
    "bmdSignature": "BMD_Termin.SetFreifeld04(<Freifeld 04>)",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Freifeld 04",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFreifeld05",
    "bmdSignature": "BMD_Termin.GetFreifeld05()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFreifeld05",
    "bmdSignature": "BMD_Termin.SetFreifeld05('Freifeld 05')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Freifeld 05",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFreifeld06",
    "bmdSignature": "BMD_Termin.GetFreifeld06()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFreifeld06",
    "bmdSignature": "BMD_Termin.SetFreifeld06('Freifeld 06')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Freifeld 06",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFreifeld07",
    "bmdSignature": "BMD_Termin.GetFreifeld07()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFreifeld07",
    "bmdSignature": "BMD_Termin.SetFreifeld07('Freifeld 07')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Freifeld 07",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFreifeld08",
    "bmdSignature": "BMD_Termin.GetFreifeld08()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFreifeld08",
    "bmdSignature": "BMD_Termin.SetFreifeld08('Freifeld 08')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Freifeld 08",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFreifeld09",
    "bmdSignature": "BMD_Termin.GetFreifeld09()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFreifeld09",
    "bmdSignature": "BMD_Termin.SetFreifeld09('Freifeld 09')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Freifeld 09",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFreifeld10",
    "bmdSignature": "BMD_Termin.GetFreifeld10()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFreifeld10",
    "bmdSignature": "BMD_Termin.SetFreifeld10('Freifeld 10')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Freifeld 10",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFreifeld11",
    "bmdSignature": "BMD_Termin.GetFreifeld11()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFreifeld11",
    "bmdSignature": "BMD_Termin.SetFreifeld11('Freifeld 11')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Freifeld 11",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFreifeld12",
    "bmdSignature": "BMD_Termin.GetFreifeld12()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFreifeld12",
    "bmdSignature": "BMD_Termin.SetFreifeld12(<Freifeld 12>)",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Freifeld 12",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFreifeld13",
    "bmdSignature": "BMD_Termin.GetFreifeld13()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFreifeld13",
    "bmdSignature": "BMD_Termin.SetFreifeld13(<Freifeld 13>)",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Freifeld 13",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFreifeld14",
    "bmdSignature": "BMD_Termin.GetFreifeld14()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFreifeld14",
    "bmdSignature": "BMD_Termin.SetFreifeld14(<Freifeld 14>)",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Freifeld 14",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFreifeld15",
    "bmdSignature": "BMD_Termin.GetFreifeld15()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFreifeld15",
    "bmdSignature": "BMD_Termin.SetFreifeld15(<Freifeld 15>)",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Freifeld 15",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFreifeld16",
    "bmdSignature": "BMD_Termin.GetFreifeld16()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFreifeld16",
    "bmdSignature": "BMD_Termin.SetFreifeld16(<Freifeld 16>)",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Freifeld 16",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFreifeld17",
    "bmdSignature": "BMD_Termin.GetFreifeld17()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFreifeld17",
    "bmdSignature": "BMD_Termin.SetFreifeld17(<Freifeld 17>)",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Freifeld 17",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetFreifeld18",
    "bmdSignature": "BMD_Termin.GetFreifeld18()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetFreifeld18",
    "bmdSignature": "BMD_Termin.SetFreifeld18('Freifeld 18')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Freifeld 18",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetShowDog",
    "bmdSignature": "BMD_Termin.GetShowDog()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetShowDog",
    "bmdSignature": "BMD_Termin.SetShowDog('Datenbesitzer Ansehen')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datenbesitzer Ansehen",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetEditDog",
    "bmdSignature": "BMD_Termin.GetEditDog()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetEditDog",
    "bmdSignature": "BMD_Termin.SetEditDog('Datenbesitzer Bearbeiten')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datenbesitzer Bearbeiten",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "AddEmployee",
    "bmdSignature": "BMD_Termin.AddEmployee(<Firmen-Nr.>,'Mitarb-ID')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firmen-Nr.",
        "optional": false
      },
      {
        "label": "Mitarb-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetPpsKapaId",
    "bmdSignature": "BMD_Termin.GetPpsKapaId()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetPpsKapaId",
    "bmdSignature": "BMD_Termin.SetPpsKapaId(<Vorgang>)",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Vorgang",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetErzeugtVonPps",
    "bmdSignature": "BMD_Termin.GetErzeugtVonPps()",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetErzeugtVonPps",
    "bmdSignature": "BMD_Termin.SetErzeugtVonPps(<Erzeugt von PPS>)",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Erzeugt von PPS",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "AddReminder",
    "bmdSignature": "BMD_Termin.AddReminder(<Vorwarnzeitart>,<Vorwarnzeit>,<Wecker>,<E-Mail>,<SMS>,'Text',<Erinnerung an>,'E-Mail-Adresse','Telefonnummer')",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Vorwarnzeitart",
        "optional": false
      },
      {
        "label": "Vorwarnzeit",
        "optional": false
      },
      {
        "label": "Wecker",
        "optional": false
      },
      {
        "label": "E-Mail",
        "optional": false
      },
      {
        "label": "SMS",
        "optional": false
      },
      {
        "label": "Text",
        "optional": false
      },
      {
        "label": "Erinnerung an",
        "optional": false
      },
      {
        "label": "E-Mail-Adresse",
        "optional": false
      },
      {
        "label": "Telefonnummer",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "DeleteReminder",
    "bmdSignature": "BMD_Termin.DeleteReminder(<Erinnerungsnummer>)",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Erinnerungsnummer",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "DeleteAllReminder",
    "bmdSignature": "BMD_Termin.DeleteAllReminder(<Termin-Nr.>)",
    "category": "Termin",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Termin-Nr.",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "NewGui",
    "bmdSignature": "BMD_Lead.NewGui('Betreff',<Mitarbeiterfirmen-Nr.>,'Mitarb-ID',<Personen-Firmen-Nr>,'Person ID',<Kontaktperson FirmenNr>,'Kontaktperson-ID',<Angebotswert>,'Währungscode',<Wahrscheinlichkeit>)",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Betreff",
        "optional": false
      },
      {
        "label": "Mitarbeiterfirmen-Nr.",
        "optional": false
      },
      {
        "label": "Mitarb-ID",
        "optional": false
      },
      {
        "label": "Personen-Firmen-Nr",
        "optional": false
      },
      {
        "label": "Person ID",
        "optional": false
      },
      {
        "label": "Kontaktperson FirmenNr",
        "optional": false
      },
      {
        "label": "Kontaktperson-ID",
        "optional": false
      },
      {
        "label": "Angebotswert",
        "optional": false
      },
      {
        "label": "Währungscode",
        "optional": false
      },
      {
        "label": "Wahrscheinlichkeit",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateLeadMgr",
    "bmdSignature": "BMD_Lead := CRMMacroObject.CreateLeadMgr('Name')",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "New",
    "bmdSignature": "BMD_Lead.New()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Load",
    "bmdSignature": "BMD_Lead.Load(<FirmenNr>,<Lead-Nr.>)",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FirmenNr",
        "optional": false
      },
      {
        "label": "Lead-Nr.",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Save",
    "bmdSignature": "BMD_Lead.Save()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetNr",
    "bmdSignature": "BMD_Lead.GetNr()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetCompanyNo",
    "bmdSignature": "BMD_Lead.GetCompanyNo()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetCaption",
    "bmdSignature": "BMD_Lead.GetCaption()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetCaption",
    "bmdSignature": "BMD_Lead.SetCaption('Betreff')",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Betreff",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetEmployeeCompanyNo",
    "bmdSignature": "BMD_Lead.GetEmployeeCompanyNo()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetEmployeeID",
    "bmdSignature": "BMD_Lead.GetEmployeeID()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetEmployee",
    "bmdSignature": "BMD_Lead.SetEmployee(<Firmen-Nr.>,'Mitarb-ID')",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firmen-Nr.",
        "optional": false
      },
      {
        "label": "Mitarb-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetPersonCompanyNo",
    "bmdSignature": "BMD_Lead.GetPersonCompanyNo()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetPersonID",
    "bmdSignature": "BMD_Lead.GetPersonID()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetPerson",
    "bmdSignature": "BMD_Lead.SetPerson(<Firmen-Nr.>,'Person ID')",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firmen-Nr.",
        "optional": false
      },
      {
        "label": "Person ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetKontaktpersonCompanyNo",
    "bmdSignature": "BMD_Lead.GetKontaktpersonCompanyNo()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetKontaktpersonID",
    "bmdSignature": "BMD_Lead.GetKontaktpersonID()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetKontaktperson",
    "bmdSignature": "BMD_Lead.SetKontaktperson(<Firmen-Nr.>,'Person ID')",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firmen-Nr.",
        "optional": false
      },
      {
        "label": "Person ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetEntscheiderCompanyNo",
    "bmdSignature": "BMD_Lead.GetEntscheiderCompanyNo()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetEntscheiderID",
    "bmdSignature": "BMD_Lead.GetEntscheiderID()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetEntscheiderPerson",
    "bmdSignature": "BMD_Lead.SetEntscheiderPerson(<Firmen-Nr.>,'Person ID')",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firmen-Nr.",
        "optional": false
      },
      {
        "label": "Person ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetProjectComp",
    "bmdSignature": "BMD_Lead.GetProjectComp()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetProjectNo",
    "bmdSignature": "BMD_Lead.GetProjectNo()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetProjectType",
    "bmdSignature": "BMD_Lead.GetProjectType()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetProject",
    "bmdSignature": "BMD_Lead.SetProject(<ProjektFirma>,<Projektnummer>,<Projekttyp>)",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [
      {
        "label": "ProjektFirma",
        "optional": false
      },
      {
        "label": "Projektnummer",
        "optional": false
      },
      {
        "label": "Projekttyp",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetPipelineId",
    "bmdSignature": "BMD_Lead.GetPipelineId()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetPipelineId",
    "bmdSignature": "BMD_Lead.SetPipelineId(<Pipeline-ID>)",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Pipeline-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetPipelineNr",
    "bmdSignature": "BMD_Lead.GetPipelineNr()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetPipelineNr",
    "bmdSignature": "BMD_Lead.SetPipelineNr(<Nr.>)",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Nr.",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetStufe",
    "bmdSignature": "BMD_Lead.GetStufe()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetStufe",
    "bmdSignature": "BMD_Lead.SetStufe(<Stufen-Id>)",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Stufen-Id",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetStatus",
    "bmdSignature": "BMD_Lead.GetStatus()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetStatus",
    "bmdSignature": "BMD_Lead.SetStatus(<Status>)",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Status",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetLeadTypeCompanyNo",
    "bmdSignature": "BMD_Lead.GetLeadTypeCompanyNo()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetLeadTypeNo",
    "bmdSignature": "BMD_Lead.GetLeadTypeNo()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetLeadType",
    "bmdSignature": "BMD_Lead.SetLeadType(<FirmenNr>,<Typ-Nr>)",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FirmenNr",
        "optional": false
      },
      {
        "label": "Typ-Nr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetWaehrungscode",
    "bmdSignature": "BMD_Lead.GetWaehrungscode()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetWaehrungscode",
    "bmdSignature": "BMD_Lead.SetWaehrungscode('Währungscode')",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Währungscode",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetAngebotswert",
    "bmdSignature": "BMD_Lead.GetAngebotswert()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetAngebotswert",
    "bmdSignature": "BMD_Lead.SetAngebotswert(<Angebotswert>)",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Angebotswert",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetWahrscheinlichkeit",
    "bmdSignature": "BMD_Lead.GetWahrscheinlichkeit()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetWahrscheinlichkeit",
    "bmdSignature": "BMD_Lead.SetWahrscheinlichkeit(<Wahrscheinlichkeit>)",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Wahrscheinlichkeit",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetAbschlussTermin",
    "bmdSignature": "BMD_Lead.GetAbschlussTermin()",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetAbschlussTermin",
    "bmdSignature": "BMD_Lead.SetAbschlussTermin(<Datum>)",
    "category": "Lead",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GenerateElsterTaxNumber",
    "bmdSignature": "BMD_GenerateElsterTaxNumber('Finanzamt-Nr','Steuernummer')",
    "category": "Sonderfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Finanzamt-Nr",
        "optional": false
      },
      {
        "label": "Steuernummer",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "SetValueByName",
    "bmdSignature": "BMD_Obj.SetValueByName('Name','Wert')",
    "category": "WwsPpsModel",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetValueById",
    "bmdSignature": "BMD_Obj.SetValueById('ID','Wert')",
    "category": "WwsPpsModel",
    "availability": "Tools",
    "parameters": [
      {
        "label": "ID",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetValueByName",
    "bmdSignature": "BMD_Obj.GetValueByName('ID')",
    "category": "WwsPpsModel",
    "availability": "Tools",
    "parameters": [
      {
        "label": "ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetValueById",
    "bmdSignature": "BMD_Obj.GetValueById('ID')",
    "category": "WwsPpsModel",
    "availability": "Tools",
    "parameters": [
      {
        "label": "ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "DsLoadEmpty",
    "bmdSignature": "BMD_Obj.DsLoadEmpty()",
    "category": "WwsPpsModel",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetModelQuery",
    "bmdSignature": "BMD_Obj.GetModelQuery()",
    "category": "WwsPpsModel",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "IncludeOptMdUsage",
    "bmdSignature": "BMD_Obj.IncludeOptMdUsage('Wert')",
    "category": "PepModel",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetModelQuery",
    "bmdSignature": "BMD_Obj.GetModelQuery()",
    "category": "PepModel",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "DsDispatch",
    "bmdSignature": "BMD_Obj.DsDispatch('Params')",
    "category": "Vorgang",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Params",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateWwsPpsSpecialMacroModel",
    "bmdSignature": "BMD_Obj := WwsPpsMacroClasses.CreateWwsPpsSpecialMacroModel('ID')",
    "category": "WwsPpsMacroClasses",
    "availability": "Tools",
    "parameters": [
      {
        "label": "ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateWwsPpsMacroModel",
    "bmdSignature": "BMD_Obj := WwsPpsMacroClasses.CreateWwsPpsMacroModel('ID')",
    "category": "WwsPpsMacroClasses",
    "availability": "Tools",
    "parameters": [
      {
        "label": "ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateWwsPpsMacroModel2",
    "bmdSignature": "BMD_Obj := WwsPpsMacroClasses.CreateWwsPpsMacroModel2(Model)",
    "category": "WwsPpsMacroClasses",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Model",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreatePepMacroModel",
    "bmdSignature": "BMD_Obj := WwsPpsMacroClasses.CreatePepMacroModel('ID')",
    "category": "WwsPpsMacroClasses",
    "availability": "Tools",
    "parameters": [
      {
        "label": "ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreatePepMacroModel2",
    "bmdSignature": "BMD_Obj := WwsPpsMacroClasses.CreatePepMacroModel2(Model)",
    "category": "WwsPpsMacroClasses",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Model",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateVorgang",
    "bmdSignature": "BMD_Obj := WwsPpsMacroClasses.CreateVorgang('ID')",
    "category": "WwsPpsMacroClasses",
    "availability": "Tools",
    "parameters": [
      {
        "label": "ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateVorgang2",
    "bmdSignature": "BMD_Obj := WwsPpsMacroClasses.CreateVorgang2(Model)",
    "category": "WwsPpsMacroClasses",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Model",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateJsonVal",
    "bmdSignature": "BMD_Obj := WwsPpsMacroClasses.CreateJsonVal()",
    "category": "WwsPpsMacroClasses",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "CreateApiCall",
    "bmdSignature": "BMD_Obj := WwsPpsMacroClasses.CreateApiCall()",
    "category": "WwsPpsMacroClasses",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "ClearKeys",
    "bmdSignature": "BMD_Obj.ClearKeys()",
    "category": "MaterialConsumption",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetStockKey",
    "bmdSignature": "BMD_Obj.SetStockKey(<Firma (Lager)>,<Lager-Nr.>,'Lagerplatz')",
    "category": "MaterialConsumption",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firma (Lager)",
        "optional": false
      },
      {
        "label": "Lager-Nr.",
        "optional": false
      },
      {
        "label": "Lagerplatz",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetAccountingText",
    "bmdSignature": "BMD_Obj.SetAccountingText('Buchungstext')",
    "category": "MaterialConsumption",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Buchungstext",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetArticleColorKey",
    "bmdSignature": "BMD_Obj.SetArticleColorKey(<Firma (Farbe)>,<Farbe>)",
    "category": "MaterialConsumption",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firma (Farbe)",
        "optional": false
      },
      {
        "label": "Farbe",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetArticleSizeKey",
    "bmdSignature": "BMD_Obj.SetArticleSizeKey(<Firma (Größe)>,'Größe')",
    "category": "MaterialConsumption",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firma (Größe)",
        "optional": false
      },
      {
        "label": "Größe",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetArticleProcessKey",
    "bmdSignature": "BMD_Obj.SetArticleProcessKey(<Firma (Prozess)>,'ProzessID')",
    "category": "MaterialConsumption",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firma (Prozess)",
        "optional": false
      },
      {
        "label": "ProzessID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetArticleQStatus",
    "bmdSignature": "BMD_Obj.SetArticleQStatus(<Firma (Q.Status)>,<Q.Status>)",
    "category": "MaterialConsumption",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firma (Q.Status)",
        "optional": false
      },
      {
        "label": "Q.Status",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetArticleAttributes",
    "bmdSignature": "BMD_Obj.SetArticleAttributes('Merkmal 1','Merkmal 2')",
    "category": "MaterialConsumption",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Merkmal 1",
        "optional": false
      },
      {
        "label": "Merkmal 2",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetArticleIdentification",
    "bmdSignature": "BMD_Obj.SetArticleIdentification(<Firma (Farbe)>,<Farbe>,<Firma (Größe)>,'Größe',<Firma (Prozess)>,'ProzessID',<Firma (Q.Status)>,<Q.Status>,'Merkmal 1','Merkmal 2')",
    "category": "MaterialConsumption",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firma (Farbe)",
        "optional": false
      },
      {
        "label": "Farbe",
        "optional": false
      },
      {
        "label": "Firma (Größe)",
        "optional": false
      },
      {
        "label": "Größe",
        "optional": false
      },
      {
        "label": "Firma (Prozess)",
        "optional": false
      },
      {
        "label": "ProzessID",
        "optional": false
      },
      {
        "label": "Firma (Q.Status)",
        "optional": false
      },
      {
        "label": "Q.Status",
        "optional": false
      },
      {
        "label": "Merkmal 1",
        "optional": false
      },
      {
        "label": "Merkmal 2",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetLotKey",
    "bmdSignature": "BMD_Obj.SetLotKey(<Firma (CHG)>,'Chargen-Nr.')",
    "category": "MaterialConsumption",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firma (CHG)",
        "optional": false
      },
      {
        "label": "Chargen-Nr.",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetSerialKey",
    "bmdSignature": "BMD_Obj.SetSerialKey(<Firma (SNR)>,'Serien-Nr.')",
    "category": "MaterialConsumption",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firma (SNR)",
        "optional": false
      },
      {
        "label": "Serien-Nr.",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetSSCC",
    "bmdSignature": "BMD_Obj.SetSSCC('SSCC')",
    "category": "MaterialConsumption",
    "availability": "Tools",
    "parameters": [
      {
        "label": "SSCC",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetAssembleUser",
    "bmdSignature": "BMD_Obj.SetAssembleUser('Vorbereiter')",
    "category": "MaterialConsumption",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Vorbereiter",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetAssembleDate",
    "bmdSignature": "BMD_Obj.SetAssembleDate(<Vorbereitungszeitpunkt>)",
    "category": "MaterialConsumption",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Vorbereitungszeitpunkt",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetPreparationUser",
    "bmdSignature": "BMD_Obj.SetPreparationUser('Verarbeiter')",
    "category": "MaterialConsumption",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Verarbeiter",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetPreparationDate",
    "bmdSignature": "BMD_Obj.SetPreparationDate(<Verarbeitungsdatum>)",
    "category": "MaterialConsumption",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Verarbeitungsdatum",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "RecordMaterialConsumption",
    "bmdSignature": "BMD_Obj.RecordMaterialConsumption(<Firma>,<Firma (Artikel)>,'Artikel',<P.-Los-ID>,<Menge>,'Mengeneinheit')",
    "category": "MaterialConsumption",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firma",
        "optional": false
      },
      {
        "label": "Firma (Artikel)",
        "optional": false
      },
      {
        "label": "Artikel",
        "optional": false
      },
      {
        "label": "P.-Los-ID",
        "optional": false
      },
      {
        "label": "Menge",
        "optional": false
      },
      {
        "label": "Mengeneinheit",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetLastRecordedPieceListId",
    "bmdSignature": "BMD_Obj.GetLastRecordedPieceListId()",
    "category": "MaterialConsumption",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "CreateMaterialConsumption",
    "bmdSignature": "BMD_Obj := WwsPpsMacroClasses.CreateMaterialConsumption()",
    "category": "MaterialConsumption",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetCompanyNo",
    "bmdSignature": "BMD_Obj.SetCompanyNo(<FirmenNr>)",
    "category": "WWSParamMD",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FirmenNr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Invoice_OnlineInvoiceHU_AccToBranch",
    "bmdSignature": "BMD_Obj.Invoice_OnlineInvoiceHU_AccToBranch()",
    "category": "WWSParamMD",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "CreateWWSParamMD",
    "bmdSignature": "BMD_Obj := WwsPpsMacroClasses.CreateWWSParamMD()",
    "category": "WWSParamMD",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetKeyValues",
    "bmdSignature": "BMD_Obj.SetKeyValues(<FirmenNr>,<FIBU-Nr>,'Erfass-Nr')",
    "category": "WWSIncomingInvoiceMD",
    "availability": "Tools",
    "parameters": [
      {
        "label": "FirmenNr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Erfass-Nr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetValue",
    "bmdSignature": "BMD_Obj.GetValue('Feldname')",
    "category": "WWSIncomingInvoiceMD",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Feldname",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateWWSIncomingInvoiceMD",
    "bmdSignature": "BMD_Obj := WwsPpsMacroClasses.CreateWWSIncomingInvoiceMD()",
    "category": "WWSIncomingInvoiceMD",
    "availability": "Tools",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Starte Ausdruck-Bindung",
    "bmdSignature": "BMD_START_REPORT_MERGE()",
    "category": "Sonderfunktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Beende Ausdrucksbindung",
    "bmdSignature": "BMD_FINISH_REPORT_MERGE()",
    "category": "Sonderfunktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "OS-Druck",
    "bmdSignature": "BMD_OS_PRINT('zu druckende Datei','Drucker-Name')",
    "category": "Sonderfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "zu druckende Datei",
        "optional": false
      },
      {
        "label": "Drucker-Name",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Fenster drucken",
    "bmdSignature": "BMD_FORM_PRINT()",
    "category": "Sonderfunktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Fenster-Bildschirmkopie erstellen",
    "bmdSignature": "BMD_FORM_SNAP()",
    "category": "Sonderfunktionen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Exec-Process",
    "bmdSignature": "BMD_EXEC_PROCESS('Prozess','Parameter',<Sichtbar>)",
    "category": "Sonderfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Prozess",
        "optional": false
      },
      {
        "label": "Parameter",
        "optional": false
      },
      {
        "label": "Sichtbar",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Dyn.Parameterwert anhängen",
    "bmdSignature": "BMD_PARAMLIST_APPEND('Parameter-Liste','Wert-Name','Wert')",
    "category": "Merker",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Parameter-Liste",
        "optional": false
      },
      {
        "label": "Wert-Name",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Dyn.Parameterwert auslesen",
    "bmdSignature": "BMD_PARAMLIST_GET('Parameter-Liste','Wert-Name','Standard-Wert')",
    "category": "Merker",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Parameter-Liste",
        "optional": false
      },
      {
        "label": "Wert-Name",
        "optional": false
      },
      {
        "label": "Standard-Wert",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Entscheidungsbox",
    "bmdSignature": "BMD_DECIDING_BOX('Frage','Fenstertitel','Alternative1,Alternative2,...',<Aktive Schaltfläche>)",
    "category": "Abfragen/Dialoge",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Frage",
        "optional": false
      },
      {
        "label": "Fenstertitel",
        "optional": false
      },
      {
        "label": "Alternative1",
        "optional": false
      },
      {
        "label": "Alternative2",
        "optional": false
      },
      {
        "label": "...",
        "optional": false
      },
      {
        "label": "Aktive Schaltfläche",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Fortschrittsanzeige-Init",
    "bmdSignature": "BMD_PROGRESSDISPLAY_INIT(<Startwert>,<Endwert>)",
    "category": "Abfragen/Dialoge",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Startwert",
        "optional": false
      },
      {
        "label": "Endwert",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Fortschrittsanzeige",
    "bmdSignature": "BMD_PROGRESSDISPLAY_UP_DATE('Text',<Zähler>)",
    "category": "Abfragen/Dialoge",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      },
      {
        "label": "Zähler",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Fortschrittsanzeige-Ende",
    "bmdSignature": "BMD_PROGRESSDISPLAY_END()",
    "category": "Abfragen/Dialoge",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Fortschrittsanzeige-Abbruchprüfung",
    "bmdSignature": "BMD_PROGRESSDISPLAY_CHECKABORTED()",
    "category": "Abfragen/Dialoge",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "P.-Los erzeugen",
    "bmdSignature": "\"BMD_PLC_INSERT(<Firma>,'Artikel',<Menge>,'Mengeneinheit',<Lager-Nr.>,'Lagerplatz','Erf.-Kennz.',<Erf.-Nr.>,<ErfPos(WWS)>,<Erf.Det.(WWS)>,'Zusatzdaten (;-getrennt)')\"",
    "category": "P.-Lose",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firma",
        "optional": false
      },
      {
        "label": "Artikel",
        "optional": false
      },
      {
        "label": "Menge",
        "optional": false
      },
      {
        "label": "Mengeneinheit",
        "optional": false
      },
      {
        "label": "Lager-Nr.",
        "optional": false
      },
      {
        "label": "Lagerplatz",
        "optional": false
      },
      {
        "label": "Erf.-Kennz.",
        "optional": false
      },
      {
        "label": "Erf.-Nr.",
        "optional": false
      },
      {
        "label": "ErfPos(WWS)",
        "optional": false
      },
      {
        "label": "Erf.Det.(WWS)",
        "optional": false
      },
      {
        "label": "Zusatzdaten (;-getrennt)",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "P.-Los(e) planen",
    "bmdSignature": "BMD_PLC_PLAN(<Firma>,'P.-Los-IDs',<Planungs-Referenzdatum>,<Kapazität planen>,<Splittung durchführen>)",
    "category": "P.-Lose",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firma",
        "optional": false
      },
      {
        "label": "P.-Los-IDs",
        "optional": false
      },
      {
        "label": "Planungs-Referenzdatum",
        "optional": false
      },
      {
        "label": "Kapazität planen",
        "optional": false
      },
      {
        "label": "Splittung durchführen",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Chargen-Mischfunktion",
    "bmdSignature": "BMD_PLC_MIX(<Firma>,<Lager-Nr.>,'Lagerplatz','Artikel','Mengeneinheit')",
    "category": "P.-Lose",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firma",
        "optional": false
      },
      {
        "label": "Lager-Nr.",
        "optional": false
      },
      {
        "label": "Lagerplatz",
        "optional": false
      },
      {
        "label": "Artikel",
        "optional": false
      },
      {
        "label": "Mengeneinheit",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Chargen-Mischfunktion (erweitert)",
    "bmdSignature": "BMD_PLC_MIX_EXT(<Firma>,<Lager-Nr.>,'Lagerplatz','Artikel','Mengeneinheit',<Q.Status>)",
    "category": "P.-Lose",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firma",
        "optional": false
      },
      {
        "label": "Lager-Nr.",
        "optional": false
      },
      {
        "label": "Lagerplatz",
        "optional": false
      },
      {
        "label": "Artikel",
        "optional": false
      },
      {
        "label": "Mengeneinheit",
        "optional": false
      },
      {
        "label": "Q.Status",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "P.-Los(e) Statusänderung",
    "bmdSignature": "BMD_PLC_STATUSCHANGE(<Firma>,'Erf.-Kennz.',<Erf.-Nr.>,<ErfPos(WWS)>,<Erf.Det.(WWS)>,<Status>)",
    "category": "P.-Lose",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firma",
        "optional": false
      },
      {
        "label": "Erf.-Kennz.",
        "optional": false
      },
      {
        "label": "Erf.-Nr.",
        "optional": false
      },
      {
        "label": "ErfPos(WWS)",
        "optional": false
      },
      {
        "label": "Erf.Det.(WWS)",
        "optional": false
      },
      {
        "label": "Status",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Rückmelden",
    "bmdSignature": "BMD_EPS_MATRM_WITH_ASK_DETAIL('Eps-Id',<Menge>,'Mengeneinheit')",
    "category": "P.-Lose",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Eps-Id",
        "optional": false
      },
      {
        "label": "Menge",
        "optional": false
      },
      {
        "label": "Mengeneinheit",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Materialeinsatz f. P.-Los hinzufügen",
    "bmdSignature": "BMD_EPS_INSERT(<Firma>,'Artikel','P.-Los-ID',<Menge>,'Mengeneinheit',<Lager-Nr.>,'Lagerplatz','Chargen-Nr.','SerienNr.')",
    "category": "P.-Lose",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firma",
        "optional": false
      },
      {
        "label": "Artikel",
        "optional": false
      },
      {
        "label": "P.-Los-ID",
        "optional": false
      },
      {
        "label": "Menge",
        "optional": false
      },
      {
        "label": "Mengeneinheit",
        "optional": false
      },
      {
        "label": "Lager-Nr.",
        "optional": false
      },
      {
        "label": "Lagerplatz",
        "optional": false
      },
      {
        "label": "Chargen-Nr.",
        "optional": false
      },
      {
        "label": "SerienNr.",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Materialeinsatz f. P.-Los hinzufügen (erweitert)",
    "bmdSignature": "BMD_EPS_INSERT_EXT(<Firma>,<Firma (Artikel)>,'Artikel',<P.-Los-ID>,<Menge>,'Mengeneinheit',<Firma (Lager)>,<Lager-Nr.>,'Lagerplatz',<Firma (CHG)>,'Chargen-Nr.',<Firma (Farbe)>,<Farbe>,<Firma (Größe)>,'Größe')",
    "category": "P.-Lose",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firma",
        "optional": false
      },
      {
        "label": "Firma (Artikel)",
        "optional": false
      },
      {
        "label": "Artikel",
        "optional": false
      },
      {
        "label": "P.-Los-ID",
        "optional": false
      },
      {
        "label": "Menge",
        "optional": false
      },
      {
        "label": "Mengeneinheit",
        "optional": false
      },
      {
        "label": "Firma (Lager)",
        "optional": false
      },
      {
        "label": "Lager-Nr.",
        "optional": false
      },
      {
        "label": "Lagerplatz",
        "optional": false
      },
      {
        "label": "Firma (CHG)",
        "optional": false
      },
      {
        "label": "Chargen-Nr.",
        "optional": false
      },
      {
        "label": "Firma (Farbe)",
        "optional": false
      },
      {
        "label": "Farbe",
        "optional": false
      },
      {
        "label": "Firma (Größe)",
        "optional": false
      },
      {
        "label": "Größe",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Produkt f. P.-Los hinzufügen",
    "bmdSignature": "\"BMD_PCP_INSERT(<Firma>,'Artikel','P.-Los-ID',<Menge>,'Mengeneinheit',<Lager-Nr.>,'Lagerplatz','Chargen-Nr.','Zusatzdaten (;-getrennt)')\"",
    "category": "P.-Lose",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firma",
        "optional": false
      },
      {
        "label": "Artikel",
        "optional": false
      },
      {
        "label": "P.-Los-ID",
        "optional": false
      },
      {
        "label": "Menge",
        "optional": false
      },
      {
        "label": "Mengeneinheit",
        "optional": false
      },
      {
        "label": "Lager-Nr.",
        "optional": false
      },
      {
        "label": "Lagerplatz",
        "optional": false
      },
      {
        "label": "Chargen-Nr.",
        "optional": false
      },
      {
        "label": "Zusatzdaten (;-getrennt)",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Aktualisieren-MAZ-Auto-Termine-Aufgaben",
    "bmdSignature": "BMD_AKT_MAZ_AUTO_TERMINE_AUFGABEN(<VG-ID>)",
    "category": "Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "VG-ID",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Generiere-WE",
    "bmdSignature": "BMD_GENERIERE_WE(<TBMDGenerateEeFromWeRecord>)",
    "category": "Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "TBMDGenerateEeFromWeRecord",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Vg-Lea-Aufrollung",
    "bmdSignature": "BMD_PEP_VG_LEA_AUFROLLEN(MacroStringList)",
    "category": "Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "MacroStringList",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Benachrichtigung",
    "bmdSignature": "BMD_PEP_FIRE_VOB(<VG-ID>,'Ben-ID','Information','E-Mail-Adresse',<Sofort versenden>)",
    "category": "Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "VG-ID",
        "optional": false
      },
      {
        "label": "Ben-ID",
        "optional": false
      },
      {
        "label": "Information",
        "optional": false
      },
      {
        "label": "E-Mail-Adresse",
        "optional": false
      },
      {
        "label": "Sofort versenden",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "StartIdleFunction",
    "bmdSignature": "BMD_PEP_START_IDLE_FUNCTION('Funktionskonstante','Parameter')",
    "category": "Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Funktionskonstante",
        "optional": false
      },
      {
        "label": "Parameter",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "StartAsyncFunction",
    "bmdSignature": "BMD_PEP_START_ASYNC_FUNCTION('Funktionskonstante','Parameter')",
    "category": "Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Funktionskonstante",
        "optional": false
      },
      {
        "label": "Parameter",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Rtf-Text-Erzeugen",
    "bmdSignature": "BMD_PEP_CREATE_RFT_BLOB('Text')",
    "category": "Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Rtf-Text-Erweitern",
    "bmdSignature": "BMD_PEP_APPEND_RFT_BLOB(<Rtf-Text-Id>,'Text')",
    "category": "Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Rtf-Text-Id",
        "optional": false
      },
      {
        "label": "Text",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Rtf-Text-Erweitern-Html",
    "bmdSignature": "BMD_PEP_APPEND_RFT_BLOB_HTML(<Rtf-Text-Id>,'HTML')",
    "category": "Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Rtf-Text-Id",
        "optional": false
      },
      {
        "label": "HTML",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Rtf-Text-Importieren",
    "bmdSignature": "BMD_PEP_IMPORT_RFT_BLOB('RTF-Datei')",
    "category": "Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "RTF-Datei",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Blob-Als-HTML-Auslesen",
    "bmdSignature": "BMD_PEP_GET_HTML_FROM_BLOB(<Blob-Id>,<Modus>)",
    "category": "Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Blob-Id",
        "optional": false
      },
      {
        "label": "Modus",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Rtf-Blob-Löschen",
    "bmdSignature": "BMD_PEP_DELETE_BLOB(<Blob-Id>)",
    "category": "Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Blob-Id",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Checkliste synchronisieren",
    "bmdSignature": "BMD_PEP_SYNC_CHECKLIST(<Checklisten-ID>,<Vorlage-Id>)",
    "category": "Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Checklisten-ID",
        "optional": false
      },
      {
        "label": "Vorlage-Id",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "PepLockModelExt",
    "bmdSignature": "BMD_PEP_LOCK_MODEL_EXT(<MacroModel>)",
    "category": "Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "MacroModel",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "PepUnlockModelExt",
    "bmdSignature": "BMD_PEP_UNLOCK_MODEL_EXT(<MacroModel>)",
    "category": "Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "MacroModel",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "PepAddUserMessage",
    "bmdSignature": "BMD_PEP_ADDUSERMESSAGE('Nachricht')",
    "category": "Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Nachricht",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Lagerdaten laden",
    "bmdSignature": "BMD_LOAD_STOCKDATA('Mengenart',<Hauptfirma>,<Lager-Nr.>,'Lagerplatz','Artikel','Chargen-Nr.','AID-Parameter',<mit Artikel>,<mit Chargen>,<mit Artikelmerkmalen>)",
    "category": "Lager",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Mengenart",
        "optional": false
      },
      {
        "label": "Hauptfirma",
        "optional": false
      },
      {
        "label": "Lager-Nr.",
        "optional": false
      },
      {
        "label": "Lagerplatz",
        "optional": false
      },
      {
        "label": "Artikel",
        "optional": false
      },
      {
        "label": "Chargen-Nr.",
        "optional": false
      },
      {
        "label": "AID-Parameter",
        "optional": false
      },
      {
        "label": "mit Artikel",
        "optional": false
      },
      {
        "label": "mit Chargen",
        "optional": false
      },
      {
        "label": "mit Artikelmerkmalen",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Anzahl geladener Daten",
    "bmdSignature": "BMD_GET_STOCKDATA_COUNT()",
    "category": "Lager",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "geladene Lagerdaten holen",
    "bmdSignature": "BMD_GET_STOCKDATA(<Index>)",
    "category": "Lager",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Geplantes Service ermitteln",
    "bmdSignature": "BMD_HAS_SERVICEDATA(<Hauptfirma>,'Artikel',<Serien-Nr.-ID>,<Bis-Servicedatum>)",
    "category": "Lager",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Hauptfirma",
        "optional": false
      },
      {
        "label": "Artikel",
        "optional": false
      },
      {
        "label": "Serien-Nr.-ID",
        "optional": false
      },
      {
        "label": "Bis-Servicedatum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Nächstes geplantes Servicedatum ermitteln",
    "bmdSignature": "BMD_NEXT_SERVICEDATUM(<Hauptfirma>,'Artikel',<Serien-Nr.-ID>,<Maßnahmen-ID>,<Bis-Servicedatum>)",
    "category": "Lager",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Hauptfirma",
        "optional": false
      },
      {
        "label": "Artikel",
        "optional": false
      },
      {
        "label": "Serien-Nr.-ID",
        "optional": false
      },
      {
        "label": "Maßnahmen-ID",
        "optional": false
      },
      {
        "label": "Bis-Servicedatum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "GetValueByName",
    "bmdSignature": "BMD_GET_VAL_BY_NAME('Feld-ConstName')",
    "category": "ERP-Sonderfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Feld-ConstName",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Pausieren",
    "bmdSignature": "BMD_SLEEP(<Dauer in Millisekunden>)",
    "category": "ERP-Sonderfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Dauer in Millisekunden",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Build-NTCS-URL",
    "bmdSignature": "BMD_BUILD_NTCS_URL('MCS','Parameter',<Typ>)",
    "category": "ERP-Sonderfunktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "MCS",
        "optional": false
      },
      {
        "label": "Parameter",
        "optional": false
      },
      {
        "label": "Typ",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Merker1 setzen",
    "bmdSignature": "BMD_MERKER1_SET('Wert / Funktion')",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Wert / Funktion",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Merker1 lesen",
    "bmdSignature": "BMD_MERKER1_GET()",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Merker2 setzen",
    "bmdSignature": "BMD_MERKER2_SET('Wert / Funktion')",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Wert / Funktion",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Merker2 lesen",
    "bmdSignature": "BMD_MERKER2_GET()",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Merker3 setzen",
    "bmdSignature": "BMD_MERKER3_SET('Wert / Funktion')",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Wert / Funktion",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Merker3 lesen",
    "bmdSignature": "BMD_MERKER3_GET()",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Merker4 setzen",
    "bmdSignature": "BMD_MERKER4_SET('Wert / Funktion')",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Wert / Funktion",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Merker4 lesen",
    "bmdSignature": "BMD_MERKER4_GET()",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Merker5 setzen",
    "bmdSignature": "BMD_MERKER5_SET('Wert / Funktion')",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Wert / Funktion",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Merker5 lesen",
    "bmdSignature": "BMD_MERKER5_GET()",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Merker6 setzen",
    "bmdSignature": "BMD_MERKER6_SET('Wert / Funktion')",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Wert / Funktion",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Merker6 lesen",
    "bmdSignature": "BMD_MERKER6_GET()",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Merker7 setzen",
    "bmdSignature": "BMD_MERKER7_SET('Wert / Funktion')",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Wert / Funktion",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Merker7 lesen",
    "bmdSignature": "BMD_MERKER7_GET()",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Merker8 setzen",
    "bmdSignature": "BMD_MERKER8_SET('Wert / Funktion')",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Wert / Funktion",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Merker8 lesen",
    "bmdSignature": "BMD_MERKER8_GET()",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Merker9 setzen",
    "bmdSignature": "BMD_MERKER9_SET('Wert / Funktion')",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Wert / Funktion",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Merker9 lesen",
    "bmdSignature": "BMD_MERKER9_GET()",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Merker10 setzen",
    "bmdSignature": "BMD_MERKER10_SET('Wert / Funktion')",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Wert / Funktion",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Merker10 lesen",
    "bmdSignature": "BMD_MERKER10_GET()",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Merker11 setzen",
    "bmdSignature": "BMD_MERKER11_SET('Wert / Funktion')",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Wert / Funktion",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Merker11 lesen",
    "bmdSignature": "BMD_MERKER11_GET()",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Merker12 setzen",
    "bmdSignature": "BMD_MERKER12_SET('Wert / Funktion')",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Wert / Funktion",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Merker12 lesen",
    "bmdSignature": "BMD_MERKER12_GET()",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Merker13 setzen",
    "bmdSignature": "BMD_MERKER13_SET('Wert / Funktion')",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Wert / Funktion",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Merker13 lesen",
    "bmdSignature": "BMD_MERKER13_GET()",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Merker14 setzen",
    "bmdSignature": "BMD_MERKER14_SET('Wert / Funktion')",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Wert / Funktion",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Merker14 lesen",
    "bmdSignature": "BMD_MERKER14_GET()",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Merker15 setzen",
    "bmdSignature": "BMD_MERKER15_SET('Wert / Funktion')",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Wert / Funktion",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Merker15 lesen",
    "bmdSignature": "BMD_MERKER15_GET()",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Merker setzen",
    "bmdSignature": "BMD_MERKER_SET('Ausprägung','Wert / Funktion')",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Ausprägung",
        "optional": false
      },
      {
        "label": "Wert / Funktion",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Merker lesen",
    "bmdSignature": "BMD_MERKER_GET('Ausprägung')",
    "category": "ERP-Merker",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Ausprägung",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Tabulator (TAB)",
    "bmdSignature": "BMD_TAB()",
    "category": "Steuerzeichen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Zeilenvorschub (LF)",
    "bmdSignature": "BMD_LF()",
    "category": "Steuerzeichen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Zeilenumbruch (CRLF)",
    "bmdSignature": "BMD_CRLF()",
    "category": "Steuerzeichen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "FNC1",
    "bmdSignature": "BMD_FNC1()",
    "category": "Steuerzeichen",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Zähler1",
    "bmdSignature": "BMD_COUNTER1()",
    "category": "Zähler",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Zähler1=+1",
    "bmdSignature": "BMD_COUNTER1_INC()",
    "category": "Zähler",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Zähler1=0",
    "bmdSignature": "BMD_COUNTER1_CLR()",
    "category": "Zähler",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Zähler2",
    "bmdSignature": "BMD_COUNTER2()",
    "category": "Zähler",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Zähler2=+1",
    "bmdSignature": "BMD_COUNTER2_INC()",
    "category": "Zähler",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Zähler2=0",
    "bmdSignature": "BMD_COUNTER2_CLR()",
    "category": "Zähler",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Zähler3",
    "bmdSignature": "BMD_COUNTER3()",
    "category": "Zähler",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Zähler3=+1",
    "bmdSignature": "BMD_COUNTER3_INC()",
    "category": "Zähler",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Zähler3=0",
    "bmdSignature": "BMD_COUNTER3_CLR()",
    "category": "Zähler",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "CxR",
    "bmdSignature": "BMD_C_X_R('Register','Ausprägung')",
    "category": "Zähler",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Register",
        "optional": false
      },
      {
        "label": "Ausprägung",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Cx+",
    "bmdSignature": "BMD_C_X_ADD('Register','Ausprägung')",
    "category": "Zähler",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Register",
        "optional": false
      },
      {
        "label": "Ausprägung",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "CxC",
    "bmdSignature": "BMD_C_X_C('Register')",
    "category": "Zähler",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Register",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "MxR",
    "bmdSignature": "BMD_M_X_R('Ausprägung')",
    "category": "Zähler",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Ausprägung",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Mx+",
    "bmdSignature": "BMD_M_X_ADD('Ausprägung',<Wert>)",
    "category": "Zähler",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Ausprägung",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "MxC",
    "bmdSignature": "BMD_M_X_C('Ausprägung')",
    "category": "Zähler",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Ausprägung",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Benutzerfehler-Anzeige",
    "bmdSignature": "BMD_SHOW_USER_ERROR_MESSAGE()",
    "category": "ERP-Abfragen/Dialoge",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Bestell-/Auftragsdaten",
    "bmdSignature": "BMD_PLC_GETERFDATA(<P.-Los-ID>,'Bestellungsfeld (MCA)','Auftragsfeld (MCA)')",
    "category": "ERP-P.-Lose",
    "availability": "Tools",
    "parameters": [
      {
        "label": "P.-Los-ID",
        "optional": false
      },
      {
        "label": "Bestellungsfeld (MCA)",
        "optional": false
      },
      {
        "label": "Auftragsfeld (MCA)",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Planungsgruppe von",
    "bmdSignature": "BMD_PLO_LAST_VON()",
    "category": "Planungsgruppe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Planungsgruppe bis",
    "bmdSignature": "BMD_PLO_LAST_BIS()",
    "category": "Planungsgruppe",
    "availability": "Tools",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Waagenstatus-Beschreibung",
    "bmdSignature": "BMD_TOOL_STATUS_DESCRIPTION(<Waagenstatus>)",
    "category": "PPS MGA",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Waagenstatus",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Wert-Alliquot-Plp",
    "bmdSignature": "BMD_WERT_ALLIQUOT_PLP(<Menge>,<Startdatum>,<Endedatum>,<Hauptfirma>,'Planungsperiode',<Referenzdatum>,<Planungseinheit>)",
    "category": "ERP-Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Menge",
        "optional": false
      },
      {
        "label": "Startdatum",
        "optional": false
      },
      {
        "label": "Endedatum",
        "optional": false
      },
      {
        "label": "Hauptfirma",
        "optional": false
      },
      {
        "label": "Planungsperiode",
        "optional": false
      },
      {
        "label": "Referenzdatum",
        "optional": false
      },
      {
        "label": "Planungseinheit",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Get-Plp",
    "bmdSignature": "BMD_GET_PLP(<Hauptfirma>,'Planungsperiode',<Referenzdatum>,<Planungseinheit>,'Feld-ConstName')",
    "category": "ERP-Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Hauptfirma",
        "optional": false
      },
      {
        "label": "Planungsperiode",
        "optional": false
      },
      {
        "label": "Referenzdatum",
        "optional": false
      },
      {
        "label": "Planungseinheit",
        "optional": false
      },
      {
        "label": "Feld-ConstName",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Get-Ma-Kapa",
    "bmdSignature": "BMD_GET_MA_KAPA(<Art>,<MA-Firma>,'MA-ID',<Firma>,'Prozess-Nr.',<Von Zeit>,<Bis Zeit>)",
    "category": "ERP-Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Art",
        "optional": false
      },
      {
        "label": "MA-Firma",
        "optional": false
      },
      {
        "label": "MA-ID",
        "optional": false
      },
      {
        "label": "Firma",
        "optional": false
      },
      {
        "label": "Prozess-Nr.",
        "optional": false
      },
      {
        "label": "Von Zeit",
        "optional": false
      },
      {
        "label": "Bis Zeit",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Get-Ma-Kapa-Async",
    "bmdSignature": "BMD_GET_MA_KAPA_ASYNC(<Art>,<MA-Firma>,'MA-ID',<Firma>,'Prozess-Nr.',<Von Zeit>,<Bis Zeit>)",
    "category": "ERP-Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Art",
        "optional": false
      },
      {
        "label": "MA-Firma",
        "optional": false
      },
      {
        "label": "MA-ID",
        "optional": false
      },
      {
        "label": "Firma",
        "optional": false
      },
      {
        "label": "Prozess-Nr.",
        "optional": false
      },
      {
        "label": "Von Zeit",
        "optional": false
      },
      {
        "label": "Bis Zeit",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Baselinebetrag",
    "bmdSignature": "BMD_GET_BASELINE_VALUE('Referenz','Feld')",
    "category": "ERP-Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Referenz",
        "optional": false
      },
      {
        "label": "Feld",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Baselinenummer",
    "bmdSignature": "BMD_GET_BASELINE_INT('Referenz','Feld')",
    "category": "ERP-Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Referenz",
        "optional": false
      },
      {
        "label": "Feld",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Baselinetext",
    "bmdSignature": "BMD_GET_BASELINE_TEXT('Referenz','Feld')",
    "category": "ERP-Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Referenz",
        "optional": false
      },
      {
        "label": "Feld",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Baselinedatum",
    "bmdSignature": "BMD_GET_BASELINE_DATE('Referenz','Feld')",
    "category": "ERP-Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Referenz",
        "optional": false
      },
      {
        "label": "Feld",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Baselinedauer",
    "bmdSignature": "BMD_GET_BASELINE_PERIOD('Referenz','Feld')",
    "category": "ERP-Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Referenz",
        "optional": false
      },
      {
        "label": "Feld",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Baseline-Sparkline",
    "bmdSignature": "BMD_GET_BASELINE_SPARKLINE('Referenz','Feld')",
    "category": "ERP-Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Referenz",
        "optional": false
      },
      {
        "label": "Feld",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Get-Po-Data",
    "bmdSignature": "BMD_GET_PO_DATA(<VG-ID>,'Feld-ID (MC)')",
    "category": "ERP-Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "VG-ID",
        "optional": false
      },
      {
        "label": "Feld-ID (MC)",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Get-Vg-Data",
    "bmdSignature": "BMD_PEP_GET_VG_DATA(<VG-ID>,'Feld-ID (MC)',<Modus>)",
    "category": "ERP-Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "VG-ID",
        "optional": false
      },
      {
        "label": "Feld-ID (MC)",
        "optional": false
      },
      {
        "label": "Modus",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Get-PP-Data",
    "bmdSignature": "BMD_PEP_GET_PP_DATA(<Projektfirma>,<Projektnummer>,<PSP>,'Feld-ID (MC)',<Modus>)",
    "category": "ERP-Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Projektfirma",
        "optional": false
      },
      {
        "label": "Projektnummer",
        "optional": false
      },
      {
        "label": "PSP",
        "optional": false
      },
      {
        "label": "Feld-ID (MC)",
        "optional": false
      },
      {
        "label": "Modus",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Get-Stake-Data",
    "bmdSignature": "BMD_PEP_GET_STAKE_DATA(<Projekt-Typ>,<Projekt-Firmen-Nr.>,<Projekt-Nr.>,<Stakeholdertyp>,<Pos>,'Feld-ID (MC)',<Modus>)",
    "category": "ERP-Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Projekt-Typ",
        "optional": false
      },
      {
        "label": "Projekt-Firmen-Nr.",
        "optional": false
      },
      {
        "label": "Projekt-Nr.",
        "optional": false
      },
      {
        "label": "Stakeholdertyp",
        "optional": false
      },
      {
        "label": "Pos",
        "optional": false
      },
      {
        "label": "Feld-ID (MC)",
        "optional": false
      },
      {
        "label": "Modus",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Rtf-Text-unformatiert-Auslesen",
    "bmdSignature": "BMD_PEP_GET_PLAIN_RFT_BLOB(<Rtf-Text-Id>)",
    "category": "ERP-Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Rtf-Text-Id",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Get-Blob-Converted",
    "bmdSignature": "BMD_GET_BLOB_CONVERTED(<Rtf-Text-Id>,<Sprache>,'Format')",
    "category": "ERP-Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Rtf-Text-Id",
        "optional": false
      },
      {
        "label": "Sprache",
        "optional": false
      },
      {
        "label": "Format",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Jahr-Woche-als-Datum",
    "bmdSignature": "BMD_PEP_ENCODE_DATE_WEEK(<Jahr>,<Woche>)",
    "category": "ERP-Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Jahr",
        "optional": false
      },
      {
        "label": "Woche",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Firmengruppe-der-Firma",
    "bmdSignature": "BMD_FG_VON_FIRMENNR(<Firmen-Nr.>,<Std-Wert wenn keine Firma vorhanden>)",
    "category": "ERP-Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firmen-Nr.",
        "optional": false
      },
      {
        "label": "Std-Wert wenn keine Firma vorhanden",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "SHA256",
    "bmdSignature": "BMD_CALC_SHA256('Daten')",
    "category": "ERP-Planung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Daten",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Artikel vorhanden",
    "bmdSignature": "BMD_ARTIKEL_EXISTS(<Hauptfirma>,'Artikel')",
    "category": "Artikel",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Hauptfirma",
        "optional": false
      },
      {
        "label": "Artikel",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Ermittlung Artikelwert",
    "bmdSignature": "BMD_GET_ARTIKELDATA(<Hauptfirma>,'Artikel','Feld-ConstName')",
    "category": "Artikel",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Hauptfirma",
        "optional": false
      },
      {
        "label": "Artikel",
        "optional": false
      },
      {
        "label": "Feld-ConstName",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Ermittlung externer Artikelwert",
    "bmdSignature": "BMD_GET_EXTARTIKELDATA(<Hauptfirma>,'Artikel',<Ext. Artikelwertname (Nr.)>)",
    "category": "Artikel",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Hauptfirma",
        "optional": false
      },
      {
        "label": "Artikel",
        "optional": false
      },
      {
        "label": "Ext. Artikelwertname (Nr.)",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Ermittlung EAN",
    "bmdSignature": "BMD_GET_EANNUMMER(<Hauptfirma>,'Artikel','Einheit',<Rückfall auf Haupt-EAN>)",
    "category": "Artikel",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Hauptfirma",
        "optional": false
      },
      {
        "label": "Artikel",
        "optional": false
      },
      {
        "label": "Einheit",
        "optional": false
      },
      {
        "label": "Rückfall auf Haupt-EAN",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Aufruf Artikeletikettendruck",
    "bmdSignature": "BMD_ARTIKEL_PRINT_ETIKETT(<Hauptfirma>,'Artikel')",
    "category": "Artikel",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Hauptfirma",
        "optional": false
      },
      {
        "label": "Artikel",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Einheitenaufstellung",
    "bmdSignature": "BMD_GET_UNITASSEMBLY(<Hauptfirma>,<Einheitentabellen-Nummer>,<Menge>,'Mengeneinheit')",
    "category": "Einheiten",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Hauptfirma",
        "optional": false
      },
      {
        "label": "Einheitentabellen-Nummer",
        "optional": false
      },
      {
        "label": "Menge",
        "optional": false
      },
      {
        "label": "Mengeneinheit",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Einheitenaufstellung [via Artikel-Einheitentabelle]",
    "bmdSignature": "BMD_GET_ARTICLE_UNITASSEMBLY(<Artikel-Firma>,'Artikel',<Menge>,'Mengeneinheit')",
    "category": "Einheiten",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Artikel-Firma",
        "optional": false
      },
      {
        "label": "Artikel",
        "optional": false
      },
      {
        "label": "Menge",
        "optional": false
      },
      {
        "label": "Mengeneinheit",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Einheitenaufstellung mit Alternativen",
    "bmdSignature": "BMD_GET_UNITASSEMBLY_WITH_ALTERNATIVES(<Hauptfirma>,<Einheitentabellen-Nummer>,<Menge>,'Mengeneinheit')",
    "category": "Einheiten",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Hauptfirma",
        "optional": false
      },
      {
        "label": "Einheitentabellen-Nummer",
        "optional": false
      },
      {
        "label": "Menge",
        "optional": false
      },
      {
        "label": "Mengeneinheit",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Einheitenaufstellung mit Alternativen [via Artikel-Einheitentabelle]",
    "bmdSignature": "BMD_GET_ARTICLE_UNITASSEMBLY_WITH_ALTERNATIVES(<Artikel-Firma>,'Artikel',<Menge>,'Mengeneinheit')",
    "category": "Einheiten",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Artikel-Firma",
        "optional": false
      },
      {
        "label": "Artikel",
        "optional": false
      },
      {
        "label": "Menge",
        "optional": false
      },
      {
        "label": "Mengeneinheit",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Artikelmenge-Einheitenumwandlung",
    "bmdSignature": "BMD_GET_QUANTITY_IN_UNIT(<Artikel-Firma>,'Artikel',<Menge>,'Mengeneinheit','Ziel-Einheit')",
    "category": "Einheiten",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Artikel-Firma",
        "optional": false
      },
      {
        "label": "Artikel",
        "optional": false
      },
      {
        "label": "Menge",
        "optional": false
      },
      {
        "label": "Mengeneinheit",
        "optional": false
      },
      {
        "label": "Ziel-Einheit",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Artikelmenge-Einheitenrundung",
    "bmdSignature": "BMD_ROUND_QUANTITY_IN_UNIT(<Menge>,'Mengeneinheit')",
    "category": "Einheiten",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Menge",
        "optional": false
      },
      {
        "label": "Mengeneinheit",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Mengen-Einheitenumwandlung lt. Einheitentabelle",
    "bmdSignature": "BMD_GET_QUANTITY_IN_UNIT_BY_TABLE(<Hauptfirma>,<Einheitentabellen-Nummer>,<Menge>,'Mengeneinheit','Ziel-Einheit')",
    "category": "Einheiten",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Hauptfirma",
        "optional": false
      },
      {
        "label": "Einheitentabellen-Nummer",
        "optional": false
      },
      {
        "label": "Menge",
        "optional": false
      },
      {
        "label": "Mengeneinheit",
        "optional": false
      },
      {
        "label": "Ziel-Einheit",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Mengen-Umrechnungsfaktor lt. Einheitentabelle",
    "bmdSignature": "BMD_GET_QUANTITY_FACTOR_IN_UNIT_BY_TABLE(<Hauptfirma>,<Einheitentabellen-Nummer>,'Mengeneinheit','Ziel-Einheit')",
    "category": "Einheiten",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Hauptfirma",
        "optional": false
      },
      {
        "label": "Einheitentabellen-Nummer",
        "optional": false
      },
      {
        "label": "Mengeneinheit",
        "optional": false
      },
      {
        "label": "Ziel-Einheit",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Mengen-Einheitenumwandlung lt. Einheitentabelle und Reihenfolge",
    "bmdSignature": "BMD_GET_QUANTITY_IN_UNIT_BY_TABLE_IDX(<Hauptfirma>,<Einheitentabellen-Nummer>,<Menge>,'Mengeneinheit',<Reihenfolge in Einheitentabelle>)",
    "category": "Einheiten",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Hauptfirma",
        "optional": false
      },
      {
        "label": "Einheitentabellen-Nummer",
        "optional": false
      },
      {
        "label": "Menge",
        "optional": false
      },
      {
        "label": "Mengeneinheit",
        "optional": false
      },
      {
        "label": "Reihenfolge in Einheitentabelle",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Mengen-Umrechnungsfaktor lt. Einheitentabelle und Reihenfolge",
    "bmdSignature": "BMD_GET_QUANTITY_FACTOR_IN_UNIT_BY_TABLE_IDX(<Hauptfirma>,<Einheitentabellen-Nummer>,'Mengeneinheit',<Reihenfolge in Einheitentabelle>)",
    "category": "Einheiten",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Hauptfirma",
        "optional": false
      },
      {
        "label": "Einheitentabellen-Nummer",
        "optional": false
      },
      {
        "label": "Mengeneinheit",
        "optional": false
      },
      {
        "label": "Reihenfolge in Einheitentabelle",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Wandelt eine Laenge in Grundeinheit um",
    "bmdSignature": "BMD_GET_QUANTITY_IN_LGE(<Artikel-Firma>,'Artikel',<Einheitentabellen-Nummer>,<Menge>,'Mengeneinheit')",
    "category": "Einheiten",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Artikel-Firma",
        "optional": false
      },
      {
        "label": "Artikel",
        "optional": false
      },
      {
        "label": "Einheitentabellen-Nummer",
        "optional": false
      },
      {
        "label": "Menge",
        "optional": false
      },
      {
        "label": "Mengeneinheit",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Wert-Einheitenumwandlung lt. Einheitentabelle",
    "bmdSignature": "BMD_GET_VALUE_IN_UNIT_BY_TABLE(<Hauptfirma>,<Einheitentabellen-Nummer>,<Wert>,'Werteinheit','Ziel-Einheit')",
    "category": "Einheiten",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Hauptfirma",
        "optional": false
      },
      {
        "label": "Einheitentabellen-Nummer",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      },
      {
        "label": "Werteinheit",
        "optional": false
      },
      {
        "label": "Ziel-Einheit",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Einheit vorhanden",
    "bmdSignature": "BMD_GET_UNIT_EXISTS('Einheit')",
    "category": "Einheiten",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Einheit",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "VK Wert Netto",
    "bmdSignature": "BMD_GET_VKWERT_NETTO(<Firma>,'Erfassungs-Kennz.',<Erfassungs-Nr.>)",
    "category": "Verkauf",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firma",
        "optional": false
      },
      {
        "label": "Erfassungs-Kennz.",
        "optional": false
      },
      {
        "label": "Erfassungs-Nr.",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Rechnungswert Netto (Stammwährung)",
    "bmdSignature": "BMD_GET_RNGWERT_NETTO_STAMMW(<Firma>,<Rechnung Lfd-Nr>)",
    "category": "Verkauf",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firma",
        "optional": false
      },
      {
        "label": "Rechnung Lfd-Nr",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "EK-Wert netto",
    "bmdSignature": "BMD_GET_EKWERT_NETTO(<Firma>,'Erfassungs-Kennz.',<Erfassungs-Nr.>)",
    "category": "Einkauf",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Firma",
        "optional": false
      },
      {
        "label": "Erfassungs-Kennz.",
        "optional": false
      },
      {
        "label": "Erfassungs-Nr.",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "MwSt-Satz",
    "bmdSignature": "BMD_GET_MWST_SATZ(<Kontenart>,<Firma (Artikel)>,'Artikel-Nr.')",
    "category": "Kontofindung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Kontenart",
        "optional": false
      },
      {
        "label": "Firma (Artikel)",
        "optional": false
      },
      {
        "label": "Artikel-Nr.",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Wws-Runden",
    "bmdSignature": "BMD_ROUNDING(<Wert>,<Präzision>,'Rundungsmodus')",
    "category": "Kontofindung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Wert",
        "optional": false
      },
      {
        "label": "Präzision",
        "optional": false
      },
      {
        "label": "Rundungsmodus",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Format-Dauer",
    "bmdSignature": "BMD_FORMAT_DAUER(<Dauer>,'Format')",
    "category": "Kontofindung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Dauer",
        "optional": false
      },
      {
        "label": "Format",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "IstFeiertag",
    "bmdSignature": "BMD_IST_FEIERTAG(<Datum>,<MA-Firma>,'MA-ID')",
    "category": "Kontofindung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Datum",
        "optional": false
      },
      {
        "label": "MA-Firma",
        "optional": false
      },
      {
        "label": "MA-ID",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Übersetzung auslesen",
    "bmdSignature": "BMD_GET_WWSUEBERSETZUNG('Feldname',<Sprache>,'Key1','Key2','Key3')",
    "category": "Kontofindung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Feldname",
        "optional": false
      },
      {
        "label": "Sprache",
        "optional": false
      },
      {
        "label": "Key1",
        "optional": false
      },
      {
        "label": "Key2",
        "optional": false
      },
      {
        "label": "Key3",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Ermittlung Transporttyp-Eigenschaft",
    "bmdSignature": "BMD_GET_TRANSPORTTYPDATA(<Hauptfirma>,'Transporttyp','Feld-ConstName')",
    "category": "Kontofindung",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Hauptfirma",
        "optional": false
      },
      {
        "label": "Transporttyp",
        "optional": false
      },
      {
        "label": "Feld-ConstName",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Übersetzen",
    "bmdSignature": "BMD_KI_TRANSLATION(<Fox text function>,'source','Language')",
    "category": "KI-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Fox text function",
        "optional": false
      },
      {
        "label": "source",
        "optional": false
      },
      {
        "label": "Language",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Klassifizieren",
    "bmdSignature": "BMD_KI_CLASSIFICATION(<Fox text function>,'source','Entscheidungsklassen (opt)')",
    "category": "KI-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Fox text function",
        "optional": false
      },
      {
        "label": "source",
        "optional": false
      },
      {
        "label": "Entscheidungsklassen",
        "optional": true
      }
    ],
    "isMethod": false
  },
  {
    "name": "Lektorieren",
    "bmdSignature": "BMD_KI_PROOFREAD(<Fox text function>,'source')",
    "category": "KI-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Fox text function",
        "optional": false
      },
      {
        "label": "source",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Dok-Chat",
    "bmdSignature": "BMD_KI_DOCCHAT(<Fox text function>,'source','Frage')",
    "category": "KI-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Fox text function",
        "optional": false
      },
      {
        "label": "source",
        "optional": false
      },
      {
        "label": "Frage",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Überschrift erstellen",
    "bmdSignature": "BMD_KI_CREATEHEADING(<Fox text function>,'source')",
    "category": "KI-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Fox text function",
        "optional": false
      },
      {
        "label": "source",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Text erstellen",
    "bmdSignature": "BMD_KI_CREATETEXT(<Fox text function>,'source')",
    "category": "KI-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Fox text function",
        "optional": false
      },
      {
        "label": "source",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Zusammenfassen",
    "bmdSignature": "BMD_KI_SUMMARISE(<Fox text function>,'source')",
    "category": "KI-Funktionen",
    "availability": "Tools",
    "parameters": [
      {
        "label": "Fox text function",
        "optional": false
      },
      {
        "label": "source",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Auswahl von Waage und Transporttyp",
    "bmdSignature": "BMD_SCREEN_WEIGH(<Firma>)",
    "category": "PPS MGA",
    "availability": "WWS",
    "parameters": [
      {
        "label": "Firma",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Waagenbefehl-Ausführung",
    "bmdSignature": "BMD_TOOL_COMMAND_EXECUTE(<Firma>,'Werkzeug-ID','Befehl','Befehlsparameter')",
    "category": "PPS MGA",
    "availability": "WWS",
    "parameters": [
      {
        "label": "Firma",
        "optional": false
      },
      {
        "label": "Werkzeug-ID",
        "optional": false
      },
      {
        "label": "Befehl",
        "optional": false
      },
      {
        "label": "Befehlsparameter",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Wiegeergebnisverarbeitung",
    "bmdSignature": "BMD_GET_WEIGHT_RESULT('Wert-ID')",
    "category": "PPS MGA",
    "availability": "WWS",
    "parameters": [
      {
        "label": "Wert-ID",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Funktionsergebnisse/Parameter löschen",
    "bmdSignature": "BMD_FUNCTIONVALUES_CLR()",
    "category": "ERP-Merker",
    "availability": "WWS",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Funktionsergebnisse auslesen",
    "bmdSignature": "BMD_FUNCTIONVALUES_GET('Ausprägung','Standard-Wert')",
    "category": "ERP-Merker",
    "availability": "WWS",
    "parameters": [
      {
        "label": "Ausprägung",
        "optional": false
      },
      {
        "label": "Standard-Wert",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Funktionsparameter schreiben",
    "bmdSignature": "BMD_FUNCTIONVALUES_SET('Ausprägung','Wert')",
    "category": "ERP-Merker",
    "availability": "WWS",
    "parameters": [
      {
        "label": "Ausprägung",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "\"Dialog \"\"Retourware erfassen\"\" starten\"",
    "bmdSignature": "BMD_BOM_START_RETURNMATERIAL_DIALOG(<Eps-Id>,<MA-Firma>,'MA-ID')",
    "category": "MaterialConsumption",
    "availability": "WWS",
    "parameters": [
      {
        "label": "Eps-Id",
        "optional": false
      },
      {
        "label": "MA-Firma",
        "optional": false
      },
      {
        "label": "MA-ID",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Instanzparameter abfragen",
    "bmdSignature": "BMD_1751587('Type')",
    "category": "CRMWF",
    "availability": "Workflow",
    "parameters": [
      {
        "label": "Type",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Mitarbeiter hinzufügen",
    "bmdSignature": "BMD_1751728(<FirmenNr>,'Personen-ID')",
    "category": "CRMWF",
    "availability": "Workflow",
    "parameters": [
      {
        "label": "FirmenNr",
        "optional": false
      },
      {
        "label": "Personen-ID",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Instanzvariable speichern",
    "bmdSignature": "BMD_1751776('Name','Wert')",
    "category": "CRMWF",
    "availability": "Workflow",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Instanzvariable laden",
    "bmdSignature": "BMD_1751777('Name')",
    "category": "CRMWF",
    "availability": "Workflow",
    "parameters": [
      {
        "label": "Name",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "AskValueStr -> Instanzvariable",
    "bmdSignature": "BMD_1751780('Fenstertitel','Anzeigetext','Defaultwert','Instanzvariable')",
    "category": "CRMWF",
    "availability": "Workflow",
    "parameters": [
      {
        "label": "Fenstertitel",
        "optional": false
      },
      {
        "label": "Anzeigetext",
        "optional": false
      },
      {
        "label": "Defaultwert",
        "optional": false
      },
      {
        "label": "Instanzvariable",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "AskValueList -> Instanzvariable",
    "bmdSignature": "BMD_1751779('Wert1,Wert2,...','Text1,Text2,...','Instanzvariable')",
    "category": "CRMWF",
    "availability": "Workflow",
    "parameters": [
      {
        "label": "Wert1",
        "optional": false
      },
      {
        "label": "Wert2",
        "optional": false
      },
      {
        "label": "...",
        "optional": false
      },
      {
        "label": "Text1",
        "optional": false
      },
      {
        "label": "Text2",
        "optional": false
      },
      {
        "label": "...",
        "optional": false
      },
      {
        "label": "Instanzvariable",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "AskMultipleValues -> Instanzvariable",
    "bmdSignature": "BMD_1751781('Fenstertitel','One,Two,Three','Three',',','Instanzvariable')",
    "category": "CRMWF",
    "availability": "Workflow",
    "parameters": [
      {
        "label": "Fenstertitel",
        "optional": false
      },
      {
        "label": "One",
        "optional": false
      },
      {
        "label": "Two",
        "optional": false
      },
      {
        "label": "Three",
        "optional": false
      },
      {
        "label": "Three",
        "optional": false
      },
      {
        "label": "Instanzvariable",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "ER-Kontrolle",
    "bmdSignature": "Rechnung OK;BMD_RECHNUNG_IST_OK('Text Rechnung OK (opt.)','Text Rechnung nicht OK (opt.')",
    "category": "ERWF",
    "availability": "Workflow",
    "parameters": [
      {
        "label": "Text Rechnung OK",
        "optional": true
      },
      {
        "label": "Text Rechnung nicht OK (opt.",
        "optional": true
      }
    ],
    "isMethod": false
  },
  {
    "name": "ER-Kontrolle",
    "bmdSignature": "Letzter Mitarbeiter;BMD_GET_VALUE_LETZTER_MITARBEITER('Feldname')",
    "category": "ERWF",
    "availability": "Workflow",
    "parameters": [
      {
        "label": "Feldname",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "ER-Kontrolle",
    "bmdSignature": "Hinzufügen Kontroll-Mitarbeiter;BMD_ADD_KONTROLL_MITARBEITER(<Personen-Firmen-Nr>,'Personen-ID','Gesamt-Mitarbeiter-Param.-String')",
    "category": "ERWF",
    "availability": "Workflow",
    "parameters": [
      {
        "label": "Personen-Firmen-Nr",
        "optional": false
      },
      {
        "label": "Personen-ID",
        "optional": false
      },
      {
        "label": "Gesamt-Mitarbeiter-Param.-String",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "ER-Kontrolle",
    "bmdSignature": "Rechnung kontiert;BMD_KONTIERUNG_IST_OK()",
    "category": "ERWF",
    "availability": "Workflow",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "ER-Kontrolle",
    "bmdSignature": "WWS-Betragsaufteilung vollständig;BMD_WWS_AUFTEILUNG_VOLLSTAENDIG()",
    "category": "ERWF",
    "availability": "Workflow",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "ER-Kontrolle",
    "bmdSignature": "Restbetrag;BMD_KONTIERUNG_RESTBETRAG()",
    "category": "ERWF",
    "availability": "Workflow",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "GetKontengruppe",
    "bmdSignature": "BMD_GetKontengruppe(<Firmen-Nr>,<KontoNr>)",
    "category": "FIBU",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "KontoNr",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "CreateFMacroBuchungList",
    "bmdSignature": "BMD_BuchungList := FibuMacroObject.CreateFMacroBuchungList(<Firmen-Nr>,<FIBUNr>)",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBUNr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetExternalFMacroBuchungList",
    "bmdSignature": "BMD_BuchungList := FibuMacroObject.GetExternalFMacroBuchungList(<Firmen-Nr>,<FIBUNr>)",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBUNr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "NewBuchung",
    "bmdSignature": "BMD_BuchungList.NewBuchung()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetData",
    "bmdSignature": "BMD_BuchungList.GetData('Feldbezeichnung')",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Feldbezeichnung",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetData",
    "bmdSignature": "BMD_BuchungList.SetData('Feldbezeichnung','Daten')",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Feldbezeichnung",
        "optional": false
      },
      {
        "label": "Daten",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "ReadBuchungFromList",
    "bmdSignature": "BMD_BuchungList.ReadBuchungFromList(<Index>)",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "WriteDataToBuchung",
    "bmdSignature": "BMD_BuchungList.WriteDataToBuchung()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "AddBuchungToList",
    "bmdSignature": "BMD_BuchungList.AddBuchungToList()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "CopyBuchungToList",
    "bmdSignature": "BMD_BuchungList.CopyBuchungToList(Buchungsliste,<Index (opt.)>)",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Buchungsliste",
        "optional": false
      },
      {
        "label": "Index",
        "optional": true
      }
    ],
    "isMethod": true
  },
  {
    "name": "MergePersonenBuchungen",
    "bmdSignature": "BMD_BuchungList.MergePersonenBuchungen()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "CountList",
    "bmdSignature": "BMD_BuchungList.CountList()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "DeleteBuchung",
    "bmdSignature": "BMD_BuchungList.DeleteBuchung(<Index>)",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "InsertBuchung",
    "bmdSignature": "BMD_BuchungList.InsertBuchung(<Index>)",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "ClearList",
    "bmdSignature": "BMD_BuchungList.ClearList()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "AddDocumentToBuchung",
    "bmdSignature": "BMD_BuchungList.AddDocumentToBuchung('Dateiname (absoluter Pfad)','Kategorie (opt.)')",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Dateiname (absoluter Pfad)",
        "optional": false
      },
      {
        "label": "Kategorie",
        "optional": true
      }
    ],
    "isMethod": true
  },
  {
    "name": "ReadDocumentFromBuchung",
    "bmdSignature": "BMD_BuchungList.ReadDocumentFromBuchung(<Index>)",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CountDocument",
    "bmdSignature": "BMD_BuchungList.CountDocument()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "DeleteDocument",
    "bmdSignature": "BMD_BuchungList.DeleteDocument(<Index>)",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetErrorText",
    "bmdSignature": "BMD_BuchungList.GetErrorText()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "NewKoreErfassung",
    "bmdSignature": "BMD_BuchungList.NewKoreErfassung()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "ReadKoreErfassungFromBuchung",
    "bmdSignature": "BMD_BuchungList.ReadKoreErfassungFromBuchung(<Index>)",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "WriteDataToKoreErfassung",
    "bmdSignature": "BMD_BuchungList.WriteDataToKoreErfassung()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "AddKoreErfassungToBuchung",
    "bmdSignature": "BMD_BuchungList.AddKoreErfassungToBuchung()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "CountKoreErfassung",
    "bmdSignature": "BMD_BuchungList.CountKoreErfassung()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "DeleteKoreErfassung",
    "bmdSignature": "BMD_BuchungList.DeleteKoreErfassung(<Index>)",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "NewAuszifferung",
    "bmdSignature": "BMD_BuchungList.NewAuszifferung()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "ReadAuszifferungFromBuchung",
    "bmdSignature": "BMD_BuchungList.ReadAuszifferungFromBuchung(<Index>)",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "WriteDataToAuszifferung",
    "bmdSignature": "BMD_BuchungList.WriteDataToAuszifferung()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "AddAuszifferungToBuchung",
    "bmdSignature": "BMD_BuchungList.AddAuszifferungToBuchung()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "CountAuszifferung",
    "bmdSignature": "BMD_BuchungList.CountAuszifferung()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "DeleteAuszifferung",
    "bmdSignature": "BMD_BuchungList.DeleteAuszifferung(<Index>)",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CountOPZuordnungList",
    "bmdSignature": "BMD_BuchungList.CountOPZuordnungList()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "ReadOPZuordnungFromBuchung",
    "bmdSignature": "BMD_BuchungList..ReadOPZuordnungFromBuchung(<Index>)",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "NewSrStorno",
    "bmdSignature": "BMD_BuchungList.NewSrStorno()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "ReadSrStornoFromBuchung",
    "bmdSignature": "BMD_BuchungList.ReadSrStornoFromBuchung(<Index>)",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "WriteDataToSrStorno",
    "bmdSignature": "BMD_BuchungList.WriteDataToSrStorno()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "AddSrStornoToBuchung",
    "bmdSignature": "BMD_BuchungList.AddSrStornoToBuchung()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "CountSrStorno",
    "bmdSignature": "BMD_BuchungList.CountSrStorno()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "NewProzAuft",
    "bmdSignature": "BMD_BuchungList.NewProzAuft()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "ReadProzAuftFromBuchung",
    "bmdSignature": "BMD_BuchungList.ReadProzAuftFromBuchung(<Index>)",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "WriteDataToProzAuft",
    "bmdSignature": "BMD_BuchungList.WriteDataToProzAuft()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "AddProzAuftToBuchung",
    "bmdSignature": "BMD_BuchungList.AddProzAuftToBuchung()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "CountProzAuft",
    "bmdSignature": "BMD_BuchungList.CountProzAuft()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "NewLandwProd",
    "bmdSignature": "BMD_BuchungList.NewLandwProd()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "ReadLandwProdFromBuchung",
    "bmdSignature": "BMD_BuchungList.ReadLandwProdFromBuchung(<Index>)",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "WriteDataToLandwProd",
    "bmdSignature": "BMD_BuchungList.WriteDataToLandwProd()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "AddLandwProdToBuchung",
    "bmdSignature": "BMD_BuchungList.AddLandwProdToBuchung()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "CountLandwProd",
    "bmdSignature": "BMD_BuchungList.CountLandwProd()",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "WriteBuErf",
    "bmdSignature": "BMD_BuchungList.WriteBuErf('Dateiname',<5.5-BuErf (opt.)>,<Datei ergänzen (opt.)>)",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Dateiname",
        "optional": false
      },
      {
        "label": "5.5-BuErf",
        "optional": true
      },
      {
        "label": "Datei ergänzen",
        "optional": true
      }
    ],
    "isMethod": true
  },
  {
    "name": "AddBuchungByBuchungIdToList",
    "bmdSignature": "BMD_BuchungList.AddBuchungByBuchungIdToList(<Firmen-Nr>,<FIBU-Nr>,<Buchung-ID>,<Mit OP-Auszifferung>,<Mit KORE-Erfassung>)",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Buchung-ID",
        "optional": false
      },
      {
        "label": "Mit OP-Auszifferung",
        "optional": false
      },
      {
        "label": "Mit KORE-Erfassung",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "AddBuchungByBelegIdToList",
    "bmdSignature": "BMD_BuchungList.AddBuchungByBelegIdToList(<Firmen-Nr>,<FIBU-Nr>,<Beleg-ID>,<Mit OP-Auszifferung>,<Mit KORE-Erfassung>)",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Beleg-ID",
        "optional": false
      },
      {
        "label": "Mit OP-Auszifferung",
        "optional": false
      },
      {
        "label": "Mit KORE-Erfassung",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "AddBuchungBySqlToList",
    "bmdSignature": "BMD_BuchungList.AddBuchungBySqlToList('SQL-Text',<Mit OP-Auszifferung>,<Mit KORE-Erfassung>)",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "SQL-Text",
        "optional": false
      },
      {
        "label": "Mit OP-Auszifferung",
        "optional": false
      },
      {
        "label": "Mit KORE-Erfassung",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "AddBuErfToList",
    "bmdSignature": "BMD_BuchungList.AddBuErfToList(<Firmen-Nr>,<FIBU-Nr>,'BuErf Dateiname','Logdatei (z. B. FIBUIMPORT.LOG)')",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "BuErf Dateiname",
        "optional": false
      },
      {
        "label": "Logdatei (z. B. FIBUIMPORT.LOG)",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "WriteExportdate",
    "bmdSignature": "BMD_BuchungList.WriteExportdate(<Export-Datum>)",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Export-Datum",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetLogFilename",
    "bmdSignature": "BMD_BuchungList.SetLogFilename('Dateiname')",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Dateiname",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "ImportBuchungenMI",
    "bmdSignature": "BMD_BuchungList.ImportBuchungenMI(<Firmen-Nr>,<FIBU-Nr>,'Logdatei (z. B. FIBUIMPORT.LOG)',<Import OP-Beträge?>)",
    "category": "Buchungsliste",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Logdatei (z. B. FIBUIMPORT.LOG)",
        "optional": false
      },
      {
        "label": "Import OP-Beträge?",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateFMacroERKontrolle",
    "bmdSignature": "BMD_ERKontrolle := FibuMacroObject.CreateFMacroERKontrolle()",
    "category": "ER-Kontrolle",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "InsertERBuchung",
    "bmdSignature": "BMD_ERKontrolle.InsertERBuchung(Stringlist)",
    "category": "ER-Kontrolle",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Stringlist",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "InsertERKonto",
    "bmdSignature": "BMD_ERKontrolle.InsertERKonto(Stringlist)",
    "category": "ER-Kontrolle",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Stringlist",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "InsertERKost",
    "bmdSignature": "BMD_ERKontrolle.InsertERKost(Stringlist)",
    "category": "ER-Kontrolle",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Stringlist",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "InsertERMitarbeiterZu",
    "bmdSignature": "BMD_ERKontrolle.InsertERMitarbeiterZu(Stringlist)",
    "category": "ER-Kontrolle",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Stringlist",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "AddDocumentToER",
    "bmdSignature": "BMD_ERKontrolle.AddDocumentToER(<Firmen-Nr>,<FIBU-Nr>,'Erfass-Nr','Dateiname')",
    "category": "ER-Kontrolle",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Erfass-Nr",
        "optional": false
      },
      {
        "label": "Dateiname",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "AddDocumentToERByArchivNr",
    "bmdSignature": "BMD_ERKontrolle.AddDocumentToERByArchivNr(<Firmen-Nr>,<FIBU-Nr>,'Erfass-Nr',<Archiv-Nr.>,<Dokumenten-Nr.>)",
    "category": "ER-Kontrolle",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Erfass-Nr",
        "optional": false
      },
      {
        "label": "Archiv-Nr.",
        "optional": false
      },
      {
        "label": "Dokumenten-Nr.",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "DeleteERBuchung",
    "bmdSignature": "BMD_ERKontrolle.DeleteERBuchung(<Firmen-Nr>,<FIBU-Nr>,'Erfass-Nr')",
    "category": "ER-Kontrolle",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Erfass-Nr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "DeleteERKonto",
    "bmdSignature": "BMD_ERKontrolle.DeleteERKonto(<Firmen-Nr>,<FIBU-Nr>,'Erfass-Nr',<Erfass-Unternr (opt.)>)",
    "category": "ER-Kontrolle",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Erfass-Nr",
        "optional": false
      },
      {
        "label": "Erfass-Unternr",
        "optional": true
      }
    ],
    "isMethod": true
  },
  {
    "name": "DeleteERKost",
    "bmdSignature": "BMD_ERKontrolle.DeleteERKost(<Firmen-Nr>,<FIBU-Nr>,'Erfass-Nr',<Erfass-Unternr>,<Kost-Unternr (opt.)>)",
    "category": "ER-Kontrolle",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Erfass-Nr",
        "optional": false
      },
      {
        "label": "Erfass-Unternr",
        "optional": false
      },
      {
        "label": "Kost-Unternr",
        "optional": true
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetLogFilename",
    "bmdSignature": "BMD_ERKontrolle.SetLogFilename('Dateiname')",
    "category": "ER-Kontrolle",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Dateiname",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateLeistungByParamList",
    "bmdSignature": "BMD_ERKontrolle.CreateLeistungByParamList(<Firmen-Nr>,<FIBU-Nr>,'Erfass-Nr',Stringlist,<UseExistingData (TRUE) (opt.)>)",
    "category": "ER-Kontrolle",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Erfass-Nr",
        "optional": false
      },
      {
        "label": "Stringlist",
        "optional": false
      },
      {
        "label": "UseExistingData (TRUE)",
        "optional": true
      }
    ],
    "isMethod": true
  },
  {
    "name": "ReadEInvoiceXMLDocument",
    "bmdSignature": "BMD_ERKontrolle.ReadEInvoiceXMLDocument(XMLDocument-Objekt,'Dateiname')",
    "category": "ER-Kontrolle",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "XMLDocument-Objekt",
        "optional": false
      },
      {
        "label": "Dateiname",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Refresh",
    "bmdSignature": "BMD_ERKontrolle.Refresh()",
    "category": "ER-Kontrolle",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "SetERKontoGrossAmountEntry",
    "bmdSignature": "BMD_ERKontrolle.SetERKontoGrossAmountEntry(<Gross Entry>)",
    "category": "ER-Kontrolle",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Gross Entry",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetWorkFlowToER",
    "bmdSignature": "BMD_ERKontrolle.SetWorkFlowToER(<Firmen-Nr>,<FIBU-Nr>,'Erfass-Nr',<Firma (ER-Workflow)>,'Workflow-Nr.')",
    "category": "ER-Kontrolle",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Erfass-Nr",
        "optional": false
      },
      {
        "label": "Firma (ER-Workflow)",
        "optional": false
      },
      {
        "label": "Workflow-Nr.",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "UpdateBuchungStatus",
    "bmdSignature": "BMD_ERKontrolle.UpdateBuchungStatus(<Firmen-Nr>,<FIBU-Nr>,'Erfass-Nr')",
    "category": "ER-Kontrolle",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Erfass-Nr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "UpdateDocument",
    "bmdSignature": "BMD_ERKontrolle.UpdateDocument(<Firmen-Nr>,<FIBU-Nr>,'Erfass-Nr')",
    "category": "ER-Kontrolle",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Erfass-Nr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "VerbuchenER",
    "bmdSignature": "BMD_ERKontrolle.VerbuchenER(<Firmen-Nr>,<FIBU-Nr>,'Erfass-Nr',<Buchungssymbol (opt.)>,<Buchungsdatum (opt.)>)",
    "category": "ER-Kontrolle",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Erfass-Nr",
        "optional": false
      },
      {
        "label": "Buchungssymbol",
        "optional": true
      },
      {
        "label": "Buchungsdatum",
        "optional": true
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateFMacroSachKonto",
    "bmdSignature": "BMD_SachKto := FibuMacroObject.CreateFMacroSachKonto('eindeutige SachKontoObj-ID')",
    "category": "Sachkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "eindeutige SachKontoObj-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetLogFilename",
    "bmdSignature": "BMD_SachKto.SetLogFilename('Dateiname')",
    "category": "Sachkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Dateiname",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Load",
    "bmdSignature": "BMD_SachKto.Load(<Firmen-Nr>,<FIBU-Nr>,<KontoNr>)",
    "category": "Sachkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "KontoNr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetValue",
    "bmdSignature": "BMD_SachKto.GetValue('Feldname')",
    "category": "Sachkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Feldname",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetValue",
    "bmdSignature": "BMD_SachKto.SetValue('Feldname','Wert')",
    "category": "Sachkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Feldname",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CSVImportVariabel",
    "bmdSignature": "BMD_SachKto.CSVImportVariabel(<Firmen-Nr>,<FIBU-Nr>,'Importdatei (z.b. Sachkonten.csv)',CSV-Importparameter (MacroStringList),'Feldauswahl','Feldauswahl <opt> (für nicht existierende Sachkonten)')",
    "category": "Sachkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Importdatei (z.b. Sachkonten.csv)",
        "optional": false
      },
      {
        "label": "CSV-Importparameter (MacroStringList)",
        "optional": false
      },
      {
        "label": "Feldauswahl",
        "optional": false
      },
      {
        "label": "Feldauswahl opt (für nicht existierende Sachkonten)",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "DeleteUmstellungsKonten",
    "bmdSignature": "BMD_SachKto.DeleteUmstellungsKonten(<Firmen-Nr>,<FIBU-Nr>)",
    "category": "Sachkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetNotiz",
    "bmdSignature": "BMD_SachKto.SetNotiz('Kontonotiz',<Anhängen (1/TRUE) oder Überschreiben (0/FALSE)>)",
    "category": "Sachkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Kontonotiz",
        "optional": false
      },
      {
        "label": "Anhängen (1/TRUE) oder Überschreiben (0/FALSE)",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateFMacroPersKonto",
    "bmdSignature": "BMD_PersKto := FibuMacroObject.CreateFMacroPersKonto('eindeutige PersKontoObj-ID')",
    "category": "Personenkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "eindeutige PersKontoObj-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetLogFilename",
    "bmdSignature": "BMD_PersKto.SetLogFilename('Dateiname')",
    "category": "Personenkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Dateiname",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Load",
    "bmdSignature": "BMD_PersKto.Load(<Firmen-Nr>,<FIBU-Nr>,<KontoNr>)",
    "category": "Personenkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "KontoNr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetValue",
    "bmdSignature": "BMD_PersKto.GetValue('Feldname')",
    "category": "Personenkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Feldname",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetValue",
    "bmdSignature": "BMD_PersKto.SetValue('Feldname','Wert')",
    "category": "Personenkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Feldname",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "PersonExists",
    "bmdSignature": "BMD_PersKto.PersonExists(<Firmen-Nr>,<KontoNr>)",
    "category": "Personenkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "KontoNr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetNotiz",
    "bmdSignature": "BMD_PersKto.SetNotiz('Kontonotiz',<Anhängen (1/TRUE) oder Überschreiben (0/FALSE)>)",
    "category": "Personenkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Kontonotiz",
        "optional": false
      },
      {
        "label": "Anhängen (1/TRUE) oder Überschreiben (0/FALSE)",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateFMacroTrSrAblauf",
    "bmdSignature": "BMD_TrSrAblauf := FibuMacroObject.CreateFMacroTrSrAblauf()",
    "category": "TR/SR-Ablauf",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Exists",
    "bmdSignature": "BMD_TrSrAblauf.Exists(<Firmen-Nr>,'TR/SR-AblaufNr')",
    "category": "TR/SR-Ablauf",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "TR/SR-AblaufNr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "ExistsWithMatchcode",
    "bmdSignature": "BMD_TrSrAblauf.ExistsWithMatchcode(<Firmen-Nr>,'TR/SR-AblaufNr')",
    "category": "TR/SR-Ablauf",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "TR/SR-AblaufNr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Insert",
    "bmdSignature": "BMD_TrSrAblauf.Insert(Stringlist)",
    "category": "TR/SR-Ablauf",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Stringlist",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Update",
    "bmdSignature": "BMD_TrSrAblauf.Update(Stringlist)",
    "category": "TR/SR-Ablauf",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Stringlist",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateFMacroFirmenwerteFibu",
    "bmdSignature": "BMD_FirmenwerteFibu := FibuMacroObject.CreateFMacroFirmenwerteFibu('eindeutige Firmenwerte-Fibu-Obj.-ID')",
    "category": "Firmenwerte Fibu",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "eindeutige Firmenwerte-Fibu-Obj.-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetLogFilename",
    "bmdSignature": "BMD_FirmenwerteFibu.SetLogFilename('Dateiname')",
    "category": "Firmenwerte Fibu",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Dateiname",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Load",
    "bmdSignature": "BMD_FirmenwerteFibu.Load(<Firmen-Nr>,<FIBU-Nr>)",
    "category": "Firmenwerte Fibu",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetValue",
    "bmdSignature": "BMD_FirmenwerteFibu.GetValue('Feldname')",
    "category": "Firmenwerte Fibu",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Feldname",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetValue",
    "bmdSignature": "BMD_FirmenwerteFibu.SetValue('Feldname','Wert')",
    "category": "Firmenwerte Fibu",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Feldname",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetValueByParamList",
    "bmdSignature": "BMD_FirmenwerteFibu.SetValueByParamList(MacroStringList)",
    "category": "Firmenwerte Fibu",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "MacroStringList",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateNewFirmaByPerson",
    "bmdSignature": "BMD_FirmenwerteFibu.CreateNewFirmaByPerson(<Firmen-Nr>,'PersonenID')",
    "category": "Firmenwerte Fibu",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "PersonenID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateNewFibu",
    "bmdSignature": "BMD_FirmenwerteFibu.CreateNewFibu(<Firmen-Nr>,<FIBU-Nr>,MacroStringList (opt.))",
    "category": "Firmenwerte Fibu",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "MacroStringList",
        "optional": true
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateVJFibu",
    "bmdSignature": "BMD_FirmenwerteFibu.CreateVJFibu(<Firmen-Nr>,<FIBU-Nr>,MacroStringList (opt.))",
    "category": "Firmenwerte Fibu",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "MacroStringList",
        "optional": true
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateFiliale",
    "bmdSignature": "BMD_FirmenwerteFibu.CreateFiliale(<Firmen-Nr>,<FIBU-Nr>,<FilialNr>,<LandNr>,'Filialbezeichnung','Währung',<OSS-Schema>)",
    "category": "Firmenwerte Fibu",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "FilialNr",
        "optional": false
      },
      {
        "label": "LandNr",
        "optional": false
      },
      {
        "label": "Filialbezeichnung",
        "optional": false
      },
      {
        "label": "Währung",
        "optional": false
      },
      {
        "label": "OSS-Schema",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "UebernahmeNumUndKtoKreise",
    "bmdSignature": "BMD_FirmenwerteFibu.UebernahmeNumUndKtoKreise()",
    "category": "Firmenwerte Fibu",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "UebernahmeFibuFiliale",
    "bmdSignature": "BMD_FirmenwerteFibu.UebernahmeFibuFiliale()",
    "category": "Firmenwerte Fibu",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "UebernahmeFixkonten",
    "bmdSignature": "BMD_FirmenwerteFibu.UebernahmeFixkonten()",
    "category": "Firmenwerte Fibu",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "UebernahmeSteuerkonten",
    "bmdSignature": "BMD_FirmenwerteFibu.UebernahmeSteuerkonten()",
    "category": "Firmenwerte Fibu",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "UebernahmeVJSaldenUndUmsaetze",
    "bmdSignature": "BMD_FirmenwerteFibu.UebernahmeVJSaldenUndUmsaetze(<Firmen-Nr>,<FIBU-Nr>)",
    "category": "Firmenwerte Fibu",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "UebernahmeBuartUndVariante",
    "bmdSignature": "BMD_FirmenwerteFibu.UebernahmeBuartUndVariante()",
    "category": "Firmenwerte Fibu",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "UebernahmeIndivBuSymbol",
    "bmdSignature": "BMD_FirmenwerteFibu.UebernahmeIndivBuSymbol()",
    "category": "Firmenwerte Fibu",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "NeuberechnenSalden",
    "bmdSignature": "BMD_FirmenwerteFibu.NeuberechnenSalden(<Firmen-Nr>,<FIBU-Nr>)",
    "category": "Firmenwerte Fibu",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "VerbuchungZumMonatsende",
    "bmdSignature": "BMD_FirmenwerteFibu.VerbuchungZumMonatsende(<Firmen-Nr>,<FIBU-Nr>,<Jahr>,<Von Periode>,<Bis Periode (opt.)>)",
    "category": "Firmenwerte Fibu",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Jahr",
        "optional": false
      },
      {
        "label": "Von Periode",
        "optional": false
      },
      {
        "label": "Bis Periode",
        "optional": true
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateFMacroSteuerkonto",
    "bmdSignature": "BMD_Steuerkonto := FibuMacroObject.CreateFMacroSteuerkonto('eindeutige Steuerkonto-Obj.-ID')",
    "category": "Steuerkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "eindeutige Steuerkonto-Obj.-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Load",
    "bmdSignature": "BMD_Steuerkonto.Load(<Firmen-Nr>,<FIBU-Nr>,<Steuercode>,<FilialNr>,<LandNr>,<Prozentsatz>,<SkontoverbuchKz>)",
    "category": "Steuerkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Steuercode",
        "optional": false
      },
      {
        "label": "FilialNr",
        "optional": false
      },
      {
        "label": "LandNr",
        "optional": false
      },
      {
        "label": "Prozentsatz",
        "optional": false
      },
      {
        "label": "SkontoverbuchKz",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetValue",
    "bmdSignature": "BMD_Steuerkonto.GetValue('Feldname')",
    "category": "Steuerkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Feldname",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "IstSteuerkonto",
    "bmdSignature": "BMD_Steuerkonto.IstSteuerkonto(<Firmen-Nr>,<FIBU-Nr>,<KontoNr>)",
    "category": "Steuerkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "KontoNr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetBuchKontoNr",
    "bmdSignature": "BMD_Steuerkonto.GetBuchKontoNr(<Firmen-Nr>,<FIBU-Nr>,<Steuercode>,<FilialNr>,<LandNr>,<Prozentsatz>,<SkontoverbuchKz>,'Feldname')",
    "category": "Steuerkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Steuercode",
        "optional": false
      },
      {
        "label": "FilialNr",
        "optional": false
      },
      {
        "label": "LandNr",
        "optional": false
      },
      {
        "label": "Prozentsatz",
        "optional": false
      },
      {
        "label": "SkontoverbuchKz",
        "optional": false
      },
      {
        "label": "Feldname",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateFMacroFixkonto",
    "bmdSignature": "BMD_Fixkonto := FibuMacroObject.CreateFMacroFixkonto('eindeutige Fixkonto-Obj.-ID')",
    "category": "Fixkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "eindeutige Fixkonto-Obj.-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Load",
    "bmdSignature": "BMD_Fixkonto.Load(<Firmen-Nr>,<FIBU-Nr>,<Kontotyp>,<Kontogruppe>,<KontenkreisNr>,<KontoNr>,<FilialNr>)",
    "category": "Fixkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Kontotyp",
        "optional": false
      },
      {
        "label": "Kontogruppe",
        "optional": false
      },
      {
        "label": "KontenkreisNr",
        "optional": false
      },
      {
        "label": "KontoNr",
        "optional": false
      },
      {
        "label": "FilialNr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetValue",
    "bmdSignature": "BMD_Fixkonto.GetValue('Feldname')",
    "category": "Fixkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Feldname",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "IstFixkonto",
    "bmdSignature": "BMD_Fixkonto.IstFixkonto(<Firmen-Nr>,<FIBU-Nr>,<KontoNr>,<Kontotyp>)",
    "category": "Fixkonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "KontoNr",
        "optional": false
      },
      {
        "label": "Kontotyp",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateFMacroAuswertungMgr",
    "bmdSignature": "BMD_AuswertungMgr := FibuMacroObject.CreateFMacroAuswertungMgr(<Firmen-Nr>,<FIBU-Nr>,'eindeutige Auswertungsmanager-Obj.-ID')",
    "category": "Auswertungsmanager",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "eindeutige Auswertungsmanager-Obj.-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetParam",
    "bmdSignature": "BMD_AuswertungMgr.SetParam('Parameterbezeichnung','Ausprägung')",
    "category": "Auswertungsmanager",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Parameterbezeichnung",
        "optional": false
      },
      {
        "label": "Ausprägung",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "LoadDaten",
    "bmdSignature": "BMD_AuswertungMgr.LoadDaten()",
    "category": "Auswertungsmanager",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Count",
    "bmdSignature": "BMD_AuswertungMgr.Count()",
    "category": "Auswertungsmanager",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetKontoByIndex",
    "bmdSignature": "BMD_AuswertungMgr.GetKontoByIndex(<Index>)",
    "category": "Auswertungsmanager",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Index",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetKontoByKontoNr",
    "bmdSignature": "BMD_AuswertungMgr.GetKontoByKontoNr(<KontoNr>)",
    "category": "Auswertungsmanager",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "KontoNr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateFMacroAuswertungKonto",
    "bmdSignature": "BMD_AuswertungKonto := FibuMacroObject.CreateFMacroAuswertungKonto('eindeutige Auswertungskonto-Obj.-ID')",
    "category": "Auswertungskonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "eindeutige Auswertungskonto-Obj.-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetKontoNr",
    "bmdSignature": "BMD_AuswertungKonto.GetKontoNr()",
    "category": "Auswertungskonto",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetMonSaldo",
    "bmdSignature": "BMD_AuswertungKonto.GetMonSaldo(<Monat>)",
    "category": "Auswertungskonto",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Monat",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetEBSaldo",
    "bmdSignature": "BMD_AuswertungKonto.GetEBSaldo()",
    "category": "Auswertungskonto",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "GetBilanzsaldo",
    "bmdSignature": "BMD_AuswertungKonto.GetBilanzsaldo()",
    "category": "Auswertungskonto",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "CreateFMacroOPZuordnung",
    "bmdSignature": "BMD_OPZuordnung := FibuMacroObject.CreateFMacroOPZuordnung('eindeutige OP-Zuordnungs-Obj.-ID')",
    "category": "Offene Posten",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "eindeutige OP-Zuordnungs-Obj.-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetData",
    "bmdSignature": "BMD_OPZuordnung.GetData('Feldbezeichnung')",
    "category": "Offene Posten",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Feldbezeichnung",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateFMacroOPAbstattung",
    "bmdSignature": "BMD_OPAbstattung := FibuMacroObject.CreateFMacroOPAbstattung('eindeutige OP-Abstattungs-Obj.-ID')",
    "category": "Offene Posten",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "eindeutige OP-Abstattungs-Obj.-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "AutomAuszifferungRngZlg",
    "bmdSignature": "BMD_OPAbstattung.AutomAuszifferungRngZlg(<Firmen-Nr>,<FIBU-Nr>,<Von Konto-Nr>,<Bis Konto-Nr>,<Auszifferungsfeld>,<Mit Meldung>,<Betragsgleichheit>)",
    "category": "Offene Posten",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Von Konto-Nr",
        "optional": false
      },
      {
        "label": "Bis Konto-Nr",
        "optional": false
      },
      {
        "label": "Auszifferungsfeld",
        "optional": false
      },
      {
        "label": "Mit Meldung",
        "optional": false
      },
      {
        "label": "Betragsgleichheit",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "AutomAuszifferungWennSaldo0",
    "bmdSignature": "BMD_OPAbstattung.AutomAuszifferungWennSaldo0(<Firmen-Nr>,<FIBU-Nr>,<Von Konto-Nr>,<Bis Konto-Nr>,<Mit Meldung (opt.)>)",
    "category": "Offene Posten",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Von Konto-Nr",
        "optional": false
      },
      {
        "label": "Bis Konto-Nr",
        "optional": false
      },
      {
        "label": "Mit Meldung",
        "optional": true
      }
    ],
    "isMethod": true
  },
  {
    "name": "AddOPToBuchung",
    "bmdSignature": "BMD_OPAbstattung.AddOPToBuchung(<Firmen-Nr>,<FIBU-Nr>,Liste der OP-Buchungen (MacroBuchungList),Liste der OP-Suchkriterien (MacroList),'Logdatei (z. B. FIBUIMPORT.LOG)',Liste der OP-Zahlungskonditionen (MacroStringList) <opt>)",
    "category": "Offene Posten",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Liste der OP-Buchungen (MacroBuchungList)",
        "optional": false
      },
      {
        "label": "Liste der OP-Suchkriterien (MacroList)",
        "optional": false
      },
      {
        "label": "Logdatei (z. B. FIBUIMPORT.LOG)",
        "optional": false
      },
      {
        "label": "Liste der OP-Zahlungskonditionen (MacroStringList) opt",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateFMacroDokumentZu",
    "bmdSignature": "BMD_DokumentZuordnung := FibuMacroObject.CreateFMacroDokumentZu('eindeutige Dokumenten-Zuord.-Obj.-ID')",
    "category": "Dokumentenzuordnung",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "eindeutige Dokumenten-Zuord.-Obj.-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "AddDocumentToBuchungId",
    "bmdSignature": "BMD_DokumentZuordnung.AddDocumentToBuchungId(<Firmen-Nr>,<FIBU-Nr>,<Buchung-ID>,'Dateiname',<DocStempeln (opt.)>)",
    "category": "Dokumentenzuordnung",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Buchung-ID",
        "optional": false
      },
      {
        "label": "Dateiname",
        "optional": false
      },
      {
        "label": "DocStempeln",
        "optional": true
      }
    ],
    "isMethod": true
  },
  {
    "name": "AddDocumentToArchiv",
    "bmdSignature": "BMD_DokumentZuordnung.AddDocumentToArchiv('Parameter',<Dokument>)",
    "category": "Dokumentenzuordnung",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Parameter",
        "optional": false
      },
      {
        "label": "Dokument",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "AddDocumentToExternArchiv",
    "bmdSignature": "BMD_DokumentZuordnung.AddDocumentToExternArchiv('Parameter')",
    "category": "Dokumentenzuordnung",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Parameter",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "ExportDocumentByDKZID",
    "bmdSignature": "BMD_DokumentZuordnung.ExportDocumentByDKZID(<Dokumentenzuordnungs-ID (DKZ-ID)>,'Export-Pfad',MacroStringList (opt.))",
    "category": "Dokumentenzuordnung",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Dokumentenzuordnungs-ID (DKZ-ID)",
        "optional": false
      },
      {
        "label": "Export-Pfad",
        "optional": false
      },
      {
        "label": "MacroStringList",
        "optional": true
      }
    ],
    "isMethod": true
  },
  {
    "name": "DokumentUpdateByBelegId",
    "bmdSignature": "BMD_DokumentZuordnung.DokumentUpdateByBelegId(<Firmen-Nr>,<FIBU-Nr>,<BelegID>,<Typ der Dokumente>)",
    "category": "Dokumentenzuordnung",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "BelegID",
        "optional": false
      },
      {
        "label": "Typ der Dokumente",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateFMacroUVAWerte",
    "bmdSignature": "BMD_UVAWerte := FibuMacroObject.CreateFMacroUVAWerte('eindeutige UVAWerteObj-ID')",
    "category": "UVA Werte",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "eindeutige UVAWerteObj-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "ClearList",
    "bmdSignature": "BMD_UVAWerte.ClearList()",
    "category": "UVA Werte",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "Count",
    "bmdSignature": "BMD_UVAWerte.Count()",
    "category": "UVA Werte",
    "availability": "FIBU",
    "parameters": [],
    "isMethod": true
  },
  {
    "name": "AddValueToList",
    "bmdSignature": "BMD_UVAWerte.AddValueToList(<LandNr>,<Periode>,<UVA-Feld-Nr.>,<Bemessung>,<Steuer>)",
    "category": "UVA Werte",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "LandNr",
        "optional": false
      },
      {
        "label": "Periode",
        "optional": false
      },
      {
        "label": "UVA-Feld-Nr.",
        "optional": false
      },
      {
        "label": "Bemessung",
        "optional": false
      },
      {
        "label": "Steuer",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "ImportList",
    "bmdSignature": "BMD_UVAWerte.ImportList(<Firmen-Nr>,<FIBUNr>,'Logfile')",
    "category": "UVA Werte",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBUNr",
        "optional": false
      },
      {
        "label": "Logfile",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateFMacroFiliale",
    "bmdSignature": "BMD_Filiale := FibuMacroObject.CreateFMacroFiliale('eindeutige Filiale-Obj.-ID')",
    "category": "Filiale",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "eindeutige Filiale-Obj.-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Load",
    "bmdSignature": "BMD_Filiale.Load(<Firmen-Nr>,<FIBUNr>,<FilialNr>)",
    "category": "Filiale",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBUNr",
        "optional": false
      },
      {
        "label": "FilialNr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetValue",
    "bmdSignature": "BMD_Filiale.GetValue('Feldname')",
    "category": "Filiale",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Feldname",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "ExistsFiliale",
    "bmdSignature": "BMD_Filiale.ExistsFiliale(<Firmen-Nr>,<FIBUNr>,<LandNr>)",
    "category": "Filiale",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBUNr",
        "optional": false
      },
      {
        "label": "LandNr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateFMacroBuchung",
    "bmdSignature": "BMD_Buchung := FibuMacroObject.CreateFMacroBuchung('eindeutige Buchungs-Obj.-ID')",
    "category": "Buchung",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "eindeutige Buchungs-Obj.-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetValue",
    "bmdSignature": "BMD_Buchung.SetValue(<Firmen-Nr>,<FIBUNr>,<Buchungs-ID>,Liste mit Feldnamen/Feldwerten (MacroStringList))",
    "category": "Buchung",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBUNr",
        "optional": false
      },
      {
        "label": "Buchungs-ID",
        "optional": false
      },
      {
        "label": "Liste mit Feldnamen/Feldwerten (MacroStringList)",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateFMacroFirmenwerteKore",
    "bmdSignature": "BMD_FirmenwerteKore := KoreMacroObject.CreateFMacroFirmenwerteKore('eindeutige Firmenwerte-Kore-Obj.-ID')",
    "category": "Firmenwerte KORE",
    "availability": "KORE",
    "parameters": [
      {
        "label": "eindeutige Firmenwerte-Kore-Obj.-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Load",
    "bmdSignature": "BMD_FirmenwerteKore.Load(<Firmen-Nr>,<KORE-Nr>)",
    "category": "Firmenwerte KORE",
    "availability": "KORE",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "KORE-Nr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetValue",
    "bmdSignature": "BMD_FirmenwerteKore.GetValue('Feldname')",
    "category": "Firmenwerte KORE",
    "availability": "KORE",
    "parameters": [
      {
        "label": "Feldname",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Exists",
    "bmdSignature": "BMD_FirmenwerteKore.Exists(<Firmen-Nr>,<KORE-Nr>)",
    "category": "Firmenwerte KORE",
    "availability": "KORE",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "KORE-Nr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetValue",
    "bmdSignature": "BMD_FirmenwerteKore.SetValue('Feldname','Wert')",
    "category": "Firmenwerte KORE",
    "availability": "KORE",
    "parameters": [
      {
        "label": "Feldname",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetValueByParamList",
    "bmdSignature": "BMD_FirmenwerteKore.SetValueByParamList(MacroStringList)",
    "category": "Firmenwerte KORE",
    "availability": "KORE",
    "parameters": [
      {
        "label": "MacroStringList",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateNewKore",
    "bmdSignature": "BMD_FirmenwerteKore.CreateNewKore(<Firmen-Nr>,<KORE-Nr>,MacroStringList (opt.))",
    "category": "Firmenwerte KORE",
    "availability": "KORE",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "KORE-Nr",
        "optional": false
      },
      {
        "label": "MacroStringList",
        "optional": true
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateVJKore",
    "bmdSignature": "BMD_FirmenwerteKore.CreateVJKore(<Firmen-Nr>,<KORE-Nr>,MacroStringList (opt.))",
    "category": "Firmenwerte KORE",
    "availability": "KORE",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "KORE-Nr",
        "optional": false
      },
      {
        "label": "MacroStringList",
        "optional": true
      }
    ],
    "isMethod": true
  },
  {
    "name": "KoreFibuZuordnung",
    "bmdSignature": "BMD_FirmenwerteKore.KoreFibuZuordnung(<KoreFirmenNr>,<KORE-Nr>,<FibuFirmenNr>,<FIBU-Nr>)",
    "category": "Firmenwerte KORE",
    "availability": "KORE",
    "parameters": [
      {
        "label": "KoreFirmenNr",
        "optional": false
      },
      {
        "label": "KORE-Nr",
        "optional": false
      },
      {
        "label": "FibuFirmenNr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateFMacroKostenstammdaten",
    "bmdSignature": "BMD_Kostenstammdaten := KoreMacroObject.CreateFMacroKostenstammdaten('eindeutige Kostenstammdaten-Obj.-ID')",
    "category": "Kostenstammdaten",
    "availability": "KORE",
    "parameters": [
      {
        "label": "eindeutige Kostenstammdaten-Obj.-ID",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "Load",
    "bmdSignature": "BMD_Kostenstammdaten.Load(<Firmen-Nr>,<KORE-Nr>,<Kostentyp>,'Kosten-Nr.')",
    "category": "Kostenstammdaten",
    "availability": "KORE",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "KORE-Nr",
        "optional": false
      },
      {
        "label": "Kostentyp",
        "optional": false
      },
      {
        "label": "Kosten-Nr.",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "GetValue",
    "bmdSignature": "BMD_Kostenstammdaten.GetValue('Feldname')",
    "category": "Kostenstammdaten",
    "availability": "KORE",
    "parameters": [
      {
        "label": "Feldname",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetValue",
    "bmdSignature": "BMD_Kostenstammdaten.SetValue('Feldname','Wert')",
    "category": "Kostenstammdaten",
    "availability": "KORE",
    "parameters": [
      {
        "label": "Feldname",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "SetValueByParamList",
    "bmdSignature": "BMD_Kostenstammdaten.SetValueByParamList(MacroStringList)",
    "category": "Kostenstammdaten",
    "availability": "KORE",
    "parameters": [
      {
        "label": "MacroStringList",
        "optional": false
      }
    ],
    "isMethod": true
  },
  {
    "name": "CreateNewKostentyp",
    "bmdSignature": "BMD_Kostenstammdaten.CreateNewKostentyp(<Firmen-Nr>,<KORE-Nr>,<Kostentyp>,'Kosten-Nr.','Bezeichnung (opt.)',MacroStringList (opt.))",
    "category": "Kostenstammdaten",
    "availability": "KORE",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "KORE-Nr",
        "optional": false
      },
      {
        "label": "Kostentyp",
        "optional": false
      },
      {
        "label": "Kosten-Nr.",
        "optional": false
      },
      {
        "label": "Bezeichnung",
        "optional": true
      },
      {
        "label": "MacroStringList",
        "optional": true
      }
    ],
    "isMethod": true
  },
  {
    "name": "UmlRf_GetNextNo",
    "bmdSignature": "BMD_UMLRF_GETNEXTNO(<Firmen-Nr>,<KORE-Nr>,<Umlagevarianten-Nr.>)",
    "category": "Umlagereihenfolge",
    "availability": "KORE",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "KORE-Nr",
        "optional": false
      },
      {
        "label": "Umlagevarianten-Nr.",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "UmlRf_GetReihenfolgeByKostenNr",
    "bmdSignature": "BMD_UMLRF_GET_REIHENFOLGE_BY_KOSTENNR(<Firmen-Nr>,<KORE-Nr>,<Umlagevarianten-Nr.>,<Kostentyp>,'Kosten-Nr.')",
    "category": "Umlagereihenfolge",
    "availability": "KORE",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "KORE-Nr",
        "optional": false
      },
      {
        "label": "Umlagevarianten-Nr.",
        "optional": false
      },
      {
        "label": "Kostentyp",
        "optional": false
      },
      {
        "label": "Kosten-Nr.",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "UmlRf_GetReihenfolgeByKostenNrSchluessel",
    "bmdSignature": "BMD_UMLRF_GET_REIHENFOLGE_BY_KOSTENNR_SCHL(<Firmen-Nr>,<KORE-Nr>,<Umlagevarianten-Nr.>,<Kostentyp>,'Kosten-Nr.','Kostenschlüssel')",
    "category": "Umlagereihenfolge",
    "availability": "KORE",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "KORE-Nr",
        "optional": false
      },
      {
        "label": "Umlagevarianten-Nr.",
        "optional": false
      },
      {
        "label": "Kostentyp",
        "optional": false
      },
      {
        "label": "Kosten-Nr.",
        "optional": false
      },
      {
        "label": "Kostenschlüssel",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "UmlRf_Insert",
    "bmdSignature": "BMD_UMLRF_INSERT(<Firmen-Nr>,<KORE-Nr>,<Umlagevarianten-Nr.>,<Reihenfolge>,<Kostentyp>,'Kosten-Nr.','Kostenschlüssel')",
    "category": "Umlagereihenfolge",
    "availability": "KORE",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "KORE-Nr",
        "optional": false
      },
      {
        "label": "Umlagevarianten-Nr.",
        "optional": false
      },
      {
        "label": "Reihenfolge",
        "optional": false
      },
      {
        "label": "Kostentyp",
        "optional": false
      },
      {
        "label": "Kosten-Nr.",
        "optional": false
      },
      {
        "label": "Kostenschlüssel",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "UmlRf_Update",
    "bmdSignature": "BMD_UMLRF_UPDATE(<Firmen-Nr>,<KORE-Nr>,<Umlagevarianten-Nr.>,<Reihenfolge>,<Kostentyp>,'Kosten-Nr.','Kostenschlüssel')",
    "category": "Umlagereihenfolge",
    "availability": "KORE",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "KORE-Nr",
        "optional": false
      },
      {
        "label": "Umlagevarianten-Nr.",
        "optional": false
      },
      {
        "label": "Reihenfolge",
        "optional": false
      },
      {
        "label": "Kostentyp",
        "optional": false
      },
      {
        "label": "Kosten-Nr.",
        "optional": false
      },
      {
        "label": "Kostenschlüssel",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "CopyFileAfterExecute",
    "bmdSignature": "BMD_CopyFileAfterExecute('Dateiname','neuer Dateiname',<Datei löschen>,<Option>)",
    "category": "Buchungsdatei",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Dateiname",
        "optional": false
      },
      {
        "label": "neuer Dateiname",
        "optional": false
      },
      {
        "label": "Datei löschen",
        "optional": false
      },
      {
        "label": "Option",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "ExecuteAuszifferungAfterImport",
    "bmdSignature": "BMD_ExecuteAuszifferungAfterImport(<Firmen-Nr>,<FIBU-Nr>,<Von Konto-Nr>,<Bis Konto-Nr>,<Auszifferungsfeld>,<Mit Meldung>)",
    "category": "Buchungsdatei",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Firmen-Nr",
        "optional": false
      },
      {
        "label": "FIBU-Nr",
        "optional": false
      },
      {
        "label": "Von Konto-Nr",
        "optional": false
      },
      {
        "label": "Bis Konto-Nr",
        "optional": false
      },
      {
        "label": "Auszifferungsfeld",
        "optional": false
      },
      {
        "label": "Mit Meldung",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "WriteBuerfAfterExecute",
    "bmdSignature": "BMD_WriteBuerfAfterExecute('Dateiname')",
    "category": "Buchungsdatei",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Dateiname",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "READ_BUERF_PARAMETER",
    "bmdSignature": "BMD_READ_BUERF_PARAMETER('Parameter-Typ','Key',<Feld-Nr. (opt.)>,<FirmenNr (opt.)>,<FIBUNr (opt.)>)",
    "category": "Buchungsdatei",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Parameter-Typ",
        "optional": false
      },
      {
        "label": "Key",
        "optional": false
      },
      {
        "label": "Feld-Nr.",
        "optional": true
      },
      {
        "label": "FirmenNr",
        "optional": true
      },
      {
        "label": "FIBUNr",
        "optional": true
      }
    ],
    "isMethod": false
  },
  {
    "name": "READ_BUERF_PARAMETER_TO_MACROSTRINGLIST",
    "bmdSignature": "BMD_READ_BUERF_PARAMETER_TO_MACROSTRINGLIST('Parameter-Typ',MacroStringList,<FirmenNr (opt.)>,<FIBUNr (opt.)>)",
    "category": "Buchungsdatei",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Parameter-Typ",
        "optional": false
      },
      {
        "label": "MacroStringList",
        "optional": false
      },
      {
        "label": "FirmenNr",
        "optional": true
      },
      {
        "label": "FIBUNr",
        "optional": true
      }
    ],
    "isMethod": false
  },
  {
    "name": "WRITE_BUERF_PARAMETER",
    "bmdSignature": "BMD_WRITE_BUERF_PARAMETER('Parameter-Typ','Key','Wert',<Feld-Nr. (opt.)>,<FirmenNr (opt.)>,<FIBUNr (opt.)>)",
    "category": "Buchungsdatei",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "Parameter-Typ",
        "optional": false
      },
      {
        "label": "Key",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      },
      {
        "label": "Feld-Nr.",
        "optional": true
      },
      {
        "label": "FirmenNr",
        "optional": true
      },
      {
        "label": "FIBUNr",
        "optional": true
      }
    ],
    "isMethod": false
  },
  {
    "name": "WriteExportdateToBUC",
    "bmdSignature": "BMD_WriteExportdateToBUC(<FirmenNr>,<FIBUNr>,<Buchungs-ID>,<Export-Datum>)",
    "category": "Buchungsdatei",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "FirmenNr",
        "optional": false
      },
      {
        "label": "FIBUNr",
        "optional": false
      },
      {
        "label": "Buchungs-ID",
        "optional": false
      },
      {
        "label": "Export-Datum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "WriteExportdateToKTO",
    "bmdSignature": "BMD_WriteExportdateToKTO(<FirmenNr>,<FIBUNr>,<Kto-Nr>,<Export-Datum>)",
    "category": "Buchungsdatei",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "FirmenNr",
        "optional": false
      },
      {
        "label": "FIBUNr",
        "optional": false
      },
      {
        "label": "Kto-Nr",
        "optional": false
      },
      {
        "label": "Export-Datum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "WriteExportdateToBeleg",
    "bmdSignature": "BMD_WriteExportdateToBeleg(<FirmenNr>,<FIBUNr>,<Beleg-ID>,<Export-Datum>)",
    "category": "Buchungsdatei",
    "availability": "FIBU",
    "parameters": [
      {
        "label": "FirmenNr",
        "optional": false
      },
      {
        "label": "FIBUNr",
        "optional": false
      },
      {
        "label": "Beleg-ID",
        "optional": false
      },
      {
        "label": "Export-Datum",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "AddInputField",
    "bmdSignature": "BMD_HRS_ADDINPUTFIELD('Konstantenname','Feldbezeichnung',<Feldart>,'Vorschlagswert')",
    "category": "Abfragen",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Konstantenname",
        "optional": false
      },
      {
        "label": "Feldbezeichnung",
        "optional": false
      },
      {
        "label": "Feldart",
        "optional": false
      },
      {
        "label": "Vorschlagswert",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "AddInputField Combobox",
    "bmdSignature": "BMD_HRS_ADDINPUTFIELD_COMBOBOX('Konstantenname','Feldbezeichnung','Wert1,Wert2,...','Text1,Text2,...')",
    "category": "Abfragen",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Konstantenname",
        "optional": false
      },
      {
        "label": "Feldbezeichnung",
        "optional": false
      },
      {
        "label": "Wert1",
        "optional": false
      },
      {
        "label": "Wert2",
        "optional": false
      },
      {
        "label": "...",
        "optional": false
      },
      {
        "label": "Text1",
        "optional": false
      },
      {
        "label": "Text2",
        "optional": false
      },
      {
        "label": "...",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Abfragedialog starten",
    "bmdSignature": "BMD_HRS_ABFRAGE_START('Fenstertitel')",
    "category": "Abfragen",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Fenstertitel",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "GetInputValue",
    "bmdSignature": "BMD_HRS_GETINPUTVALUE('Konstantenname')",
    "category": "Abfragen",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Konstantenname",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Firma",
    "bmdSignature": "BMD_HRS_KORE_FIRMA('Firma')",
    "category": "KORE",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Firma",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Aktuelle KORE",
    "bmdSignature": "BMD_HRS_KORE_ACTUAL_KORE('Firma')",
    "category": "KORE",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Firma",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Kostenstammdaten anlegen",
    "bmdSignature": "BMD_HRS_INSERT_COSTTYPE('Firma','KORE-Nr','Kostentyp','Kosten-Nummer','Kosten-Bezeichnung')",
    "category": "KORE",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Firma",
        "optional": false
      },
      {
        "label": "KORE-Nr",
        "optional": false
      },
      {
        "label": "Kostentyp",
        "optional": false
      },
      {
        "label": "Kosten-Nummer",
        "optional": false
      },
      {
        "label": "Kosten-Bezeichnung",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "SetDBValueDoNotValidate",
    "bmdSignature": "BMD_DIENSTREISE_SETDBVALUE_NOVALIDATION('Feldname','Wert')",
    "category": "Dienstreise / Funktionen (nach Speichern einer Reise)",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Feldname",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Fixwert",
    "bmdSignature": "BMD_LGV_FIXWERT('Lohnart','Lohnartengruppe','Prueflohnart',<Betrag/Satz>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Lohnart",
        "optional": false
      },
      {
        "label": "Lohnartengruppe",
        "optional": false
      },
      {
        "label": "Prueflohnart",
        "optional": false
      },
      {
        "label": "Betrag/Satz",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Fixwert KV",
    "bmdSignature": "BMD_LGV_FIXWERTKV('Lohnart','Lohnartengruppe','Prueflohnart',<Betrag/Satz>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Lohnart",
        "optional": false
      },
      {
        "label": "Lohnartengruppe",
        "optional": false
      },
      {
        "label": "Prueflohnart",
        "optional": false
      },
      {
        "label": "Betrag/Satz",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Lohnart",
    "bmdSignature": "BMD_LGV_LOHNART('Lohnartengruppe','Prueflohnart ist irrelevant',<Pflichtigkeit>,<Wertigkeit>,<Anzahl Monate>,<Summe/Durchschnitt>,<Ausgangsjahr>,<Ausgangsmonat>,<Grenze>,<Hochrechnen>,<Ueberwiegend>,<Ist/Org>,<Dienstverhältnis>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Lohnartengruppe",
        "optional": false
      },
      {
        "label": "Prueflohnart ist irrelevant",
        "optional": false
      },
      {
        "label": "Pflichtigkeit",
        "optional": false
      },
      {
        "label": "Wertigkeit",
        "optional": false
      },
      {
        "label": "Anzahl Monate",
        "optional": false
      },
      {
        "label": "Summe/Durchschnitt",
        "optional": false
      },
      {
        "label": "Ausgangsjahr",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      },
      {
        "label": "Grenze",
        "optional": false
      },
      {
        "label": "Hochrechnen",
        "optional": false
      },
      {
        "label": "Ueberwiegend",
        "optional": false
      },
      {
        "label": "Ist/Org",
        "optional": false
      },
      {
        "label": "Dienstverhältnis",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Lohnart-Pflichtigkeit",
    "bmdSignature": "BMD_LGV_LOHNART_PFLICHTIGKEIT(<Vergleich>,<Auslandstaetigkeit (beguenstigt)>,<Lohnsteuer (gem. EStG)>,<Sonstige Werbungskosten>,<Jahressechstel>,<Sonstige WK (L16-Zuordnung)>,<Nicht zu erfassende Bezuege 25>,<Pflegegeld>,<SV>,<SV-Zahlen>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Vergleich",
        "optional": false
      },
      {
        "label": "Auslandstaetigkeit (beguenstigt)",
        "optional": false
      },
      {
        "label": "Lohnsteuer (gem. EStG)",
        "optional": false
      },
      {
        "label": "Sonstige Werbungskosten",
        "optional": false
      },
      {
        "label": "Jahressechstel",
        "optional": false
      },
      {
        "label": "Sonstige WK (L16-Zuordnung)",
        "optional": false
      },
      {
        "label": "Nicht zu erfassende Bezuege 25",
        "optional": false
      },
      {
        "label": "Pflegegeld",
        "optional": false
      },
      {
        "label": "SV",
        "optional": false
      },
      {
        "label": "SV-Zahlen",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Lohnart hat Pflichtigkeit",
    "bmdSignature": "BMD_LGV_LOHNART_HAT_PFLICHTIGKEIT(<Wert>,<Vergleich>,<Auslandstaetigkeit (beguenstigt)>,<Lohnsteuer (gem. EStG)>,<Sonstige Werbungskosten>,<Jahressechstel>,<Sonstige WK (L16-Zuordnung)>,<Nicht zu erfassende Bezuege 25>,<Pflegegeld>,<SV>,<SV-Zah>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Wert",
        "optional": false
      },
      {
        "label": "Vergleich",
        "optional": false
      },
      {
        "label": "Auslandstaetigkeit (beguenstigt)",
        "optional": false
      },
      {
        "label": "Lohnsteuer (gem. EStG)",
        "optional": false
      },
      {
        "label": "Sonstige Werbungskosten",
        "optional": false
      },
      {
        "label": "Jahressechstel",
        "optional": false
      },
      {
        "label": "Sonstige WK (L16-Zuordnung)",
        "optional": false
      },
      {
        "label": "Nicht zu erfassende Bezuege 25",
        "optional": false
      },
      {
        "label": "Pflegegeld",
        "optional": false
      },
      {
        "label": "SV",
        "optional": false
      },
      {
        "label": "SV-Zah",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Lohnart ist in Lohnartengruppe",
    "bmdSignature": "BMD_LGV_LOHNART_IN_LOHNARTENGRUPPE(<Wert>,'Lohnartengruppe')",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Wert",
        "optional": false
      },
      {
        "label": "Lohnartengruppe",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Dauer",
    "bmdSignature": "BMD_LGV_DAUER(<Art>,<Genauigkeit>,<Anzahl Monate>,<Summe/Durchschnitt>,<Ausgangsjahr>,<Ausgangsmonat>,<Grenze>,<Dienstverhältnis>,<Ist/Org>,'LA-Gruppe Beobachtungszeitraum (+)','LA-Gruppe Beobachtungszeitraum (-)','DV-Beginn beruecksichtigen','DV-Ende beruecksichtigen')",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Art",
        "optional": false
      },
      {
        "label": "Genauigkeit",
        "optional": false
      },
      {
        "label": "Anzahl Monate",
        "optional": false
      },
      {
        "label": "Summe/Durchschnitt",
        "optional": false
      },
      {
        "label": "Ausgangsjahr",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      },
      {
        "label": "Grenze",
        "optional": false
      },
      {
        "label": "Dienstverhältnis",
        "optional": false
      },
      {
        "label": "Ist/Org",
        "optional": false
      },
      {
        "label": "LA-Gruppe Beobachtungszeitraum (+)",
        "optional": false
      },
      {
        "label": "LA-Gruppe Beobachtungszeitraum (-)",
        "optional": false
      },
      {
        "label": "DV-Beginn beruecksichtigen",
        "optional": false
      },
      {
        "label": "DV-Ende beruecksichtigen",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Aliquotierung",
    "bmdSignature": "BMD_LGV_ALIQUOTIERUNG(<Wert>,<Art>,<Genauigkeit>,<Grenze>,'Grenz-Lohnartengruppe',<Abzueglich Krankzeitraum>,<DV-Beginn beruecksichtigen>,<DV-Ende beruecksichtigen>,'LA-Gruppe Beobachtungszeitraum (+)','LA-Gruppe Beobachtungszeitraum (-)',<Ausgangsmonat>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Wert",
        "optional": false
      },
      {
        "label": "Art",
        "optional": false
      },
      {
        "label": "Genauigkeit",
        "optional": false
      },
      {
        "label": "Grenze",
        "optional": false
      },
      {
        "label": "Grenz-Lohnartengruppe",
        "optional": false
      },
      {
        "label": "Abzueglich Krankzeitraum",
        "optional": false
      },
      {
        "label": "DV-Beginn beruecksichtigen",
        "optional": false
      },
      {
        "label": "DV-Ende beruecksichtigen",
        "optional": false
      },
      {
        "label": "LA-Gruppe Beobachtungszeitraum (+)",
        "optional": false
      },
      {
        "label": "LA-Gruppe Beobachtungszeitraum (-)",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "L/G-Tabelle",
    "bmdSignature": "BMD_LGV_LGTABELLE(<KV-Nummer>,<Unternummer>,<Verwendungsgruppe>,<Beschaeftigungsjahr>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "KV-Nummer",
        "optional": false
      },
      {
        "label": "Unternummer",
        "optional": false
      },
      {
        "label": "Verwendungsgruppe",
        "optional": false
      },
      {
        "label": "Beschaeftigungsjahr",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Berechnungen ausführen",
    "bmdSignature": "BMD_LGV_EXECMACRO(<Berechnung>,<Aliquotierung(en) anwenden>,<Ausgangsmonat>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Berechnung",
        "optional": false
      },
      {
        "label": "Aliquotierung(en) anwenden",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Nichtleistungszeiten",
    "bmdSignature": "BMD_LGV_NLZ(<Art>,'Gutstunden/Diverse NLZ',<Verbrauch/Anspruch/Rest>,<Verwaltung/Bezahlt>,<Anspruchsumfang>,<Anzahl Monate>,<Summe/Durchschnitt>,<Ausgangsjahr>,<Ausgangsmonat>,<Grenze>,<Dienstverhältnis>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Art",
        "optional": false
      },
      {
        "label": "Gutstunden/Diverse NLZ",
        "optional": false
      },
      {
        "label": "Verbrauch/Anspruch/Rest",
        "optional": false
      },
      {
        "label": "Verwaltung/Bezahlt",
        "optional": false
      },
      {
        "label": "Anspruchsumfang",
        "optional": false
      },
      {
        "label": "Anzahl Monate",
        "optional": false
      },
      {
        "label": "Summe/Durchschnitt",
        "optional": false
      },
      {
        "label": "Ausgangsjahr",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      },
      {
        "label": "Grenze",
        "optional": false
      },
      {
        "label": "Dienstverhältnis",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Faktorentabelle",
    "bmdSignature": "BMD_LGV_FAKTORENTABELLE('Faktorentabelle',<Eingabewert>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Faktorentabelle",
        "optional": false
      },
      {
        "label": "Eingabewert",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Dienstzeit",
    "bmdSignature": "BMD_LGV_DIENSTZEIT(<Vordienstzeit beruecksichtigen>,'Ruhenszeit beruecksichtigen',<Ergebnis in>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Vordienstzeit beruecksichtigen",
        "optional": false
      },
      {
        "label": "Ruhenszeit beruecksichtigen",
        "optional": false
      },
      {
        "label": "Ergebnis in",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Alter",
    "bmdSignature": "BMD_LGV_ALTER(<Ergebnis in>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Ergebnis in",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Schnitt",
    "bmdSignature": "BMD_LGV_SCHNITT(<Schnitt-Nr.>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Schnitt-Nr.",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Fixwert speichern",
    "bmdSignature": "BMD_LGV_FIXWERT_SPEICHERN(<Wert>,'Fixwert-Lohnart',<Betrag/Satz>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Wert",
        "optional": false
      },
      {
        "label": "Fixwert-Lohnart",
        "optional": false
      },
      {
        "label": "Betrag/Satz",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "zeitlich letztes aktives DV des Berechnungsmonats",
    "bmdSignature": "BMD_LGV_ZEITLICH_MAX_DV()",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Arbeitsrechtlicher Beginn",
    "bmdSignature": "BMD_LGV_ARBEITSRECHT_BEGINN()",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "durchschnittliche Wochenarbeitszeit",
    "bmdSignature": "BMD_LGV_DURCHSCHNITT_WAZ(<Ausgangsjahr>,<Ausgangsmonat>,<Anzahl Monate>,<Grenze>,<Dienstverhältnis>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Ausgangsjahr",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      },
      {
        "label": "Anzahl Monate",
        "optional": false
      },
      {
        "label": "Grenze",
        "optional": false
      },
      {
        "label": "Dienstverhältnis",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Feldwert-Änderung",
    "bmdSignature": "BMD_LGV_FIELDVALUECHANGE(<Feld>,<Ausgangsjahr>,<Ausgangsmonat>,<Anzahl Monate>,<Grenze>,<Dienstverhältnis>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Feld",
        "optional": false
      },
      {
        "label": "Ausgangsjahr",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      },
      {
        "label": "Anzahl Monate",
        "optional": false
      },
      {
        "label": "Grenze",
        "optional": false
      },
      {
        "label": "Dienstverhältnis",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Feldwert-Verhältnis",
    "bmdSignature": "BMD_LGV_FIELDVALUERATIO(<Feld>,<Ausgangsjahr>,<Ausgangsmonat>,<Anzahl Monate>,<Grenze>,<Dienstverhältnis>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Feld",
        "optional": false
      },
      {
        "label": "Ausgangsjahr",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      },
      {
        "label": "Anzahl Monate",
        "optional": false
      },
      {
        "label": "Grenze",
        "optional": false
      },
      {
        "label": "Dienstverhältnis",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "durchschn. Monatsteiler",
    "bmdSignature": "BMD_LGV_TEILER_MONAT(<Ausgangsjahr>,<Ausgangsmonat>,<Anzahl Monate>,<Grenze>,<Dienstverhältnis>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Ausgangsjahr",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      },
      {
        "label": "Anzahl Monate",
        "optional": false
      },
      {
        "label": "Grenze",
        "optional": false
      },
      {
        "label": "Dienstverhältnis",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "durchschn. Tagesteiler",
    "bmdSignature": "BMD_LGV_TEILER_TAG(<Ausgangsjahr>,<Ausgangsmonat>,<Anzahl Monate>,<Grenze>,<Dienstverhältnis>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Ausgangsjahr",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      },
      {
        "label": "Anzahl Monate",
        "optional": false
      },
      {
        "label": "Grenze",
        "optional": false
      },
      {
        "label": "Dienstverhältnis",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "durchschn. Überstundenteiler",
    "bmdSignature": "BMD_LGV_TEILER_UEST(<Ausgangsjahr>,<Ausgangsmonat>,<Anzahl Monate>,<Grenze>,<Dienstverhältnis>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Ausgangsjahr",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      },
      {
        "label": "Anzahl Monate",
        "optional": false
      },
      {
        "label": "Grenze",
        "optional": false
      },
      {
        "label": "Dienstverhältnis",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "ÖGK-Meldestatus",
    "bmdSignature": "BMD_LGV_GKK_MELDESTATUS()",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Letzte Lehrlingsentschädigung",
    "bmdSignature": "BMD_LGV_LEHRLINGSENTSCH(<Betrag/Satz>,<Ausgangsjahr>,<Ausgangsmonat>,<Anzahl Monate>,<Grenze>,<Dienstverhältnis>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Betrag/Satz",
        "optional": false
      },
      {
        "label": "Ausgangsjahr",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      },
      {
        "label": "Anzahl Monate",
        "optional": false
      },
      {
        "label": "Grenze",
        "optional": false
      },
      {
        "label": "Dienstverhältnis",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Abrechnungsstatus",
    "bmdSignature": "BMD_LGV_ABRECHSTATUS(<Monat>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Monat",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "AddInputField",
    "bmdSignature": "BMD_HRS_ADDINPUTFIELD('Konstantenname','Feldbezeichnung',<Feldart>,'Vorschlagswert')",
    "category": "Abfragen",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Konstantenname",
        "optional": false
      },
      {
        "label": "Feldbezeichnung",
        "optional": false
      },
      {
        "label": "Feldart",
        "optional": false
      },
      {
        "label": "Vorschlagswert",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "AddInputField Combobox",
    "bmdSignature": "BMD_HRS_ADDINPUTFIELD_COMBOBOX('Konstantenname','Feldbezeichnung','Wert1,Wert2,...','Text1,Text2,...')",
    "category": "Abfragen",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Konstantenname",
        "optional": false
      },
      {
        "label": "Feldbezeichnung",
        "optional": false
      },
      {
        "label": "Wert1",
        "optional": false
      },
      {
        "label": "Wert2",
        "optional": false
      },
      {
        "label": "...",
        "optional": false
      },
      {
        "label": "Text1",
        "optional": false
      },
      {
        "label": "Text2",
        "optional": false
      },
      {
        "label": "...",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Abfragedialog starten",
    "bmdSignature": "BMD_HRS_ABFRAGE_START('Fenstertitel')",
    "category": "Abfragen",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Fenstertitel",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "GetInputValue",
    "bmdSignature": "BMD_HRS_GETINPUTVALUE('Konstantenname')",
    "category": "Abfragen",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Konstantenname",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Firma",
    "bmdSignature": "BMD_HRS_KORE_FIRMA('Firma')",
    "category": "KORE",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Firma",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Aktuelle KORE",
    "bmdSignature": "BMD_HRS_KORE_ACTUAL_KORE('Firma')",
    "category": "KORE",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Firma",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Kostenstammdaten anlegen",
    "bmdSignature": "BMD_HRS_INSERT_COSTTYPE('Firma','KORE-Nr','Kostentyp','Kosten-Nummer','Kosten-Bezeichnung')",
    "category": "KORE",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Firma",
        "optional": false
      },
      {
        "label": "KORE-Nr",
        "optional": false
      },
      {
        "label": "Kostentyp",
        "optional": false
      },
      {
        "label": "Kosten-Nummer",
        "optional": false
      },
      {
        "label": "Kosten-Bezeichnung",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "SetDBValueDoNotValidate",
    "bmdSignature": "BMD_DIENSTREISE_SETDBVALUE_NOVALIDATION('Feldname','Wert')",
    "category": "Dienstreise / Funktionen (nach Speichern einer Reise)",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Feldname",
        "optional": false
      },
      {
        "label": "Wert",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Fixwert",
    "bmdSignature": "BMD_LGV_FIXWERT('Lohnart','Lohnartengruppe','Prueflohnart',<Betrag/Satz>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Lohnart",
        "optional": false
      },
      {
        "label": "Lohnartengruppe",
        "optional": false
      },
      {
        "label": "Prueflohnart",
        "optional": false
      },
      {
        "label": "Betrag/Satz",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Fixwert KV",
    "bmdSignature": "BMD_LGV_FIXWERTKV('Lohnart','Lohnartengruppe','Prueflohnart',<Betrag/Satz>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Lohnart",
        "optional": false
      },
      {
        "label": "Lohnartengruppe",
        "optional": false
      },
      {
        "label": "Prueflohnart",
        "optional": false
      },
      {
        "label": "Betrag/Satz",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Lohnart",
    "bmdSignature": "BMD_LGV_LOHNART('Lohnartengruppe','Prueflohnart ist irrelevant',<Pflichtigkeit>,<Wertigkeit>,<Anzahl Monate>,<Summe/Durchschnitt>,<Ausgangsjahr>,<Ausgangsmonat>,<Grenze>,<Hochrechnen>,<Ueberwiegend>,<Ist/Org>,<Dienstverhältnis>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Lohnartengruppe",
        "optional": false
      },
      {
        "label": "Prueflohnart ist irrelevant",
        "optional": false
      },
      {
        "label": "Pflichtigkeit",
        "optional": false
      },
      {
        "label": "Wertigkeit",
        "optional": false
      },
      {
        "label": "Anzahl Monate",
        "optional": false
      },
      {
        "label": "Summe/Durchschnitt",
        "optional": false
      },
      {
        "label": "Ausgangsjahr",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      },
      {
        "label": "Grenze",
        "optional": false
      },
      {
        "label": "Hochrechnen",
        "optional": false
      },
      {
        "label": "Ueberwiegend",
        "optional": false
      },
      {
        "label": "Ist/Org",
        "optional": false
      },
      {
        "label": "Dienstverhältnis",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Lohnart-Pflichtigkeit",
    "bmdSignature": "BMD_LGV_LOHNART_PFLICHTIGKEIT(<Vergleich>,<Auslandstaetigkeit (beguenstigt)>,<Lohnsteuer (gem. EStG)>,<Sonstige Werbungskosten>,<Jahressechstel>,<Sonstige WK (L16-Zuordnung)>,<Nicht zu erfassende Bezuege 25>,<Pflegegeld>,<SV>,<SV-Zahlen>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Vergleich",
        "optional": false
      },
      {
        "label": "Auslandstaetigkeit (beguenstigt)",
        "optional": false
      },
      {
        "label": "Lohnsteuer (gem. EStG)",
        "optional": false
      },
      {
        "label": "Sonstige Werbungskosten",
        "optional": false
      },
      {
        "label": "Jahressechstel",
        "optional": false
      },
      {
        "label": "Sonstige WK (L16-Zuordnung)",
        "optional": false
      },
      {
        "label": "Nicht zu erfassende Bezuege 25",
        "optional": false
      },
      {
        "label": "Pflegegeld",
        "optional": false
      },
      {
        "label": "SV",
        "optional": false
      },
      {
        "label": "SV-Zahlen",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Lohnart hat Pflichtigkeit",
    "bmdSignature": "BMD_LGV_LOHNART_HAT_PFLICHTIGKEIT(<Wert>,<Vergleich>,<Auslandstaetigkeit (beguenstigt)>,<Lohnsteuer (gem. EStG)>,<Sonstige Werbungskosten>,<Jahressechstel>,<Sonstige WK (L16-Zuordnung)>,<Nicht zu erfassende Bezuege 25>,<Pflegegeld>,<SV>,<SV-Zah>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Wert",
        "optional": false
      },
      {
        "label": "Vergleich",
        "optional": false
      },
      {
        "label": "Auslandstaetigkeit (beguenstigt)",
        "optional": false
      },
      {
        "label": "Lohnsteuer (gem. EStG)",
        "optional": false
      },
      {
        "label": "Sonstige Werbungskosten",
        "optional": false
      },
      {
        "label": "Jahressechstel",
        "optional": false
      },
      {
        "label": "Sonstige WK (L16-Zuordnung)",
        "optional": false
      },
      {
        "label": "Nicht zu erfassende Bezuege 25",
        "optional": false
      },
      {
        "label": "Pflegegeld",
        "optional": false
      },
      {
        "label": "SV",
        "optional": false
      },
      {
        "label": "SV-Zah",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Lohnart ist in Lohnartengruppe",
    "bmdSignature": "BMD_LGV_LOHNART_IN_LOHNARTENGRUPPE(<Wert>,'Lohnartengruppe')",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Wert",
        "optional": false
      },
      {
        "label": "Lohnartengruppe",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Dauer",
    "bmdSignature": "BMD_LGV_DAUER(<Art>,<Genauigkeit>,<Anzahl Monate>,<Summe/Durchschnitt>,<Ausgangsjahr>,<Ausgangsmonat>,<Grenze>,<Dienstverhältnis>,<Ist/Org>,'LA-Gruppe Beobachtungszeitraum (+)','LA-Gruppe Beobachtungszeitraum (-)','DV-Beginn beruecksichtigen','DV-Ende beruecksichtigen')",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Art",
        "optional": false
      },
      {
        "label": "Genauigkeit",
        "optional": false
      },
      {
        "label": "Anzahl Monate",
        "optional": false
      },
      {
        "label": "Summe/Durchschnitt",
        "optional": false
      },
      {
        "label": "Ausgangsjahr",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      },
      {
        "label": "Grenze",
        "optional": false
      },
      {
        "label": "Dienstverhältnis",
        "optional": false
      },
      {
        "label": "Ist/Org",
        "optional": false
      },
      {
        "label": "LA-Gruppe Beobachtungszeitraum (+)",
        "optional": false
      },
      {
        "label": "LA-Gruppe Beobachtungszeitraum (-)",
        "optional": false
      },
      {
        "label": "DV-Beginn beruecksichtigen",
        "optional": false
      },
      {
        "label": "DV-Ende beruecksichtigen",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Aliquotierung",
    "bmdSignature": "BMD_LGV_ALIQUOTIERUNG(<Wert>,<Art>,<Genauigkeit>,<Grenze>,'Grenz-Lohnartengruppe',<Abzueglich Krankzeitraum>,<DV-Beginn beruecksichtigen>,<DV-Ende beruecksichtigen>,'LA-Gruppe Beobachtungszeitraum (+)','LA-Gruppe Beobachtungszeitraum (-)',<Ausgangsmonat>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Wert",
        "optional": false
      },
      {
        "label": "Art",
        "optional": false
      },
      {
        "label": "Genauigkeit",
        "optional": false
      },
      {
        "label": "Grenze",
        "optional": false
      },
      {
        "label": "Grenz-Lohnartengruppe",
        "optional": false
      },
      {
        "label": "Abzueglich Krankzeitraum",
        "optional": false
      },
      {
        "label": "DV-Beginn beruecksichtigen",
        "optional": false
      },
      {
        "label": "DV-Ende beruecksichtigen",
        "optional": false
      },
      {
        "label": "LA-Gruppe Beobachtungszeitraum (+)",
        "optional": false
      },
      {
        "label": "LA-Gruppe Beobachtungszeitraum (-)",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "L/G-Tabelle",
    "bmdSignature": "BMD_LGV_LGTABELLE(<KV-Nummer>,<Unternummer>,<Verwendungsgruppe>,<Beschaeftigungsjahr>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "KV-Nummer",
        "optional": false
      },
      {
        "label": "Unternummer",
        "optional": false
      },
      {
        "label": "Verwendungsgruppe",
        "optional": false
      },
      {
        "label": "Beschaeftigungsjahr",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Berechnungen ausführen",
    "bmdSignature": "BMD_LGV_EXECMACRO(<Berechnung>,<Aliquotierung(en) anwenden>,<Ausgangsmonat>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Berechnung",
        "optional": false
      },
      {
        "label": "Aliquotierung(en) anwenden",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Nichtleistungszeiten",
    "bmdSignature": "BMD_LGV_NLZ(<Art>,'Gutstunden/Diverse NLZ',<Verbrauch/Anspruch/Rest>,<Verwaltung/Bezahlt>,<Anspruchsumfang>,<Anzahl Monate>,<Summe/Durchschnitt>,<Ausgangsjahr>,<Ausgangsmonat>,<Grenze>,<Dienstverhältnis>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Art",
        "optional": false
      },
      {
        "label": "Gutstunden/Diverse NLZ",
        "optional": false
      },
      {
        "label": "Verbrauch/Anspruch/Rest",
        "optional": false
      },
      {
        "label": "Verwaltung/Bezahlt",
        "optional": false
      },
      {
        "label": "Anspruchsumfang",
        "optional": false
      },
      {
        "label": "Anzahl Monate",
        "optional": false
      },
      {
        "label": "Summe/Durchschnitt",
        "optional": false
      },
      {
        "label": "Ausgangsjahr",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      },
      {
        "label": "Grenze",
        "optional": false
      },
      {
        "label": "Dienstverhältnis",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Faktorentabelle",
    "bmdSignature": "BMD_LGV_FAKTORENTABELLE('Faktorentabelle',<Eingabewert>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Faktorentabelle",
        "optional": false
      },
      {
        "label": "Eingabewert",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Dienstzeit",
    "bmdSignature": "BMD_LGV_DIENSTZEIT(<Vordienstzeit beruecksichtigen>,'Ruhenszeit beruecksichtigen',<Ergebnis in>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Vordienstzeit beruecksichtigen",
        "optional": false
      },
      {
        "label": "Ruhenszeit beruecksichtigen",
        "optional": false
      },
      {
        "label": "Ergebnis in",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Alter",
    "bmdSignature": "BMD_LGV_ALTER(<Ergebnis in>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Ergebnis in",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Schnitt",
    "bmdSignature": "BMD_LGV_SCHNITT(<Schnitt-Nr.>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Schnitt-Nr.",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Fixwert speichern",
    "bmdSignature": "BMD_LGV_FIXWERT_SPEICHERN(<Wert>,'Fixwert-Lohnart',<Betrag/Satz>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Wert",
        "optional": false
      },
      {
        "label": "Fixwert-Lohnart",
        "optional": false
      },
      {
        "label": "Betrag/Satz",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "zeitlich letztes aktives DV des Berechnungsmonats",
    "bmdSignature": "BMD_LGV_ZEITLICH_MAX_DV()",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Arbeitsrechtlicher Beginn",
    "bmdSignature": "BMD_LGV_ARBEITSRECHT_BEGINN()",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "durchschnittliche Wochenarbeitszeit",
    "bmdSignature": "BMD_LGV_DURCHSCHNITT_WAZ(<Ausgangsjahr>,<Ausgangsmonat>,<Anzahl Monate>,<Grenze>,<Dienstverhältnis>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Ausgangsjahr",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      },
      {
        "label": "Anzahl Monate",
        "optional": false
      },
      {
        "label": "Grenze",
        "optional": false
      },
      {
        "label": "Dienstverhältnis",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Feldwert-Änderung",
    "bmdSignature": "BMD_LGV_FIELDVALUECHANGE(<Feld>,<Ausgangsjahr>,<Ausgangsmonat>,<Anzahl Monate>,<Grenze>,<Dienstverhältnis>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Feld",
        "optional": false
      },
      {
        "label": "Ausgangsjahr",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      },
      {
        "label": "Anzahl Monate",
        "optional": false
      },
      {
        "label": "Grenze",
        "optional": false
      },
      {
        "label": "Dienstverhältnis",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Feldwert-Verhältnis",
    "bmdSignature": "BMD_LGV_FIELDVALUERATIO(<Feld>,<Ausgangsjahr>,<Ausgangsmonat>,<Anzahl Monate>,<Grenze>,<Dienstverhältnis>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Feld",
        "optional": false
      },
      {
        "label": "Ausgangsjahr",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      },
      {
        "label": "Anzahl Monate",
        "optional": false
      },
      {
        "label": "Grenze",
        "optional": false
      },
      {
        "label": "Dienstverhältnis",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "durchschn. Monatsteiler",
    "bmdSignature": "BMD_LGV_TEILER_MONAT(<Ausgangsjahr>,<Ausgangsmonat>,<Anzahl Monate>,<Grenze>,<Dienstverhältnis>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Ausgangsjahr",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      },
      {
        "label": "Anzahl Monate",
        "optional": false
      },
      {
        "label": "Grenze",
        "optional": false
      },
      {
        "label": "Dienstverhältnis",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "durchschn. Tagesteiler",
    "bmdSignature": "BMD_LGV_TEILER_TAG(<Ausgangsjahr>,<Ausgangsmonat>,<Anzahl Monate>,<Grenze>,<Dienstverhältnis>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Ausgangsjahr",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      },
      {
        "label": "Anzahl Monate",
        "optional": false
      },
      {
        "label": "Grenze",
        "optional": false
      },
      {
        "label": "Dienstverhältnis",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "durchschn. Überstundenteiler",
    "bmdSignature": "BMD_LGV_TEILER_UEST(<Ausgangsjahr>,<Ausgangsmonat>,<Anzahl Monate>,<Grenze>,<Dienstverhältnis>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Ausgangsjahr",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      },
      {
        "label": "Anzahl Monate",
        "optional": false
      },
      {
        "label": "Grenze",
        "optional": false
      },
      {
        "label": "Dienstverhältnis",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "ÖGK-Meldestatus",
    "bmdSignature": "BMD_LGV_GKK_MELDESTATUS()",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [],
    "isMethod": false
  },
  {
    "name": "Letzte Lehrlingsentschädigung",
    "bmdSignature": "BMD_LGV_LEHRLINGSENTSCH(<Betrag/Satz>,<Ausgangsjahr>,<Ausgangsmonat>,<Anzahl Monate>,<Grenze>,<Dienstverhältnis>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Betrag/Satz",
        "optional": false
      },
      {
        "label": "Ausgangsjahr",
        "optional": false
      },
      {
        "label": "Ausgangsmonat",
        "optional": false
      },
      {
        "label": "Anzahl Monate",
        "optional": false
      },
      {
        "label": "Grenze",
        "optional": false
      },
      {
        "label": "Dienstverhältnis",
        "optional": false
      }
    ],
    "isMethod": false
  },
  {
    "name": "Abrechnungsstatus",
    "bmdSignature": "BMD_LGV_ABRECHSTATUS(<Monat>)",
    "category": "LGV",
    "availability": "Lohn",
    "parameters": [
      {
        "label": "Monat",
        "optional": false
      }
    ],
    "isMethod": false
  }
];

export const BMD_FUNCTION_NAMES: string[] = [
  "BMD_1751587",
  "BMD_1751728",
  "BMD_1751776",
  "BMD_1751777",
  "BMD_1751779",
  "BMD_1751780",
  "BMD_1751781",
  "BMD_ABS",
  "BMD_AKT_MAZ_AUTO_TERMINE_AUFGABEN",
  "BMD_AMAZONDATETODATETIME",
  "BMD_ARTIKEL_EXISTS",
  "BMD_ARTIKEL_PRINT_ETIKETT",
  "BMD_ASKMULTIPLEVALUES",
  "BMD_ASKVALUEBOOL",
  "BMD_ASKVALUEDATE",
  "BMD_ASKVALUEDIR",
  "BMD_ASKVALUEFILE",
  "BMD_ASKVALUELIST",
  "BMD_ASKVALUESTR",
  "BMD_ASSIGNFILE",
  "BMD_BOM_START_RETURNMATERIAL_DIALOG",
  "BMD_BUILD_NTCS_URL",
  "BMD_Base64Decode",
  "BMD_Base64Encode",
  "BMD_CALC_SHA256",
  "BMD_CLEARINTPARAMCache",
  "BMD_CLOSEFILE",
  "BMD_COMPUTERNAME",
  "BMD_CONCAT",
  "BMD_CONSIDERATTRDATATYPE",
  "BMD_CONVERTAMOUNT",
  "BMD_CONVERTNUMBER",
  "BMD_COPY",
  "BMD_COPYFILE",
  "BMD_CORRECT_COMMA",
  "BMD_COUNTER1",
  "BMD_COUNTER1_CLR",
  "BMD_COUNTER1_INC",
  "BMD_COUNTER2",
  "BMD_COUNTER2_CLR",
  "BMD_COUNTER2_INC",
  "BMD_COUNTER3",
  "BMD_COUNTER3_CLR",
  "BMD_COUNTER3_INC",
  "BMD_CREATEFILE",
  "BMD_CRLF",
  "BMD_CURRSEQID",
  "BMD_C_X_ADD",
  "BMD_C_X_C",
  "BMD_C_X_R",
  "BMD_CopyFileAfterExecute",
  "BMD_DATABASENAME",
  "BMD_DATE",
  "BMD_DATEDIFF",
  "BMD_DATEOF",
  "BMD_DATESUM",
  "BMD_DATETIMEFROMSEQID",
  "BMD_DATETOISOFORMAT",
  "BMD_DATETOSTR",
  "BMD_DAY",
  "BMD_DAYOFWEEK",
  "BMD_DAYOFWEEKASTEXT",
  "BMD_DBVERSION",
  "BMD_DECIDING_BOX",
  "BMD_DECMONTH",
  "BMD_DELETEFILE",
  "BMD_DELETEFILES",
  "BMD_DELINTPARAMVALUE",
  "BMD_DIENSTREISE_SETDBVALUE_NOVALIDATION",
  "BMD_DIRECTORYEXISTS",
  "BMD_DIV0",
  "BMD_DOWNLOADFILE",
  "BMD_Decode",
  "BMD_EAN",
  "BMD_EOF",
  "BMD_EPS_INSERT",
  "BMD_EPS_INSERT_EXT",
  "BMD_EPS_MATRM_WITH_ASK_DETAIL",
  "BMD_EXECREGEXPR",
  "BMD_EXECUTEMACRO",
  "BMD_EXEC_PROCESS",
  "BMD_EXTWERT_LJ",
  "BMD_EXTWERT_NAME",
  "BMD_EXTWERT_NJ",
  "BMD_EXTWERT_VJ1",
  "BMD_EXTWERT_VJ2",
  "BMD_EXTWERT_VJ3",
  "BMD_EXTWERT_VJ4",
  "BMD_EXT_FIELD",
  "BMD_Encode",
  "BMD_ExecuteAuszifferungAfterImport",
  "BMD_FG_VON_FIRMENNR",
  "BMD_FILEEXISTS",
  "BMD_FINISH_REPORT_MERGE",
  "BMD_FLOATTOSTRF",
  "BMD_FNC1",
  "BMD_FORCEDIRECTORIES",
  "BMD_FORMATDATE",
  "BMD_FORMATDATEBYLANGUAGE",
  "BMD_FORMATNUM",
  "BMD_FORMAT_DAUER",
  "BMD_FORM_PRINT",
  "BMD_FORM_SNAP",
  "BMD_FUNCTIONVALUES_CLR",
  "BMD_FUNCTIONVALUES_GET",
  "BMD_FUNCTIONVALUES_SET",
  "BMD_GENERIERE_WE",
  "BMD_GETANSICHR",
  "BMD_GETAPPLICATIONTYPE",
  "BMD_GETAUTOLOGINPARAMSTR",
  "BMD_GETBLOBVALUE",
  "BMD_GETCURRLANGUAGE",
  "BMD_GETENVIRONMENTVAR",
  "BMD_GETGUID",
  "BMD_GETINTDBVALUE",
  "BMD_GETINTPARAMVALUE",
  "BMD_GETLICENCECLIENTCOUNT",
  "BMD_GETLICENCECONSUMED",
  "BMD_GETLICENCECOUNT",
  "BMD_GETLICENCEPACKAGETEXT",
  "BMD_GETNAV_ARTCOMPANYNO",
  "BMD_GETNAV_ARTICLENO",
  "BMD_GETNAV_CLIENTCOMPANYNO",
  "BMD_GETNAV_CLIENTNO",
  "BMD_GETNAV_COMPANYNO",
  "BMD_GETNAV_CUSTOMERNO",
  "BMD_GETNAV_EMPCOMPANYNO",
  "BMD_GETNAV_EMPLOYEENO",
  "BMD_GETNAV_PROJCOMPANYNO",
  "BMD_GETNAV_PROJECTNO",
  "BMD_GETNOTE",
  "BMD_GETPHRASEFORWEORI",
  "BMD_GETSEQID",
  "BMD_GET_ARTICLE_UNITASSEMBLY",
  "BMD_GET_ARTICLE_UNITASSEMBLY_WITH_ALTERNATIVES",
  "BMD_GET_ARTIKELDATA",
  "BMD_GET_BASELINE_DATE",
  "BMD_GET_BASELINE_INT",
  "BMD_GET_BASELINE_PERIOD",
  "BMD_GET_BASELINE_SPARKLINE",
  "BMD_GET_BASELINE_TEXT",
  "BMD_GET_BASELINE_VALUE",
  "BMD_GET_BLOB_CONVERTED",
  "BMD_GET_EANNUMMER",
  "BMD_GET_EKWERT_NETTO",
  "BMD_GET_EXTARTIKELDATA",
  "BMD_GET_MA_KAPA",
  "BMD_GET_MA_KAPA_ASYNC",
  "BMD_GET_MWST_SATZ",
  "BMD_GET_PLP",
  "BMD_GET_PO_DATA",
  "BMD_GET_QUANTITY_FACTOR_IN_UNIT_BY_TABLE",
  "BMD_GET_QUANTITY_FACTOR_IN_UNIT_BY_TABLE_IDX",
  "BMD_GET_QUANTITY_IN_LGE",
  "BMD_GET_QUANTITY_IN_UNIT",
  "BMD_GET_QUANTITY_IN_UNIT_BY_TABLE",
  "BMD_GET_QUANTITY_IN_UNIT_BY_TABLE_IDX",
  "BMD_GET_RNGWERT_NETTO_STAMMW",
  "BMD_GET_STOCKDATA",
  "BMD_GET_STOCKDATA_COUNT",
  "BMD_GET_TRANSPORTTYPDATA",
  "BMD_GET_UNITASSEMBLY",
  "BMD_GET_UNITASSEMBLY_WITH_ALTERNATIVES",
  "BMD_GET_UNIT_EXISTS",
  "BMD_GET_VALUE_IN_UNIT_BY_TABLE",
  "BMD_GET_VAL_BY_NAME",
  "BMD_GET_VKWERT_NETTO",
  "BMD_GET_WEIGHT_RESULT",
  "BMD_GET_WWSUEBERSETZUNG",
  "BMD_GenerateElsterTaxNumber",
  "BMD_GetKontengruppe",
  "BMD_HAS_SERVICEDATA",
  "BMD_HIBCCHECKDIGIT",
  "BMD_HIBCTRIM",
  "BMD_HIBCTRIMALPHANUM",
  "BMD_HOUR",
  "BMD_HRS_ABFRAGE_START",
  "BMD_HRS_ADDINPUTFIELD",
  "BMD_HRS_ADDINPUTFIELD_COMBOBOX",
  "BMD_HRS_GETINPUTVALUE",
  "BMD_HRS_INSERT_COSTTYPE",
  "BMD_HRS_KORE_ACTUAL_KORE",
  "BMD_HRS_KORE_FIRMA",
  "BMD_IF",
  "BMD_INCDAY",
  "BMD_INCHOUR",
  "BMD_INCMIN",
  "BMD_INCMONTH",
  "BMD_INCSEC",
  "BMD_INPUTQUERY",
  "BMD_ISALLOWED",
  "BMD_ISCURRUSERINDOG",
  "BMD_ISCURRUSERINGROUP",
  "BMD_ISLEAPYEAR",
  "BMD_ISLICENCED",
  "BMD_IST_FEIERTAG",
  "BMD_ISVALIDDATESTR",
  "BMD_ISZERO",
  "BMD_KI_CLASSIFICATION",
  "BMD_KI_CREATEHEADING",
  "BMD_KI_CREATETEXT",
  "BMD_KI_DOCCHAT",
  "BMD_KI_PROOFREAD",
  "BMD_KI_SUMMARISE",
  "BMD_KI_TRANSLATION",
  "BMD_LASTDAY",
  "BMD_LEN",
  "BMD_LF",
  "BMD_LGV_ABRECHSTATUS",
  "BMD_LGV_ALIQUOTIERUNG",
  "BMD_LGV_ALTER",
  "BMD_LGV_ARBEITSRECHT_BEGINN",
  "BMD_LGV_DAUER",
  "BMD_LGV_DIENSTZEIT",
  "BMD_LGV_DURCHSCHNITT_WAZ",
  "BMD_LGV_EXECMACRO",
  "BMD_LGV_FAKTORENTABELLE",
  "BMD_LGV_FIELDVALUECHANGE",
  "BMD_LGV_FIELDVALUERATIO",
  "BMD_LGV_FIXWERT",
  "BMD_LGV_FIXWERTKV",
  "BMD_LGV_FIXWERT_SPEICHERN",
  "BMD_LGV_GKK_MELDESTATUS",
  "BMD_LGV_LEHRLINGSENTSCH",
  "BMD_LGV_LGTABELLE",
  "BMD_LGV_LOHNART",
  "BMD_LGV_LOHNART_HAT_PFLICHTIGKEIT",
  "BMD_LGV_LOHNART_IN_LOHNARTENGRUPPE",
  "BMD_LGV_LOHNART_PFLICHTIGKEIT",
  "BMD_LGV_NLZ",
  "BMD_LGV_SCHNITT",
  "BMD_LGV_TEILER_MONAT",
  "BMD_LGV_TEILER_TAG",
  "BMD_LGV_TEILER_UEST",
  "BMD_LGV_ZEITLICH_MAX_DV",
  "BMD_LOADNLSSTRING",
  "BMD_LOAD_STOCKDATA",
  "BMD_LOCALDATETIMETOUTC",
  "BMD_LOWER",
  "BMD_LTRIM",
  "BMD_LTRIMSPACE",
  "BMD_LineBreak",
  "BMD_LineFeed",
  "BMD_MAX",
  "BMD_MD5",
  "BMD_MERGEIMAGEFILES",
  "BMD_MERGEPDFFILES",
  "BMD_MERKER10_GET",
  "BMD_MERKER10_SET",
  "BMD_MERKER11_GET",
  "BMD_MERKER11_SET",
  "BMD_MERKER12_GET",
  "BMD_MERKER12_SET",
  "BMD_MERKER13_GET",
  "BMD_MERKER13_SET",
  "BMD_MERKER14_GET",
  "BMD_MERKER14_SET",
  "BMD_MERKER15_GET",
  "BMD_MERKER15_SET",
  "BMD_MERKER1_GET",
  "BMD_MERKER1_SET",
  "BMD_MERKER2_GET",
  "BMD_MERKER2_SET",
  "BMD_MERKER3_GET",
  "BMD_MERKER3_SET",
  "BMD_MERKER4_GET",
  "BMD_MERKER4_SET",
  "BMD_MERKER5_GET",
  "BMD_MERKER5_SET",
  "BMD_MERKER6_GET",
  "BMD_MERKER6_SET",
  "BMD_MERKER7_GET",
  "BMD_MERKER7_SET",
  "BMD_MERKER8_GET",
  "BMD_MERKER8_SET",
  "BMD_MERKER9_GET",
  "BMD_MERKER9_SET",
  "BMD_MERKER_GET",
  "BMD_MERKER_SET",
  "BMD_MIN",
  "BMD_MINUTE",
  "BMD_MODELASSIGNED",
  "BMD_MODULO",
  "BMD_MONTH",
  "BMD_MONTHDIFF",
  "BMD_M_X_ADD",
  "BMD_M_X_C",
  "BMD_M_X_R",
  "BMD_NEXTSEQID",
  "BMD_NEXT_SERVICEDATUM",
  "BMD_OPENFILE_APPEND",
  "BMD_OPENFILE_RESET",
  "BMD_OS_PRINT",
  "BMD_PARAMLIST_APPEND",
  "BMD_PARAMLIST_GET",
  "BMD_PEP_ADDUSERMESSAGE",
  "BMD_PEP_APPEND_RFT_BLOB",
  "BMD_PEP_APPEND_RFT_BLOB_HTML",
  "BMD_PEP_CREATE_RFT_BLOB",
  "BMD_PEP_DELETE_BLOB",
  "BMD_PEP_ENCODE_DATE_WEEK",
  "BMD_PEP_FIRE_VOB",
  "BMD_PEP_GET_HTML_FROM_BLOB",
  "BMD_PEP_GET_PLAIN_RFT_BLOB",
  "BMD_PEP_GET_PP_DATA",
  "BMD_PEP_GET_STAKE_DATA",
  "BMD_PEP_GET_VG_DATA",
  "BMD_PEP_IMPORT_RFT_BLOB",
  "BMD_PEP_LOCK_MODEL_EXT",
  "BMD_PEP_START_ASYNC_FUNCTION",
  "BMD_PEP_START_IDLE_FUNCTION",
  "BMD_PEP_SYNC_CHECKLIST",
  "BMD_PEP_UNLOCK_MODEL_EXT",
  "BMD_PEP_VG_LEA_AUFROLLEN",
  "BMD_PGMVERSION",
  "BMD_PLC_GETERFDATA",
  "BMD_PLC_MIX",
  "BMD_PLC_MIX_EXT",
  "BMD_PLC_PLAN",
  "BMD_PLC_STATUSCHANGE",
  "BMD_PLO_LAST_BIS",
  "BMD_PLO_LAST_VON",
  "BMD_POS",
  "BMD_POWER",
  "BMD_PROGRESSDISPLAY_CHECKABORTED",
  "BMD_PROGRESSDISPLAY_END",
  "BMD_PROGRESSDISPLAY_INIT",
  "BMD_PROGRESSDISPLAY_UP_DATE",
  "BMD_READLN",
  "BMD_READ_BUERF_PARAMETER",
  "BMD_READ_BUERF_PARAMETER_TO_MACROSTRINGLIST",
  "BMD_RECODEDAY",
  "BMD_RECODEHOUR",
  "BMD_RECODEMINUTE",
  "BMD_RECODEMONTH",
  "BMD_RECODESECOND",
  "BMD_RECODEYEAR",
  "BMD_REGEXPRGETALLRESULTS",
  "BMD_REGEXPRGETALLRESULTSWITHSUBS",
  "BMD_REMOVEDIR",
  "BMD_RENAMEFILE",
  "BMD_REPLACEREGEXPR",
  "BMD_REPLACESEPARATOR",
  "BMD_ROUND",
  "BMD_ROUNDING",
  "BMD_ROUNDPERIOD",
  "BMD_ROUNDX",
  "BMD_ROUND_QUANTITY_IN_UNIT",
  "BMD_RTRIM",
  "BMD_RTRIMSPACE",
  "BMD_SAMEVALUE",
  "BMD_SAVEINTEREST_ANGANGSWERT",
  "BMD_SAVEINTEREST_BEST_SPARZIEL",
  "BMD_SAVEINTEREST_BW_REGEL_ZAHLUNGEN",
  "BMD_SAVEINTEREST_EFFZINS_AUS_NOMZINS",
  "BMD_SAVEINTEREST_ENDWERT",
  "BMD_SAVEINTEREST_EW_REGEL_ZAHLUNGEN",
  "BMD_SAVEINTEREST_JAHRE_VERDOPPLUNG",
  "BMD_SAVEINTEREST_KAPITAL",
  "BMD_SAVEINTEREST_PROZ_GEWINN",
  "BMD_SAVEINTEREST_RATE_EFFZINS_ANNUI",
  "BMD_SAVEINTEREST_ZEITRAUM",
  "BMD_SAVEINTEREST_ZINSEN_NACH_TAGEN",
  "BMD_SAVEINTEREST_ZINSFUSS",
  "BMD_SCREEN_WEIGH",
  "BMD_SECOND",
  "BMD_SENDMAIL",
  "BMD_SENDMAIL_EXT",
  "BMD_SENDSMS",
  "BMD_SENDTOCLIPBOARD",
  "BMD_SENDTOCLIPBOARDFORMATTED",
  "BMD_SETINTPARAMVALUE",
  "BMD_SHOWMESSAGE",
  "BMD_SHOWPROGRESSBAR",
  "BMD_SHOW_USER_ERROR_MESSAGE",
  "BMD_SLEEP",
  "BMD_SPLITREGEXPR",
  "BMD_SQRT",
  "BMD_STARTEXPORTDOCUMENT",
  "BMD_STARTEXPORTDOCUMENTLIST",
  "BMD_STARTEXTFUNCTION",
  "BMD_STARTFUNCTION",
  "BMD_STARTHELPFUNCTION",
  "BMD_STARTPRINTFUNCTION",
  "BMD_STARTPROGRESSBAR",
  "BMD_STARTSPECIALFUNCTION",
  "BMD_START_REPORT_MERGE",
  "BMD_STRINGREPLACE",
  "BMD_STRTODATE",
  "BMD_SYSTEMUSERNAME",
  "BMD_TAB",
  "BMD_TEXTFILETOPDF",
  "BMD_TEXTTONUMDEF",
  "BMD_TIME",
  "BMD_TIMEOF",
  "BMD_TOOL_COMMAND_EXECUTE",
  "BMD_TOOL_STATUS_DESCRIPTION",
  "BMD_TRIM",
  "BMD_TRIMSPACE",
  "BMD_TRUNC",
  "BMD_Tabulator",
  "BMD_UMLRF_GETNEXTNO",
  "BMD_UMLRF_GET_REIHENFOLGE_BY_KOSTENNR",
  "BMD_UMLRF_GET_REIHENFOLGE_BY_KOSTENNR_SCHL",
  "BMD_UMLRF_INSERT",
  "BMD_UMLRF_UPDATE",
  "BMD_UNZIPFILE",
  "BMD_UPPER",
  "BMD_URLEncode",
  "BMD_USERNAME",
  "BMD_USERNAMEFULL",
  "BMD_UTCDATETIMETOLOCAL",
  "BMD_UTF8Decode",
  "BMD_UTF8Encode",
  "BMD_VarMyNode",
  "BMD_WEEKOFYEAR",
  "BMD_WERT_ALLIQUOT_PLP",
  "BMD_WRITELN",
  "BMD_WRITETOLOGFILE",
  "BMD_WRITE_BUERF_PARAMETER",
  "BMD_WriteBuerfAfterExecute",
  "BMD_WriteExportdateToBUC",
  "BMD_WriteExportdateToBeleg",
  "BMD_WriteExportdateToKTO",
  "BMD_YEAR",
  "BMD_ZIPFILE"
];