import * as React from 'react'
import { Props, State } from 'containers/FieldListContainer'
import QR from 'components/QR'
import { Paper, Dialog, Button, DialogActions, DialogTitle } from '@material-ui/core'
import * as qs from 'qs'

import Header from 'containers/HeaderContainer'

const webOrigin = process.env.TARGET_ENV === 'production' ? 'https://golfix.herokuapp.com' : 'http://localhost:11000'
export default class FieldList extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      qr: null,
      remove: null,
      deleted: false,
    }
  }

  onDelete = () => {
    this.props.remove(this.state.remove.id)
    this.setState({deleted: true, remove: null})
  }

  render() {
    const { fields, classes } = this.props
    const { qr, remove, deleted } = this.state

    return (
      <>
        {fields.map(field =>
          <Paper key={field.id} className={classes.paper} >
            <div className={classes.fieldName}>{field.name}</div>
            <div className={classes.fieldButton}>
              <Button variant='outlined' color='primary' onClick={() => this.setState({qr: `${webOrigin}/fields/new?${qs.stringify({field})}`})}>QRコード</Button>
              <Button variant='outlined' className={classes.removeButton} onClick={() => this.setState({remove: field})}>削除</Button>
            </div>
          </Paper>
        )}
        <Dialog
          open={!!qr}
          onClose={() => this.setState({qr: null})}
          classes={{paper: classes.qrDialog}}
        >
          <div className={classes.qr}>
            <QR value={qr} />
          </div>
        </Dialog>
        <Dialog
          open={!!remove}
          onClose={() => this.setState({remove: null})}
        >
          <DialogTitle>
            削除しますか？
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => this.setState({remove: null})} variant='outlined' >キャンセル</Button>
            <Button onClick={this.onDelete} disabled={deleted} variant='contained' className={classes.removeConfirm}>削除</Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}