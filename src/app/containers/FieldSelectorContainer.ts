import { connect } from 'react-redux'
import { IField } from 'lib/interfaces'

import FieldSelector from 'components/FieldSelector'
import { get as getStorage } from 'lib/storage'

export interface State {
}
export interface Props {
  fields: IField[]
  onSelect: (field: IField) => void
}

export default connect(() => ({
  fields: getStorage('fields') || [],
}))(FieldSelector)