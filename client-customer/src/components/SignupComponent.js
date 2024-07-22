import axios from 'axios';
import React, { Component } from 'react';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: '',
      alertMessage: '',
    };
  }

  renderAlert() {
    if (this.state.alertMessage) {
      return (
        <div className="bg-red-500 text-white p-3 mb-4 rounded">
          {this.state.alertMessage}
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <div className="bg-white p-8 shadow-md rounded-md w-full md:w-1/2 lg:w-1/3 xl:w-1/4 dark:bg-gray-800">
          <h2 className="text-center text-2xl font-bold mb-4 dark:text-white">Create Your Account</h2>
          {this.renderAlert()}
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 dark:text-white">Username</label>
              <input
                type="text"
                value={this.state.txtUsername}
                onChange={(e) => this.setState({ txtUsername: e.target.value })}
                className="mt-1 p-2 w-full border border-gray-300 rounded dark:text-white dark:bg-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-60 dark:text-white">Password</label>
              <input
                type="password"
                value={this.state.txtPassword}
                onChange={(e) => this.setState({ txtPassword: e.target.value })}
                className="mt-1 p-2 w-full border border-gray-300 rounded dark:text-white dark:bg-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 dark:text-white">Name</label>
              <input
                type="text"
                value={this.state.txtName}
                onChange={(e) => this.setState({ txtName: e.target.value })}
                className="mt-1 p-2 w-full border border-gray-300 rounded dark:text-white dark:bg-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 dark:text-white">Phone</label>
              <input
                type="tel"
                value={this.state.txtPhone}
                onChange={(e) => this.setState({ txtPhone: e.target.value })}
                className="mt-1 p-2 w-full border border-gray-300 rounded dark:text-white dark:bg-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 dark:text-white">Email</label>
              <input
                type="email"
                value={this.state.txtEmail}
                onChange={(e) => this.setState({ txtEmail: e.target.value })}
                className="mt-1 p-2 w-full border border-gray-300 rounded dark:text-white dark:bg-gray-700"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 font-semibold"
                onClick={(e) => this.btnSignupClick(e)}
              >
                SIGN-UP
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // event-handlers
  btnSignupClick(e) {
    e.preventDefault();
    const { txtUsername, txtPassword, txtName, txtPhone, txtEmail } = this.state;

    if (txtUsername && txtPassword && txtName && txtPhone && txtEmail) {
      const account = {
        username: txtUsername,
        password: txtPassword,
        name: txtName,
        phone: txtPhone,
        email: txtEmail,
      };
      this.apiSignup(account);
    } else {
      this.setState({ alertMessage: 'Please input all required fields' });
    }
  }

  // apis
  apiSignup(account) {
    axios
      .post('/api/customer/signup', account)
      .then((res) => {
        const result = res.data;
        this.setState({ alertMessage: 'Signup successful!' });
      })
      .catch((error) => {
        console.error('error', error);
      });
  }
}

export default Signup;
