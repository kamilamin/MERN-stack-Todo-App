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
import {register} from '../../actions/authActions';
import {clearError} from '../../actions/errorActions';

class Register extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    message: null,
  };

  static propType = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
  };

  componentDidUpdate (preProps) {
    const {error, isAuthenticated} = this.props;
    if (error !== preProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState ({
          message: error.msg.message,
        });
      } else {
        this.setState ({
          message: null,
        });
      }
    }
    // If authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle ();
      }
    }
  }

  toggle = () => {
    this.props.clearError ();
    this.setState ({
      modal: !this.state.modal,
    });
  };

  onChange = e => {
    this.setState ({[e.target.name]: e.target.value});
  };

  onSubmit = ev => {
    ev.preventDefault ();

    const {name, email, password} = this.state;
    //Create User OBJ
    const newUser = {
      name,
      email,
      password,
    };
    //Attempt to Register
    this.props.register (newUser);
  };
  render () {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader>Register User</ModalHeader>
          <ModalBody>
            {this.state.message
              ? <Alert color="danger">{this.state.message}</Alert>
              : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="Name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="Name"
                  className="mb-3"
                  placeholder="Name"
                  onChange={this.onChange}
                />
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
                  Register
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
  register: PropTypes.func.isRequired,
});

export default connect (mapStateToProps, {register, clearError}) (Register);
