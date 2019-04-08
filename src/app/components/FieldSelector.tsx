import * as React from 'react'
import {
  NativeSelect, FormControl, InputLabel,
} from '@material-ui/core'
import { Props, State } from 'containers/FieldSelectorContainer'

export default class FieldSelector extends React.Component<Props, State> {
  handleChange = (e) => {
    this.props.onSelect(this.props.fields.find(f => f.id === e.target.value))
  }

  render() {
    const { fields } = this.props
    return (
      <FormControl>
        <InputLabel htmlFor='field-select'>リストから選択</InputLabel>
        <NativeSelect
          onChange={this.handleChange}
          name='field'
          inputProps={{id: 'field-select'}}
        >
          <option value='' />
          {fields.map(f =>
            <option key={f.id} value={f.id}>{f.name}</option>
          )}
        </NativeSelect>
      </FormControl>
    )
  }
}