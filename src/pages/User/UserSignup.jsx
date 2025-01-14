import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { register } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignUpPage = () => {  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate()

  const initialValues = {
    firstname: "",
    lastname : "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string().required("Lastname is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
  });

  const handleSubmit = async(values) => {
    console.log("Form Submitted", values);
    try {
        const data = {
            firstName: values.firstname,
            lastName : values.lastname,
            email: values.email,
            password: values.password,
        }
        await register('/api/register' , data) 
        navigate('/login')
    } catch (error) {
        console.error('Error registering user:', error.message);
        if(error.response.data.message === "User already exists.") {
            toast.error("User already exists")
        }
    }

  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 md:px-40">
        <h1 className="text-3xl font-bold mb-6">Create your account</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
                <div className="flex gap-5">
                <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Firstname<span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="Enter your Firstname"
                  className={`w-full border ${
                    errors.name && touched.name
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400`}
                />
                <ErrorMessage
                  name="firstname"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Lastname<span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Enter your Lastname"
                  className={`w-full border ${
                    errors.name && touched.name
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400`}
                />
                <ErrorMessage
                  name="lastname"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

                </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email<span className="text-red-500">*</span>
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className={`w-full border ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400`}
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
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className={`w-full border ${
                    errors.password && touched.password
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400`}
                />
                <div
                  className="absolute right-4 top-10 cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4 relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Confirm Password<span className="text-red-500">*</span>
                </label>
                <Field
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  className={`w-full border ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400`}
                />
                <div
                  className="absolute right-4 top-10 cursor-pointer"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                >
                  {confirmPasswordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex items-start mb-4">
                <Field
                  type="checkbox"
                  name="terms"
                  id="terms"
                  className="w-4 h-4 mt-1 mr-2"
                />
                <label htmlFor="terms" className="text-sm">
                  I agree to all <span className="text-blue-600">Terms</span>, {" "}
                  <span className="text-blue-600">Privacy Policy</span>, and Fees
                </label>
              </div>
              <ErrorMessage
                name="terms"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-sm text-center mt-4">
          Already have an account? {" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
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

export default SignUpPage;
