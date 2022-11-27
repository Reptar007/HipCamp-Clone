
import React from 'react';
import { NavLink } from 'react-router-dom';
import LoginFormModal from './LoginModal';
import SignUpFormModal from './SignUpModal';
import LogoutButton from './auth/LogoutButton';
import DropDownMenu from './DropDownMenu';
import { useSelector } from 'react-redux';
import './navbar.css'

const NavBar = () => {

  const sessionUser = useSelector((state) => state.session.user)

  return (
    <nav className='nav'>
      <div className='left_nav'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img src='https://i.imgur.com/hraaBSg.png' alt='home logo' />
          </NavLink>
      </div>
      {!sessionUser && (
        <>
          <div className='right_nav'>
            <LoginFormModal />
            <SignUpFormModal />
          </div>
        </>
        )}
        {sessionUser && (
        <div className='right_nav'>
          <LogoutButton />
          <DropDownMenu user={sessionUser}/>
        </div>
        )}
    </nav>
  );
}

export default NavBar;
