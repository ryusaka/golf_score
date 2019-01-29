import * as React from 'react'
import { Button } from '@material-ui/core'
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

  onTextChange = (e) => {
    this.props.loadField(e.target.value)
  }

  finish = () => {
    this.props.finish()
    this.props.history.push('/result')
  }

  render() {
    const { classes, players, now } = this.props
    return (
      <>
        <Header><div className={classes.now}>{now}番ホール</div></Header>
        <div className={classes.root}>
          {players.map(p => (
            <div key={p.id} className={classes.player}>
              <ScoreInput player={p} />
            </div>
          ))}
        </div>
        <div className={classes.bottom}>
          <Button disabled={now <= 1} className={classes.button} color='primary' variant='contained' onClick={() => this.props.back()}><BackIcon />{now !== 1 ? now - 1 : ''}</Button>
          <div style={{width: 10}} />
          {now === 9 ?
            <Button className={classes.button} color='primary' variant='contained' onClick={this.finish}><ForwardIcon />終了</Button>
          :
            <Button className={classes.button} color='primary' variant='contained' onClick={() => this.props.forward()}><ForwardIcon />{now + 1}</Button>
          }
        </div>
      </>
    )
  }
}
