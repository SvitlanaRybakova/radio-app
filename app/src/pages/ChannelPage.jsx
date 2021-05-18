import { useContext, useEffect } from "react";
import style from "../styles/ChannelPage.module.css";
import { ChannelsContext } from "../contexts/ChannelsProvider";
import { UserContext } from "../contexts/UserProvider";
import useAudio from "../hooks/useAudio";
import Spinner from "../components/Spinner"
import ListItemCard from "../components/ListItemCard";

const ChannelPage = (props) => {
  const { isAuthorized, checkAuthorization } = useContext(UserContext);
  const { singleChannel, getChannelById, getChannelSchedule, channelSchedule, getChannelPrograms, allPrograms } = useContext(ChannelsContext)
  
  const { channelId } = props.match.params;

  // custom hook for playing audio
  const { toggle, playing } = useAudio(singleChannel?.liveaudio.url);

  useEffect(() => {
    getChannelById(channelId);
    getChannelSchedule(channelId);
    getChannelPrograms(channelId)
  }, []);

  useEffect(() => {
    checkAuthorization();
  }, [isAuthorized])

  const render = () => {
    if (singleChannel && allPrograms) {
      return (
        <>
          <h1 className={style.channelTitle}>{singleChannel.name}</h1>
          <div className={style.descriptionWrapper}>
            <div className={style.imgWrapper}>
              <img src={singleChannel.image} alt={singleChannel.name} />
            </div>
            <div className={style.description}>
              <p>{singleChannel.tagline}</p>
              <div className={style.visitHomePage}>
                <i style={{ color: "#ffc107" }}
                  className="far fa-hand-point-right"></i>
                <a className={style.channelUrl} href={singleChannel.siteurl} >Besök webbsidan</a>
              </div>
            </div>
          </div>
          <div className={style.audio} onClick={toggle}>
            {playing ?
              <i style={{ fontSize: "50px", position: "absolute", color: "#ffc107", }}
                className="far fa-pause-circle"></i>
              :
              <i style={{ fontSize: "50px", position: "absolute", color: "#ffc107" }}
                className="far fa-play-circle"></i>
            }
          </div>
          <section className={style.schedule}>
            <h2 className={style.scheduleHeader}>Våra program:</h2>
            {allPrograms.map(elem => (
              <ListItemCard
                key={(+new Date()).toString(32) + Math.random().toString(32).substring(2, 9)}
                isAuthorized={isAuthorized}
                isChannel={false}
                elem={elem}
                id={elem.id}
                image={elem.programimage}
                name={elem.name}
                // startDate={new Date(elem.starttimeutc).toLocaleTimeString('sv-SE').slice(0, 5)}
                // endDate={new Date(elem.endtimeutc).toLocaleTimeString('sv-SE').slice(0, 5)}
                subtitle={elem.subtitle}
                description={elem.description} />
            )
            )}
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
        <div className={style.listContent}>
          <div className={style.cardWrapper}>
            {render()}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ChannelPage;