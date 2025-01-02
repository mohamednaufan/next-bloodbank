
// "use client";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Container, Card, Button, Form } from "react-bootstrap";
// import { Formik, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import Link from "next/link";
// import "@/app/signup/signup.css";

// const Signup = () => {
//   const router = useRouter();

//   const validationSchema = Yup.object().shape({
//     name: Yup.string().required("Name is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     num: Yup.string().required("Phone number is required"),
//     hcode: Yup.string().required("Hospital code is required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password is required"),
//     repassword: Yup.string()
//       .oneOf([Yup.ref("password")], "Passwords must match")
//       .required("Confirm Password is required"),
//   });

//   const handleSubmit = async (values) => {
//     const { name, email, password, num, hcode } = values;

//     try {
//       const response = await fetch("/api/user", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password, num, hcode }),
//       });

//       if (response.status === 201) {
//         toast.success("Sign up successful!");
//         router.push("/login"); 
//       } else {
//         toast.error("Sign up failed. Please try again.");
//       }
//     } catch (error) {
//       toast.error("Sign up failed. Please try again.");
//       console.error("Error during signup:", error);
//     }
//   };

//   return (
//     <>
//       <Container className="d-flex justify-content-center align-items-center min-vh-100">
//         <Card style={{ width: "100%", maxWidth: "400px" }} className="shadow-lg p-4">
//           <Card.Body>
//             <h3 className="text-center mb-4">Sign Up</h3>
//             <Formik
//               initialValues={{
//                 name: "",
//                 num: "",
//                 email: "",
//                 password: "",
//                 repassword: "",
//                 hcode: "",
//               }}
//               validationSchema={validationSchema}
//               onSubmit={handleSubmit}
//             >
//               {() => (
//                 <Form>
//                   <Form.Group controlId="name" className="mb-3">
//                     <Field
//                       type="text"
//                       name="name"
//                       className="form-control"
//                       placeholder="Enter your full name"
//                     />
//                     <ErrorMessage name="name" component="div" className="text-danger mt-1" />
//                   </Form.Group>

//                   <Form.Group controlId="email" className="mb-3">
//                     <Field
//                       type="email"
//                       name="email"
//                       className="form-control"
//                       placeholder="Enter your email"
//                     />
//                     <ErrorMessage name="email" component="div" className="text-danger mt-1" />
//                   </Form.Group>

//                   <Form.Group controlId="num" className="mb-3">
//                     <Field
//                       type="text"
//                       name="num"
//                       className="form-control"
//                       placeholder="Enter your phone number"
//                     />
//                     <ErrorMessage name="num" component="div" className="text-danger mt-1" />
//                   </Form.Group>

//                   <Form.Group controlId="password" className="mb-3">
//                     <Field
//                       type="password"
//                       name="password"
//                       className="form-control"
//                       placeholder="Enter your password"
//                     />
//                     <ErrorMessage name="password" component="div" className="text-danger mt-1" />
//                   </Form.Group>

//                   <Form.Group controlId="repassword" className="mb-3">
//                     <Field
//                       type="password"
//                       name="repassword"
//                       className="form-control"
//                       placeholder="Re-enter your password"
//                     />
//                     <ErrorMessage name="repassword" component="div" className="text-danger mt-1" />
//                   </Form.Group>

//                   <Form.Group controlId="hcode" className="mb-3">
//                     <Field
//                       type="text"
//                       name="hcode"
//                       className="form-control"
//                       placeholder="Enter hospital code"
//                     />
//                     <ErrorMessage name="hcode" component="div" className="text-danger mt-1" />
//                   </Form.Group>

//                   <Button variant="primary" type="submit" className="w-100 mt-3">
//                     Sign Up
//                   </Button>
//                 </Form>
//               )}
//             </Formik>

//             <div className="text-center my-3">
//               <p>Already have an account? <Link href="/login">Login</Link></p>
//             </div>
//           </Card.Body>
//         </Card>
//       </Container>

//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </>
//   );
// };

// export default Signup;


"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import "@/app/signup/signup.css";

const Signup = () => {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    num: Yup.string().required("Phone number is required"),
    hcode: Yup.string().required("Hospital code is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    repassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values) => {
    const { name, email, password, num, hcode } = values;

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, num, hcode }),
      });

      if (response.status === 201) {
        toast.success("Sign up successful!");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        toast.error("Sign up failed. Please try again.");
      }
    } catch (error) {
      toast.error("Sign up failed. Please try again.");
      console.error("Error during signup:", error);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await axios.delete(`/api/delete/${id}`);
      if (response.status === 200) {
        toast.success("Data deleted successfully!");
      }
    } catch (error) {
      toast.error("Failed to delete data.");
      console.error("Error during deletion:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Sign Up</h2>

          <Formik
            initialValues={{
              name: "",
              num: "",
              email: "",
              password: "",
              repassword: "",
              hcode: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="mb-4">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter Your Full Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 mt-1" />
                </div>

                <div className="mb-4">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
                </div>

                <div className="mb-4">
                  <Field
                    type="text"
                    name="num"
                    placeholder="Enter Your Phone Number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="num" component="div" className="text-red-500 mt-1" />
                </div>

                <div className="mb-4">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter Your Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />
                </div>

                <div className="mb-4">
                  <Field
                    type="password"
                    name="repassword"
                    placeholder="Confirm Your Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="repassword" component="div" className="text-red-500 mt-1" />
                </div>

                <div className="mb-4">
                  <Field
                    type="text"
                    name="hcode"
                    placeholder="Enter Hospital Code"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="hcode" component="div" className="text-red-500 mt-1" />
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Sign Up
                  </button>

                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      onClick={() => deleteData(1)}
                      className="w-1/2 py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete Account
                    </button>
                  </div>

                  <div className="mt-4 text-center">
                    <Link href="/login" className="text-blue-500 font-semibold">
                      Already have an account? <span className="text-green-500">Login</span>
                    </Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Signup;
