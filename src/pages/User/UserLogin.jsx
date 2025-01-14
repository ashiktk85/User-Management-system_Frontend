import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { register } from "../../utils/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      terms: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
      terms: Yup.boolean().oneOf([true], "You must accept the terms and policies"),
    }),
    onSubmit: async(values) => {
      try {
        const payload = {
            email : values?.email,
            password : values?.password
        }
        const data = await register('/api/login', payload)
        console.log(data);
        
        if(data.success) {
            toast.success("Login successfull")
            setTimeout(() => {
                navigate('/')
            }, 1500);
        }
        localStorage.setItem('user' , JSON.stringify(data.user))
      } catch (error) {
        console.log("sdfasfasdf" , error);
        
        if(error.response.data.message === "Invalid password.") {
            toast.error("Invalid password")
        } else if(error.response.data.message === "Invalid email.") {
            toast.error("Invalid email")
        }
      }
    },
  });

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 md:px-40">
        <h1 className="text-3xl font-bold mb-2">Login to start</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 pt-10">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className={`w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 ${
                formik.touched.email && formik.errors.email ? "border-red-500" : ""
              }`}
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            ) : null}
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              className={`w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 ${
                formik.touched.password && formik.errors.password ? "border-red-500" : ""
              }`}
              {...formik.getFieldProps("password")}
            />
            <div
              className="absolute top-9 right-4 cursor-pointer text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </div>
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            ) : null}
          </div>

          <div className="flex items-start mb-4">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="w-4 h-4 mt-1 mr-2"
              {...formik.getFieldProps("terms")}
            />
            <label htmlFor="terms" className="text-sm">
              I agree to all <span className="text-blue-600">Terms</span>, {" "}
              <span className="text-blue-600">Privacy Policy</span>, and Fees
            </label>
          </div>
          {formik.touched.terms && formik.errors.terms ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.terms}</p>
          ) : null}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            Log In
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don&apos;t have an account? {" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100 relative">
        <img
          src="https://images.pexels.com/photos/2603217/pexels-photo-2603217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Furniture"
          className="rounded-xl mb-4 w-full h-full"
        />
      </div>
    </div>
  );
};

export default UserLogin;
