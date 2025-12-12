import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import FormComponent from "./FormComponent";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [postResponse, setPostResponse] = useState("");

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleLogin();
    setFormData({ username: "", password: "" });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        ...formData,
      });
      setPostResponse(response.data.message);
      if (response.status == 201) {
        navigate("/main");
        Cookies.set("jwt-authorization", response.data.token);
      }
    } catch (error) {
      setPostResponse(error.response.data.message || "Login Failed!");
    }
  };

  return (
    <div>
      <FormComponent
        formData={formData}
        postResponse={postResponse}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        currentPage="login"
        nextPage="register"
      />
    </div>
  );
}
