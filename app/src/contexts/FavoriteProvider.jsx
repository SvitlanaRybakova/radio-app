import { createContext,  useState } from "react";

export const FavoriteContext = createContext();

const FavoriteProvider = (props) => {

  // const [isFavorite, setFavorite] = useState(false);
  const [list, setList] = useState();
  const [isDelete, setDelete] = useState(false);



  const getFavoriteList = async () => {
    let response = await fetch("/api/v1/favorite-list");
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

  }

  const settingFavorite = async ( image, name, description, id) => {
    const program = {
      image,
      name,
      description,
      userId: 1,
      favoriteListId: id
    }
    let result = await addNewProgram(program);
  }

 



  const value = {
    getFavoriteList,
    // isFavorite,
    // setFavorite,
    addNewProgram,
    deleteProgram,
    list, 
    setList, 
    isDelete, 
    setDelete,
    settingFavorite
  }


  return (
    <FavoriteContext.Provider value={value}>
      {props.children}
    </FavoriteContext.Provider>
  )
}
export default FavoriteProvider;