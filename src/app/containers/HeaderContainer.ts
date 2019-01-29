import { withStyles, createStyles } from '@material-ui/core'
import { WithStyles, Theme } from '@material-ui/core'

import Header from 'components/Header'

export interface Props extends WithStyles<typeof styles>, React.Props<{}> {
}
const styles = (theme: Theme) => createStyles({
  appbar: {
    background: theme.palette.common.white,
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  toolbar: {
    justifyContent: 'center',
    color: theme.palette.grey[800],
  },
})

export default withStyles(styles)(Header)