import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1180cc',
    },
    secondary: {
      main: '#8FC320',
      contrastText: '#ffffff',
    },
    error: {
      main: red[300],
    },
    contrastThreshold: 3,
  },
  breakpoints: {
    keys: [
      'xs',
      'sm',
      'md',
    ],
    values: {
      xs: 360,
      sm: 768,
      md: 992,
      lg: 10000,
      xl: 10000,
    },
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiDialog: {
      paper: {
        overflowY: 'auto',
        width: '90vw',
        margin: 10,
      },
    },
    MuiPaper: {
      root: {
        borderRadius: 3,
      },
    },
    MuiCircularProgress: {
      colorSecondary: {
        color: '#fff',
      },
    },
    MuiButton: {
      root: {
        minWidth: 80,
      },
    },
    MuiExpansionPanelSummary: {
      root: {
        minHeight: 'unset',
      },
    },
  },
})

export default theme