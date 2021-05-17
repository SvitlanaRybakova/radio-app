import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const UserContext = createContext();
const UserProvider = (props) => {
  const history = useHistory();

  const initialUsers = {
    userName: "",
    email: "",
    password: ""
  };

  useEffect(() => {
    checkAuthorization()
  },[])

  const [usersReg, setUserRegistration] = useState(initialUsers);
  const [usersLogin, setUserLogin] = useState(initialUsers);
  const [isAuthorized, setAuthorized] = useState(null)

  

  const handleRegistration = (e) => {
    const { name, value } = e.target;
    setUserRegistration({ ...usersReg, [name]: value })


  }

  const handleLogin = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...usersLogin, [name]: value })

  }

  const checkAuthorization = async () => {
    let response = await fetch("/api/v1/users/whoami");
    response = await response.json();
    setAuthorized(response)
  }

  const userRegistration = async (e) => {
    e.preventDefault();
    console.log(usersReg);
    let response = await fetch("/api/v1/users/register", {
      method: "POST",
      credentials: 'same-origin',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(usersReg)
    })
    if (!response.ok) {
      throw new Error(`error status ${response.status}`)
    } else {
      alert("Congrats, you have been registered")
    }
    setUserRegistration(initialUsers)
    return await response.json();

  }

  const checkLogin = async (e) => {
    e.preventDefault();
    let response = await fetch("/api/v1/users/login", {
      method: "POST",
      credentials: 'same-origin',
      headers: {
        'Authorization': 'Basic base64codedloginadpassword==',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usersLogin),
      "mode": "cors"
    })
    if (!response.ok) {
      alert("You must be authorized");
    }
    else {
      alert('Hello, you are authorized');
      checkAuthorization();
      history.push("/");
    }
    return await response.json();
  }

  const logout = async () => {
    let response = await fetch("/api/v1/users/logout");
    response = await response.json();
    if(!response.ok){
      throw new Error()
    }
    await checkAuthorization()
  }

  const values = {
    userRegistration,
    handleRegistration,
    usersReg,
    usersLogin,
    checkLogin,
    handleLogin,
    isAuthorized,
    logout,
    checkAuthorization,
    setUserLogin

  }
  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  )
}
export default UserProvider;