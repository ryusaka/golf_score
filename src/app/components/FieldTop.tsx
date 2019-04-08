import * as React from 'react'
import { Button, Paper } from '@material-ui/core'
import { Props } from 'containers/FieldTopContainer'
import Header from 'containers/HeaderContainer'
import FieldList from 'containers/FieldListContainer'

const FieldTop: React.FunctionComponent<Props> = props => {
  const { classes } = props
  return (
    <div className={classes.root}>
      <Header><h2 style={{fontSize: 24}}>ゴルフ場管理</h2></Header>
      <div className={classes.list}>
        <FieldList />
      </div>
      <Paper className={classes.bottom}>
        <Button className={classes.new} variant='contained' fullWidth color='primary' onClick={() => props.history.push('/fields/new')}>新規登録</Button>
      </Paper>
    </div>
  )
}

export default FieldTop