import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserProvider";
import styles from "../styles/RegistrationPage.module.css";


const RegistrationPage = () => {
  const { usersReg,
    handleRegistration,
    userRegistration,
    usersLogin,
    checkLogin,
    handleLogin,
  } = useContext(UserContext);


  useState(() => {

  })

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.listContent}>

            <div className={styles.registrationWrapper}>
              <div className={styles.registration}>
                <h1 className={styles.title}>Registration</h1>
                <form action="POST" onSubmit={(e) => userRegistration(e)}>
                  <label htmlFor="username">username</label>
                  <input
                    className={styles.input}
                    value={usersReg.userName}
                    onChange={(e) => handleRegistration(e)}
                    type="text"
                    name="userName"
                    id="" />

                  <label htmlFor="email">email</label>
                  <input
                    className={styles.input}
                    value={usersReg.email}
                    onChange={(e) => handleRegistration(e)}
                    type="text"
                    name="email"
                    id="" />

                  <label htmlFor="passwordR">password</label>
                  <input
                    className={styles.input}
                    value={usersReg.password}
                    onChange={(e) => handleRegistration(e)}
                    type="text"
                    name="password" />
                  <button className={styles.btn}>Register</button>
                </form>

              </div>
              <h2 className={styles.title}>Login</h2>
              <form action="POST" onSubmit={(e) => checkLogin(e)}>
                <label htmlFor="username">username</label>
                <input
                  className={styles.input}
                  value={usersLogin.userName}
                  onChange={(e) => handleLogin(e)}
                  type="text"
                  name="userName"
                  id="" />

                <label htmlFor="email">email</label>
                <input
                  className={styles.input}
                  value={usersLogin.email}
                  onChange={(e) => handleLogin(e)}
                  type="text"
                  name="email"
                  id="" />

                <label htmlFor="passwordR">password</label>
                <input
                  className={styles.input}
                  value={usersLogin.password}
                  onChange={(e) => handleLogin(e)}
                  type="text"
                  name="password" />
                <button className={styles.btn}>Login</button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  )

}
export default RegistrationPage;