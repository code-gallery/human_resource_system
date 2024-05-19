const languages = [
  {
    type: 'language',
    label: 'Chinese',
    value: 'zh',
    order: 1
  },
  {
    type: 'language',
    label: 'Spanish',
    value: 'es',
    order: 2
  },
  {
    type: 'language',
    label: 'English',
    value: 'en',
    order: 3
  },
  {
    type: 'language',
    label: 'Hindi',
    value: 'hi',
    order: 4
  },
  {
    type: 'language',
    label: 'Arabic',
    value: 'ar',
    order: 5
  },
  {
    type: 'language',
    label: 'Portuguese',
    value: 'pt',
    order: 6
  },
  {
    type: 'language',
    label: 'Bengali',
    value: 'bn',
    order: 7
  },
  {
    type: 'language',
    label: 'Russian',
    value: 'ru',
    order: 8
  },
  {
    type: 'language',
    label: 'Japanese',
    value: 'ja',
    order: 9
  },
  {
    type: 'language',
    label: 'Panjabi; Punjabi',
    value: 'pa',
    order: 10
  },
  {
    type: 'language',
    label: 'German',
    value: 'de',
    order: 11
  },
  {
    type: 'language',
    label: 'Javanese',
    value: 'jv',
    order: 12
  },
  {
    type: 'language',
    label: 'Indonesian',
    value: 'id',
    order: 13
  },
  {
    type: 'language',
    label: 'Telugu',
    value: 'te',
    order: 14
  },
  {
    type: 'language',
    label: 'Vietnamese',
    value: 'vi',
    order: 15
  },
  {
    type: 'language',
    label: 'Korean',
    value: 'ko',
    order: 16
  },
  {
    type: 'language',
    label: 'French',
    value: 'fr',
    order: 17
  },
  {
    type: 'language',
    label: 'Marathi',
    value: 'mr',
    order: 18
  },
  {
    type: 'language',
    label: 'Tamil',
    value: 'ta',
    order: 19
  },
  {
    type: 'language',
    label: 'Urdu',
    value: 'ur',
    order: 20
  },
  {
    type: 'language',
    label: 'Turkish',
    value: 'tr',
    order: 21
  },
  {
    type: 'language',
    label: 'Italian',
    value: 'it',
    order: 22
  },
  {
    type: 'language',
    label: 'Thai',
    value: 'th',
    order: 23
  },
  {
    type: 'language',
    label: 'Gujarati',
    value: 'gu',
    order: 24
  },
  {
    type: 'language',
    label: 'Persian',
    value: 'fa',
    order: 25
  },
  {
    type: 'language',
    label: 'Polish',
    value: 'pl',
    order: 26
  },
  {
    type: 'language',
    label: 'Pushto; Pashto',
    value: 'ps',
    order: 27
  },
  {
    type: 'language',
    label: 'Kannada',
    value: 'kn',
    order: 28
  },
  {
    type: 'language',
    label: 'Malayalam',
    value: 'ml',
    order: 29
  },
  {
    type: 'language',
    label: 'Sundanese',
    value: 'su',
    order: 30
  },
  {
    type: 'language',
    label: 'Hausa',
    value: 'ha',
    order: 31
  },
  {
    type: 'language',
    label: 'Burmese',
    value: 'my',
    order: 32
  },
  {
    type: 'language',
    label: 'Ukrainian',
    value: 'uk',
    order: 33
  },
  {
    type: 'language',
    label: 'Tagalog',
    value: 'tl',
    order: 34
  },
  {
    type: 'language',
    label: 'Yoruba',
    value: 'yo',
    order: 35
  },
  {
    type: 'language',
    label: 'Uzbek',
    value: 'uz',
    order: 36
  },
  {
    type: 'language',
    label: 'Sindhi',
    value: 'sd',
    order: 37
  },
  {
    type: 'language',
    label: 'Amharic',
    value: 'am',
    order: 38
  },
  {
    type: 'language',
    label: 'Fulah',
    value: 'ff',
    order: 39
  },
  {
    type: 'language',
    label: 'Romanian; Moldavian; Moldovan',
    value: 'ro',
    order: 40
  },
  {
    type: 'language',
    label: 'Oromo',
    value: 'om',
    order: 41
  },
  {
    type: 'language',
    label: 'Igbo',
    value: 'ig',
    order: 42
  },
  {
    type: 'language',
    label: 'Azerbaijani',
    value: 'az',
    order: 43
  },
  {
    type: 'language',
    label: 'Dutch; Flemish',
    value: 'nl',
    order: 44
  },
  {
    type: 'language',
    label: 'Kurdish',
    value: 'ku',
    order: 45
  },
  {
    type: 'language',
    label: 'Serbian',
    value: 'sr',
    order: 46
  },
  {
    type: 'language',
    label: 'Croatian',
    value: 'hr',
    order: 47
  },
  {
    type: 'language',
    label: 'Malagasy',
    value: 'mg',
    order: 48
  },
  {
    type: 'language',
    label: 'Nepali',
    value: 'ne',
    order: 49
  },
  {
    type: 'language',
    label: 'Sinhala; Sinhalese',
    value: 'si',
    order: 50
  },
  {
    type: 'language',
    label: 'Zhuang; Chuang',
    value: 'za',
    order: 51
  },
  {
    type: 'language',
    label: 'Central Khmer',
    value: 'km',
    order: 52
  },
  {
    type: 'language',
    label: 'Turkmen',
    value: 'tk',
    order: 53
  },
  {
    type: 'language',
    label: 'Assamese',
    value: 'as',
    order: 54
  },
  {
    type: 'language',
    label: 'Somali',
    value: 'so',
    order: 55
  },
  {
    type: 'language',
    label: 'Hungarian',
    value: 'hu',
    order: 56
  },
  {
    type: 'language',
    label: 'Greek Modern',
    value: 'el',
    order: 57
  },
  {
    type: 'language',
    label: 'Chichewa; Chewa; Nyanja',
    value: 'ny',
    order: 58
  },
  {
    type: 'language',
    label: 'Akan',
    value: 'ak',
    order: 59
  },
  {
    type: 'language',
    label: 'Kazakh',
    value: 'kk',
    order: 60
  },
  {
    type: 'language',
    label: 'Zulu',
    value: 'zu',
    order: 61
  },
  {
    type: 'language',
    label: 'Czech',
    value: 'cs',
    order: 62
  },
  {
    type: 'language',
    label: 'Kinyarwanda',
    value: 'rw',
    order: 63
  },
  {
    type: 'language',
    label: 'Haitian; Haitian Creole',
    value: 'ht',
    order: 64
  },
  {
    type: 'language',
    label: 'Quechua',
    value: 'qu',
    order: 65
  },
  {
    type: 'language',
    label: 'Swedish',
    value: 'sv',
    order: 66
  },
  {
    type: 'language',
    label: 'Shona',
    value: 'sn',
    order: 67
  },
  {
    type: 'language',
    label: 'Uighur; Uyghur',
    value: 'ug',
    order: 68
  },
  {
    type: 'language',
    label: 'Xhosa',
    value: 'xh',
    order: 69
  },
  {
    type: 'language',
    label: 'Belarusian',
    value: 'be',
    order: 70
  },
  {
    type: 'language',
    label: 'Irish',
    value: 'ga',
    order: 71
  },
  {
    type: 'language',
    label: 'Gaelic; Scottish Gaelic',
    value: 'gd',
    order: 72
  },
  {
    type: 'language',
    label: 'Welsh',
    value: 'cy',
    order: 73
  },
  {
    type: 'language',
    label: 'Albanian',
    value: 'sq',
    order: 74
  },
  {
    type: 'language',
    label: 'Armenian',
    value: 'hy',
    order: 75
  },
  {
    type: 'language',
    label: 'Bokmål  Norwegian; Norwegian Bokmål',
    value: 'nb',
    order: 76
  },
  {
    type: 'language',
    label: 'Cornish',
    value: 'kw',
    order: 77
  },
  {
    type: 'language',
    label: 'Ganda',
    value: 'lg',
    order: 78
  },
  {
    type: 'language',
    label: 'Georgian',
    value: 'ka',
    order: 79
  },
  {
    type: 'language',
    label: 'Hebrew',
    value: 'he',
    order: 80
  },
  {
    type: 'language',
    label: 'Herero',
    value: 'hz',
    order: 81
  },
  {
    type: 'language',
    label: 'Hiri Motu',
    value: 'ho',
    order: 82
  },
  {
    type: 'language',
    label: 'Icelandic',
    value: 'is',
    order: 83
  },
  {
    type: 'language',
    label: 'Ido',
    value: 'io',
    order: 84
  },
  {
    type: 'language',
    label: 'Interlingua',
    value: 'ia',
    order: 85
  },
  {
    type: 'language',
    label: 'Interlingue; Occidental',
    value: 'ie',
    order: 86
  },
  {
    type: 'language',
    label: 'Inuktitut',
    value: 'iu',
    order: 87
  },
  {
    type: 'language',
    label: 'Inupiaq',
    value: 'ik',
    order: 88
  },
  {
    type: 'language',
    label: 'Kalaallisut; Greenlandic',
    value: 'kl',
    order: 89
  },
  {
    type: 'language',
    label: 'Kanuri',
    value: 'kr',
    order: 90
  },
  {
    type: 'language',
    label: 'Kashmiri',
    value: 'ks',
    order: 91
  },
  {
    type: 'language',
    label: 'Kikuyu; Gikuyu',
    value: 'ki',
    order: 92
  },
  {
    type: 'language',
    label: 'Kirghiz; Kyrgyz',
    value: 'ky',
    order: 93
  },
  {
    type: 'language',
    label: 'Komi',
    value: 'kv',
    order: 94
  },
  {
    type: 'language',
    label: 'Kongo',
    value: 'kg',
    order: 95
  },
  {
    type: 'language',
    label: 'Kuanyama; Kwanyama',
    value: 'kj',
    order: 96
  },
  {
    type: 'language',
    label: 'Lao',
    value: 'lo',
    order: 97
  },
  {
    type: 'language',
    label: 'Latin',
    value: 'la',
    order: 98
  },
  {
    type: 'language',
    label: 'Latvian',
    value: 'lv',
    order: 99
  },
  {
    type: 'language',
    label: 'Limburgan; Limburger; Limburgish',
    value: 'li',
    order: 100
  },
  {
    type: 'language',
    label: 'Lingala',
    value: 'ln',
    order: 101
  },
  {
    type: 'language',
    label: 'Lithuanian',
    value: 'lt',
    order: 102
  },
  {
    type: 'language',
    label: 'Luba-Katanga',
    value: 'lu',
    order: 103
  },
  {
    type: 'language',
    label: 'Luxembourgish; Letzeburgesch',
    value: 'lb',
    order: 104
  },
  {
    type: 'language',
    label: 'Macedonian',
    value: 'mk',
    order: 105
  },
  {
    type: 'language',
    label: 'Malay',
    value: 'ms',
    order: 106
  },
  {
    type: 'language',
    label: 'Maltese',
    value: 'mt',
    order: 107
  },
  {
    type: 'language',
    label: 'Maori',
    value: 'mi',
    order: 108
  },
  {
    type: 'language',
    label: 'Marshallese',
    value: 'mh',
    order: 109
  },
  {
    type: 'language',
    label: 'Mongolian',
    value: 'mn',
    order: 110
  },
  {
    type: 'language',
    label: 'Nauru',
    value: 'na',
    order: 111
  },
  {
    type: 'language',
    label: 'Navajo; Navaho',
    value: 'nv',
    order: 112
  },
  {
    type: 'language',
    label: 'Ndebele North; North Ndebele',
    value: 'nd',
    order: 113
  },
  {
    type: 'language',
    label: 'Ndebele South; South Ndebele',
    value: 'nr',
    order: 114
  },
  {
    type: 'language',
    label: 'Ndonga',
    value: 'ng',
    order: 115
  },
  {
    type: 'language',
    label: 'Northern Sami',
    value: 'se',
    order: 116
  },
  {
    type: 'language',
    label: 'Norwegian',
    value: 'no',
    order: 117
  },
  {
    type: 'language',
    label: 'Norwegian Nynorsk; Nynorsk  Norwegian',
    value: 'nn',
    order: 118
  },
  {
    type: 'language',
    label: 'Occitan (post 1500); Provençal',
    value: 'oc',
    order: 119
  },
  {
    type: 'language',
    label: 'Ojibwa',
    value: 'oj',
    order: 120
  },
  {
    type: 'language',
    label: 'Oriya',
    value: 'or',
    order: 121
  },
  {
    type: 'language',
    label: 'Ossetian; Ossetic',
    value: 'os',
    order: 122
  },
  {
    type: 'language',
    label: 'Pali',
    value: 'pi',
    order: 123
  },
  {
    type: 'language',
    label: 'Romansh',
    value: 'rm',
    order: 124
  },
  {
    type: 'language',
    label: 'Rundi',
    value: 'rn',
    order: 125
  },
  {
    type: 'language',
    label: 'Samoan',
    value: 'sm',
    order: 126
  },
  {
    type: 'language',
    label: 'Sango',
    value: 'sg',
    order: 127
  },
  {
    type: 'language',
    label: 'Sanskrit',
    value: 'sa',
    order: 128
  },
  {
    type: 'language',
    label: 'Sardinian',
    value: 'sc',
    order: 129
  },
  {
    type: 'language',
    label: 'Sichuan Yi; Nuosu',
    value: 'ii',
    order: 130
  },
  {
    type: 'language',
    label: 'Slovak',
    value: 'sk',
    order: 131
  },
  {
    type: 'language',
    label: 'Slovenian',
    value: 'sl',
    order: 132
  },
  {
    type: 'language',
    label: 'Sotho Southern',
    value: 'st',
    order: 133
  },
  {
    type: 'language',
    label: 'Swahili',
    value: 'sw',
    order: 134
  },
  {
    type: 'language',
    label: 'Swati',
    value: 'ss',
    order: 135
  },
  {
    type: 'language',
    label: 'Tahitian',
    value: 'ty',
    order: 136
  },
  {
    type: 'language',
    label: 'Tajik',
    value: 'tg',
    order: 137
  },
  {
    type: 'language',
    label: 'Tatar',
    value: 'tt',
    order: 138
  },
  {
    type: 'language',
    label: 'Tigrinya',
    value: 'ti',
    order: 139
  },
  {
    type: 'language',
    label: 'Tonga (Tonga Islands)',
    value: 'to',
    order: 140
  },
  {
    type: 'language',
    label: 'Tsonga',
    value: 'ts',
    order: 141
  },
  {
    type: 'language',
    label: 'Tswana',
    value: 'tn',
    order: 142
  },
  {
    type: 'language',
    label: 'Twi',
    value: 'tw',
    order: 143
  },
  {
    type: 'language',
    label: 'Venda',
    value: 've',
    order: 144
  },
  {
    type: 'language',
    label: 'Volapük',
    value: 'vo',
    order: 145
  },
  {
    type: 'language',
    label: 'Walloon',
    value: 'wa',
    order: 146
  },
  {
    type: 'language',
    label: 'Wolof',
    value: 'wo',
    order: 147
  },
  {
    type: 'language',
    label: 'Yiddish',
    value: 'yi',
    order: 148
  }
]

export default languages
