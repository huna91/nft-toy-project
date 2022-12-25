import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { useSlideScroll } from "../../hooks/useSlideScroll";
import {
  Main_wrap,
  Main_contents_wrap,
  Main_New,
  Main_New_ul,
  Main_New_li,
} from "./styledCom";

const Main = ({ getTokenURI, isLogin }) => {
  const [tokenImg, setTokenImg] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      let a = [];
      for (let i = 0; i < getTokenURI.length; i++) {
        a.push(await fetch(getTokenURI[i]).then((res) => res.json()));
      }
      setTokenImg(a.map((data) => data.image));
    };
    fetchImages();
  }, [getTokenURI]);

  const scrollRef = useSlideScroll();
  return (
    <Main_wrap>
      <Main_contents_wrap>
        <h1>OUR MONSTER!!</h1>
        <Main_New>
          <Main_New_ul ref={scrollRef}>
            <Main_New_li>
              {isLogin ? (
                <>
                  {tokenImg.map((uri) => (
                    <img src={uri} alt="이미지가 없습니다"></img>
                  ))}
                </>
              ) : (
                "fail"
              )}
            </Main_New_li>
          </Main_New_ul>
        </Main_New>
      </Main_contents_wrap>
    </Main_wrap>
  );
};

export default Main;
