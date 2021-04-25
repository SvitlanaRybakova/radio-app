import { useHistory } from "react-router-dom";


import styles from "../styles/ListItemCard.module.css";

const ListItemCard = ({
  isChannel,
  id,
  image,
  name,
  channeltype,
  setIdForAudio,
  url,
  startDate,
  endDate,
  subtitle,
  description,

}) => {



  const history = useHistory();

  const handleClick = (id) => {
    if (isChannel) {
      const channelId = id
      history.push(`/channels/${channelId}`);
    } else {
      const programId = id;
      history.push(`/programs/${programId}`);
    }

  };

  const playRadio = (e, url) => {
    e.stopPropagation();
    setIdForAudio(url);
  }

  return (
    <>
      <div className={styles.cardWrapper}
        onClick={() => handleClick(id)}>

        <div className={styles.cardItem}>
          <div className={styles.container}>
            {/* image */}
            <div className={styles.imgCardWrapper}
              onClick={url ? (e) => playRadio(e, url) :
                (e) => { e.stopPropagation() }}
            >
              <div className={styles.blackout}></div>
              <img className={styles.itemImg} src={image ? image : "NO IMAGE"} alt={name} />
            </div>
            {/* end image */}

            <div className={styles.cardDetails}>
              <p className={styles.title}>{name}</p>
              {/* optional */}
              {(startDate || endDate) ?
                <div className={styles.detailsOptional}>
                  <span className={styles.date}>{startDate}</span>
                  <span className={styles.date} >-</span>
                  <span className={styles.date}>{endDate}</span>
                  <div className={styles.description}>
                    <p>{subtitle}</p>
                    <p>{description}</p>
                  </div>
                </div>
                : ""
              }
              {description ?
                <div className={styles.detailsOptional}>
                  <p>{description}</p>
                </div>
                :
                ""
              }
            </div>

            {/* type or heart */}
            <div className={styles.channeltypeWrapper}>
              {channeltype ?
                <span className={styles.channeltype}>{channeltype}</span>
                :
                <i style={{ fontSize: "1.5rem" }}
                  className="far fa-heart"></i>}
            </div>
            {/* end type or heart */}
          </div>

        </div>

      </div>
    </>
  )
}
export default ListItemCard

