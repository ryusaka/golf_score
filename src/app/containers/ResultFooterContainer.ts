import { connect } from 'react-redux'
import compose from 'recompose/compose'
import * as H from 'history'
import { WithStyles } from '@material-ui/core'
import {
  withStyles,
  createStyles,
  Theme,
} from '@material-ui/core'
import { save } from 'modules/score'
import ResultFooter from 'components/ResultFooter'
import { withRouter } from 'react-router';

const styles = (theme: Theme) => createStyles({
  toTop: {
    marginTop: 10,
  },
})

export interface Props extends WithStyles<typeof styles> {
  save: () => void
  history: H.History
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(null, { save })
)(ResultFooter)
