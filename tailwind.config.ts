import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
 
  
    extend: {

       screens: {
        sm: { 'min': '320px', 'max': '980px' },
        md: { 'min': '981px', 'max': '1239px' },
        maxxl: {'max': '1400px'},
        xxl: '1400px',
        fourxl: '1600px'
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        brand: '#fee145',
        secondary: '#1f1a4e',
        gray: '#797979',
        graybg: '#EFEFF4',
        graylight: '#d3dce6',
        blue: '#1fb6ff',
        green: '#13ce66',
        graydark: '#273444',
        white: '#fff',
        black: '#000',
        bordercolor: '#D9D9D9',
        bordercolor1: '#C7D3F6',
        greyborder: '#707070',
        progressColor1: '#F9C74F',
        progressColor2: '#F8961E',
        progressColor3: '#F3722C',
        progressColor4: '#D9232D',
        dategrey: '#90909d',
        anchorblue: '#2369D9',
        footerbg: '#F1F0F6',
        iconbtnborder: '#D9D9D9',
        sidebarnavigationcolor: '#1F2137',
        bgback: '#F6F7FF',
        yellowcolor: '#e3a200',

        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'float-bob-y': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
        'scroll': {
          '100%': { left: '1368px' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float-bob-y': 'float-bob-y 3s linear infinite',
        'road-move': 'roadScroll 20s linear infinite',
        'car-move': 'carScroll 20s linear infinite',
        'scroll': 'scroll 25s linear infinite',

      },
    },
  },
  plugins: [animate,function ({ addComponents }) {
      addComponents({
        '.container': {
          '@screen sm': {
            maxWidth: '728px',
          },
          
        }
      })
    }
  ] 
};

export default config;
