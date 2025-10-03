import type { ChangeEvent } from 'react';
import css from './SearchBox.module.css';

export interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
}

function SearchBox({ value, onChange }: SearchBoxProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <input
          className={css.input}
          type="text"
          placeholder="Search notes"
          value={value}
          onChange={handleChange}
        />
    );
}

export default SearchBox;