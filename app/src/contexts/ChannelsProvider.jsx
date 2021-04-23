import { createContext, useEffect, useState } from "react";

export const ChannelsContext = createContext();

const ChannelsProvider = (props) => {

  const [ channels, setChannels ] = useState(null);
  const [singleChannel, setSingleChannel] = useState(null);
  const [channelSchedule, setChannelSchedule] = useState(null);

  
  useEffect(() => {
    getAllChannels();
  }, []);

  const getAllChannels = async () => {
    let channels = await fetch("/api/v1/channels");
    channels = await channels.json();
    await setChannels(channels.channels);
    
  }

  const getChannelById = async (channelId) => {
    let channel = await fetch(`/api/v1/channels/${channelId}`);
    channel = await channel.json();
    await setSingleChannel(channel.channel);
    
  }

  const getChannelSchedule = async(channelId) => {
    let schedule = await fetch(`/api/v1/channels/schedule/${channelId}`);
    schedule = await schedule.json();
    await setChannelSchedule(schedule);
    
  }

  const values={
    getAllChannels,
    channels,
    setChannels,
    singleChannel,
    getChannelById,
    getChannelSchedule,
    channelSchedule
  }
  return (
    <ChannelsContext.Provider value={values}>
      {props.children}
    </ChannelsContext.Provider>
  )
}
export default ChannelsProvider;