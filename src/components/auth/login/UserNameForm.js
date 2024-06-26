import React, { useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import SubmitButton from "./../../ui/form-elements/SubmitButton";
import FormBackButton from "../../ui/form-elements/FormBackButton";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/authenticatedUserSlice";

const UserNameForm = ({ setShowLoginForm, userTypeSelected }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [, setCookie] = useCookies(["token"]);
  const form = useRef(null);

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setShowLoginForm(false);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const requestOptions = {
    method: "POST",
    url: "/users/login/",
    data: { ...formData, role: userTypeSelected }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.request(requestOptions);

      if (res?.response?.data?.non_field_errors) {
        toast.error(res.response.data.non_field_errors[0]);
        return;
      }

      dispatch(setUser(res.data.user));
      setCookie("refreshToken", res.data.refresh_token, {
        path: "/",
        expires: new Date(new Date().getTime() + 20 * 60 * 60 * 1000),
        secure: true
      });
      toast.success("Welcome to Nuaris");
      navigate("/dashboard");
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
        value={formData.username}
      />
      <input
        type="password"
        placeholder="Password"
        required
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        value={formData.password}
      />
      <Link to={"/reset-password"}>Forget Password ?</Link>
      <div className="buttons">
        <FormBackButton onClick={handleBackButtonClick} />
        <SubmitButton loading={loading} name="Login" />
      </div>
    </form>
  );
};

export default UserNameForm;
