import * as React from 'react'
import { Button, Snackbar, SnackbarContent, IconButton } from '@material-ui/core'
import { Props, State } from 'containers/ResultFooterContainer'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'

export default class ResultFooter extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      saved: false,
      snack: false,
    }
  }

  save = () => {
    this.props.save()
    this.setState({saved: true, snack: true})
  }

  render() {
    const { classes } = this.props
    const { snack, saved } = this.state

    return (
      <>
        <div className={classes.root}>
          <Button disabled={saved} className={classes.save} fullWidth color='primary' variant='contained' onClick={() => this.save()}>保存する</Button>
          <Button className={classes.toTop} fullWidth color='primary' variant='contained' onClick={() => this.props.history.push('/')}>トップに戻る</Button>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={snack}
          autoHideDuration={null}
          onClose={() => this.setState({snack: false})}
        >
          <SnackbarContent
            className={classes.snackBar}
            message={<div className={classes.message}><InfoIcon className={classes.infoIcon} />保存しました！</div>}
            action={[
              <IconButton
                key='close-button'
                onClick={() => this.setState({snack: false})}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>,
            ]}
          />
        </Snackbar>
      </>
    )
  }
}
