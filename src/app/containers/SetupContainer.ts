import { connect } from 'react-redux'
import * as H from 'history'
import {
  withStyles,
  createStyles,
  Theme,
} from '@material-ui/core'
import { WithStyles } from '@material-ui/core'
import { setHole } from 'modules/field'

import { ReduxState } from 'lib/store'
import { IField, IHole } from 'lib/interfaces'
import Setup from 'components/Setup'

const styles = (theme: Theme) => createStyles({
  root: {
    height: '100%',
    paddingBottom: 65,
  },
  main: {
    height: '100%',
    overflowY: 'scroll',
    paddingTop: 20,
    paddingBottom: 70,
  },
  avatars: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  avatar: {
    marginRight: 5,
    padding: 0,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
  },
  selected: {
    background: theme.palette.primary.main,
  },
  hole: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto 10px',
  },
  holeNumber: {
    width: 50,
    marginRight: 20,
    justifyContent: 'center',
    display: 'flex',
  },
  submitButton: {
    position: 'fixed',
    left: 10,
    bottom: 10,
    right: 10,
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.common.white,
  },
  button: {
    height: 50,
  },
})

export interface State {
  holes: IHole[]
}
export interface Props extends WithStyles<typeof styles> {
  history: H.History
  setHole: (holes: IHole[]) => void
  field: IField
}

const mapDispatchToProps = {
  setHole,
}

export default withStyles(styles)(connect((state: ReduxState) => ({
  field: state.field,
}), mapDispatchToProps)(Setup))