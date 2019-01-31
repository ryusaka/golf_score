import * as React from 'react'
import {
  Button,
  TextField,
  Paper,
} from '@material-ui/core'
import { Props, State } from 'containers/SetupUserContainer'
import Header from 'containers/HeaderContainer'

export default class Setup extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      players: props.players.map(p => p.name).concat(new Array(4).fill('')).slice(0, 4),
    }
  }

  submit = () => {
    this.props.set(this.state.players.map(p => ({name: p})))
    this.props.resetScore()
    this.props.history.push('/score')
  }

  onChangeText = (playerNum) => (e) => {
    const { players } = this.state
    players[playerNum - 1] = e.target.value
    this.setState({players})
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Header>
          <h1 style={{fontSize: 24}}>名前入力</h1>
        </Header>
        <Paper className={classes.main}>
          {[1, 2, 3, 4].map(p => (
            <TextField onChange={this.onChangeText(p)} key={p} variant='outlined' value={this.state.players[p - 1]} label={`Player${p}`} className={classes.textField} type='text' />
          ))}
        </Paper>
        <Paper className={classes.submitButton}>
          <Button color='primary' className={classes.button} variant='contained' onClick={this.submit}>決定</Button>
        </Paper>
      </div>
    )
  }
}