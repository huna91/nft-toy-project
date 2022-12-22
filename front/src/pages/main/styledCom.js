import styled from "styled-components";

const Main_wrap = styled.div`
  width: calc(100% - 150px);
  height: 100%;
  margin-top: 50px;
  padding-left: 150px;
  border: 1px solid pink;
`;

const Main_contents_wrap = styled.div`
  width: calc(100% - 190px);
  border: 1px solid yellow;
  /* overflow: hidden; */
`;

const Main_New = styled.div``;

const Main_New_ul = styled.ul`
  white-space: nowrap;
  overflow: scroll;
  width: 100%;
  overflow-y: hidden;
  padding: 0;
  ::-webkit-scrollbar {
    height: 8px;
    background: #ebff82;
  }
  ::-webkit-scrollbar-thumb {
    background: radial-gradient(#f64435, #ffe498);
    border-radius: 5px;
  }
`;

const Main_New_li = styled.li`
  list-style: none;
  width: 250px;
  height: 250px;
  margin: 20px;
  border-radius: 18px;
  border: 1px solid greenyellow;
  display: inline-block;
`;

const Wheel_Contents_Wrap = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid green;
`;

export {
  Main_wrap,
  Main_contents_wrap,
  Main_New,
  Main_New_ul,
  Main_New_li,
  Wheel_Contents_Wrap,
};
