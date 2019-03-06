import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';


const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  bootstrapFormLabel: {
    fontSize: 17,
  },
});

class CustomizedSelects extends React.Component {
  state = {
    age: '',
  };

  handleChange = event => {
    this.setState({ age: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <Grid container spacing={24}>
          
          
          <Grid item xs={12} sm={3}>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="age-customized-native-simple" className={classes.bootstrapFormLabel}>
              장비 구분
            </InputLabel>
            <NativeSelect value={this.state.age} onChange={this.handleChange} input={<BootstrapInput name="age" id="age-customized-native-simple" />}>
              <option value="" />
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </NativeSelect>
          </FormControl>

          </Grid>

          <FormControl className={classes.margin}>
            <InputLabel htmlFor="age-customized-native-simple" className={classes.bootstrapFormLabel}>
              장비 상태
            </InputLabel>
            <NativeSelect value={this.state.age} onChange={this.handleChange} input={<BootstrapInput name="age" id="age-customized-native-simple" />}>
              <option value="" />
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </NativeSelect>
          </FormControl>

          <FormControl className={classes.margin}>
            <InputLabel htmlFor="age-customized-native-simple" className={classes.bootstrapFormLabel}>
              요청 상태
            </InputLabel>
            <NativeSelect value={this.state.age} onChange={this.handleChange} input={<BootstrapInput name="age" id="age-customized-native-simple" />}>
              <option value="" />
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </NativeSelect>
          </FormControl>

          <FormControl className={classes.margin}>
            <InputLabel htmlFor="age-customized-select" className={classes.bootstrapFormLabel}>
              장비 구분
            </InputLabel>
            <BootstrapInput />
          </FormControl>
          
        </Grid>
      </form>
    );
  }
}

CustomizedSelects.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedSelects);