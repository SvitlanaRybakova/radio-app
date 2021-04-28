import { useContext, useEffect, useState } from "react";
import { FavoriteContext } from "../contexts/FavoriteProvider";
import style from "../styles/FavoritePage.module.css";


const FavoritePage = () => {

  const { getFavoriteList, deleteProgram, list,  isDelete, setDelete } = useContext(FavoriteContext);
  

  useEffect(() => {
    getFavoriteList()
  }, [isDelete])

const handleClick = (id) => {
  deleteProgram(id)
  setDelete(!isDelete)
}
  
  const renderList = () => {
    if (list) {
      return list.map((program) => (
        <>
          <div key={program.favoriteListId} className={style.cardItem}>
            <div className={style.cardContainer}>
              {/* image */}
              <div className={style.flex}>
              <div className={style.imgCardWrapper}>
                <img className={style.itemImg} src={program.image ? program.image : "NO IMAGE"} alt={program.name} />
              </div>
              {/* end image */}

              <div className={style.cardDetails}>
                <p className={style.title}>{program.name}</p>

                {program.description ?
                    <p>{program.description}</p>
                  :
                  ""
                }
              </div>
              </div>
              {/* delete btn */}
              <div className={style.channeltypeWrapper}
                onClick={() => handleClick(program.favoriteListId)}
              >
                <i style={{ color: "#ffc107", fontSize: "1.5rem", flexBasis: "20%", cursor: "pointer" }}
                  class="far fa-trash-alt"></i>
              </div>
              {/* end delete btn */}
            </div>

          </div>

          {/* </div> */}
        </>
      ))
    }
    else {
      <h1>no data</h1>
    }

  }
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.listContent}>
            <div className={style.cardWrapper}>
              <h1 className={style.headerTitle}>Favotitlista</h1>
              {renderList()}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default FavoritePage;