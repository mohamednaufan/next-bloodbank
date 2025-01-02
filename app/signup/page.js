
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
import { Container, Row, Col, Card, Button } from "react-bootstrap";
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
      <Container>
        <Row className="d-flex justify-content-center align-items-center min-vh-100">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Card className="shadows border-0 rounded p-4">
              <Card.Body>
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-primary fs-4">Sign up</h2>
                </div>

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
                      <div className="mb-3">
                        <Field
                          type="text"
                          className="form-control shadow-sm"
                          id="name"
                          name="name"
                          placeholder="Enter Your Full Name"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger mt-1"
                        />
                      </div>

                      <div className="mb-3">
                        <Field
                          type="email"
                          className="form-control shadow-sm"
                          id="email"
                          name="email"
                          placeholder="Enter Your Email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger mt-1"
                        />
                      </div>

                      <div className="mb-3">
                        <Field
                          type="text"
                          className="form-control shadow-sm"
                          id="num"
                          name="num"
                          placeholder="Enter Your Phone Number"
                        />
                        <ErrorMessage
                          name="num"
                          component="div"
                          className="text-danger mt-1"
                        />
                      </div>

                      <div className="mb-3">
                        <Field
                          type="password"
                          className="form-control shadow-sm"
                          id="password"
                          name="password"
                          placeholder="Enter Your Password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger mt-1"
                        />
                      </div>

                      <div className="mb-3">
                        <Field
                          type="password"
                          className="form-control shadow-sm"
                          id="repassword"
                          name="repassword"
                          placeholder="Confirm Your Password"
                        />
                        <ErrorMessage
                          name="repassword"
                          component="div"
                          className="text-danger mt-1"
                        />
                      </div>

                      <div className="mb-3">
                        <Field
                          type="text"
                          className="form-control shadow-sm"
                          id="hcode"
                          name="hcode"
                          placeholder="Enter Hospital Code"
                        />
                        <ErrorMessage
                          name="hcode"
                          component="div"
                          className="text-danger mt-1"
                        />
                      </div>

                      <div className="d-grid gap-2 mt-4">
                        <Button type="submit" className="btn btn-primary fw-bold">
                          Sign Up
                        </Button>
                       <div className="d-flex justify-content-center">
                       <Button
                          type="button"
                          className="btn btn-danger w-50 fw-bold"
                          onClick={() => deleteData(1)}
                        >
                          Delete Account
                        </Button>
                       </div>
                        <Link href="/login" className="text-center fw-bold w-100 my-2">
                          Already have an account?<span className="text-success">Login</span>
                        </Link>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>

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
      </Container>
    </>
  );
};

export default Signup;


  