import { useState } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";

//Fixed by Jacob

export default function AddProductPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });
  const [postResponse, setPostResponse] = useState("");

  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/add-product",
        formData
      );
      setPostResponse(res.data);
      setFormData({ productName: "", brand: "", image: "", price: "" });
    } catch (error) {}
  };

  return (
    <div className="edit-add-page">
      <h1>Add a product</h1>
      <button type="button" onClick={() => navigate("/main")}>
        Return
      </button>
      <ProductForm
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
        formData={formData}
        postResponse={postResponse}
        isEditing={false}
      />
    </div>
  );
}
