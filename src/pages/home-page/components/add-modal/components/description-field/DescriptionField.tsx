import { ReactElement } from "react";
import { Controller, Control } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { IPostItem } from "../../../post";

export interface DescriptionFieldProps {
  control: Control<IPostItem>;
}

export const DescriptionField = ({
  control,
}: DescriptionFieldProps): ReactElement => (
  <Controller
    name='description'
    control={control}
    defaultValue=''
    rules={{ required: true }}
    render={({ field, fieldState: { invalid, error } }) => (
      <Form.Group className='mb-3'>
        <Form.Label>Description</Form.Label>
        <Form.Control
          {...field}
          as='textarea'
          placeholder='Enter description'
          isInvalid={invalid}
          onFocus={(e) => e.target.select()}
        />
        <Form.Control.Feedback type='invalid'>
          {error?.message}
        </Form.Control.Feedback>
      </Form.Group>
    )}
  />
);

export default DescriptionField;
