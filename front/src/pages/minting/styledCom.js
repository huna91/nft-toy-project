import styled from "styled-components";

const Minting_Wrap = styled.div`
  width: calc(100% - 150px);
  height: 100%;
  margin-top: 50px;
  padding-left: 150px;
  /* border: 1px solid blue; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Minting_Image_Wrap = styled.div`
  width: 500px;
  height: 500px;
  border: 1px solid pink;
`;

const Minting_Button = styled.button``;

export { Minting_Wrap, Minting_Image_Wrap, Minting_Button };
