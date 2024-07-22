import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { FaCheck, FaTimes } from "react-icons/fa";

class Customer extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      orders: [],
      order: null,
      selectedCustomerId: null,
      selectedOrdId: null,
    };
  }

  renderStatusIcon(active) {
    return active ? (
      <FaCheck className="text-green-500 " />
    ) : (
      <FaTimes className="text-red-500" />
    );
  }
  getStatusColorClass(status) {
    switch (status) {
      case "PENDING":
        return "text-gray-900";
      case "APPROVED":
        return "text-green-900";
      case "CANCELED":
        return "text-red-900";
      default:
        return "text-gray-900"; // Default color for unknown status
    }
  }
  render() {
    const customers = this.state.customers.map((item, index) => (
      <tr
        key={item._id}
        className={`border text-center border-gray-300 hover:bg-gray-100 cursor-pointer ${
          index % 2 === 0 ? "bg-white" : "bg-gray-100"
        } ${this.state.selectedCustomerId === item._id ? "bg-yellow-300 hover:bg-yellow-200" : ""}`}
        onClick={() => this.trCustomerClick(item)}
      >
        <td className="py-2 px-4">{item._id.slice(-5)}</td>
        <td className="py-2 px-4 font-semibold text-blue-600">
          {item.username}
        </td>
        <td className="py-2 px-4">{item.password}</td>
        <td className="py-2 px-4">{item.name}</td>
        <td className="py-2 px-4">{item.phone}</td>
        <td className="py-2 px-4">{item.email}</td>
        <td className="py-2 px-4 flex items-center justify-center">
          {this.renderStatusIcon(item.active)}
        </td>
        <td className="py-2 px-4">
          {item.active === 0 ? (
            <span
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => this.lnkEmailClick(item)}
            >
              EMAIL
            </span>
          ) : (
            <span
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => this.lnkDeactiveClick(item)}
            >
              DEACTIVE
            </span>
          )}
        </td>
      </tr>
    ));

    const orders = this.state.orders.map((item, index) => (
      <tr
        key={item._id}
        className={`border text-center border-gray-300 hover:bg-gray-100 cursor-pointer ${
          index % 2 === 0 ? "bg-white" : "bg-gray-100"
        } ${this.state.selectedOrdId === item._id ? "bg-yellow-300 hover:bg-yellow-200" : ""}`}
        onClick={() => this.trOrderClick(item)}
      >
        <td className="py-2 px-4">{item._id.slice(-5)}</td>
        <td className="py-2 px-4">{new Date(item.cdate).toLocaleString()}</td>
        <td className="py-2 px-4 font-semibold text-blue-600">
          {item.customer.name}
        </td>
        <td className="py-2 px-4">{item.customer.phone}</td>
        <td className="py-2 px-4">${item.total}</td>
        <td
          className={`py-2 px-4 font-bold ${this.getStatusColorClass(
            item.status
          )}`}
        >
          {item.status}
        </td>
      </tr>
    ));

    let items = null;
    if (this.state.order) {
      items = this.state.order.items.map((item, index) => (
        <tr
          key={item.product._id}
          className="border border-gray-300 text-center"
        >
          <td className="py-2 px-4">{index + 1}</td>
          <td className="py-2 px-4">{item.product._id.slice(-5)}</td>
          <td className="py-2 px-4 font-semibold text-blue-600">
            {item.product.name}
          </td>
          <td className="py-2 px-4">
            <img
              src={`data:image/jpg;base64,${item.product.image}`}
              width="70px"
              height="70px"
              alt=""
              className="mx-auto"
            />
          </td>
          <td className="py-2 px-4">${item.product.price}</td>
          <td className="py-2 px-4">{item.quantity}</td>
          <td className="py-2 px-4 font-semibold text-red-600">
            ${item.product.price * item.quantity}
          </td>
        </tr>
      ));
    }

    return (
      <div className="grid grid-cols-1 gap-4">
        <div className="border border-gray-300 p-4">
          <h2 className="text-center text-2xl font-bold mb-4">CUSTOMER LIST</h2>
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Username</th>
                <th className="py-2 px-4">Password</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Active</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>{customers}</tbody>
          </table>
        </div>
        {this.state.orders.length > 0 && (
          <div className="border border-gray-300 p-4">
            <h2 className="text-center text-2xl font-bold mb-4">ORDER LIST</h2>
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">Creation date</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Phone</th>
                  <th className="py-2 px-4">Total</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>{orders}</tbody>
            </table>
          </div>
        )}
        {this.state.order && (
          <div className="border border-gray-300 p-4">
            <h2 className="text-center text-2xl font-bold mb-4">
              ORDER DETAIL
            </h2>
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4">No.</th>
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Image</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Amount</th>
                </tr>
              </thead>
              <tbody>{items}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCustomers();
  }

  trCustomerClick(item) {
    this.setState({ orders: [], order: null, selectedCustomerId: item._id });
    this.apiGetOrdersByCustID(item._id);
  }

  trOrderClick(item) {
    this.setState({ order: item, selectedOrdId: item._id });
  }

  lnkDeactiveClick(item) {
    this.apiPutCustomerDeactive(item._id, item.token);
  }

  lnkEmailClick(item) {
    this.apiGetCustomerSendmail(item._id);
  }

  apiGetCustomers() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/customers", config).then((res) => {
      const result = res.data;
      this.setState({ customers: result });
    });
  }

  apiGetOrdersByCustID(cid) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get(`/api/admin/orders/customer/${cid}`, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }

  apiPutCustomerDeactive(id, token) {
    const body = { token: token };
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .put(`/api/admin/customers/deactive/${id}`, body, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          this.apiGetCustomers();
        } else {
          alert("SORRY BABY!");
        }
      });
  }

  apiGetCustomerSendmail(id) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get(`/api/admin/customers/sendmail/${id}`, config).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}

export default Customer;
