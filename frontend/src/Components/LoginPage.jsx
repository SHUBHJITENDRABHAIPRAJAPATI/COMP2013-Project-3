import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/login", formData);
      setToken(res.data.token);
      setUser(res.data.username);
      navigate("/main");
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleOnSubmit}>
        <label>Username</label>
        <input name="username" value={formData.username} onChange={handleOnChange} />

        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleOnChange} />

        <button type="submit">Login</button>
      </form>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <Link to="/register">Not registered? Create an account</Link>
    </div>
  );
}
