import React, {useState, useEffect} from "react";
import logo from '../assets/images/logo.svg'
import { logout } from "../../store/session";
import { useDispatch } from "react-redux";
import './dropdown.css'

function DropDownMenu({ user }) {
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()
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

   
    const onLogout = async (e) => {
        await dispatch(logout());
    };
    const closeMenu = () => {
      setShowMenu(false);
    };

     return (
       <>
         <img
           onMouseEnter={openMenu}
           src={logo}
           alt="logo"
         />
         {showMenu && (
           <div onMouseLeave={closeMenu} className="dropdown_menu">
             <h2>Hello! {user?.username}</h2>
             <p>Profile</p>
             <p className="logout" onClick={onLogout}>
               Log out
             </p>
           </div>
         )}
       </>
     );
}

export default DropDownMenu