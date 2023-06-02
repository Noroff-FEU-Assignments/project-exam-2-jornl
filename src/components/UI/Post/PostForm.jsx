import { useContext, useState } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseApiUrl } from "@/config/App";
import AlertBox from "@/components/Common/AlertBox";
import AuthContext from "@/contexts/AuthContext";
import PropTypes from "prop-types";

export default function PostForm({ post = {} }) {
  const [auth] = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [body, setBody] = useState(post.body?.length ?? 0);

  const formSchema = yup.object().shape({
    title: yup.string().max(280).required(),
    body: yup.string().max(280).required(),
    media: yup.string().url(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const url = post.id
    ? `${baseApiUrl}/social/posts/${post.id}`
    : `${baseApiUrl}/social/posts`;

  const method = post.id ? "put" : "post";
  const navigate = useNavigate();

  function submitForm(data) {
    setIsSubmitting(true);

    axios({
      method: method,
      url: url,
      data: data,
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    })
      .then(() => {
        navigate(post.id ? `/posts/${post.id}` : `/posts`);
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
        <AlertBox level="danger" message={error} />
      </Container>
    );
  }

  return (
    <Stack direction="vertical" gap={3} className="col-md-8">
      <Form onSubmit={handleSubmit(submitForm)}>
        <fieldset disabled={isSubmitting}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              defaultValue={post.title ?? ""}
              {...register("title")}
              autoComplete="off"
            />
            {errors.title && (
              <Form.Text className="text-danger text-sm">
                {errors.title.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="media">
            <Form.Label>Media URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Media URL"
              defaultValue={post.media ?? ""}
              {...register("media")}
              autoComplete="off"
            />
            {errors.media && (
              <Form.Text className="text-danger text-sm">
                {errors.media.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="body">
            <Form.Label>Body</Form.Label>
            <Form.Control
              type="text"
              placeholder="Body"
              as="textarea"
              rows={4}
              onKeyDown={(e) => {
                setBody(e.target.value.length);
              }}
              defaultValue={post.body ?? ""}
              {...register("body")}
              autoComplete="off"
            />
            <div className="d-flex justify-content-between">
              {errors.body && (
                <Form.Text className="text-danger text-sm">
                  {errors.body.message}
                </Form.Text>
              )}
              <Form.Text className="text-sm ms-auto">{body}/280</Form.Text>
            </div>
          </Form.Group>

          <Form.Group className="d-grid">
            <Button type="submit" disabled={isSubmitting}>
              {post.id ? "Update" : "Create"}
            </Button>
          </Form.Group>
        </fieldset>
      </Form>
    </Stack>
  );
}

PostForm.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    media: PropTypes.string,
    body: PropTypes.string,
  }),
};
