import React from 'react'
import styles from './Navbar.module.scss'

import { Link } from 'react-router-dom'
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {

    
    const handleClick = () => {
        const menu = document.getElementById('links');
        menu.classList.toggle(styles.active)
    }

  return (
    <nav className={styles.navbar}>
        <div className={`${styles.links}`} id='links'>
            <ul className={styles.listLinks}>
                <li>
                    <Link to='/' onClick={() => handleClick()}>HOME</Link>
                </li> 
                <li>
                    <a href='http://localhost:5000/' target='_blank' rel="noreferrer">API</a>
                </li>  
            </ul>   
        </div>              
        <div className={styles.buttonColapse}>
            <AiOutlineMenu onClick={() => handleClick()}/>
        </div>
    </nav>
  )
}

export default Navbar