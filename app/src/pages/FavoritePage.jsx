import { useContext, useEffect } from "react";
import  { FavoriteContext } from "../contexts/FavoriteProvider";


const FavoritePage = () => {

const { getFavoriteList } = useContext(FavoriteContext);

  // useEffect(() => {
  //   gettingFavoriteList()
  // }, [])

  // const gettingFavoriteList = async() =>{
  //   let response = await getFavoriteList()
  //   console.log(response);
  // }

  return(
    <>
    <h1>FavoritePage</h1>
    </>
  )
}
export default FavoritePage;