import { createContext,  useState, useEffect } from "react";

export const FavoriteContext = createContext();

const FavoriteProvider = (props) => {

  const [list, setList] = useState();

  useEffect(() => {
    getFavoriteList();
  }, []);


  
/*
* getting all programs/channels  as list from db 
* @param { string } - user id
*/
  const getFavoriteList = async (userId) => {
    let response = await fetch(`/api/v1/favorite-list/${userId}`);
    if (!response.ok) {
      throw new Error(`An error has occured: ${response.status}`)
    } else {
      const list = await response.json();
      setList(list)
    }
  }


/*
* add new program/channel  to db 
* @param { object } - a program/channel properties 
*/
  const addNewProgram = async (newProgram) => {
    let result = await fetch("/api/v1/favorite-list/add-new-favorite-programm", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newProgram),
    });
    result = await result.json();
    await getFavoriteList();
    // return result;
  };

/*
* delete program/channel  from db 
* @param { string } - a program/channel id
*/
  const deleteProgram = async (favoriteListId) => {
    let result = await fetch(`/api/v1/favorite-list/favorite/${favoriteListId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    if(!result.ok){
      throw new Error();
    }
    result = await result.json();
  
    // update array with items for rendering
    setList(list.filter((item) => {
      return favoriteListId !== item.favoriteListId
    }))
    
  }

  // create a new object with the required properties for db
  const settingFavorite = async ( image, name, description, id, userId) => {
    
    const program = {
      image,
      name,
      description,
      userId,
      favoriteListId: id
    }
    await addNewProgram(program);
  }

  const value = {
    getFavoriteList,
    addNewProgram,
    deleteProgram,
    list, 
    setList, 
    settingFavorite
  }


  return (
    <FavoriteContext.Provider value={value}>
      {props.children}
    </FavoriteContext.Provider>
  )
}
export default FavoriteProvider;