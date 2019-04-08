import * as H from 'history'
import FieldTop from 'components/FieldTop'
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core'

const styles = (theme: Theme) => createStyles({
  root: {
    padding: '70px 10px 10px',
    height: '100%',
    overflowY: 'scroll',
    background: theme.palette.grey[200],
  },
  list: {
    overflowY: 'scroll',
    paddingBottom: 50,
  },
  new: {
    height: 40,
  },
  bottom: {
    borderRadius: 0,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
})

export interface Props extends WithStyles<typeof styles> {
  history: H.History
}

export default withStyles(styles)(FieldTop)