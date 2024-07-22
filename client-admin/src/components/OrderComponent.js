import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import Modal from 'react-modal'; 

class Order extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null,
      isModalOpen: false,
      itemSelected: null,
    };
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
    const orders = this.state.orders.map((item,index) => (
      <tr
        key={item._id}
        className={`text-center border border-gray-300 hover:bg-gray-100 cursor-pointer ${
          index % 2 === 0 ? "bg-white" : "bg-gray-100"
        } ${this.state.selectedItemId === item._id ? "bg-yellow-300 hover:bg-yellow-200" : ""}`}
        onClick={() => this.trItemClick(item)}
      >
        <td className="py-2 px-4 text-center">{item._id.slice(-5)}</td>
        <td className="py-2 px-4 text-center">{new Date(item.cdate).toLocaleString()}</td>
        <td className="py-2 px-4 font-semibold text-blue-600 text-center">{item.customer.name}</td>
        <td className="py-2 px-4 text-center">{item.customer.phone}</td>
        <td className="py-2 px-4 text-center font-semibold text-red-600">${item.total}</td>
        <td className={`py-2 px-4 text-center font-bold ${this.getStatusColorClass(item.status)}`}>{item.status}</td>
        <td className="py-2 px-4 text-center">
          {item.status === "PENDING" && (
            <div className="flex  justify-center">
              <span
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={() => this.lnkApproveClick(item._id)}
              >
                APPROVE
              </span>
              <span
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={() => this.lnkCancelClick(item._id)}
              >
                CANCEL
              </span>
            </div>
          )}
        </td>
      </tr>
    ));

    let items = null;
    if (this.state.order) {
      items = this.state.order.items.map((item, index) => (
        <tr key={item.product._id} className={`border border-gray-300 hover:bg-gray-100 cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
          <td className="py-2 px-4 text-center">{index + 1}</td>
          <td className="py-2 px-4 text-center">{item.product._id.slice(-5)}</td>

          <td className="py-2 px- font-semibold text-center">{item.product.name}</td>
          <td className="py-2 px-4 text-center">
            <img
              src={`data:image/jpg;base64,${item.product.image}`}
              width="70px"
              height="70px"
              alt=""
              className="mx-auto"
            />
          </td>
          <td className="py-2 px-4 text-center font-semibold text-red-600">${item.product.price}</td>
          <td className="py-2 px-4 text-center">{item.quantity}</td>
          <td className="py-2 px-4 text-center">{item.product.price * item.quantity}</td>
        </tr>
      ));
    }

    return (
      <div className="grid grid-cols-1 gap-4">
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
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>{orders}</tbody>
          </table>
        </div>
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Order Detail Modal"
        >
        {this.state.order && (
          <div className="border border-gray-300 p-4">
            <h2 className="text-center text-2xl font-bold mb-4">ORDER DETAIL</h2>
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
        </Modal>
      </div>
    );
  }
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  trItemClick(item) {
    this.setState({ order: item, isModalOpen: true, selectedItemId: item._id  });
  }

  componentDidMount() {
    this.apiGetOrders();
  }


  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, "APPROVED");
  }

  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, "CANCELED");
  }

  apiGetOrders() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/orders", config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }

  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { "x-access-token": this.context.token } };
    axios.put(`/api/admin/orders/status/${id}`, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetOrders();
      } else {
        alert("SORRY BABY!");
      }
    });
  }
}

export default Order;
