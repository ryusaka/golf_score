import { connect } from 'react-redux'
import { IField } from 'lib/interfaces'

import FieldList from 'components/FieldList'
import { get as getStorage } from 'lib/storage'
import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core'
import compose from 'recompose/compose'

const styles = (theme: Theme) => createStyles({
  paper: {
    padding: 10,
    marginBottom: 10,
  },
  fieldName: {
    fontSize: 20,
  },
  fieldButton: {
    display: 'flex',
  },
  removeButton: {
    marginLeft: 'auto',
  },
  qrDialog: {
    width: 'auto',
  },
  qr: {
    padding: 10,
  },
  removeConfirm: {
    background: theme.palette.error.main,
    color: theme.palette.common.white,
  },
})
export interface State {
  qr: string
  remove: IField
  deleted: boolean
}
export interface Props extends WithStyles<typeof styles> {
  fields: IField[]
  remove: (id: string) => void
}

export default compose(
  withStyles(styles),
  connect(() => ({
    fields: getStorage('fields') || [],
  })),
)(FieldList)