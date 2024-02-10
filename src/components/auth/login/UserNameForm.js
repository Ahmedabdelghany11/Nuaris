import React, { useState, useRef } from "react";
import axios from "../../../util/axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

const UserNameForm = ({ setShowLoginForm }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [cookies, setCookie] = useCookies(["token"]);

  const navigate = useNavigate();
  const form = useRef(null);

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setShowLoginForm(false);
  };

  const headersList = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const requestOptions = {
    method: "POST",
    url: "/users/login/",
    headers: headersList,
    data: formData,
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.request(requestOptions);
      setCookie("token", res.data.access_token, {
        path: "/",
        secure: true,
      });
      toast.success(`Welcome Back @${formData.username}`);
      navigate("/");
    } catch (error) {
      toast.error("Incorrect username or password");
      form.current.reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={form}>
      <input
        required
        type="text"
        name="userName"
        placeholder="Username"
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        required
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <Link to={"/reset-password"}>Forget Password ?</Link>
      <div className="buttons">
        <button className="back" onClick={handleBackButtonClick}>
          <i className="fa-light fa-arrow-left" />
        </button>
        <button
          style={{ opacity: loading ? 0.7 : 1 }}
          disabled={loading}
          type="submit"
          className="log"
        >
          Login
          <i className={loading ? "fa-solid fa-spinner fa-spin" : ""} />
        </button>
      </div>
    </form>
  );
};

export default UserNameForm;
