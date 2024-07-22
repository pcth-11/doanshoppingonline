import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import MyContext from "../contexts/MyContext";

class Myorders extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null,
      selectedOrdId: null,
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
  renderOrders() {
    return this.state.orders.map((item, index) => (
      <tr
        key={item._id}
        // className="border-b cursor-pointer text-center"
        className={`border text-center border-gray-300 hover:bg-gray-100  dark:bg-gray-800 cursor-pointer ${
          index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-700"
        } ${
          this.state.selectedOrdId === item._id
            ? "bg-yellow-300 hover:bg-yellow-200 dark:text-gray-900"
            : ""
        }`}
        onClick={() => this.handleOrderClick(item)}
      >
        <td className="px-6 py-4 text-lg text-gray-900 dark:text-white">
          {item._id.slice(-5)}
        </td>
        <td className="px-6 py-4 text-lg text-gray-900 dark:text-white">
          {new Date(item.cdate).toLocaleString()}
        </td>
        <td className="px-6 py-4 text-lg text-gray-900 dark:text-white">
          {item.customer.name}
        </td>
        <td className="px-6 py-4 text-lg text-gray-900 dark:text-white">
          {item.customer.phone}
        </td>
        <td className="px-6 py-4 text-lg text-gray-900 dark:text-white">
          ${item.total}
        </td>
        <td
          className={`px-6 py-4 text-lg text-gray-900 dark:text-white ${this.getStatusColorClass(
            item.status
          )}`}
        >
          {item.status}
        </td>
      </tr>
    ));
  }

  renderOrderItems() {
    if (this.state.order) {
      return this.state.order.items.map((item, index) => (
        <tr
          key={item.product._id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center dark:bg-gray-800"
        >
          <td className="px-6 py-4 text-lg text-gray-900 dark:text-white">
            {index + 1}
          </td>
          <td className="px-6 py-4 text-lg text-gray-900 dark:text-white">
            {item.product._id.slice(-5)}
          </td>
          <td className="px-6 py-4 text-lg text-gray-900 dark:text-white">
            {item.product.name}
          </td>
          <td className="px-6 py-4 text-lg text-gray-900 dark:text-white">
            <img
              src={"data:image/jpg;base64," + item.product.image}
              width="70px"
              height="70px"
              alt=""
              className="mx-auto"
            />
          </td>
          <td className="px-6 py-4 text-lg text-gray-900 dark:text-white">
            ${item.product.price}
          </td>
          <td className="px-6 py-4 text-lg text-gray-900 dark:text-white">
            {item.quantity}
          </td>
          <td className="px-6 py-4 text-lg text-gray-900 dark:text-white">
            ${item.product.price * item.quantity}
          </td>
        </tr>
      ));
    }
    return null;
  }

  render() {
    if (this.context.token === "") return <Navigate replace to="/login" />;

    return (
      <div className="relative overflow-x-auto pt-8 dark:bg-gray-900">
        <h2 className="text-2xl font-bold pb-4 text-center dark:text-white">
          Order List
        </h2>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:bg-gray-900">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-3 text-lg text-gray-900 dark:bg-gray-900 dark:text-white text-center">
                ID
              </th>
              <th className="px-6 py-3 text-lg text-gray-900 dark:bg-gray-900 dark:text-white text-center">
                Date
              </th>
              <th className="px-6 py-3 text-lg text-gray-900 dark:bg-gray-900 dark:text-white text-center">
                Name
              </th>
              <th className="px-6 py-3 text-lg text-gray-900 dark:bg-gray-900 dark:text-white text-center">
                Phone
              </th>
              <th className="px-6 py-3 text-lg text-gray-900 dark:bg-gray-900 dark:text-white text-center">
                Total
              </th>
              <th className="px-6 py-3 text-lg text-gray-900 dark:bg-gray-900 dark:text-white text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>{this.renderOrders()}</tbody>
        </table>

        {this.state.order && (
          <div className="mt-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold  dark:text-white">
                Order Detail
              </h2>
            </div>

            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-6 py-3 text-lg text-gray-900 dark:bg-gray-900 dark:text-white">
                    No.
                  </th>
                  <th className="px-6 py-3 text-lg text-gray-900 dark:bg-gray-900 dark:text-white">
                    Product ID
                  </th>
                  <th className="px-6 py-3 text-lg text-gray-900 dark:bg-gray-900 dark:text-white">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-lg text-gray-900 dark:bg-gray-900 dark:text-white">
                    Image
                  </th>
                  <th className="px-6 py-3 text-lg text-gray-900 dark:bg-gray-900 dark:text-white">
                    Price
                  </th>
                  <th className="px-6 py-3 text-lg text-gray-900 dark:bg-gray-900 dark:text-white">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-lg text-gray-900 dark:bg-gray-900 dark:text-white">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>{this.renderOrderItems()}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    if (this.context.customer) {
      const customerId = this.context.customer._id;
      this.fetchOrdersByCustomerId(customerId);
    }
  }

  handleOrderClick(order) {
    this.setState({ order, selectedOrdId: order._id });
  }

  fetchOrdersByCustomerId(customerId) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .get(`/api/customer/orders/customer/${customerId}`, config)
      .then((res) => {
        const orders = res.data;
        this.setState({ orders });
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }
}

export default Myorders;
