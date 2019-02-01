import * as React from 'react'
import { Button } from '@material-ui/core'
import { Props } from 'containers/ResultFooterContainer'

const ResultFooter: React.FunctionComponent<Props>  = props => {
  const { classes } = props

  return (
    <>
      <div className={classes.root}>
        <Button className={classes.toTop} fullWidth color='primary' variant='contained' onClick={() => props.history.push('/')}>トップに戻る</Button>
      </div>
    </>
  )
}

export default ResultFooter