import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ProductDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: "",
      txtName: "",
      txtPrice: 0,
      cmbCategory: "",
      imgProduct: "",
      imgDetails: []
    };
  }

  render() {
    const cates = this.state.categories.map((cate) => (
      <option key={cate._id} value={cate._id}>
        {cate.name}
      </option>
    ));

    return (
      <div className="float-right p-4 border border-gray-300">
        <h2 className="text-center text-2xl font-bold mb-4">PRODUCT DETAIL</h2>
        <form>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-2 px-4">ID</td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={this.state.txtID}
                    onChange={(e) => this.setState({ txtID: e.target.value })}
                    readOnly={true}
                    className="w-full border rounded py-1 px-2"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4">Name</td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={this.state.txtName}
                    onChange={(e) => this.setState({ txtName: e.target.value })}
                    className="w-full border rounded py-1 px-2"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4">Price</td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={this.state.txtPrice}
                    onChange={(e) =>
                      this.setState({ txtPrice: e.target.value })
                    }
                    className="w-full border rounded py-1 px-2"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4">Image</td>
                <td className="py-2 px-4">
                  <input
                    type="file"
                    name="fileImage"
                    accept="image/jpeg, image/png, image/gif"
                    onChange={(e) => this.previewImage(e)}
                  />
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4">Image details</td>
                <td className="py-2 px-4">
                  <input 
                    type="file"
                    name="fileImage"
                    accept="image/jpeg, image/png, image/gif"
                    onChange={(e) => this.previewImageDetails(e)}
                    multiple
                  />
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4">Category</td>
                <td className="py-2 px-4">
                  <select
                    value={this.state.cmbCategory}
                    onChange={(e) =>
                      this.setState({ cmbCategory: e.target.value })
                    }
                    className="w-full border rounded py-1 px-2"
                  >
                    {cates}
                  </select>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4"></td>
                <td className="py-2 px-4">
                  <button
                    type="button"
                    onClick={(e) => this.btnAddClick(e)}
                    className="bg-blue-500 text-white rounded py-1 px-2 mr-2"
                  >
                    ADD NEW
                  </button>
                  <button
                    type="button"
                    onClick={(e) => this.btnUpdateClick(e)}
                    className="bg-green-500 text-white rounded py-1 px-2 mr-2"
                  >
                    UPDATE
                  </button>
                  <button
                    type="button"
                    onClick={(e) => this.btnDeleteClick(e)}
                    className="bg-red-500 text-white rounded py-1 px-2"
                  >
                    DELETE
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4" colSpan="2">
                  <img
                    src={this.state.imgProduct}
                    width="300px"
                    height="300px"
                    alt=""
                  />
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4" colSpan="2">
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                    {this.state.imgDetails.map((image, index) => (
                      <img key={index} src={image} width="100px" height="100px" alt="" />
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      if (this.props.item) {
        this.setState({
          txtID: this.props.item._id,
          txtName: this.props.item.name,
          txtPrice: this.props.item.price,
          cmbCategory: this.props.item.category._id,
          imgProduct: 'data:image/jpg;base64,' + this.props.item.image,
          imgDetails:  this.props.item.imageDetails.map((image) => 'data:image/jpg;base64,' + image) 
        });
      }
    }
  }

  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  previewImageDetails(e) {
    const files = e.target.files;
    if (files.length > 0) {
      const newImages = [];
      const promises = Array.from(files).map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (evt) => {
            newImages.push(evt.target.result);
            resolve();
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises).then(() => {
        this.setState({ imgDetails: newImages });
      });
    }
  }

  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/,"");
    const imageDetails = this.state.imgDetails.map((img) => img.replace(/^data:image\/[a-z]+;base64,/,"")); 

    if (name && price && category && image && imageDetails.length > 0) {
      const prod = { name, price, category, image:image, imageDetails:imageDetails};
      this.apiPostProduct(prod);
    } else {
      toast.warning("Please input name, price, category, image, and image details");
    } 
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/,"");
    const imageDetails = this.state.imgDetails.map((img) => img.replace(/^data:image\/[a-z]+;base64,/, '')); 

    if (id && name && price && category && image && imageDetails.length > 0) {
      const prod = { name, price, category, image:image, imageDetails:imageDetails };
      this.apiPutProduct(id, prod);
    } else {
      toast.warning("Please input id, name, price, category, image and image details");
    }
  }

  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm("ARE YOU SURE?")) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteProduct(id);
      } else {
        toast.warning("Please input id");
      }
    }
  }

  apiPostProduct(prod) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.post("/api/admin/products", prod, config).then((res) => {
      const result = res.data;
      if (result) {
        toast.success("Product added successfully!");
        this.apiGetProducts();
      } else {
        toast.error("Failed to add product!");
      }
    });
  }

  apiDeleteProduct(id) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.delete("/api/admin/products/" + id, config).then((res) => {
      const result = res.data;
      if (result) {
        toast.success("Product has been removed!");
        this.apiGetProducts();
      } else {
        toast.error("Failed to remove product!");
      }
    });
  }

  apiPutProduct(id, prod) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.put("/api/admin/products/" + id, prod, config).then((res) => {
      const result = res.data;
      if (result) {
        toast.success("Product updated successfully!")
        this.apiGetProducts();
      } else {
        toast.error("Failed to update product!");
      }
    });
  }

  apiGetProducts() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .get("/api/admin/products?page=" + this.props.curPage, config)
      .then((res) => {
        const result = res.data;

        if (result.products.length !== 0) {
          this.props.updateProducts(result.products, result.noPages);
        } else {
          axios
            .get("/api/admin/products?page=" + (this.props.curPage - 1), config)
            .then((res) => {
              this.props.updateProducts(result.products, result.noPages);
            });
        }
      });
  }

  apiGetCategories() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/categories", config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}

export default ProductDetail;
