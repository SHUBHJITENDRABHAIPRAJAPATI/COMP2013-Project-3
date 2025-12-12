import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/register", formData);
      navigate("/");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input name="username" value={formData.username} onChange={handleOnChange} />

        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleOnChange} />

        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}

      <Link to="/">Back to login</Link>
    </div>
  );
}
