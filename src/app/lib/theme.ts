import { createMuiTheme } from '@material-ui/core/styles'
import { teal, deepOrange } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: teal[300],
      main: teal[500],
      dark: teal[700],
    },
    secondary: {
      light: deepOrange[300],
      main: deepOrange[500],
      dark: deepOrange[700],
    },
  },
})

export default theme
