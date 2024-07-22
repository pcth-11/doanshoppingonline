import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MyContext from "../contexts/MyContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaShareAlt, FaHeart } from "react-icons/fa";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct, ] = useState(null);
  const [imgSelected, setImgSelected] = useState(null);
  const [txtQuantity, setTxtQuantity] = useState(1);
  const { mycart, setMycart } = useContext(MyContext);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    apiGetProduct(id);
  }, [id]);

  const apiGetProduct = (id) => {
    axios.get("/api/customer/products/" + id).then((res) => {
      const result = res.data;
      setProduct(result);
    });
  };

  const btnAdd2CartClick = (e) => {
    e.preventDefault();
    if (txtQuantity) {
      const index = mycart.findIndex((x) => x.product._id === product._id);

      if (index === -1) {
        const newItem = { product, quantity: txtQuantity };
        setMycart([...mycart, newItem]);
      } else {
        mycart[index].quantity += txtQuantity;
        setMycart([...mycart]);
      }

      toast.success("Item added to the cart successfully!");
    } else {
      toast.error("Please input quantity");
    }
  };

  return (
    <div className="dark:bg-gray-900">
      <div className="container mx-auto text-center dark:bg-gray-900 py-7">
        <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700 mx-auto">
          {product && (
            <>
              <div
                // className={`relative ${isHovered ? "overflow-hidden" : ""}`}
                // onMouseEnter={() => setIsHovered(true)}
                // onMouseLeave={() => setIsHovered(false)}
              >
                <img style={{margin: "0 auto"}}
                  src={`data:image/jpg;base64,${product.image}`}
                  className={` w-auto h-1/2 rounded-md shadow-lg transition-transform duration-300 transform-gpu cursor-pointer ${
                    isHovered ? "scale-110" : ""
                  }`}
                  alt={product.name}
                />
                      <div className="align-center" style={{ display: 'flex', flexDirection: 'row' }}>
                        {product.imageDetails && product.imageDetails.map((image, index) => (
                          <img style={{margin: 'auto'}}
                            key={index}
                            src={`data:image/jpg;base64,${image}`}
                            width="100px"
                            height="100px"
                            alt=""
                            onClick={() => setImgSelected(image)}
                          />
                        ))}
                      </div>
              </div>
              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {product.name}
                </h5>
                <div className="mb-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    Lorem ipsum dolor sit amet. Sit consequatur ipsum 33 debitis
                    numquam ut labore beatae ab consequatur maiores et explicabo
                    praesentium 33 quod cupiditate.
                  </p>
                </div>
                <div className="flex items-center mt-2.5 mb-5">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                    4.0
                  </span>
                </div>

                <div className="flex items-center mb-3 space-x-3">
                  <button className="text-gray-500 hover:text-blue-700">
                    <FaShareAlt />
                  </button>
                  <button className="text-gray-500 hover:text-red-500">
                    <FaHeart />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>

                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={(e) => btnAdd2CartClick(e)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </>
          )}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
