import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
} from '@material-ui/core'

import { IPlayer, IScores, IField } from 'lib/interfaces'

import MedalResult from 'components/MedalResult'

const styles = (theme: Theme) => createStyles({
  root: {
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
  row: {
    height: 36,
  },
  medal: {
    margin: 'auto',
    fontSize: 16,
    height: 32,
    width: 32,
    color: theme.palette.common.white,
  },
  diamond: {
    border: `1px solid ${theme.palette.grey[600]}`,
    color: theme.palette.grey[600],
    background: '#efefef',
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
})

export interface Props extends WithStyles<typeof styles> {
  field: IField
  players: IPlayer[]
  scores: IScores[]
  elevation?: number
}

export default withStyles(styles)(MedalResult)