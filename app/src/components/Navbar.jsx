import style from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.loginWrapper}>
        <span>Hi, Sviltana</span>
        <span style={{cursor: "pointer", fontSize: "1.8rem" }}><i className="fas fa-sign-in-alt"></i></span>
      </div>


    </div>
  )
}
export default Navbar