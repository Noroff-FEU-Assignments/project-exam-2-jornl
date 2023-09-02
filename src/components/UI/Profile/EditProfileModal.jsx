import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import axios from "axios";
import { baseApiUrl } from "@/data/App";
import AuthContext from "@/contexts/AuthContext";
import AlertBox from "../../Common/AlertBox";

export default function EditProfileModal({ profile, updateProfile }) {
  const [auth] = useContext(AuthContext);
  const [isShowing, setIsShowing] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = yup.object().shape({
    avatar: yup.string().url("The field avatar must be a valid URL."),
    banner: yup.string().url("The field banner must be a valid URL."),
  });

  const updateProfileUrl = baseApiUrl + `/social/profiles/${auth.name}/media`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      avatar: profile.avatar ?? "",
      banner: profile.banner ?? "",
    },
  });

  function submitForm(data) {
    setIsSubmitting(true);
    axios
      .put(updateProfileUrl, data, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then(() => {
        updateProfile();
        setIsShowing(false);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <>
      <Button onClick={() => setIsShowing(true)}>Edit Profile</Button>

      <Modal show={isShowing} onHide={() => setIsShowing(false)}>
        <Modal.Body>
          <h2>Edit Profile</h2>
          <p>Update your avatar and banner</p>
          {error && <AlertBox level="danger">{error.message}</AlertBox>}

          <Form onSubmit={handleSubmit(submitForm)}>
            <fieldset disabled={isSubmitting} className="my-4">
              <Form.Group className="mb-3" controlId="avatar">
                <Form.Label>Avatar Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Avatar"
                  {...register("avatar")}
                  autoComplete="off"
                />
                {errors.avatar && (
                  <Form.Text className="text-danger text-sm">
                    {errors.avatar.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="banner">
                <Form.Label>Banner Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Banner"
                  {...register("banner")}
                  autoComplete="off"
                />
                {errors.banner && (
                  <Form.Text className="text-danger text-sm">
                    {errors.banner.message}
                  </Form.Text>
                )}
              </Form.Group>
            </fieldset>

            <Form.Group className="d-flex gap-3 mt-5">
              <Button
                type="button"
                variant="light"
                className="w-100"
                disabled={isSubmitting}
                onClick={() => {
                  reset();
                  setIsShowing(false);
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="w-100"
                variant="secondary"
                disabled={isSubmitting}
              >
                Update
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

EditProfileModal.propTypes = {
  profile: PropTypes.shape({
    avatar: PropTypes.string,
    banner: PropTypes.string,
  }),
  updateProfile: PropTypes.func,
};
