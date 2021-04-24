import styles from "../styles/AudioPlayer.module.css";
import useAudio from "../hooks/useAudio";
import { useEffect } from "react";

const PlayerBtn = ({src}) => {
  // custom hook for playing audio
  const { toggle, playing } = useAudio(src);


  return (
    <>
      <div className={styles.footerFix}>
    
              <div className={styles.audioButtonFooter}
                onClick={toggle}>

                {playing ?
                  <i style={{ fontSize: "50px",  color: "#ffc107" }}
                    className="far fa-pause-circle"></i>
                  :
                  <i style={{ fontSize: "50px", color: "#ffc107" }}
                    className="far fa-play-circle"></i>
                }

              </div>

            
      </div>
    </>
  )
}
export default PlayerBtn;