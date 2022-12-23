import React, { useRef, useEffect } from "react";
import { useSlideScroll } from "../../hooks/useSlideScroll";
import {
  Main_wrap,
  Main_contents_wrap,
  Main_New,
  Main_New_ul,
  Main_New_li,
} from "./styledCom";

const Main = () => {
  const scrollRef = useSlideScroll();
  return (
    <Main_wrap>
      <Main_contents_wrap>
        <h1>OUR MONSTER!!</h1>
        <Main_New>
          <Main_New_ul ref={scrollRef}>
            <Main_New_li>
              <img />
            </Main_New_li>
            <Main_New_li>
              <img />
            </Main_New_li>
            <Main_New_li>
              <img />
            </Main_New_li>
            <Main_New_li>
              <img />
            </Main_New_li>
            <Main_New_li>
              <img />
            </Main_New_li>
            <Main_New_li>
              <img />
            </Main_New_li>
            <Main_New_li>
              <img />
            </Main_New_li>
          </Main_New_ul>
        </Main_New>
      </Main_contents_wrap>
    </Main_wrap>
  );
};

export default Main;
