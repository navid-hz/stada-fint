// src/components/Button.tsx
import styled from 'styled-components';

const Button = styled.button`
  background: ${(props) => props.theme.colors.primary};
  border-radius: 3px;
  border: none;
  color: ${(props) => props.theme.colors.secondary};
  padding: 0.5em 1em;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background: #d45d7d;
  }
`;

export default Button;
