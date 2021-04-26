import { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { ChannelsContext } from "../contexts/ChannelsProvider";

import style from "../styles/SchedulePage.module.css";

const SchedulePage = () => {
  const { channels, getChannelSchedule, channelSchedule, setChannelSchedule } = useContext(ChannelsContext);

  const [pickedChannel, setChannel] = useState(null);
  const [date, setDate] = useState(null);
  const [currentChannel, setCurrentChannel] = useState(null)


  useEffect(() => {
    gettingSchedule(pickedChannel, date)
    if (pickedChannel) { findChannelProperty(pickedChannel) }
  }, [pickedChannel, date])



  const gettingSchedule = async (pickedChannel, date) => {
    let response = await getChannelSchedule(pickedChannel, date);

    setChannelSchedule(response);
    console.log(response);
  }


  const findChannelProperty = (pickedChannel) => {
    const res = channels.filter(elem => {
      return elem.id === parseInt(pickedChannel)
    })
    setCurrentChannel(res[0]);
  }



  const rederSchedule = () => {

    if (channels) {
      return (
        <>
          <h1 className={style.mainHeader}>Tablå</h1>
          <div className={style.container}>
            {/* filter */}
            <div className={style.filter}>
            
                <select className={style.filterSelect} onChange={(e) => setChannel(e.target.value)}>
                  {channels.map((option) => (
                    <option key={option.id} value={option.id}
                    >{option.name}</option>
                  ))}
                </select>
         
                <input  className={style.datapicker} type="date" id="date" name="date"
                  onChange={(e) => setDate(e.target.value)} />
      
            </div>
            {/* end filter */}

            {currentChannel ?
              <div className={style.channelDescriptionWrapper}>
                <div className={style.imgWrapper}>
                  <img src={currentChannel.image} alt={currentChannel.name} />
                </div>

                <div className={style.channelDescription}>
                  <div className={style.headerWrapper}>
                    <h1 className={style.channelName}>{currentChannel.name}</h1>
                    <span className={style.channelType}>{currentChannel.channeltype}</span>
                  </div>
                  <p className={style.tagline}>{currentChannel.tagline}</p>

                  <div className={style.visitHomePage}>
                    <i style={{ color: "#ffc107" }}
                      className="far fa-hand-point-right"></i>
                    <a className={style.channelUrl} href={currentChannel.siteurl} >Besök webbsidan</a>
                  </div>


                </div>
              </div>
              :
              <div className={style.chooseChannel}>Välj en kanal och tid...</div>
            }
            {channelSchedule ?

              channelSchedule.map(progr => (
                <>
                  <div className={style.scheduleWrapper}>
                    <p className={style.date}>
                      <span>{new Date(progr.starttimeutc).toLocaleTimeString('sv-SE').slice(0, 5)}</span>
                      <span> - </span>
                      <span>{new Date(progr.endtimeutc).toLocaleTimeString('sv-SE').slice(0, 5)}</span>
                    </p>
                    <div>

                      <p className={style.programTitle}> {progr.title}</p>
                      <p className={style.description}>{progr.description}</p>
                    </div>
                  </div>
                </>
              ))

              :
              <Spinner />}



          </div>

        </>
      )


    } else {
      return (<Spinner />)

    }
  }

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.listContent}>
          <div className={style.cardWrapper}>
      
            {rederSchedule()}
       
          </div>
        </div>
      </div>
    </div>
  )
}
export default SchedulePage;