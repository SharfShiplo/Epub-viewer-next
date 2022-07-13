import Head from "next/head";
import Image from "next/image";
import { Fragment, useState } from "react";
import Header from "../components/header/header";
import Reader from "../components/reader/ereader";

export default function Home() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = () => {
    setIsFullScreen((fullscreen) => !fullscreen);
    
  };

  return (
    <Fragment>
      <Head>
        <title>Ebook powered by epub.js</title>
        <meta name="description" content="Read epub files with ebook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full min-h-screen relative">
        <Header toggleView={toggleFullScreen} />
        <Reader fullScreen={isFullScreen} cancelFullScreen={toggleFullScreen} />
      </main>
    </Fragment>
  );
}
