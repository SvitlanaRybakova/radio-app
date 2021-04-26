import { createContext, useEffect, useState } from "react";

export const ChannelsContext = createContext();

const ChannelsProvider = (props) => {
  const [channelCategories] = useState([
    { id: 1, name: "All" },
    { id: 2, name: "Rikskanal" },
    { id: 3, name: "Lokal kanal" },
    { id: 4, name: "Minoritet och språk" },
    { id: 5, name: "Fler kanaler" },
    { id: 6, name: "Extrakanaler" },
  ])

  const [channels, setChannels] = useState(null);
  const [singleChannel, setSingleChannel] = useState(null);
  const [channelSchedule, setChannelSchedule] = useState(null);



  useEffect(() => {
    getAllChannels();
  }, []);

  const getAllChannels = async () => {
    let channels = await fetch("/api/v1/channels");
    channels = await channels.json();
    setChannels(channels.channels);
  }

  const getChannelById = async (channelId) => {
    let channel = await fetch(`/api/v1/channels/${channelId}`);
    channel = await channel.json();
    setSingleChannel(channel.channel);

  }

  const getChannelSchedule = async (channelId, date) => {

    if (!date) {
      date = new Date().toLocaleDateString('sv-SE');
    }
  
    let schedule = await fetch(`/api/v1/channels/schedule/${channelId}/${date}`);
    if (!schedule.ok) {
      const message = `An error has occured: ${schedule.status}`;
      throw new Error(message);
    }
    schedule = await schedule.json();
    setChannelSchedule(schedule);
    return schedule;
  }
 


  const values = {
    channelCategories,
    getAllChannels,
    channels,
    setChannels,
    setChannelSchedule,
    singleChannel,
    getChannelById,
    getChannelSchedule,
    channelSchedule,

  }
  return (
    <ChannelsContext.Provider value={values}>
      {props.children}
    </ChannelsContext.Provider>
  )
}
export default ChannelsProvider;