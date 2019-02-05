import * as React from 'react'
import {
  NativeSelect, FormControl, FormControlLabel, InputLabel,
} from '@material-ui/core'
import { Props, State } from 'containers/FieldListContainer'

export default class FieldList extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

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