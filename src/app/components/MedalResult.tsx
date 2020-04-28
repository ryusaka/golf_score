import * as React from 'react'
import clsx from 'clsx'
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Avatar } from '@material-ui/core'

import { Props } from 'containers/MedalResultContainer'

const Result: React.FunctionComponent<Props> = (props) => {
  const { scores, players, elevation = 1, classes } = props
  const getClass = medal => {
    if (medal === 'D') return classes.diamond
    if (medal === '金') return classes.gold
    if (medal === '銀') return classes.silver
    if (medal === '銅') return classes.bronze
    if (medal === '鉄') return classes.iron
    return null
  }

  const getScore = medal => {
    if (medal === 'D') return 5
    if (medal === '金') return 4
    if (medal === '銀') return 3
    if (medal === '銅') return 2
    if (medal === '鉄') return 1
    return 0
  }

  const calcTotal = (player: string) => {
    return scores.find(s => s.player === player).scores.reduce((p, c) => p + getScore(c.medal), 0) * (players.length - 1)
      - scores.filter(s => s.player !== player).reduce((prev, curr) => prev + curr.scores.reduce((p, c) => p + getScore(c.medal), 0), 0)
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={elevation}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.name} />
              {['D', '金', '銀', '銅', '鉄'].map(medal => <TableCell key={medal} className={classes.score}><Avatar className={clsx(getClass(medal), classes.medal)}>{medal}</Avatar></TableCell>)}
              <TableCell className={classes.total}>計</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scores.map(score => (
              <TableRow key={score.player} className={classes.row}>
                <TableCell className={classes.name} component='th' scope='row'>
                  {players.find(p => p.id === score.player).name}
                </TableCell>
                {['D', '金', '銀', '銅', '鉄'].map(medal => <TableCell key={`player_${medal}`} className={classes.score}>{score.scores.filter(s => s.medal === medal).length}</TableCell>)}
                <TableCell className={classes.total}>{calcTotal(score.player)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}

export default Result