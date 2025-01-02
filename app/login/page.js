"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const Login = () => {
  const [apiData, setApiData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();
    console.log(data);
    setApiData(data);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const { email, password } = values;
    const user = apiData.find((item) => item.email === email);

    if (!user) {
      toast.error("Email not found. Please register first.");
      setTimeout(() => {
        router.push("/signup");
      }, 3000);
      return;
    }

    if (password !== user.password) {
      toast.warning("Incorrect password. Please try again.");
      resetForm();
      return;
    }

    if (user?.email) {
      toast.success("Login successful");
      router.push("/");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Do you want to delete this item?")) {
      await axios
        .delete(`/api/user?id=${id}`)
        .then(() => {
          getUserData();
          router.refresh();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Login</h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
              </div>

              <div className="mb-4">
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Login
                </button>
                <div className="text-center mt-4">
                  <span className="text-gray-600">Don't have an account? </span>
                  <Link href="/signup" className="text-green-500 font-semibold">
                    Sign up
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>

        <div className="mt-6">
          <ul>
            {apiData.map((item, index) => (
              <li key={index} className="flex justify-between items-center py-2 border-b">
                <span>{item.email}</span>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-600 font-semibold hover:text-red-800"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
