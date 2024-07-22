import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import MyContext from '../contexts/MyContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Myprofile extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }

  render() {
    if (this.context.token === '') return <Navigate replace to="/login" />;

    return (
      <div className="dark:bg-gray-900">
      <div className="container mx-auto pt-8 dark:bg-gray-900">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">My Profile</h2>
        </div>

        <form className="mx-auto max-w-sm">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2 dark:text-white">
              Username
            </label>
            <input
              type="text"
              value={this.state.txtUsername}
              onChange={(e) => this.setState({ txtUsername: e.target.value })}
              className="w-full border rounded-md p-2 dark:text-white dark:bg-gray-700"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2 dark:text-white">
              Password
            </label>
            <input
              type="password"
              value={this.state.txtPassword}
              onChange={(e) => this.setState({ txtPassword: e.target.value })}
              className="w-full border rounded-md p-2 dark:text-white dark:bg-gray-700"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2 dark:text-white">
              Name
            </label>
            <input
              type="text"
              value={this.state.txtName}
              onChange={(e) => this.setState({ txtName: e.target.value })}
              className="w-full border rounded-md p-2 dark:text-white dark:bg-gray-700"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2 dark:text-white">
              Phone
            </label>
            <input
              type="tel"
              value={this.state.txtPhone}
              onChange={(e) => this.setState({ txtPhone: e.target.value })}
              className="w-full border rounded-md p-2 dark:text-white dark:bg-gray-700"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2 dark:text-white">
              Email
            </label>
            <input
              type="email"
              value={this.state.txtEmail}
              onChange={(e) => this.setState({ txtEmail: e.target.value })}
              className="w-full border rounded-md p-2 dark:text-white dark:bg-gray-700"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              onClick={(e) => this.handleUpdateClick(e)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.context.customer) {
      const {
        username,
        password,
        name,
        phone,
        email
      } = this.context.customer;
      this.setState({
        txtUsername: username,
        txtPassword: password,
        txtName: name,
        txtPhone: phone,
        txtEmail: email
      });
    }
  }

  handleUpdateClick(e) {
    e.preventDefault();
    const { txtUsername, txtPassword, txtName, txtPhone, txtEmail } = this.state;

    if (txtUsername && txtPassword && txtName && txtPhone && txtEmail) {
      const customer = {
        username: txtUsername,
        password: txtPassword,
        name: txtName,
        phone: txtPhone,
        email: txtEmail
      };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      toast.error('Please input all fields');
    }
  }

  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios
      .put(`/api/customer/customers/${id}`, customer, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          toast.success('Profile updated successfully!');
          this.context.setCustomer(result);
        } else {
          toast.error('Failed to update profile.');
        }
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        toast.error('An error occurred while updating profile.');
      });
  }
}

export default Myprofile;
