import { ReactElement } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { DEFAULT_DATE_FORMAT } from "core/constant";
import styles from "./ViewModal.module.css";
import { IPost } from "../post";

export interface ViewModalProps {
  post: IPost;
  isVisible: boolean;
  onClose: () => void;
}

export const ViewModal = ({
  post,
  isVisible,
  onClose,
}: ViewModalProps): ReactElement => (
  <Modal
    backdrop='static'
    show={isVisible}
    onHide={onClose}
    size='xl'
    fullscreen
    centered
  >
    <Form>
      <Modal.Header closeButton>
        <Modal.Title as='h6'>
          <b>POST DETAILS</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>
                <strong>Title</strong>
              </td>
              <td>{post.title}</td>
            </tr>
            <tr>
              <td>
                <strong>Description</strong>
              </td>
              <td>{post.description}</td>
            </tr>
            <tr>
              <td>
                <strong>Date Created</strong>
              </td>
              <td>{moment(post.dateCreated).format(DEFAULT_DATE_FORMAT)}</td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
    </Form>
  </Modal>
);

export default ViewModal;
