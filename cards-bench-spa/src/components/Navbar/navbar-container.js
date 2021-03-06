import React, { Component } from 'react';

import NavbarView from './navbar-view';

import { Login, Logout, decodedToken } from '../../services/auth-service'
import Notify  from '../../services/sweetalert-service'


class Navbar extends Component {
  state = {
    showLoginBar: false,
    email: '',
    password: '',
    validEmail: 'untouched',
    validPassword: 'untouched',
    validForm: false,
    loggingIn: false,
  };

  componentWillUnmount() {
    this.setState({email: '', password: ''});
  }

  toggleLogin = () => {
    this.setState({ showLoginBar: !this.state.showLoginBar });
  };

  login = (event) => {
    event.preventDefault();
    this.setState({loggingIn: true});

    const loginInfo = {
      email: this.state.email,
      password: this.state.password
    };
    
    Login(loginInfo).finally(() => {
      if (localStorage.getItem('token') !== null) {
        this.setState({email: '', password: ''});
        this.props.changeAuthenticationState();
        Notify.success('Welcome ' + JSON.parse(localStorage.getItem('user')).knownAs, 'Have a nice day.', false, '');
      } else {
        Notify.info('Wrong Email or Password');
      }

      this.setState({loggingIn: false});
    })
  };

  logout = (event) => {
    event.preventDefault();
    Logout();
    this.props.changeAuthenticationState();
    Notify.info('Logged out. Redirecting to the Homepage.')
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.checkFormValidation);
  };

  checkFormValidation() {
    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const emailValidation = new RegExp(re).test(this.state.email);

    let validForm = true;

    if (this.state.password.length > 3) {
      this.setState({ validPassword: 'true' });
    } else if (this.state.password.length > 0) {
      this.setState({ validPassword: 'false' });
      validForm = false;
    } else {
      validForm = false;
    }

    if (emailValidation) {
      this.setState({ validEmail: 'true' });
    } else if (this.state.email.length > 0) {
      this.setState({ validEmail: 'false' });
      validForm = false;
    } else {
      validForm = false;
    }

    if (validForm) {
      this.setState({ validForm: true });
    } else {
      this.setState({ validForm: false });
    }
  }

  render() {
    return (
      <NavbarView
        authenticated={this.props.authenticated}
        showLoginBar={this.state.showLoginBar}
        logout={this.logout}
        loginInfo={this.state}
        handleChange={this.handleChange}
        login={this.login}
        toggleLogin={this.toggleLogin}
        decodedToken={() => decodedToken()}
        isSmallScreen={this.props.isSmallScreen}
      />
    );
  }
}

export default Navbar;
