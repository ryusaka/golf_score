import * as React from 'react'
import { TextField, Button, Paper } from '@material-ui/core'
import { Props, State } from 'containers/TopPageContainer'
import HeaderContainer from 'components/HeaderContainer'

export default class TopPage extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      name: props.field.name,
    }
  }

  onTextChange = (e) => {
    this.setState({ name: e.target.value })
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
      <HeaderContainer header={<h1 style={{ fontSize: 24 }}>スコア管理</h1>}>
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
            <Button className={classes.button} fullWidth variant='contained' color='primary' onClick={this.onSubmit}>
              開始
            </Button>
            <Button
              className={classes.button}
              fullWidth
              variant='outlined'
              color='secondary'
              onClick={() => this.props.history.push('/histories')}
            >
              履歴を見る
            </Button>
          </div>
        </Paper>
      </HeaderContainer>
    )
  }
}
