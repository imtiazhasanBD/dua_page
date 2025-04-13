import React from "react";
import Header from "./Header";
import SideNavBar from "./SideNavBar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Header */}
      <header className="fixed top-0 left-40 right-0 py-6 pr-10 z-10 hidden xl:block">
        <Header />
      </header>
      {/* Main Content Area with Sidebars */}
      <div className="flex pt-[100px] xl:pt-[70px] xl:ml-[122px] md:gap-2 h-screen fixed top-6 left-6 pr-36 w-full">
        {/* Left Sidebar */}
          <SideNavBar/>
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">{children}</main>
        {/* Right Sidebar */}
        <aside className="w-64 bg-gray-200 pt-4 overflow-y-auto">
           Right Sidebar
        </aside>
      </div>
    </div>
  );
};

export default Layout;
