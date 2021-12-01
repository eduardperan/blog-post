import { ReactElement } from "react";
import { Controller, Control } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { IPostItem } from "../../../post";

export interface TitleFieldProps {
  control: Control<IPostItem>;
}

export const TitleField = ({ control }: TitleFieldProps): ReactElement => (
  <Controller
    name='title'
    control={control}
    defaultValue=''
    rules={{ required: true }}
    render={({ field, fieldState: { invalid, error } }) => (
      <Form.Group className='mb-3'>
        <Form.Label>Title</Form.Label>
        <Form.Control
          {...field}
          placeholder='Enter title'
          isInvalid={invalid}
        />
        <Form.Control.Feedback type='invalid'>
          {error?.message}
        </Form.Control.Feedback>
      </Form.Group>
    )}
  />
);

export default TitleField;
