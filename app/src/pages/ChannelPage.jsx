import { useContext, useEffect } from "react";
import style from "../styles/ChannelPage.module.css";
// import { useHistory } from "react-router-dom";
import { ChannelsContext } from "../contexts/ChannelsProvider";
import useAudio from "../hooks/useAudio";
import Spinner from "../components/Spinner"
import ProgramCard from "../components/ProgramCard";


const ChannelPage = (props) => {
  // const history = useHistory();
  const { singleChannel, getChannelById, getChannelSchedule, channelSchedule } = useContext(ChannelsContext)
  const { channelId } = props.match.params;

  // custom hook for playing audio
  const { toggle, playing } = useAudio(singleChannel?.liveaudio.url);


  useEffect(() => {
    getChannelById(channelId);
    getChannelSchedule(channelId);

  }, []);


  const render = () => {
    if (singleChannel && channelSchedule) {
      
      return (
        <>
          <h1>{singleChannel.name}</h1>
          <div className={style.descriptionWrapper}>
            <div className={style.imgWrapper}>
              <img src={singleChannel.image} alt={singleChannel.name} />
            </div>
            <div className={style.description}>
              <p>{singleChannel.tagline}</p>
              <a className={style.channelUrl} href={singleChannel.siteurl} >{singleChannel.siteurl}</a>
            </div>

          </div>

          <div className={style.audio} onClick={toggle}>

            {playing ?
              <i style={{ fontSize: "50px", left: "19%", top: "19%", position: "absolute", zIndex: "1", color: "#ffc107", zIndex: "2" }}
                className="far fa-pause-circle"></i>
              :
              <i style={{ fontSize: "50px", left: "19%", top: "19%", position: "absolute", zIndex: "1", color: "#ffc107", zIndex: "2" }}
                className="far fa-play-circle"></i>
            }
          </div>

          <section className={style.schedule}>
          <h2 className={style.scheduleHeader}>Tablå{new Date().toLocaleDateString('sv-SE', { timeZone: 'UTC' })}</h2>
            {channelSchedule.map(elem => (
            <ProgramCard key={Date.now() + Math.random()} elem={elem}/>
            ))}

          </section>
        </>
      )
    } else {
      return <Spinner />
    }
  }

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        {render()}
      </div>
    </div>
  )
}
export default ChannelPage;