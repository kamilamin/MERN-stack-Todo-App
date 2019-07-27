import React, {Component} from 'react';
import {
  Button,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/authActions';
import {clearError} from '../../actions/errorActions';

class Login extends Component {
  state = {
    modal: false,
    email: '',
    password: '',
    message: null,
  };

  static propType = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
  };

  componentDidUpdate (prevProps) {
    const {error, isAuthenticated} = this.props;
    if (error != prevProps) {
      if (error.id === 'LOGIN_FAIL') {
        this.setState ({
          message: error.msg.message,
        });
      } else {
        this.setState ({
          message: null,
        });
      }
    }

    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle ();
      }
    }
  }

  toggle = () => {
    this.setState ({
      modal: !this.state.modal,
    });
  };

  onChange = e => {
    this.setState ({[e.target.name]: e.target.value});
  };

  onSubmit = ev => {
    ev.preventDefault ();
    const {email, password} = this.state;
    const user = {email, password};
    // Attempt to Login
    this.props.login (user);
  };
  render () {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Login{' '}
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader>Login User</ModalHeader>
          <ModalBody>
            {this.state.message
              ? <Alert color="danger">{this.state.message}</Alert>
              : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="Email">Email</Label>
                <Input
                  type="text"
                  name="email"
                  id="Email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="Password">Password</Label>
                <Input
                  type="text"
                  name="password"
                  id="Password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{marginTop: '2rem'}} block>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect (mapStateToProps, {login, clearError}) (Login);
