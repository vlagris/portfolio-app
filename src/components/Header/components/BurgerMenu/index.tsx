import React, {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import {MenuItem} from "@/components/Header";
import MenuButton from "@/components/Header/components/BurgerMenu/MenuButton.tsx";
import BurgerMenuItem from "@/components/Header/components/BurgerMenu/BurgerMenuItem.tsx";
import ThemeSwitch from "@/components/Header/components/ThemeSwitch.tsx";



interface BurgerMenuProps {
  items: MenuItem[]
}

function BurgerMenu({items}: BurgerMenuProps) {
  const [show, setShow] = useState(false);


  useEffect(() => {
    if (!show) {
      document.body.className = "";
    } else if (document.body.offsetWidth < window.innerWidth) {
      document.body.className = "pr-[17px] overflow-hidden md:pr-0 md:overflow-auto";
    } else {
      document.body.className = "overflow-hidden md:overflow-auto";
    }
  }, [show]);


  function handleOverlayClick(event: React.MouseEvent<HTMLElement>) {
    if (event.target === event.currentTarget) {
      setShow(false);
    }
  }


  function handleItemClick() {
    setShow(false)
  }


  return (
    <div className="md:hidden">
      <MenuButton show={show} setShow={setShow}/>

      {show && createPortal(
        <div
          className="fixed inset-0 bg-gray-600/10 dark:bg-gray-50/10 md:hidden"
          onClick={handleOverlayClick}
        >

          <div className="w-[320px] h-full ml-auto bg-white dark:bg-gray-950">

            <div className="flex justify-end items-center px-4 h-[--header-height]">
              <MenuButton show={show} setShow={setShow}/>
            </div>

            <ul className="py-2 px-4 border-y border-gray-100 dark:border-gray-800">
              {items.map(({to, name}) =>
              <BurgerMenuItem
                key={name}
                to={to}
                name={name}
                onClick={handleItemClick}
              />
              )}
            </ul>

            <div className="p-4 flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Сменить тему</span>
              <ThemeSwitch/>
            </div>
          </div>
        </div>
        ,
        document.body
      )}
    </div>
  );
}

export default BurgerMenu;