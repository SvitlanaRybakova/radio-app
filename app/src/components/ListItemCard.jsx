import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import styles from "../styles/ListItemCard.module.css";

const ListItemCard = ({ channelItem }) => {
  const history = useHistory();

  const liveaudio = channelItem.liveaudio;

  const [audio] = useState(new Audio(liveaudio.url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]

  );

  // useEffect(() => {
  //   audio.addEventListener('ended', () => setPlaying(false));
  //   return () => {
  //     audio.removeEventListener('ended', () => setPlaying(false));
  //   };
  // }, []);

  const handleClick = (channelId) => {
    history.push(`/channels/${channelId}`);
    
  };

  return (
    <>
      <div className={styles.cardItem}>

        <div className={styles.imgCardWrapper}
          onClick={toggle}>
          {playing ?
            <i style={{ fontSize: "50px", left: "19%", top: "19%", position: "absolute", zIndex: "1", color: "#ffc107", zIndex: "2" }}
              className="far fa-pause-circle"></i>
            :
            <i style={{ fontSize: "50px", left: "19%", top: "19%", position: "absolute", zIndex: "1", color: "#ffc107", zIndex: "2" }}
              className="far fa-play-circle"></i>
          }
          <div className={styles.blackout}></div>
          <img className={styles.itemImg} src={channelItem.image} alt={channelItem.name} />
        </div>

        <div className={styles.content}
          onClick={() => handleClick(channelItem.id)}
        >
          <div className={styles.cardTitle}>
            <p className={styles.title}>{channelItem.name}</p>
            <span className={styles.channeltype}>{channelItem.channeltype}</span>
          </div>
          <p className={styles.tagline}>{channelItem.tagline}</p>
          <div className={styles.cardNav}>
            <span>  Se tablå</span>
            <i style={{ fontSize: "23px", marginLeft: "10px" }}
              className="far fa-calendar-alt"></i>
          </div>
        </div>

      </div>
    </>
  )
}
export default ListItemCard