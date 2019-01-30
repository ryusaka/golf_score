import * as React from 'react'
import {
  TextField,
  Button,
  Paper,
} from '@material-ui/core'
import { Props, State } from 'containers/TopPageContainer'
import Header from 'containers/HeaderContainer'

export default class TopPage extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      name: props.field.name
    }
  }

  onTextChange = (e) => {
    this.setState({name: e.target.value})
  }

  onSubmit = () => {
    this.props.resetScore()
    this.props.resetField()
    this.props.resetPlayer()
    this.props.loadField(this.state.name)
    this.props.history.push('/setup')
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Header><h2>スコア管理</h2></Header>
        <Paper elevation={1} className={classes.paper}>
          <h2 className={classes.title}>コース名</h2>
          <TextField
            label='コース名'
            className={classes.textField}
            variant='outlined'
            value={this.state.name}
            onChange={this.onTextChange}
          />
          <div className={classes.buttonWrap}>
            <Button className={classes.button} fullWidth variant='contained' color='primary' onClick={this.onSubmit}>開始</Button>
          </div>
        </Paper>
      </div>
    )
  }
}