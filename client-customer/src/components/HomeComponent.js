import axios from "axios";
import React, {Slice, Component } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: [],
      isLoading: true,
    };
  }

  renderProducts(products) {
    return products.map((item) => (
      <div key={item._id}>
          <Link to={`/product/${item._id}`}>
            <img
              src={`data:image/jpg;base64,${item.image}`}
              className="w-full h-40 object-cover rounded-md mb-2"
              alt=""
            />
          </Link>
        <figcaption className="text-center mt-2">
          <Link
            to={`/product/${item._id}`}
            className="text-white font-bold hover:underline"
          >
            {item.name}
          </Link>
          <br />
          <span className="text-gray-600">Price: ${item.price}</span>
        </figcaption>
      </div>
    ));
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  // APIs
  apiGetNewProducts() {
    axios.get("/api/customer/products/new").then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }

  apiGetHotProducts() {
    axios.get("/api/customer/products/hot").then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }

  render() {
    const newprods = this.state.newprods.map((item) => {
      return (
        <div
          key={item._id}
          className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8"
        >
          <figure className="bg-white dark:bg-gray-700 p-4 rounded shadow-lg transition-transform transform hover:scale-105">
            <Link to={"/product/" + item._id} className="block">
              <div className="aspect-w-2 aspect-h-3">
                <img
                  src={`data:image/jpg;base64,${item.image}`}
                  className="w-full aspect-w-2 aspect-h-3 object-contain rounded"
                  alt=""
                />
              </div>
            </Link>
            <figcaption className="text-center mt-4">
              <Link
                to={"/product/" + item._id}
                className="text-gray-800 font-bold block hover:underline"
              >
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 transform skew-y-6 -rotate-6"></div>
                  <span className="relative z-10">{item.name}</span>
                </div>
              </Link>
              <span className="text-gray-600 block mt-2">
                <span className="text-xl font-bold text-indigo-500">
                  ${item.price}
                </span>
              </span>
            </figcaption>
          </figure>
        </div>
      );
    });

    const hotprods = this.state.hotprods.map((item) => (
      <div
        key={item._id}
        className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8"
      > 
        <figure className="bg-white dark:bg-gray-700 p-4 rounded shadow-lg transition-transform transform hover:scale-105">
          <Link to={"/product/" + item._id} className="block">
            <div className="aspect-w-2 aspect-h-3">
              <img
                src={`data:image/jpg;base64,${item.image}`}
                className="w-full h-full object-contain rounded"
                alt=""
              /> 
            </div>
          </Link>
          <figcaption className="text-center mt-4">
            <Link
              to={"/product/" + item._id}
              className="text-gray-800 font-bold block hover:underline"
            >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-500 transform skew-y-6 -rotate-6"></div>
                <span className="relative z-10">{item.name}</span>
              </div>
            </Link>
            <span className="text-gray-600 block mt-2">
              <span className="text-xl font-bold text-orange-500">
                ${item.price}
              </span>
            </span>
          </figcaption>
        </figure>
      </div>
    ));
    return (
      <div className="dark:bg-gray-900">
        <div className={`container mx-auto bg-dark dark:bg-gray-900`}>
          <div className="text-center py-8 dark:bg-gray-900">
            <h2 className="dark:bg-gray-900 text-4xl font-extrabold text-indigo-600 tracking-wider uppercase mb-4">
              Explore Our Latest Products
            </h2>
            <div className="relative inline-block dark:bg-gray-900">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 shadow-md transform -skew-y-6 rotate-6 w-full h-full dark:bg-gray-900"></div>
              <h2 className="relative text-gray-900 z-10 text-2xl font-bold dark:text-white">
                NEW PRODUCTS
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap -mx-4 justify-evenly dark:bg-gray-900">
            {newprods}
          </div>

          {this.state.hotprods.length > 0 && (
            <div className="text-center py-8">
              <h2 className="text-4xl font-extrabold text-orange-500 tracking-wider uppercase mb-4">
                Discover Our Most Popular Products
              </h2>
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-500 shadow-md transform skew-y-0 rotate-6 w-full h-full"></div>
                <h2 className="relative text-gray-900 z-10 text-2xl font-bold dark:text-white">
                  HOT PICKS
                </h2>
              </div>
            </div>
          )}
          {this.state.hotprods.length > 0 && (
            <div className="flex flex-wrap -mx-4 justify-evenly">
              {hotprods}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
