import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProductForm from "./ProductForm";

//Fixed by Jacob

export default function EditProductPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });

  const [postResponse, setPostResponse] = useState("");

  useEffect(() => {
    const passedProduct = location.state;
    if (passedProduct) {
      setFormData({
        productName: passedProduct.productName || "",
        brand: passedProduct.brand || "",
        image: passedProduct.image || "",
        price: passedProduct.price || "",
      });
    }
  }, [location.state]);

  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setPostResponse("");

    try {
      const res = await axios.patch(
        `http://localhost:3000/products/${id}`,
        formData
      );
      setPostResponse(res.data);
      navigate("/main");
    } catch (error) {
      setPostResponse(
        error?.response?.data?.message || "Failed to edit product"
      );
    }
  };

  return (
    <div className="edit-add-page">
      <h1>Edit Product</h1>
      <button type="button" onClick={() => navigate("/main")}>
        Return
      </button>
      <ProductForm
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
        formData={formData}
        postResponse={postResponse}
        isEditing={true}
      />
    </div>
  );
}
