import { ReactElement } from "react";
import FormControl from "react-bootstrap/FormControl";

interface SearchFieldProps {
  searchKey: string;
  onSearchDocument: (seachKey: string) => void;
}

export const SearchField = (props: SearchFieldProps): ReactElement => {
  const { searchKey, onSearchDocument } = props;

  const searchDocs = (event: React.ChangeEvent<any>): void => {
    onSearchDocument(event.target.value ?? "");
  };

  return (
    <div className='d-flex justify-content-end'>
      <FormControl
        className='w-25'
        placeholder='Search'
        aria-label='Search'
        aria-describedby='Search post'
        type='text'
        value={searchKey}
        onKeyUp={(e) => {
          if (e.key === "Enter" || e.keyCode === 13) {
            searchDocs(e);
          }
        }}
        onChange={searchDocs}
      />
    </div>
  );
};

export default SearchField;
