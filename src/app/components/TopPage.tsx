import * as React from 'react'
import {
  Button,
  Paper,
} from '@material-ui/core'
import { Props, State } from 'containers/TopPageContainer'
import Header from 'containers/HeaderContainer'
import FieldList from 'containers/FieldListContainer'
import { IField } from 'lib/interfaces';

export default class TopPage extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      field: null,
    }
  }

  onFieldSelect = (field: IField) => {
    this.setState({field})
  }

  onSubmit = () => {
    this.props.resetScore()
    this.props.resetPlayer()
    const { field } = this.state
    this.props.loadFromHistory(field)
    return this.props.history.push('/setup-user')
  }

  render() {
    const { classes } = this.props
    const { field } = this.state
    return (
      <div className={classes.root}>
        <Header><h1 style={{fontSize: 24}}>スコア管理</h1></Header>
        <Paper elevation={1} className={classes.paper}>
          <div style={{display: 'flex', flexDirection: 'column', margin: 5}}>
            <FieldList onSelect={this.onFieldSelect} />
          </div>
          <div className={classes.buttonWrap}>
            <Button className={classes.button} disabled={!field} variant='contained' color='primary' onClick={this.onSubmit}>開始</Button>
            <div className={classes.secondaryButtonWrap}>
              <Button className={classes.secondaryButton} fullWidth variant='contained' color='primary' onClick={() => this.props.history.push('/setup-field')}>コース登録</Button>
              <Button className={classes.secondaryButton} fullWidth variant='contained' color='secondary' onClick={() => this.props.history.push('/histories')}>プレー履歴</Button>
            </div>
          </div>
        </Paper>
      </div>
    )
  }
}