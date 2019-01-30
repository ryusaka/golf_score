import { connect } from 'react-redux'
import compose from 'recompose/compose'
import * as H from 'history'
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
} from '@material-ui/core'

import { ReduxState } from 'lib/store'
import { IPlayer, IScores, IField } from 'lib/interfaces'

import Result from 'components/Result'

const styles = (theme: Theme) => createStyles({
  root: {
    height: '100%',
    paddingTop: 60,
    background: theme.palette.grey[200],
    overflowY: 'scroll',
  },
  main: {
    padding: 10,
  },
  title: {
    color: theme.palette.grey[800],
    textAlign: 'center',
  },
  table: {
  },
  paper: {
    padding: 10,
  },
  name: {
    padding: 0,
    width: 60,
  },
  score: {
    padding: 0,
    flex: 1,
    textAlign: 'center',
    width: 25,
    fontSize: 14,
    '&:nth-child(even)': {
      background: theme.palette.grey[100],
    },
  },
  total: {
    padding: 0,
    flex: 1,
    textAlign: 'center',
    width: 25,
    fontWeight: 'bold',
    fontSize: 14,
    '&:last-child': {
      padding: 0,
    },
  },
  medal: {
    fontSize: 14,
    width: 24,
    height: 24,
    margin: 'auto',
    color: theme.palette.common.white,
  },
  row: {
    height: 40,
  },
  diamond: {
    background: '#efefef',
    color: theme.palette.grey[600],
    border: `1px solid ${theme.palette.grey[600]}`,
  },
  gold: {
    background: '#e6b422',
  },
  silver: {
    background: '#C0C0C0',
  },
  blonze: {
    background: '#8C4841',
  },
  iron: {
    background: '#034358',
  },
  toTop: {
    marginTop: 10,
  },
})

export interface Props extends WithStyles<typeof styles> {
  field: IField
  players: IPlayer[]
  scores: IScores[]
  history: H.History
}

export default compose(
  withStyles(styles),
  connect((state: ReduxState) => ({
    players: state.player.players,
    field: state.field,
    scores: state.score.scores,
  }))
)(Result)