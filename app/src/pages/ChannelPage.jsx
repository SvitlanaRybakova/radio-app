import { useContext, useEffect } from "react";
import style from "../styles/ChannelPage.module.css";
// import { useHistory } from "react-router-dom";
import { ChannelsContext } from "../contexts/ChannelsProvider";
import useAudio from "../hooks/useAudio";
import Spinner from "../components/Spinner"

import ListItemCard from "../components/ListItemCard";



const ChannelPage = (props) => {
  // const history = useHistory();
  const { singleChannel, getChannelById, getChannelSchedule, channelSchedule, } = useContext(ChannelsContext)

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
          <h1 className={style.channelTitle}>{singleChannel.name}</h1>
          <div className={style.descriptionWrapper}>
            <div className={style.imgWrapper}>
              <img src={singleChannel.image} alt={singleChannel.name} />
            </div>

            <div className={style.description}>
              <p>{singleChannel.tagline}</p>
              <div className={style.visitHomePage}>
                <i style={{ display: "inline-block" }}
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
            <h2 className={style.scheduleHeader}>Idag kan du lyssna på följande program:</h2>


            {channelSchedule.map(elem => (
              <ListItemCard
                key={(+new Date).toString(32) + Math.random().toString(32).substring(2, 9)}
                elem={elem}
                image={elem.imageurl}
                name={elem.title}
                startDate={new Date(elem.starttimeutc).toLocaleTimeString('sv-SE').slice(0, 5)}
                endDate={new Date(elem.endtimeutc).toLocaleTimeString('sv-SE').slice(0, 5)}
                subtitle={elem.subtitle}
                description={elem.description} />
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
        <div className={style.listContent}>
          <div className={style.cardWrapper}>
            {/* <section className={style.list}> */}
            {render()}
            {/* </section> */}
          </div>
        </div>
      </div>
    </div>

  )
}
export default ChannelPage;