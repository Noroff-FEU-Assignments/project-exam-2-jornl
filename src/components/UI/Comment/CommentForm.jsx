import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useContext, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { baseApiUrl } from "@/data/App";
import AuthContext from "@/contexts/AuthContext";
import AlertBox from "@/components/Common/AlertBox";
import PropTypes from "prop-types";

export default function CommentForm({ post, getPosts }) {
  const [auth] = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const formSchema = yup.object().shape({
    body: yup.string().max(280).required(),
  });

  const url = `${baseApiUrl}/social/posts/${post}/comment`;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  function submitForm(data) {
    setIsSubmitting(true);
    axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then(() => {
        getPosts();
        reset();
      })
      .catch((error) => {
        setError(error.toString());
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  if (error) {
    return (
      <Container>
        <AlertBox level="danger">{error}</AlertBox>
      </Container>
    );
  }

  return (
    <Form className="mt-4" onSubmit={handleSubmit(submitForm)}>
      <Form.Control
        placeholder="Write a comment"
        {...register("body")}
        disabled={isSubmitting}
      />

      {errors.body && (
        <Form.Text className="text-sm text-danger">
          {errors.body.message}
        </Form.Text>
      )}
    </Form>
  );
}

CommentForm.propTypes = {
  post: PropTypes.number,
  getPosts: PropTypes.func,
};
