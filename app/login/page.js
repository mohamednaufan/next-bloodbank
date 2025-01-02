"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import "@/app/login/login.css";
import 'bootstrap/dist/css/bootstrap.min.css';


const Login = () => {
  const [apiData, setApiData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const res = await fetch('/api/user');
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
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Card className="shadows border-0 rounded-lg p-4">
            <Card.Body>
              <div className="text-center mb-4">
                <h2 className="fw-bold text-success">Login in</h2>
              </div>

              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <Field
                        type="email"
                        className="form-control shadow-sm"
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                      />
                      <ErrorMessage
                        name="email"
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
                        placeholder="Enter Password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger mt-1"
                      />
                    </div>

                    <div className="d-grid gap-2 mt-4">
                      <Button
                        variant="success"
                        type="submit"
                        className="fw-bold shadow-sm"
                        disabled={isSubmitting}
                      >
                        Login in
                      </Button>
                      <div className="text-center mt-3">
                        <span className="text-muted">Don't have an account? </span>
                        <Link
                          href="/signup"
                          className="btn  fw-bold shadow-sm"
                        >
                          signup
                        </Link>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>

            <div className="">
              <ul>
                {apiData.map((item, index) => (
                  <li key={index} className="d-flex justify-content-between align-items-center">
                    <span>{item.email}</span>
                    <Button
                      variant="danger"
                      size="sm"
                      className="btn btn danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                   
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </Col>
      </Row>

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
    </Container>
  );
};

export default Login;
