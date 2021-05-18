import { createContext,  useState, useEffect } from "react";

export const FavoriteContext = createContext();

const FavoriteProvider = (props) => {

  const [list, setList] = useState();

  useEffect(() => {
    getFavoriteList();
    console.log('useEffect from favorite provider');
  }, []);

  const getFavoriteList = async (userId) => {
  
    let response = await fetch(`/api/v1/favorite-list/${userId}`);
    if (!response.ok) {
      throw new Error(`An error has occured: ${response.status}`)
    } else {
      const list = await response.json();
      setList(list)
    }
  }

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

    return result;
  };


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
    console.log("inside deleteProgram", result);
  
    setList(list.filter((item) => {
      return favoriteListId !== item.favoriteListId
    }))
    
  }

  const settingFavorite = async ( image, name, description, id, userId) => {
    console.log('click from favorite context');
    const program = {
      image,
      name,
      description,
      userId,
      favoriteListId: id
    }
    console.log('program', program);
    let result = await addNewProgram(program);
    console.log('result', result);
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