import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserProvider";

import style from "../styles/Navbar.module.css";

const Navbar = () => {
  const { isAuthorized, logout, usersLogin } = useContext(UserContext);

  console.log('isAuthorized', isAuthorized);
  return (
    <div className={style.wrapper}>
      <div className={style.loginWrapper}>
        {
          isAuthorized ?
            (<>
              <span>Hi, Sviltana</span>
              <Link to={"/"}
                className={style.btn}
                onClick={logout}
              >
                <i class="fas fa-sign-out-alt"></i>
              </Link>
            </>
            )
            :
            <Link className={style.btn} to={"/registration"}>
              <i className="fas fa-sign-in-alt"></i>
            </Link>
        }

      </div>


    </div>
  )
}
export default Navbar