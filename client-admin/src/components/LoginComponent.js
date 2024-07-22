import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";

class Login extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "",
      txtPassword: "",
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
    if (this.context.token === "") {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
            <h2 className="text-2xl mb-4 text-center">ADMIN LOGIN</h2>
            {this.renderAlert()}
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  value={this.state.txtUsername}
                  onChange={(e) => {
                    this.setState({ txtUsername: e.target.value });
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  value={this.state.txtPassword}
                  onChange={(e) => {
                    this.setState({ txtPassword: e.target.value });
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={(e) => this.btnLoginClick(e)}
                >
                  LOGIN
                </button>
              </div>
            </form>
          
          </div>
        </div>
      );
    }
    return <div />;
  }
  componentDidMount(){
    const token = localStorage.getItem('admin_token');
    if (token) this.apiGetAccount(token);
  }

  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      this.setState({ alertMessage: 'Please input username and password' });
    }
  }

  apiLogin(account) {
    axios.post("/api/admin/login", account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
        localStorage.setItem('admin_token', result.token)
      } else {
        this.setState({ alertMessage: result.message });
      }
    });
  }
  apiGetAccount(token) {
    const config = { headers: {'x-access-token': token} };
    axios.get('/api/admin/accounts', config).then((res)=> {
      const result = res.data;
      this.context.setToken(token);
      this.context.setUsername(result.username);
    });
  }
}

export default Login;
