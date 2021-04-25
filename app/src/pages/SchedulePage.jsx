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

  // useEffect(() => {
  //   rederSchedule()
  // }, [])

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
          <h1>This is SchedulePage</h1>
          <div className={style.container}>
            {/* filter */}
            <h2>Выберите канал и время:</h2>
            <div className="custom-select" style={{ width: '200px' }}>
              <select onChange={(e) => setChannel(e.target.value)}>
                {channels.map((option) => (
                  <option key={option.id} value={option.id}
                  >{option.name}</option>
                ))}
              </select>
            </div>

            <div className="datapicker">
              <label htmlFor="birthday">Birthday:</label>
              <input type="date" id="birthday" name="birthday"
                onChange={(e) => setDate(e.target.value)} />
            </div>
            {/* end filter */}

            {currentChannel ?
              <div className="channelDescriptionWrapper">
                <div className="imgWrapper">
                  <img src={currentChannel.image} alt={currentChannel.name} />
                </div>

                <div className="channelDescription">
                  <h1 >{currentChannel.name}</h1>
                  <span>{currentChannel.channeltype}</span>
                  <p>{currentChannel.tagline}</p>
                  <a href={currentChannel.siteurl}>{currentChannel.siteurl}</a>
                </div>
              </div>
              :
              <div className="">Välj en kanal och tid...</div>
            }
            {channelSchedule ?
              
               channelSchedule.map(progr => (
                 <>
                 <div className="flex">
                   <p>
                     <span>{new Date(progr.starttimeutc).toLocaleTimeString('sv-SE').slice(0, 5)}</span>
                   <span> - </span>
                   <span>{new Date(progr.endtimeutc).toLocaleTimeString('sv-SE').slice(0, 5)}</span>
                   </p>
                   <div>
               <h3>{progr.name}</h3>
               <p>title : {progr.title}</p>
               <p>{progr.description}</p>
                   </div>
                 </div>
                 </>
               ))
              
              :
              <Spinner />}



          </div>



          {/* channel: {id: 212, name: "P4 Göteborg"}
description: "Senaste nytt varje timme från Ekoredaktionen."
endtimeutc: "2021-4-25 1:02:00"
episodeid: 1693392
program: {id: 5380, name: "Nyhetsuppdatering från Ekot"}
starttimeutc: "2021-4-25 1:00:00"
title: "Nyheter från Ekot" */}
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
            {/* <section className={style.list}> */}
            {rederSchedule()}
            {/* </section> */}
          </div>
        </div>
      </div>
    </div>
  )
}
export default SchedulePage;