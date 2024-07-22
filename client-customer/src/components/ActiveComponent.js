import axios from 'axios';
import React, { Component } from 'react';

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: '',
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
      <div className="flex justify-center items-center h-screen dark:bg-gray-900" >
        <div className="bg-white p-8 shadow-md rounded-md w-full md:w-1/2 lg:w-1/3 xl:w-1/4 dark:bg-gray-800"style={{marginTop:'-300px'}}>
          <h2 className="text-center text-2xl font-bold mb-4 dark:text-white">ACTIVE ACCOUNT</h2>
          {this.renderAlert()}
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 dark:text-white">ID</label>
              <input
                type="text"
                value={this.state.txtID}
                onChange={(e) => this.setState({ txtID: e.target.value })}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 dark:text-white">Token</label>
              <input
                type="text"
                value={this.state.txtToken}
                onChange={(e) => this.setState({ txtToken: e.target.value })}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                onClick={(e) => this.btnActiveClick(e)}
              >
                ACTIVE
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;

    if (id && token) {
      this.apiActive(id, token);
    } else {
      this.setState({ alertMessage: 'Please input ID and Token' });
    }
  }

  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        this.setState({ alertMessage: 'Account activated successfully!' });
      } else {
        this.setState({ alertMessage: 'Failed to activate account. Please check ID and Token.' });
      }
    });
  }
}

export default Active;
