import React, {useState} from 'react';
import navStyles from '../styles/Nav.module.css'


// create div for icons

function NavDropItem (props){
    const [openNav, setNav] = useState(false)
    return (
     <li className={navStyles.menu}>
       <a className={navStyles.icon_button} onClick={()=> setNav(!openNav)}>
         {props.icon}
  
         {openNav && props.children}
       </a>
     </li>
    )
}

export default NavDropItem;