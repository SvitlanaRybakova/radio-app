import { useContext, useEffect } from "react";
import { FavoriteContext } from "../contexts/FavoriteProvider";
import style from "../styles/FavoritePage.module.css";
import { UserContext } from "../contexts/UserProvider";

const FavoritePage = () => {
  const { isAuthorized } = useContext(UserContext);
  const {
    getFavoriteList,
    deleteProgram,
    list,
  } = useContext(FavoriteContext);


  useEffect(() => {
    if (isAuthorized){
      getFavoriteList(isAuthorized.userId);
    }
  }, [isAuthorized]);

  const handleClick = (id) => {
      deleteProgram(id)
  };

  const renderList = () => {
    if (list && isAuthorized) {
      return list.map((program) => (
        <div key={program.favoriteListId} className={style.cardItem}>
          <div className={style.cardContainer}>
            {/* image */}
            <div className={style.flex}>
              <div className={style.imgCardWrapper}>
                <img
                  className={style.itemImg}
                  src={program.image ? program.image : "NO IMAGE"}
                  alt={program.name}
                />
              </div>
              {/* end image */}

              <div className={style.cardDetails}>
                <p className={style.title}>{program.name}</p>

                {program.description && <p>{program.description}</p>}
              </div>
            </div>
            {/* delete btn */}
            <div
              className={style.channeltypeWrapper}
              onClick={() => handleClick(program.favoriteListId)}
            >
              <i
                style={{
                  color: "#ffc107",
                  fontSize: "1.5rem",
                  flexBasis: "20%",
                  cursor: "pointer",
                }}
                className="far fa-trash-alt"
              ></i>
            </div>
            {/* end delete btn */}
          </div>
        </div>
      ));
    } else {
     return <h2 className={style.warning}>Lägg till din favoritprogram eller favoritkanal...</h2>;
    }
  };

  
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.listContent}>
            <div className={style.cardWrapper}>
              <h1 className={style.headerTitle}>Favoritlista <br/> (kanaler och program)</h1>
              {isAuthorized ? (
                renderList()
              ) : (
                <div className={style.warning}>
                  Du måste vara inloggad för att se din favoritlista.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FavoritePage;
