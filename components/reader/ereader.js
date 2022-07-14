import React, { useEffect, useRef, useState } from "react";
import Wrapper from "./wrapper";
import {ReactReader, ReactReaderStyle } from "react-reader";

// const storage = global.localStorage || null;
const DEMO_URL = "https://s3.amazonaws.com/moby-dick/moby-dick.epub";
// const DEMO_URL = "Mustafa.epub";
const DEMO_NAME = "Alice in wonderland";
function Reader({ fullScreen, cancelFullScreen }) {
  const [background, setBackground] = useState("white");
  const [page, setPage] = useState("");
  const renditionRef = useRef(null);
  const [size, setSize] = useState(100);
  const [location, setlocation] = useState("epubcfi(/6/28!/4/2/4/1:1259)");
  // need to track the location for starting from the last page a user read.
  const tocRef = useRef(null);

  const ownStyles = {
    ...ReactReaderStyle,
    readerArea: {
      ...ReactReaderStyle.readerArea,
      backgroundColor: background,
    },
  };
  // console.log(ReactReaderStyle)// this console will help to style


  const locationChanged = (epubcifi) => {
    setlocation(epubcifi);
    if (renditionRef && renditionRef.current && tocRef && tocRef.current) {
      if (
        renditionRef.current.location &&
        renditionRef.current.location.start
      ) {
        const { href, displayed } = renditionRef.current.location.start;
        const chapter = tocRef.current.find((item) => item.href === href);
        setPage(
          `Page ${displayed.page + 1} of ${displayed.total} in chapter ${
            chapter ? chapter.label : "n/a"
          }`
        );
      }
    }
  };
  const changeSize = (ev) => {
    setSize(ev.target.value);
  };

  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.fontSize(`${size}%`);
    }
  }, [size]);

  return (
    <Wrapper screenMood={fullScreen}>
      {fullScreen ? (
        <button
          className={`fixed top-[${
            fullScreen ? 15 : 100
          }px] right-[20px] z-50 bg-transparent border-0 flex items-center justify-center rounded w-12 h-12 shadow-lg`}
          onClick={cancelFullScreen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </button>
      ) : null}
{/* 
      <button
        className={`fixed top-[${
          fullScreen ? 15 : 100
        }px] right-[86px] z-50 bg-transparent border-0 flex items-center justify-center rounded w-12 h-12 shadow-lg`}
        onClick={() => setBackground("black")}
      >
        Black
      </button> */}
      <select className="fixed top-[10px] right-[60px] px-4 py-3 rounded-full" onClick={changeSize}>
        <option value={100}>100%</option>
        <option value={120}>120%</option>
        <option value={140}>140%</option>
        <option value={160}>160%</option>
        <option value={180}>180%</option>
        <option value={200}>200%</option>
      </select>

      <ReactReader
        location={location}
        url={DEMO_URL}
        locationChanged={locationChanged}
        getRendition={(rendition) => {
          renditionRef.current = rendition;
          renditionRef.current.themes.fontSize(`${size}%`);
        }}
        tocChanged={(toc) => (tocRef.current = toc)}
        showToc={true}
        styles={ownStyles}
      />
      <p className="text-center mt-2">{page}</p>
    </Wrapper>
  );
}

export default Reader;
