import * as React from 'react'
import clsx from 'clsx'
import { Table, TableHead, TableRow, TableCell, TableBody, Avatar, makeStyles } from '@material-ui/core'
import type { Round as RoundType, Course as CourseType } from 'common/types/models'
import { useSelector } from 'react-redux'
import { RootState } from 'modules/reducer'

type Props = {
  round: RoundType.Model
  course: CourseType.Model
}

const useStyles = makeStyles((theme) => ({
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
  medal: {
    fontSize: 14,
    width: 24,
    height: 24,
    margin: 'auto',
    color: theme.palette.common.white,
  },
  row: {
    height: 60,
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
  bronze: {
    background: '#8C4841',
  },
  iron: {
    background: '#034358',
  },
  par: {
    fontSize: 12,
    color: theme.palette.grey[700],
  }
}))

const Result: React.FunctionComponent<Props> = (props) => {
  const { round, course } = props
  const me = useSelector((state: RootState) => state.auth.user)
  const classes = useStyles()

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.name}>
            <div>HOLE</div>
            <div className={classes.par}>PAR</div>
          </TableCell>
          {new Array(9).fill(0).map((_, idx) => {
            return (
              <TableCell key={idx} className={classes.score}>
                <div>{idx + 1}</div>
                <div className={classes.par} style={{fontSize: 12}}>{course.holes[idx].par}</div>
              </TableCell>
            )
          })}
          <TableCell className={classes.total}>計</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow className={classes.row}>
          <TableCell className={classes.name} component='th' scope='row'>
            {me.name || me.userId}
          </TableCell>
          {round.score.mine.map((s) => (
            <TableCell key={s._id} className={classes.score} align='right'>
              {s.medal ? (
                <Avatar className={clsx(classes[s.medal], classes.medal)}>{s.stroke}</Avatar>
              ) : (
                <div>{s.stroke}</div>
              )}
              ({s.put || 0})
            </TableCell>
          ))}
          <TableCell className={classes.total}>
            {round.score.mine.reduce((prev, curr) => prev + curr.stroke, 0)}
          </TableCell>
        </TableRow>
        {round.score.others.map((o) => {
          return (
            <TableRow key={o._id} className={classes.row}>
              <TableCell className={classes.name} component='th' scope='row'>
                {o.name}
              </TableCell>
              {o.score.map((s) => (
                <TableCell key={s._id} className={classes.score} align='right'>
                  {s.medal ? (
                    <Avatar className={clsx(classes[s.medal], classes.medal)}>{s.stroke}</Avatar>
                  ) : (
                    <div>{s.stroke}</div>
                  )}
                  ({s.put || 0})
                </TableCell>
              ))}
              <TableCell className={classes.total}>{o.score.reduce((prev, curr) => prev + curr.stroke, 0)}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default Result
