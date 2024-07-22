import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class CategoryDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtID: "",
      txtName: "",
    };
  }

  render() {
    return (
      <div className="float-right p-4">
        <h2 className="text-2xl font-bold mb-4">CATEGORY DETAIL</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryID">
              ID
            </label>
            <input
              id="categoryID"
              type="text"
              value={this.state.txtID}
              readOnly={true}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryName">
              Name
            </label>
            <input
              id="categoryName"
              type="text"
              value={this.state.txtName}
              onChange={(e) => this.setState({ txtName: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              onClick={(e) => this.btnAddClick(e)}
            >
              ADD NEW
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              onClick={(e) => this.btnUpdateClick(e)}
            >
              UPDATE
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={(e) => this.btnDeleteClick(e)}
            >
              DELETE
            </button>
          </div>
        </form>
      </div>
    );
  }

  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm("ARE YOU SURE?")) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteCategory(id);
      } else {
        alert("Please input id");
      }
    }
  }

  apiDeleteCategory(id) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.delete("/api/admin/categories/" + id, config).then((res) => {
      const result = res.data;
      if (result) {
        toast.success("Category deleted successfully!");
        this.apiGetCategories();
      } else {
        toast.error("Failed to delete category!");
      }
    });
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutCategory(id, cate);
    } else {
      toast.warning("Please input id and name");
    }
  }

apiPutCategory(id, cate) {
  const config = { headers: { "x-access-token": this.context.token } };
  axios.put("/api/admin/categories/" + id, cate, config).then((res) => {
    const result = res.data;
    if (result) {
      toast.success("Category updated successfully!");
      this.apiGetCategories();
    } else {
      toast.error("Failed to update category!");
    }
  });
}

  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
    } else {
      toast.warning("Please input id and name");
    }
  }

  apiPostCategory(cate) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.post("/api/admin/categories", cate, config).then((res) => {
      const result = res.data;
      if (result) {
        toast.success("Category added successfully!");
        this.apiGetCategories();
      } else {
        toast.error("Failed to add category!");
      }
    });
  }

  apiGetCategories() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/categories", config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
      });
    }
  }
}

export default CategoryDetail;
