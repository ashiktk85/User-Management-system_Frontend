import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { adminAxiosInstance } from "../../config/adminAxiosInstance";

const AdminLogin = () => {
  const uri = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100 relative">
        <img
          src="https://images.pexels.com/photos/1287075/pexels-photo-1287075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Furniture"
          className="rounded-r-xl w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-10 md:px-40">
        <h1 className="text-3xl font-bold mb-2 text-center">Admin Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async(values) => {
            console.log("Form submitted:", values);
            try {
              const {data} = await axios.post(`${uri}/api/admin/login` , values)
              if(data) {
                toast.success("Login Succesfull")
                setTimeout(() =>{
                  navigate('/admin/')
                },1500)
              }
              localStorage.setItem('admin' , JSON.stringify(data))
              console.log(data);
              
            } catch (error) {
              console.log(error);
              
              if(error.response.data.message === "Invalid email") {
                toast.error("Invalid email")
              } else if(error.response.data.message === "Invalid password.") {
                toast.error("Invalid password")
              } else if(error.response.data.message === "No Access") {
                toast.error("No Access")
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4 pt-10">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email<span className="text-red-500">*</span>
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4 relative">
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password<span className="text-red-500">*</span>
                </label>
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 mt-5"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdminLogin;
