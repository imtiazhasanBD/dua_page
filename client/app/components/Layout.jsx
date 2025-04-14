"use client"
import React, { useState } from "react";
import Header from "./Header";
import SideNavBar from "./SideNavBar";
import SettingsSection from "./SettingSection";

const Layout = ({ children }) => {
    const [isSettingVisible, setIsSettingVisible] = useState(false);

    const toggleSetting = () => {
      setIsSettingVisible((prev) => !prev);
    };
    console.log(isSettingVisible);
    

  return (
    <div className="flex flex-col h-screen">
      {/* Top Header */}
      <header className="fixed bg-white lg:bg-transparent top-0 left-0 xl:left-40 right-0 py-6 px-4 xl:px-0 xl:pr-10 xl:block z-10">
        <Header toggleSetting={toggleSetting}/>
      </header>
      {/* Main Content Area with Sidebars */}
      <div className="flex mt-[70px] xl:ml-[122px] md:gap-2 h-screen fixed top-6 left-0 xl:left-6  w-full z-10">
        {/* Left Sidebar */}
          <SideNavBar/>
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">{children}</main>
        {/* Right Sidebar */}
        <SettingsSection toggleSetting={toggleSetting} isSettingVisible={isSettingVisible}/>
      </div>
    </div>
  );
};

export default Layout;
