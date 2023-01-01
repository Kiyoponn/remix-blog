module.exports = {
  content: ['./app/**/*.tsx'],
  theme: {
    extend: {
      opacity: {
        hovered: '0.08',
        focused: '0.12',
        pressed: '0.12',
        container: '0.12',
        dragged: '0.16',
        content: '0.38',
      },
    },
    fontFamily: {
      rfelx: ['Roboto Flex', 'sans-serif'],
    },
    fontSize: {
      'display-sm': ['2.25rem', { lineHeight: '2.75rem' }],
      'display-md': ['2.8125rem', { lineHeight: '3.25rem' }],
      'display-lg': ['3.563rem', { lineHeight: '4rem' }],
      'headline-sm': ['1.5rem', { lineHeight: '2rem' }],
      'headline-md': ['1.75rem', { lineHeight: '2.25rem' }],
      'headline-lg': ['2rem', { lineHeight: '2.5rem' }],
      'title-sm': ['0.9rem', { lineHeight: '1.3rem' }],
      'title-md': ['1rem', { lineHeight: '1.5rem' }],
      'title-lg': ['1.375rem', { lineHeight: '1.75rem' }],
      'label-sm': ['0.688rem', { lineHeight: '1rem' }],
      'label-md': ['0.8rem', { lineHeight: '1rem' }],
      'label-lg': ['0.9rem', { lineHeight: '1.3rem' }],
      'body-sm': ['0.8rem', { lineHeight: '1rem' }],
      'body-md': ['0.9rem', { lineHeight: '1.3re' }],
      'body-lg': ['1rem', { lineHeight: '1.5rem' }],
    },
    colors: {
      black: '#000000',
      white: '#FFFFFF',
      background: '#1A1C19',
      // scrim: black
      // shadow: black
      primary: {
        // 10: black
        // 20: on-primary
        container: '#00531C',
        // 40: inverse-primary
        50: '#008A33',
        60: '#00A740',
        70: '#00C64D',
        DEFAULT: '#3CE365', // surface-tint
        95: '#C7FFC5',
        // 90: on-primary-container
        99: '#F6FFF1',
        // 100: white
      },
      secondary: {
        // 10: black
        // 20: on-secondary
        container: '#3A4B39',
        40: '#516350',
        50: '#6A7C68',
        60: '#839681',
        70: '#9DB09A',
        DEFAULT: '#B9CCB5',
        // 90: on-secondary-container
        95: '#E3F6DE',
        // 99: primary-99
        // 100: white
      },
      tertiary: {
        // 10: black
        20: '#001F23',
        container: '#1F4D53',
        40: '#39656C',
        50: '#527E85',
        60: '#6C989F',
        70: '#86B3BA',
        DEFAULT: '#A1CED6',
        95: '#CEF8FF',
        99: '#F6FEFF',
        // 100: white
      },
      error: {
        10: '#410002',
        // 20: on-error,
        30: '#93000A',
        40: '#BA1A1A',
        50: '#DE3730',
        60: '#FF5449',
        70: '#FF897D',
        DEFAULT: '#FFB4AB',
        // 90: error-container
        95: '#FFEDEA',
        99: '#FFFBFF',
        // 100: white
      },
      neutral: {
        // 10: surface and background
        // 20: surface and background
        30: '#454743',
        40: '#5D5F5B',
        50: '#767873',
        // 60: outline
        70: '#AAACA7',
        80: '#C6C7C1',
        // 90: on-surface, on-background and inverse-surface
        95: '#F0F1EB',
        // 99: primary-99
        // 100: white
      },
      'neutral-variant': {
        10: '#171D16',
        20: '#2B322A',
        // 30: outline-variant and surface-variant,
        40: '#596057',
        50: '#72796F',
        60: '#8C9389',
        70: '#A6ADA3',
        // 80: surfaece-variant
        90: '#DEE5D9',
        95: '#ECF3E7',
        // 99: primary-99
        // 100: white
      },
      on: {
        primary: '#003911',
        'primary-container': '#6BFF84',
        secondary: '#101F10',
        'secondary-container': '#D4E8D0',
        tertiary: '#00363C',
        'tertiary-container': '#BCEBF2',
        surface: '#E2E3DD',
        'surface-variant': '#C2C9BD',
        error: '#690005',
        'error-container': '#FFDAD6',
        background: '#E2E3DD',
      },
      outline: {
        DEFAULT: '#8F918C',
        variant: '#424940',
      },
      surface: {
        DEFAULT: '#1A1C19',
        variant: '#424940',
        tint: '#3CE365',
      },
      inverse: {
        surface: '#E2E3DD',
        'on-surface': '#2F312D',
        primary: '#006E27',
      },
    },
    backgroundImage: {
      'surface-1':
        'linear-gradient(0deg, rgba(60, 227, 101, 0.05), rgba(60, 227, 101, 0.05))',
    },
    boxShadow: {
      none: '0px 0px 0px 0px',
      'elvation-1':
        '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)',
      'elvation-2':
        '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)',
      'elvation-3':
        '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)',
      'elvation-4':
        '0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3)',
      'elvation-5':
        '0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3)',
    },
    screens: {
      xs: '360px',
      sm: '600px',
      md: '905px',
      lg: '1280px',
      xl: '1440px',
    },
    borderRadius: {
      none: '0px',
      xs: '0.125rem',
      sm: '0.5rem',
      md: '0.75rem',
      lg: '1rem',
      xl: '1.75rem',
      DEFAULT: '9999px',
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
