import { useContext, useEffect, useState } from "react";
import useAudio from "../hooks/useAudio";
import Spinner from "../components/Spinner";
import { ChannelsContext } from "../contexts/ChannelsProvider";

import style from "../styles/SchedulePage.module.css";

const SchedulePage = () => {
  const { channels, getChannelSchedule, channelSchedule } = useContext(ChannelsContext);



  // const gettingSchedule = async() => {
  //   let response  = await getChannelSchedule('132');
  //   console.log(response);
  // }



  const rederSchedule = () => {
    // console.log(channelSchedule);
    if (channelSchedule  || channels) {
      return (
        <>
          <h1>This is SchedulePage</h1>
          <div className="custom-select" style={{width:'200px'}}>
            <select>
            {channels.map((option) => (
              
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
            </select>
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