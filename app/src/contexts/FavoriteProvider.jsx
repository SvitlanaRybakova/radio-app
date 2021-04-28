import { createContext, useEffect } from "react";

export const FavoriteContext = createContext();



const FavoriteProvider = (props) => {

  useEffect(() => {
    getFavoriteList()
  }, [])

  console.log('in');
  const getFavoriteList = async () => {
    let response = await fetch("/api/v1/favorite-list");
    if (!response.ok) {
      throw new Error(`An error has occured: ${response.status}`)
    } else {
      const list = await response.json();
      console.log(list);
      return list
    }
  }



  const value = {
    getFavoriteList,
  }


  return (
    <FavoriteContext.Provider value={value}>
      {props.children}
    </FavoriteContext.Provider>
  )
}
export default FavoriteProvider;