import * as React from 'react'
import {
  Avatar,
  IconButton,
  Button,
  Paper,
  TextField,
} from '@material-ui/core'
import { Props, State } from 'containers/SetupFieldContainer'
import * as qs from 'qs'
import Header from 'containers/HeaderContainer'

export default class SetupField extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      holes: [...new Array(9)].fill(1).map((_, idx) => ({number: idx + 1, par: 4})),
      name: '',
    }
  }

  componentDidMount() {
    const search = qs.parse(this.props.location.search)
    if (search.field) {
      this.setState({
        holes: search.field.holes.map(h => ({par: Number(h.par), number: Number(h.number)})),
        name: search.field.name,
      })
    }
  }

  onTextChange = (e) => {
    this.setState({name: e.target.value})
  }

  setPar = (par) => (hole) => () => {
    const { holes } = this.state
    holes[hole - 1].par = par
    this.setState({holes})
  }

  submit = () => {
    this.props.create(this.state.name, this.state.holes)
    this.props.history.push('/')
  }

  render() {
    const { classes } = this.props
    const { holes, name } = this.state

    return (
      <div className={classes.root}>
        <Header>
          <h1 style={{fontSize: 24, textAlign: 'center'}}>コース情報入力</h1>
        </Header>
        <TextField
          label='コース名'
          className={classes.textField}
          variant='outlined'
          value={this.state.name}
          onChange={this.onTextChange}
        />
        <Paper className={classes.main}>
          <div className={classes.hole}>
            <div className={classes.holeNumber}>ホール</div>
            <div className={classes.avatars}>PAR</div>
          </div>
          {holes.map(hole =>
            <div key={`hole_${hole.number}`} className={classes.hole}>
              <div className={classes.holeNumber}>{hole.number}</div>
              <div className={classes.avatars}>
                <IconButton className={classes.avatar} onClick={this.setPar(3)(hole.number)}><Avatar className={hole.par === 3 ? classes.selected : ''}>3</Avatar></IconButton>
                <IconButton className={classes.avatar} onClick={this.setPar(4)(hole.number)}><Avatar className={hole.par === 4 ? classes.selected : ''}>4</Avatar></IconButton>
                <IconButton className={classes.avatar} onClick={this.setPar(5)(hole.number)}><Avatar className={hole.par === 5 ? classes.selected : ''}>5</Avatar></IconButton>
              </div>
            </div>
          )}
        </Paper>
        <Paper className={classes.submitButton}>
          <Button disabled={!name || holes.length !== 9} className={classes.button} color='primary' variant='contained' onClick={this.submit}>登録</Button>
        </Paper>
      </div>
    )
  }
}

