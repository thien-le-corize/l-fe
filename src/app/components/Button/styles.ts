import styled from "styled-components";

export const ButtonWrapper = styled.button`
  border: none;
  background-color: #001a9c;
  display: flex;
  align-items: center;
  color: white;
  font-style: normal;
  font-weight: 500;
  padding: 14px 24px;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.0125em;
  flex: none;
  order: 1;
  flex-grow: 0;
  cursor: pointer;
  img {
    margin-left: 10px;
  }
  :hover {
    background-color: grey;
  }
`;
