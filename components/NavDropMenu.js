import React, { useState } from 'react';
import { CSSTransition } from'react-transition-group';
import {RiDashboardLine, RiLogoutBoxLine, RiSettings4Line} from 'react-icons/ri'
import navStyles from '../styles/Nav.module.css'
import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/Link';


function NavDropMenu(){
    const [activeMenu, setActiveMenu] = useState('main');
    const {user, error, isLoading } = useUser();
    /*
    <NavDropItems 
      leftIcon={`⚙️`} 
      goToMenu={'settings'}>
      Settings
    </NavDropItems>
    */
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    function NavDropItems(props){
      return (
        <a className={navStyles.menu_item} onClick={()=> props.goToMenu && setActiveMenu(props.goToMenu)}>
          {props.children}
        </a>
      )
    }
    return(
      <div className={navStyles.dropdown}>
      <CSSTransition 
        in={activeMenu === 'main'} 
        appear={true} 
        timeout={500}
        classNames={navStyles.menu_primary_enter}
        >
          <div className={navStyles.menu}>
          {user && (
            <>
              <NavDropItems>
              <img href={{
                  pathname: "/users/profile",
                  query:{name:`${user.nickname}`}
                }}
                  src={user.picture} 
                  className={navStyles.icon_button}
              >
              </img>
                <Link href={{
                    pathname: "/users/profile",
                    query:{name:`${user.nickname}`}
                  }}>
                  <a>My Profile</a>
                </Link>
              </NavDropItems>
            </>
            )}
           {user && (
             <>
              <NavDropItems>
              <RiDashboardLine className={navStyles.icon_button}/>
                  <Link href={{
                    pathname:"/users/dashboard",
                    query:{name: user.nickname}}}
                    >
                    <a>Dashboard</a>
                  </Link>
              </NavDropItems>
            </>    
            )}
          {user && (
            <>
              <NavDropItems>
              <RiSettings4Line className={navStyles.icon_button}/>

                <Link href={{
                    pathname: "/users/profile",
                    query:{name:`${user.nickname}`}
                  }}>
                  <a>Settings</a>
                </Link>
              </NavDropItems>
            </>
            )}
            {user && (
                <NavDropItems>
                    <RiLogoutBoxLine className={navStyles.icon_button}/>
                    <Link href="/api/auth/logout"><a>Logout</a></Link>
                </NavDropItems>    
            )}  
          </div>
      </CSSTransition>
      </div>
    )
}

export default NavDropMenu;
