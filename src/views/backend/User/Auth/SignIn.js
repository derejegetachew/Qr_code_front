import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Card from "../../../../components/Card";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import logo from "../../../../assets/images/abaybank.jpg";

const SignIn = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to set token with expiry
  const setTokenWithExpiry = (token) => {
    const expiryTime = new Date().getTime() + 900000; // 15 minutes expiry
    const tokenWithExpiry = { token, expiryTime };
    localStorage.setItem("authToken", JSON.stringify(tokenWithExpiry));
  };

  // Function to retrieve token with expiry check
  const getTokenWithExpiry = () => {
    const tokenData = JSON.parse(localStorage.getItem("authToken"));
    if (!tokenData) return null;

    const { token, expiryTime } = tokenData;

    // Check if token has expired based on custom expiry
    if (new Date().getTime() > expiryTime) {
      localStorage.removeItem("authToken"); // Remove expired token
      return null;
    }

    return token;
  };

  // Function to check if JWT token has expired (based on `exp` field)
  const isJwtExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return decoded.exp < currentTime; // Return true if expired
    } catch (error) {
      // console.error("Error decoding JWT:", error);
      return true; // Treat invalid token as expired
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "") {
      setErrorMessage("Please provide a username");
      return;
    }
    if (password === "") {
      setErrorMessage("Please provide a password");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`http://10.1.85.10:8089/api/login`, {
        username,
        password,
      });

      const token = response.data.accessToken;
      // Set token with expiry
      setTokenWithExpiry(token);
      // Decode and log JWT token
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.user.Group.QR;
      if (!userRole) {
        setErrorMessage("You are not authorized to access this page");
        return;
      }
      // Redirect to the product page after successful login
      history.push("/View_merchant");
    } catch (error) {
      let message =
        error.response?.data?.message ||
        "System connection problem, please try again";
      if (error.response?.status === 401) {
        message = "Wrong username or password";
      }
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Check token validity and clear expired token on component load
  useEffect(() => {
    const token = getTokenWithExpiry();
    if (token && isJwtExpired(token)) {
      console.log("JWT token expired, clearing storage.");
      localStorage.removeItem("authToken");
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    history.push("/auth/sign-in"); // Redirect to login page
  };

  return (
    <section className="login-content">
      <Container className="h-100">
        <Row className="align-items-center justify-content-center h-80">
          <Col md="5">
            <Card className="p-3">
              <div
                style={{ border: "2px solid  #e0e0eb", borderRadius: "8px" }}
              >
                <Card.Body>
                  <div className="auth-logo">
                    <img
                      src={logo}
                      style={{ width: "100px", height: "100px" }}
                      className="img-fluid rounded-normal"
                      alt="logo"
                    />
                  </div>
                  <h5 className="mb-3 font-weight-bold text-center">
                    QR Code Generating System
                  </h5>
                  <p className="text-center text-secondary mb-4">
                    Welcome back
                  </p>
                  <div className="mb-5">
                    <p className="line-around text-secondary mb-0">
                      <span className="line-around-1">
                        Please use ERP Username and Password
                      </span>
                    </p>
                  </div>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col lg="12">
                        <Form.Group>
                          <Form.Label className="text-secondary">
                            Username
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter ERP username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col lg="12" className="mt-2">
                        <Form.Group>
                          <Form.Label className="text-secondary">
                            Password
                          </Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      type="submit"
                      variant="btn btn-primary btn-block mt-2"
                      style={{ backgroundColor: "#005580" }}
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Log In"}
                    </Button>
                  </Form>
                  {errorMessage && (
                    <p className="text-danger mt-3">{errorMessage}</p>
                  )}
                  <div className="text-center mt-4">
                    <a
                      href="/user-manual.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="link"
                        className="text-secondary"
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          paddingLeft: "250px",
                        }} // Apply color here
                      >
                        User Manual
                      </Button>
                    </a>
                  </div>
                </Card.Body>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignIn;
