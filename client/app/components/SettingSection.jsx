"use client";
import { useEffect, useState } from "react";

export default function SettingsSection({ toggleSetting, isSettingVisible }) {
  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(windowWidth);

  return (
    <>
      {/* Overlay when the drawer is open */}
      {isSettingVisible && windowWidth < 1536 && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-50"
          onClick={toggleSetting} // Close drawer when clicking outside
        ></div>
      )}

      {/* The sliding drawer */}
      <aside
        className={
          windowWidth < 1536
            ? `fixed top-0 right-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 ${
                isSettingVisible ? "translate-x-0" : "translate-x-full"
              } w-[75%] sm:w-[70%] md:w-[350px] rounded-l-3xl h-screen`
            : "hidden 2xl:block 3xl:block 3xl:col-start-4 bg-white w-full 2xl:w-[270px] 3xl:w-[300px] min-w-[300px] h-[80vh] mr-40 rounded-xl"
        }
      >
        <div className="p-4">
          <h2 className="text-2xl text-center font-semibold p-6">Settings</h2>

          <div className="mb-4 space-y-6">
            <div className="p-2 flex flex-row items-center w-full bg-customLite">
              <div className="bg-icon-bg flex p-2 items-center rounded-full mr-5 justify-center">
                <img
                  src="/setting_icon/language.png"
                  alt="language"
                  className="w-5 h-5"
                />
              </div>
              <p className="text-gray-400 font-medium text-start text-base leading-5 xs:text-sm">
                Language Settings
              </p>
            </div>
          </div>

          <div className="px-2 py-3 flex flex-row items-center w-full bg-customLite">
            <div className="bg-icon-bg flex p-2 items-center rounded-full mr-5 justify-center">
              <img
                src="/setting_icon/general.svg"
                alt="general"
                className="w-7 h-7"
              />
            </div>
            <p className="text-gray-400 font-medium text-start text-base leading-5 xs:text-sm">
              General Settings
            </p>
          </div>
          <div className="px-2 py-3 flex flex-row items-center w-full bg-customLite my-4">
            <div className="bg-icon-bg flex p-2 items-center rounded-full mr-5 justify-center">
              <img
                src="/setting_icon/font.svg"
                alt="font"
                className="w-7 h-7"
              />
            </div>
            <p className="text-gray-400 font-medium text-start text-base leading-5 xs:text-sm">
              Font Settings
            </p>
          </div>
          <div className="px-2 py-3 flex flex-row items-center w-full bg-customLite border-l-5 border-customGreen before:border rounded-l-md">
            <div className="bg-icon-bg flex p-2 items-center rounded-full mr-5 justify-center">
              <img
                src="/setting_icon/appearance_green.png"
                alt="font"
                className="w-7 h-7"
              />
            </div>
            <p className="text-customGreen font-medium text-start text-base leading-5 xs:text-sm">
              Appearance Settings
            </p>
          </div>
          <div className="flex px-4 py-6 items-center justify-between text-base text-gray-600 font-medium">
            Night Mode
            <img
              src="/setting_icon/toggle.png"
              alt="font"
              className="w-8 h-4"
            />
          </div>
        </div>
      </aside>
    </>
  );
}
