module.exports = {
  content: ['./app/**/*.tsx'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            li: {
              'list-style-type': 'none',
              '&:before': {
                content: '"– "',
                display: 'inline-block',
                color: '#666',
                position: 'absolute',
                'margin-left': '-15px',
              },
            },
          },
        },
      },
      borderRadius: {
        // 5px in rem
        5: '0.3125rem',
      },
    },
    fontFamily: {
      rflex: ['Roboto Flex', 'sans-serif'],
    },
    lineHeight: {
      sm: '0.875rem',
      md: '1.25rem',
      lg: '1.5rem',
    },
    fontSize: {
      '2xs': ['0.625rem', '0.75rem'],
      xs: ['0.75rem', '0.75rem'],
      sm: ['0.8125rem', '0.875rem'],
      base: ['0.875rem', '1rem'],
      md: ['1rem', '1.25rem'],
      lg: ['1.25rem', '1.5rem'],
      xl: ['1.5rem', '2rem'],
      '2xl': ['2rem', '2.5rem'],
      '3xl': ['2.5rem', '3rem'],
      '4xl': ['3rem', '3.5rem'],
    },
    colors: {
      black: '#000',
      white: '#FFF',
      transparent: 'transparent',
      lighten: '#000000bf',
      accent: {
        DEFAULT: '#1A1A1A',
        1: '#111',
        2: '#333',
        3: '#444',
        4: '#666',
        5: '#888',
        6: '#999',
        7: '#EAEAEA',
        8: '#FAFAFA',
      },
      error: {
        lighter: '#F7D4D6',
        light: '#FF3333',
        DEFAULT: '#FF0000',
        dark: '#E60000',
      },
      success: {
        lighter: '#D3E5FF',
        light: '#3291FF',
        DEFAULT: '#0070F3',
        dark: '#0761D1',
      },
      warning: {
        lighter: '#FFEFCF',
        light: '#F7B955',
        DEFAULT: '#F5A623',
        dark: '#AB570A',
      },
      violet: {
        lighter: '#D8CCF1',
        light: '#8A63D2',
        DEFAULT: '#7928CA',
        dark: '#4C2889',
      },
      cyan: {
        lighter: '#AAFFEC',
        light: '#79FFE1',
        DEFAULT: '#50E3C2',
        dark: '#29BC9B',
      },
      purple: '#F81CE5',
      magenta: '#EB367F',
      pink: '#FF0080',
      yellow: '#FFF500',
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
