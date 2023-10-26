import { NavLink } from 'react-router-dom'
// importing styles from NavBar.module.css
import styles from './PageNav.module.css'
import Logo from './Logo'

export default function PageNav() {
  return (
    <nav className={styles.nav}>
        <Logo />

        <ul>
            {/* using NavLink instead of Link, we will get the active class on the link */}
            <li> 
                <NavLink to="/product">Product</NavLink>
            </li>
            <li>
                <NavLink to="/pricing">Pricing</NavLink>
            </li>
            <li>
                <NavLink to="/login" className={styles.ctaLink}>Login</NavLink>
            </li>
        </ul>
    </nav>
  )
}
