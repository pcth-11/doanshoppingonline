import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import ProductDetail from "./ProductDetailComponent";

class Product extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
    };
  }

  render() {
    const prods = this.state.products.map((item, index) => (
      <tr
        key={item._id}
        className={`text-center border border-gray-300 hover:bg-gray-100 cursor-pointer ${
          index % 2 === 0 ? "bg-white" : "bg-gray-100"
        } ${this.state.selectedItemId === item._id ? "bg-yellow-300" : ""}`}
        onClick={() => this.trItemClick(item)}
      >
        <td className="py-2 px-4">{item._id.slice(-5)}</td>
        <td className="py-2 px-4 font-bold">{item.name}</td>
        <td className="py-2 px-4">${item.price}</td>
        <td className="py-2 px-4">{new Date(item.cdate).toLocaleString()}</td>
        <td className="py-2 px-4 text-blue-600 font-semibold">
          {item.category.name}
        </td>
        <td className="py-2 px-4">
          <img
            src={"data:image/jpg;base64," + item.image}
            width="100px"
            height="100px"
            alt=""
          />
        </td>
          <td>
            {item.imageDetails &&item.imageDetails.length > 0 ?(
              item.imageDetails.map((image, index) => (
                <img key={index} src={"data:image/jpg; base64" + image} width='100px' height='100px' alt=""/>
              ))
            ) : (<span>n/a</span>)}
          </td>
      </tr>
    ));

    const pagination = Array.from(
      { length: this.state.noPages },
      (_, index) => {
        const page = index + 1;

        if (page === this.state.curPage) {
          return (
            <span
              key={index}
              className="mx-1 px-3 py-1 bg-blue-500 text-white rounded-full"
            >
              {page}
            </span>
          );
        } else {
          return (
            <span
              key={index}
              className="link mx-1 px-3 py-1 border border-gray-300 rounded-full cursor-pointer"
              onClick={() => this.lnkPageClick(page)}
            >
              {page}
            </span>
          );
        }
      }
    );

    return (
      <div className="flex">
        <div className="w-3/4 p-4">
          <h2 className="text-center text-2xl font-bold mb-4">PRODUCT LIST</h2>
          <table className=" w-full border-collapse border border-gray-300" >
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Creation date</th>
                <th className="py-2 px-4">Category</th>
                <th className="py-2 px-4">Image</th>
                <th className="py-2 px-4">Image details</th>
              </tr>
            </thead>
            <tbody>{prods}</tbody>
            <tfoot>
              <tr>
                <td colSpan="6" className="py-2 px-4">
                  {pagination}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="w-1/2 p-4">
          <ProductDetail
            item={this.state.itemSelected}
            curPage={this.state.curPage}
            updateProducts={this.updateProducts}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }

  updateProducts = (products, noPages) => {
    this.setState({ products: products, noPages: noPages });
  };

  lnkPageClick(index) {
    this.apiGetProducts(index);
  }

  trItemClick(item) {
    this.setState({ itemSelected: item, selectedItemId: item._id });
  }
  apiGetProducts(page) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/products?page=" + page, config).then((res) => {
      const result = res.data;
      this.setState({
        products: result.products,
        noPages: result.noPages,
        curPage: result.curPage,
      });
    });
  }
}

export default Product;
