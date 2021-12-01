import { ReactElement } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Stack from "react-bootstrap/Stack";
import styles from "./SortSelect.module.css";

export interface SortSelectProps {
  sort: Sort;
  onChange: (sort: Sort) => void;
}

export interface ISortByDropdownOptions {
  label: string;
  value: SortByOption;
}

export interface ISortOrderDropdownOptions {
  label: string;
  value: SortOrderOption;
}

export enum SortByOption {
  TITLE = "TITLE",
  DATE_CREATED = "DATE_CREATED",
}

export enum SortOrderOption {
  ASC = "ASC",
  DESC = "DESC",
}

export interface Sort {
  field: SortByOption;
  order: SortOrderOption;
}

export const SortByOptions: ISortByDropdownOptions[] = [
  {
    label: "Title",
    value: SortByOption.TITLE,
  },
  {
    label: "Date created",
    value: SortByOption.DATE_CREATED,
  },
];

export const SortOrderOptions: ISortOrderDropdownOptions[] = [
  {
    label: "Ascending",
    value: SortOrderOption.ASC,
  },
  {
    label: "Descending",
    value: SortOrderOption.DESC,
  },
];

export const SortSelect = (props: SortSelectProps): ReactElement => {
  const { sort, onChange } = props;
  const handleSortByChange = (
    event: React.FormEvent<HTMLSelectElement>
  ): void => {
    onChange({ ...sort, field: event.currentTarget.value as SortByOption });
  };

  const handleSortOrderChange = (
    event: React.FormEvent<HTMLSelectElement>
  ): void => {
    onChange({ ...sort, order: event.currentTarget.value as SortOrderOption });
  };

  return (
    <Stack direction='horizontal' gap={1}>
      <FloatingLabel label='Sort by'>
        <Form.Select
          className={styles.select}
          onChange={handleSortByChange}
          value={sort.field}
        >
          {SortByOptions.map((op, index) => (
            <option key={index} value={op.value}>
              {op.label}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel label='Order by'>
        <Form.Select
          className={styles.select}
          onChange={handleSortOrderChange}
          value={sort.order}
        >
          {SortOrderOptions.map((op, index) => (
            <option key={index} value={op.value}>
              {op.label}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
    </Stack>
  );
};

export default SortSelect;
