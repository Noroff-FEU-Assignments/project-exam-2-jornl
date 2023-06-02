import { useContext, useEffect, useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { Link, redirect, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseApiUrl } from "@/config/App";
import AlertBox from "@/components/Common/AlertBox";
import AuthContext from "@/contexts/AuthContext";

export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [auth] = useContext(AuthContext);

  const navigate = useNavigate();

  const registerUrl = baseApiUrl + "/social/auth/register";

  const formSchema = yup.object().shape({
    name: yup.string().required("Name field is required."),
    email: yup
      .string()
      .email("Must be a valid email address.")
      .matches(
        /@(stud\.)?noroff.no/,
        "Must be a @stud.noroff.no or @noroff.no email address."
      )
      .required("Email field is required"),
    password: yup.string().min(8).required("Password field is required."),
    repeat_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must be equal."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  function submitForm(data) {
    setIsSubmitting(true);
    axios
      .post(registerUrl, data)
      .then(() => {
        navigate("/"); // @TODO: Fix...?
      })
      .catch((error) => {
        console.log(error);
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
  }, []);

  return (
    <Stack direction="vertical" gap={3} className="col-md-4 mx-auto">
      <Form onSubmit={handleSubmit(submitForm)}>
        {error && (
          <AlertBox
            message={error.response.data.errors[0].message}
            level="danger"
          />
        )}
        <fieldset disabled={isSubmitting}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Name"
              {...register("name")}
              autoComplete="off"
            />
            {errors.name && (
              <Form.Text className="text-danger text-sm">
                {errors.name.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email address"
              {...register("email")}
              autoComplete="off"
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
              autoComplete="off"
            />
            {errors.password && (
              <Form.Text className="text-danger text-sm">
                {errors.password.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="repeat_password">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Repeat password"
              {...register("repeat_password")}
              autoComplete="off"
            />
            {errors.repeat_password && (
              <Form.Text className="text-danger text-sm">
                {errors.repeat_password.message}
              </Form.Text>
            )}
          </Form.Group>
        </fieldset>

        <Form.Group className="d-grid gap-3">
          <Button size="lg" type="submit" disabled={isSubmitting}>
            Register
          </Button>
          <p className="text-center">
            Already registered? <Link to="/login">Click here to sign in!</Link>
          </p>
        </Form.Group>
      </Form>
    </Stack>
  );
}
