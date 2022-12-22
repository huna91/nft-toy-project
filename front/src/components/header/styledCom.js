import styled from "styled-components";

const Header_wrap = styled.div`
  width: calc(100% - 220px);
  height: 70px;
  margin-top: 10px;
  /* border: 1px solid red; */
  padding-left: 50px;
  padding-right: 50px;
`;

const Header_wrap_left = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  float: left;
  justify-content: center;
  align-items: center;
`;

const Header_wrap_right = styled.div`
  width: 50%;
  height: 100%;
  float: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export { Header_wrap, Header_wrap_left, Header_wrap_right };
