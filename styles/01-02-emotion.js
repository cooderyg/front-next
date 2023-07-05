import styled from "@emotion/styled";

export const MyEmail = styled.span`
  color: blue;
  font-size: 25px;
`;

export const MyInput = styled.input`
  border-color: red;
  @media (max-width: 768px) {
    border-color: yellow;
  }
`;
