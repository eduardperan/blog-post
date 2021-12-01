import { ReactElement } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export interface DeleteModalProps {
  title: string;
  isVisible: boolean;
  onDeletePost: () => void;
  onClose: () => void;
}

export const DeleteModal = ({
  title,
  isVisible,
  onDeletePost: triggerDeletePost,
  onClose: triggerClose,
}: DeleteModalProps): ReactElement => (
  <Modal
    backdrop='static'
    keyboard={false}
    show={isVisible}
    onHide={triggerClose}
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title as='h6'>
        <b>DELETE POST</b>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>Delete "{title}" post?</Modal.Body>
    <Modal.Footer>
      <Button variant='outline-danger' onClick={triggerDeletePost}>
        Delete
      </Button>
      <Button variant='secondary' onClick={triggerClose}>
        Cancel
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DeleteModal;
