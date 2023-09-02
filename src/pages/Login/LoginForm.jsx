import { useContext, useEffect, useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "@/contexts/AuthContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AlertBox from "@/components/Common/AlertBox";
import axios from "axios";
import { baseApiUrl } from "@/data/App";

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);

  const loginUrl = baseApiUrl + "/social/auth/login";
  const navigate = useNavigate();
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email address.")
      .required("Email field is required"),
    password: yup.string().required("Password field is required."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  function submitForm(data) {
    setIsSubmitting(true);
    axios
      .post(loginUrl, data)
      .then((response) => {
        setAuth(response.data);
        navigate("/posts");
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  useEffect(() => {
    if (auth !== null) {
      navigate("/posts");
    }
  }, [auth, navigate]);

  return (
    <Stack direction="vertical" gap={3} className="col-md-4 mx-auto">
      <Form onSubmit={handleSubmit(submitForm)}>
        {error && (
          <AlertBox level="danger">
            {error.response.data.errors[0].message}
          </AlertBox>
        )}
        <fieldset disabled={isSubmitting}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email address"
              {...register("email")}
            />
            {errors.email && (
              <Form.Text className="text-danger text-sm">
                {errors.email.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <Form.Text className="text-danger text-sm">
                {errors.password.message}
              </Form.Text>
            )}
          </Form.Group>
        </fieldset>

        <Form.Group className="d-grid gap-3">
          <Button size="lg" type="submit" disabled={isSubmitting}>
            Login
          </Button>
          <p className="text-center">
            Not registered? <Link to="/register">Sign up here!</Link>
          </p>
        </Form.Group>
      </Form>
    </Stack>
  );
}
