import Link from 'next/Link'
import navStyles from '../styles/Nav.module.css'
import { useUser } from '@auth0/nextjs-auth0'

import NavDropMenu from './NavDropMenu.js'
import NavDropItem from './NavDropItem.js'

import {BiMenu} from 'react-icons/bi'

function Nav() {
    const { user } = useUser();

    return (
        <nav className={navStyles.nav}>
            <img className={navStyles.img} src="logohtb.png"></img>
            <ul>
                <li>
                    <Link href='/'> Home </Link>
                </li>
                <li>
                    <Link href='/about'> About </Link>
                </li>
                <li>
                    <Link href='/events'> Events </Link>
                </li>
                {!user && (
                    <li className={navStyles.btn}>
                        <Link href="/api/auth/login">Login</Link>
                    </li>    
                )}
                
                {user && (
                    <div>
                     <NavDropItem icon={<BiMenu/>}>
                            <NavDropMenu />
                    </NavDropItem>
                    </div>       
                )}
            </ul>
        </nav>
    )
}

export default Nav

/*
 <NavDropMenu className={navStyles.btn} 
                        onClick={()=> props.goToMenu} 
                        in={activeMenu ==='main'}
                        unmountOnExit 
                        timeout={500}
                        goToMenu={'dropdown'}
                        icon="🔽"
                    >
                        <NavDropMenu/>
                        <NavItem icon="🔽">
                        <NavDropMenu />
                        </NavItem>

<>

                    <li className={navStyles.btn} 
                        onClick={()=> props.goToMenu && setActiveMenu(props.goToMenu)} 
                        in={activeMenu === 'main'}
                        unmountOnExit 
                        timeout={500}
                        goToMenu={'dropdown'}
                    >
                        <div
                            in={activeMenu === 'settings'}
                        >

                        </div>
                    </li>

                    </>

*/