import * as React from 'react'
import { connect } from 'react-redux'
import * as H from 'history'
import { WithStyles } from '@material-ui/core'
import {
  withStyles,
  createStyles,
  Theme,
  TextField,
  Button,
} from '@material-ui/core'
import { load as loadField } from 'modules/field'
import { reset as resetScore } from 'modules/score'
import { reset as resetField } from 'modules/field'
import { reset as resetPlayer } from 'modules/player'

import { ReduxState } from 'lib/store'
import { IField } from 'lib/interfaces'

const styles = createStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    width: 300,
  }
}))

interface State {
  name: string
}
interface Props extends WithStyles<typeof styles> {
  history: H.History
  loadField: (name: string) => void
  resetScore: () => void
  resetField: () => void
  resetPlayer: () => void
  field: IField
  classes: {
    root: string
    textField: string
  }
}
class TopPage extends React.Component<Props, State> {
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
        <h1>スコア入力</h1>
        <TextField
          label='コース名'
          className={classes.textField}
          variant='outlined'
          value={this.state.name}
          onChange={this.onTextChange}
        />
        <Button variant='outlined' onClick={this.onSubmit}>開始</Button>
      </div>
    )
  }
}

const mapDispatchToProps = {
  loadField,
  resetScore,
  resetField,
  resetPlayer,
}

export default withStyles(styles)(connect((state: ReduxState) => ({
  field: state.field,
}), mapDispatchToProps)(TopPage))