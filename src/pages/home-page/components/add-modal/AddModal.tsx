import { ReactElement } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { TitleField, DescriptionField } from "./components";
import { IPostItem, IPost } from "../post";

interface CreatePostForm extends IPostItem {}

const addPostSchema = yup.object().shape({
  title: yup.string().required("Title is required."),
  description: yup.string().required("Description group is required."),
});

export interface AddModalProps {
  isVisible: boolean;
  onAddPost: (post: IPost) => void;
  onClose: () => void;
}

export const AddModal = ({
  isVisible,
  onAddPost: triggerAddPost,
  onClose: triggerClose,
}: AddModalProps): ReactElement => {
  const {
    control,
    handleSubmit,
    reset: resetForm,
  } = useForm<CreatePostForm>({
    resolver: yupResolver(addPostSchema),
  });

  const createPost: SubmitHandler<CreatePostForm> = async (
    params
  ): Promise<void> => {
    triggerAddPost({
      id: uuidv4(),
      dateCreated: moment().toDate(),
      ...params,
    });
    closeModal();
  };

  const closeModal = (): void => {
    resetForm({ title: "", description: "" });
    triggerClose();
  };

  return (
    <Modal backdrop='static' show={isVisible} onHide={closeModal} centered>
      <Form onSubmit={handleSubmit(createPost)}>
        <Modal.Header closeButton>
          <Modal.Title as='h6'>
            <b>CREATE NEW POST</b>
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

export default AddModal;
