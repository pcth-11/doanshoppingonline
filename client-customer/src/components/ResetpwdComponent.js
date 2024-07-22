import axios from 'axios';
import React, { Component } from 'react';

class Resetpwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtEmail: '',
      txtID: '',
      txtToken: '',
      txtPassword: ''
    };
  }

  render() {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <div className="bg-white p-8 shadow-md rounded-md w-full md:w-1/2 lg:w-1/3 xl:w-1/4 dark:bg-gray-800">
        <h2 className="text-center text-2xl font-bold mb-4 dark:text-white">RESET PASSWORD</h2>
        <form> 
            <div className='mb-4'>
                <label  className="block text-sm font-medium text-gray-600 dark:text-white">
                    Email
                </label>
                <input type="text"
                    value={this.state.txtEmail} 
                    onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} 
                    className="mt-1 p-2 w-full border border-gray-300 rounded dark:text-white dark:bg-gray-700"/>
            </div>
            <div className='mb-4'>
                <button
                    onClick={(e) => this.btnEmailClick(e)} 
                    className=" bg-blue-500 mt-1 p-2 w-full border border-blue-300 rounded dark:text-white  hover:bg-blue-600 active:bg-blue-700">
                    SEND EMAIL
                </button>
            </div>
            <div className='mb-4'>
                <label  className="block text-sm font-medium text-gray-600 dark:text-white">
                    ID
                </label>
                <input type="text"
                    value={this.state.txtID} 
                    onChange={(e) => { this.setState({ txtID: e.target.value }) }} 
                    className="mt-1 p-2 w-full border border-gray-300 rounded dark:text-white dark:bg-gray-700"/>
            </div>
            <div className='mb-4'>
                <label  className="block text-sm font-medium text-gray-600 dark:text-white">
                    Token
                </label>
                <input type="text"
                    value={this.state.txtToken} 
                    onChange={(e) => { this.setState({ txtToken: e.target.value }) }} 
                    className="mt-1 p-2 w-full border border-gray-300 rounded dark:text-white dark:bg-gray-700"/>
            </div>
            <div className='mb-4'>
                <label  className="block text-sm font-medium text-gray-600 dark:text-white">
                    New password
                </label>
                <input type="password"
                    value={this.state.txtPassword} 
                    onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} 
                    className="mt-1 p-2 w-full border border-gray-300 rounded dark:text-white dark:bg-gray-700"/>
            </div>
            <div className='mb-4'>
                <button
                    onClick={(e) => this.btnResetClick(e)} 
                    className=" bg-blue-500 mt-1 p-2 w-full border border-blue-300 rounded dark:text-white  hover:bg-blue-600 active:bg-blue-700">
                    RESET
                </button>
            </div>

        </form>
        </div>
      </div>
    );
  }

  // event-handlers
  btnEmailClick(e) {
    e.preventDefault();
    const email = this.state.txtEmail;
    if (email) {
      this.apiSendmail(email);
    } else {
      alert('Please input email');
    }
  }

  btnResetClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    const password = this.state.txtPassword;
    if (id && token && password) {
      this.apiResetpwd(id, token, password);
    } else {
      alert('Please input id and token and password');
    }
  }

  // apis
  apiSendmail(email) {
    axios.get('/api/customer/sendmail/' + email).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }

  apiResetpwd(id, token, password) {
    const body = { id: id, token: token, password: password };
    axios.post('/api/customer/resetpwd', body).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}

export default Resetpwd;