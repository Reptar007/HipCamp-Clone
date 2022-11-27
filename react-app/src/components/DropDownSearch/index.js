import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

function DropDownSearch() {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };

    useEffect(() => {
      if (!showMenu) return;

      const closeMenu = () => {
        setShowMenu(false);
      };

      document.addEventListener("click", closeMenu);

      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <div>
            <p>GUESTS</p>
            <div>Add guests</div>
        </div>
    )
}