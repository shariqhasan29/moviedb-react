import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  margin: 2rem 0;
`;

const Input = styled.input`
  width: 100%;
  min-width: 750px;
  padding: 0.8rem 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="Search movies..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </SearchContainer>
  );
};

export default SearchBar;