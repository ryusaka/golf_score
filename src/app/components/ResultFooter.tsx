import * as React from 'react'
import { Button } from '@material-ui/core'
import { Props } from 'containers/ResultFooterContainer'

const ResultFooter: React.FunctionComponent<Props> = (props) => {
  const { classes } = props
  const save = () => {
    props.save()
    props.history.push('/')
  }

  return (
    <div>
      <Button className={classes.toTop} fullWidth color='primary' variant='contained' onClick={() => save()}>スコアを保存する</Button>
      <Button className={classes.toTop} fullWidth color='primary' variant='contained' onClick={() => props.history.push('/')}>トップに戻る</Button>
    </div>
  )
}

export default ResultFooter