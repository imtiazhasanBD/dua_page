"use client";
import React, { Suspense, useState } from "react";
import Header from "./Header";
import SideNavBar from "./SideNavBar";
import SettingsSection from "./SettingSection";
import CategorySection from "./CategorySection";
import NavbarMobile from "./NavbarMobile";
import SkeletonCategory from "./SkeletonCategory";

const Layout = ({ children }) => {
  const [isSettingVisible, setIsSettingVisible] = useState(false);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);

  const toggleSetting = () => {
    setIsSettingVisible((prev) => !prev);
  };

  const toggleCategory = () => {
    setIsCategoryVisible((prev) => !prev);
  };

  console.log(isSettingVisible);

  return (
    <div className="flex flex-col h-screen">
      {/* Top Header */}
      <header className="fixed bg-white lg:bg-transparent top-0 left-0 xl:left-40 right-0 py-4 px-4 xl:px-0 xl:pr-10 xl:block z-10">
        <Header toggleSetting={toggleSetting} toggleCategory={toggleCategory} />
      </header>
      {/* Main Content Area with Sidebars */}
      <div className="flex mt-[70px] xl:ml-[122px] md:gap-2 h-screen fixed top-6 left-0 xl:left-6  w-full z-10">
        {/* Left Sidebar */}
        <SideNavBar />
        {/* Main Content */}
        <div className="mx-2 h-[85.5vh] lg:min-w-[350px] overflow-hidden bg-white lg:h-[85vh] space-y-10 overflow-y-auto ">
          <Suspense fallback={<SkeletonCategory />}>
            <CategorySection
              toggleCategory={toggleCategory}
              isCategoryVisible={isCategoryVisible}
            />
          </Suspense>
        </div>
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 mr-3 lg:mr-0">
          {children}
        </main>
        {/* Right Sidebar */}
        <SettingsSection
          toggleSetting={toggleSetting}
          isSettingVisible={isSettingVisible}
        />
        {/* navbar for mobile */}
        <NavbarMobile />
      </div>
    </div>
  );
};

export default Layout;
