import * as React from 'react'
import { Props } from 'containers/ResultContainer'
import Header from 'containers/HeaderContainer'
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Avatar, Button } from '@material-ui/core'
import classname from 'lib/classname'
import MedalResult from 'containers/MedalResultContainer'
const Result: React.FunctionComponent<Props> = (props) => {
  const { scores, players, field, classes } = props
  const getClass = medal => {
    if (medal === 'D') return classes.diamond
    if (medal === '金') return classes.gold
    if (medal === '銀') return classes.silver
    if (medal === '銅') return classes.blonze
    if (medal === '鉄') return classes.iron
    return null
  }

  return (
    <div className={classes.root}>
      <Header><h2>RESULT</h2></Header>
      <div className={classes.main}>
        <h3 className={classes.title}>スコア</h3>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.name}>
                  <div>HOLE</div>
                  <div>(PAR)</div>
                </TableCell>
                {new Array(9).fill(0).map((_, idx) =>
                  <TableCell key={idx} className={classes.score}>
                    <div>{idx + 1}</div>
                    <div>({field.holes[idx].par})</div>
                  </TableCell>
                )}
                <TableCell className={classes.total}>計</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scores.map(score => (
                <TableRow key={score.player} className={classes.row}>
                  <TableCell className={classes.name} component="th" scope="row">
                    {players.find(p => p.id === score.player).name}
                  </TableCell>
                  {score.scores.map((s, i) => <TableCell key={i} className={classes.score} align="right">{s.medal ? <Avatar className={classname(getClass(s.medal), classes.medal)}>{s.stroke}</Avatar> : s.stroke}</TableCell>)}
                  <TableCell className={classes.total}>{score.scores.reduce((prev, curr) => prev + curr.stroke, 0)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <MedalResult />
        <Button className={classes.toTop} fullWidth color='primary' variant='contained' onClick={() => props.history.push('/')}>トップに戻る</Button>
      </div>
    </div>
  )
}

export default Result