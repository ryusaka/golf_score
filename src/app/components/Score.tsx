import * as React from 'react'
import { Button, Paper } from '@material-ui/core'
import BackIcon from '@material-ui/icons/ChevronLeft'
import ForwardIcon from '@material-ui/icons/ChevronRight'

import { State, Props } from 'containers/ScoreContainer'
import Header from 'containers/HeaderContainer'
import ScoreInput from 'containers/ScoreInputContainer'

export default class Score extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  finish = () => {
    this.props.finish()
    this.props.save()
    this.props.history.push('/result')
  }

  render() {
    const { classes, players, now, field } = this.props
    return (
      <div className={classes.root}>
        <Header>
          <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
            <h1 style={{fontSize: 22}}>Score</h1>
            <h3>HOLE: <span style={{fontSize: 24, marginRight: 10}}>{now}</span> PAR: <span style={{fontSize: 24}}>{field.holes[now - 1].par}</span></h3>
          </div>
        </Header>
        <div className={classes.main}>
          {players.map(p => (
            <Paper key={p.id} className={classes.paper} elevation={1}>
              <ScoreInput player={p} />
            </Paper>
          ))}
        </div>
        <Paper className={classes.bottom}>
          <Button disabled={now <= 1} className={classes.button} color='primary' variant='contained' onClick={() => this.props.back()}><BackIcon />{now !== 1 ? now - 1 : ''}</Button>
          <div style={{width: 10}} />
          {now === 9 ?
            <Button className={classes.button} color='secondary' variant='contained' onClick={this.finish}>終了</Button>
          :
            <Button className={classes.button} color='primary' variant='contained' onClick={() => this.props.forward()}><ForwardIcon />{now + 1}</Button>
          }
        </Paper>
      </div>
    )
  }
}
