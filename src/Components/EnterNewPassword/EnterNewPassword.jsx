import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { UserContext } from "../Context/UserContext";


export default function EnterNewPassword() {
  const [loading, setLoading] = useState(false);
  let { setuserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter Valid E-mail")
      .required("Email is required"),
    newPassword: Yup.string()
    .matches(/^[A-Za-z0-9]{6,10}$/,"password should be between 6 and 10 char")
      .required("Password is required"),
  });

  async function changePassword(values) {
    try {
      setLoading(true);
      let { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",

        values
      );
      localStorage.setItem("userToken", data.token);
      setuserLogin(localStorage.getItem("userToken"));
      toast.success("The password has been changed successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: changePassword,
  });
  return (
    <div className="md:w-1/2 mx-auto my-8 py-7">
      <h3 className="text-3xl font-semibold mb-4">
        Reset your account password
      </h3>
      <form className="mx-auto" onSubmit={formik.handleSubmit}>
        <div className="relative   my-6 group">
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Your e-mail
          </label>
        </div>
        {formik.errors.email && formik.touched.email && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.email}
          </div>
        )}

        {/* input pass */}
        <div className="relative   my-6 group">
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="newPassword"
            className="left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            New Password
          </label>
        </div>
        {formik.errors.newPassword && formik.touched.newPassword && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.newPassword}
          </div>
        )}

        {loading ? (
          <button
            type="button"
            className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            <i className="fas fa-spinner fa-spin-pulse"></i>
          </button>
        ) : (
          <button
            type="submit"
            className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}