import React from 'react'
import { nav_icon } from '../data/data'

const NavbarMobile = () => {
  return (
        <nav className="px-4 py-2 m-auto shadow-sm bg-white z-0 fixed left-0 right-0 bottom-0 lg:hidden">
              <ul className="flex gap-2 justify-evenly items-center w-full overflow-x-auto">
                {nav_icon.map((icon, index) => (
                  <li key={index} className="p-2 flex justify-center items-center">
                    <div className="bg-customLiteBlue rounded-full h-10 w-10 flex justify-center items-center">
                      <img
                        src={`/nav_icon/${icon}.svg`}
                        alt={`${icon} logo`}
                        className="w-5 h-5"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
  )
}

export default NavbarMobile