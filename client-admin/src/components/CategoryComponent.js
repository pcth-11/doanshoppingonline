import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import CategoryDetail from "./CategoryDetailComponent";

class Category extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null,
    };
  }

  render() {
    const categoriesList = this.state.categories.map((item,index) => (
      <tr
        key={item._id}
        className={`text-center border border-gray-300 hover:bg-gray-100 cursor-pointer ${
          index % 2 === 0 ? "bg-white" : "bg-gray-100"
        } ${this.state.selectedItemId === item._id ? "bg-yellow-300 hover:bg-yellow-200" : ""}`}
        onClick={() => this.trItemClick(item)}
      >
        <td className="py-2 px-4 text-center">{item._id.slice(-5)}</td>
        <td className="py-2 px-4 text-center font-semibold">{item.name}</td>
      </tr>
    ));

    return (
      <div className="flex">
        <div className="w-1/2 p-4">
          <h2 className="text-center text-2xl font-bold mb-4">CATEGORY LIST</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Name</th>
              </tr>
            </thead>
            <tbody>{categoriesList}</tbody>
          </table>
        </div>

        <div className="w-1/2 p-4">
          <CategoryDetail
            item={this.state.itemSelected}
            updateCategories={this.updateCategories}
          />
        </div>
      </div>
    );
  }

  updateCategories = (categories) => {
    this.setState({ categories: categories });
  };

  componentDidMount() {
    this.apiGetCategories();
  }

  trItemClick(item) {
    this.setState({ itemSelected: item, selectedItemId: item._id });
  }

  apiGetCategories() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/categories", config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}

export default Category;
