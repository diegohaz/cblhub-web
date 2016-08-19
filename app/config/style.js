export const colors = {
  primary: {
    dark: '#1976D2',
    medium: '#2196F3',
    light: '#EBF5FE'
  },
  accent: {
    dark: '#388E3C',
    medium: '#4CAF50',
    light: '#C8E6C9'
  },
  grayscale: {
    black: '#212121',
    dark: '#727272',
    medium: '#B6B6B6',
    light: '#E6E6E6',
    white: '#FFFFFF'
  },
  error: {
    dark: '#D32F2F',
    medium: '#F44336',
    light: '#FFCDD2'
  },
  alert: {
    dark: '#FFA000',
    medium: '#FFC107',
    light: '#FFECB3'
  },
  success: {
    dark: '#388E3C',
    medium: '#4CAF50',
    light: '#C8E6C9'
  }
}

export const breakpoints = {
  small: '640px',
  medium: '1024px',
  large: '1200px',
  xlarge: '1440px'
}

export const writeMediaQuery = (breakpoint) => `@media screen and (max-width: ${breakpoint})`
