import { connect } from 'react-redux'
import * as H from 'history'
import { withStyles, createStyles, Theme } from '@material-ui/core'
import { WithStyles } from '@material-ui/core'

import { ReduxState } from 'lib/store'
import { IField, IHole } from 'lib/interfaces'
import Setup from 'components/Setup'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      background: theme.palette.grey[200],
      padding: '60px 0',
      overflowY: 'scroll',
    },
    main: {
      overflowY: 'scroll',
      padding: '15px 0',
      margin: 10,
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
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
    },
    selected: {
      background: theme.palette.primary.main,
    },
    hole: {
      width: '100%',
      padding: '5px 20px',
      display: 'flex',
      alignItems: 'center',
      '&:nth-child(even)': {
        background: theme.palette.grey[200],
      },
    },
    holeNumber: {
      width: 50,
      marginRight: 20,
      justifyContent: 'center',
      display: 'flex',
    },
    submitButton: {
      position: 'fixed',
      left: 0,
      bottom: 0,
      right: 0,
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      background: theme.palette.common.white,
      borderRadius: 0,
    },
    button: {
      height: 40,
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

const mapDispatchToProps = {}

export default withStyles(styles)(
  connect(
    (state: ReduxState) => ({
      field: state.field,
    }),
    mapDispatchToProps
  )(Setup)
)
