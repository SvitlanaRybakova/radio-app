import { useHistory } from "react-router-dom";
import styles from "../styles/ListItemCard.module.css";
import { useContext, useEffect } from 'react';
import { UserContext } from "../contexts/UserProvider";
import { FavoriteContext } from "../contexts/FavoriteProvider";

const ListItemCard = ({
  isChannel,
  id,
  image,
  name,
  channeltype,
  startDate,
  endDate,
  subtitle,
  description,

}) => {

  const { settingFavorite } = useContext(FavoriteContext);
  const history = useHistory();
  const { isAuthorized } = useContext(UserContext);
  

  const handleClick = (id) => {
    if (isChannel) {
      const channelId = id
      history.push(`/channels/${channelId}`);
    } else {
      const programId = id;
      history.push(`/programs/${programId}`);
    }

  };


  const clickAddFavorite = (e) => {
    e.stopPropagation();
    settingFavorite(image, name, description, id, isAuthorized.userId);
    history.push("/favorite-list");
  }

  const renderBtnType = () => {
    if (!channeltype) {
      if(isAuthorized){
        return (
          <div className={styles.channeltypeWrapper}
            onClick={(e) => clickAddFavorite(e)}>
            <i style={{ fontSize: "1.5rem", cursor: "pointer" }}
              className="far fa-heart"></i>
          </div>
        )
      }else{
        return (
          <span className={styles.warning}>you should be authorized</span>
        )
      }

    } else {
      return (
        <div className={styles.channeltypeWrapper}>
          <span className={styles.channeltype}>{channeltype}</span>
        </div>
      )
    }
  }
  return (
    <>
      <div className={styles.cardWrapper}
        onClick={() => handleClick(id)}>

        <div className={styles.cardItem}>
          <div className={styles.container}>
            {/* image */}
            <div className={styles.imgCardWrapper}>
              <div className={styles.blackout}></div>
              <img className={styles.itemImg} src={image ? image : "NO IMAGE"} alt={name} />
            </div>
            {/* end image */}

            <div className={styles.cardDetails}>
              <p className={ channeltype ? styles.channelTitle : styles.title }>{name}</p>
              {/* optional */}
              {(startDate || endDate)  && 
                <div className={styles.detailsOptional}>
                  <span className={styles.date}>{startDate}</span>
                  <span className={styles.date} >-</span>
                  <span className={styles.date}>{endDate}</span>
                  <div className={styles.description}>
                    <p>{subtitle}</p>
                    <p>{description}</p>
                  </div>
                </div>
              }
              {description &&
                <div className={styles.detailsOptional}>
                  <p>{description}</p>
                </div>
              }
            </div>

            {/* type or heart */}

            {renderBtnType()}


            {/* end type or heart */}
          </div>

        </div>

      </div>
    </>
  )
}
export default ListItemCard

