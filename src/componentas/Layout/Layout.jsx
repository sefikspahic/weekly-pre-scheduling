import React from "react";
import Header from "../Header";
import Footer from "../Footer";


const Layout = ({children}) => {
  return (
    <div className="min-h-full flex flex-col justify-between ">
      <Header/>
      <main className="flex grow w-full h-full max-w-[1440px] mx-auto px-[24px] sm:px-[40px] pt-[30px]">
        <div className="content-container grow w-full h-full">{children}</div>
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
