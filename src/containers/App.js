import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText, FormGroup } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { connect } from 'react-redux'
import validate from 'validate.js'; 
import {shortenUrl} from '../actions/shortenUrlActions'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 500
  }
});

const constraints = {
  link: {
    url: {
      allowLocal: true
    }
  }
};

export class AppBase extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        link: '',
        error: false,
        errorMessages: { link: '' }
      }
    }

    handleChange = event => {
      this.setState({ link: event.target.value });
    };

    handleClick = () => {
      const { dispatch } = this.props;
      var error = validate(this.state, constraints)
      if (error) {
        this.setState({ error: true, errorMessages: error});
      }
      else {
        this.setState({ error: false, errorMessages: { link: ''}});
        dispatch(shortenUrl(this.state.link));
      }
    }

    render() {
      const { classes, isFetching, shortLink } = this.props;
      return (
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="title" color="inherit">
                URL Shortener
              </Typography>
            </Toolbar>
          </AppBar>
          <div>           
            <FormControl className={classes.formControl} error={this.state.error} aria-describedby="name-error-text">
                <InputLabel htmlFor="name-error">Link</InputLabel>
                <Input id="name-error" placeholder="Paste or type a link to shorten it" 
                  value={this.state.link} 
                  onChange={this.handleChange} />
                <FormHelperText id="name-error-text">{this.state.errorMessages.link}</FormHelperText>
            </FormControl>
            <Button className={classes.button} onClick={this.handleClick}>Shorten</Button>
          </div> 
          { true && ( 
          <div style={{display: 'flex'}}>
            <div style={{padding:16}}>
              <Typography paragraph={false} >
                {shortLink || 'Paste or type a link to shorten it'}
              </Typography> 
            </div>
            <Button className={classes.button} onClick={this.handleClick} color="primary" variant="raised">copy</Button>
          </div> ) }             
        </div>
      );
    }
}

AppBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { shortenUrlReducer } = state
  const { isFetching, originalLink, shortLink} = shortenUrlReducer
  return {
    isFetching,
    originalLink,
    shortLink
  }
}

var App = withStyles(styles, { withTheme: true })(AppBase)

export default connect(mapStateToProps)(App); 