import { withStyles, createStyles } from '@material-ui/core'
import { WithStyles, Theme } from '@material-ui/core'

import Header from 'components/Header'

export interface Props extends WithStyles<typeof styles>, React.Props<{}> {
}
const styles = (theme: Theme) => createStyles({
  appbar: {
    borderRadius: 0,
    height: 60,
    background: theme.palette.common.white,
  },
  toolbar: {
    height: 60,
    justifyContent: 'center',
    color: theme.palette.grey[800],
  },
})

export default withStyles(styles)(Header)