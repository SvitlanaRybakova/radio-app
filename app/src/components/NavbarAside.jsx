import style from "../styles/NavbarAside.module.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";

const NavbarAside = () => {
  const [menuActive, setMenuActive] = useState(false)

  const [links] = useState([
    { name: "Kanaler & program ", url: "/" },
    { name: "Tablå", url: "/all-schedule" },
    { name: "Favoritlista", url: "" }
  ]);

  const renderLinks = () => {
    return links.map(link => (
      <Link className={style} key={link.name} to={link.url}>{link.name}</Link>
  
    ))
    
  }

  const handleClick = () => {
    setMenuActive(!menuActive);
  }

  return (
    <header>
      <div className={style.container}>
        <div className={`${style.leftMenu} ${menuActive ? style.openMenu : ''}`}
          >
          <div className={`${style.hamburger} ${menuActive ? style.open : ''}`}
            onClick={handleClick}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={style.imgWrapper}>
            <img src={logo} alt={logo} className="logo-img" />
          </div>
          <nav className={style.menu}>
            {renderLinks()}

          </nav>
        </div>
      </div>
    </header>
  )
}
export default NavbarAside;