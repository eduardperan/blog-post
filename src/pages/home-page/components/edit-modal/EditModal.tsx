import { ReactElement, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { TitleField, DescriptionField } from "../add-modal/components";
import { IPostItem, IPost } from "../post";

interface UpdatePostForm extends IPostItem {}

const editPostSchema = yup.object().shape({
  title: yup.string().required("Title is required."),
  description: yup.string().required("Description group is required."),
});

export interface EditModalProps {
  post: IPost;
  isVisible: boolean;
  onEditPost: (post: IPost) => void;
  onClose: () => void;
}

export const EditModal = (props: EditModalProps): ReactElement => {
  const {
    post: { id, title, description, dateCreated },
    isVisible,
    onEditPost: triggerEditPost,
    onClose: triggerClose,
  } = props;
  const {
    control,
    handleSubmit,
    setValue,
    reset: resetForm,
  } = useForm<UpdatePostForm>({
    resolver: yupResolver(editPostSchema),
  });

  const updatePost: SubmitHandler<UpdatePostForm> = async (
    params
  ): Promise<void> => {
    triggerEditPost({
      id,
      dateCreated,
      ...params,
    });
    closeModal();
  };

  const closeModal = (): void => {
    resetForm({ title: "", description: "" });
    triggerClose();
  };

  useEffect(() => {
    setValue("title", title);
    setValue("description", description);
  }, [title, description, setValue]);

  return (
    <Modal backdrop='static' show={isVisible} onHide={closeModal} centered>
      <Form onSubmit={handleSubmit(updatePost)}>
        <Modal.Header closeButton>
          <Modal.Title as='h6'>
            <b>UPDATE POST</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <fieldset>
            <TitleField control={control} />
            <DescriptionField control={control} />
          </fieldset>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' type='submit'>
            Save
          </Button>
          <Button variant='outline-danger' onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditModal;
