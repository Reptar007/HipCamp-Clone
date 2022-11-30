import React, {useState, useEffect} from "react";
import logo from '../assets/images/logo.svg'
import { NavLink,useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import { useDispatch } from "react-redux";
import './dropdown.css'

function DropDownMenu({ user }) {
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
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
         <img onMouseEnter={openMenu} src={logo} alt="logo" />
         {showMenu && (
           <div onMouseLeave={closeMenu} className="dropdown_menu">
            <NavLink to='/profile'>
              <p><i class="fa-thin fa-address-card"></i>Profile</p>
            </NavLink>
            <NavLink to='/'>
              <p className="logout" onClick={onLogout}>
                <i class="fa-thin fa-right-from-bracket"></i>Log out
              </p>
            </NavLink>
           </div>
         )}
       </>
     );
}

export default DropDownMenu