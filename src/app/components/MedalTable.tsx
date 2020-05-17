import * as React from 'react'
import clsx from 'clsx'
import { Table, TableHead, TableRow, TableCell, TableBody, Avatar, makeStyles } from '@material-ui/core'
import type { Round as RoundType } from 'common/types/models'
import { useSelector } from 'react-redux'
import { RootState } from 'modules/reducer'
import { medals } from 'common/lib/medal'

type Props = {
  score: RoundType.Model['score']
}

const useStyles = makeStyles((theme) => ({
  root: {},
  table: {},
  name: {
    padding: 0,
    width: 60,
    maxWidth: 60,
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'keep-all',
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
    height: 40,
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
  bronze: {
    background: '#8C4841',
  },
  iron: {
    background: '#034358',
  },
}))

const medalKeys = Object.keys(medals)
const reducer = (p, c) => p + (c.medal ? 5 - medalKeys.indexOf(c.medal) : 0)

const MedalTable: React.FC<Props> = (props) => {
  const { score } = props
  const classes = useStyles(props)
  const me = useSelector((state: RootState) => state.auth.user)

  const calcTotal = (mine: RoundType.Score[], others: RoundType.Score[][]) => {
    const income = mine.reduce(reducer, 0) * others.length
    const out = others.reduce((prev, curr) => prev + curr.reduce(reducer, 0), 0)
    return income - out
  }

  const calcMe = () => {
    return calcTotal(
      score.mine,
      score.others.map((o) => o.score)
    )
  }

  const calcOthers = (id) => {
    const mine = score.others.find((o) => o._id === id).score
    const others = [score.mine, ...score.others.filter((o) => o._id !== id).map((o) => o.score)]
    return calcTotal(mine, others)
  }

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow className={classes.row}>
          <TableCell className={classes.name} />
          {Object.entries(medals).map(([key, label]) => (
            <TableCell key={key} className={classes.score}>
              <Avatar className={clsx(classes[key], classes.medal)}>{label}</Avatar>
            </TableCell>
          ))}
          <TableCell className={classes.total}>計</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow className={classes.row}>
          <TableCell className={classes.name} component='th' scope='row'>
            {me.name || me.userId}
          </TableCell>
          {Object.keys(medals).map((key) => (
            <TableCell key={`player_${key}`} className={classes.score}>
              {score.mine.filter((s) => s.medal === key).length}
            </TableCell>
          ))}
          <TableCell className={classes.total}>{calcMe()}</TableCell>
        </TableRow>
        {score.others.map((s) => (
          <TableRow key={s._id} className={classes.row}>
            <TableCell className={classes.name} component='th' scope='row'>
              {s.name}
            </TableCell>
            {Object.keys(medals).map((key) => (
              <TableCell key={key} className={classes.score}>
                {s.score.filter((ss) => ss.medal === key).length}
              </TableCell>
            ))}
            <TableCell className={classes.total}>{calcOthers(s._id)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default MedalTable
