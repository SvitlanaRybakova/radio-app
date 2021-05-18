import { createContext, useEffect, useState } from "react";

export const ChannelsContext = createContext();

const ChannelsProvider = (props) => {
  // API did not provide channel categories (need for filter), so created hardcode
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
  const [allPrograms, setPrograms] = useState(null)



  useEffect(() => {
    getAllChannels();
  }, []);

  // different types of proxy:

  /*
* getting all channels from db
*/
  const getAllChannels = async () => {
    let channels = await fetch("/api/v1/channels");
    channels = await channels.json();
    setChannels(channels.channels);
  }

/*
* getting a specific channel by id  from db
* @param { string } = category id
*/
  const getChannelById = async (channelId) => {
    let channel = await fetch(`/api/v1/channels/${channelId}`);
    channel = await channel.json();
    setSingleChannel(channel.channel);
  }

/*
* getting a schedule for the specific channel by id from db
* @param { string } - channel id
* @param { string } - piked date
*/
  const getChannelSchedule = async (channelId, date) => {
// if date === undefind, assign date to current date
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
 
/*
* getting programs for the specific channel by its id from db
* @param { string } - channel id
*/
  const getChannelPrograms = async (channelId) => {
    let programs = await fetch(`/api/v1/channels/allprograms/${channelId}`);
    programs = await programs.json();
    
    setPrograms(programs.programs) 
  };

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
    getChannelPrograms,
    allPrograms,

  }
  return (
    <ChannelsContext.Provider value={values}>
      {props.children}
    </ChannelsContext.Provider>
  )
}
export default ChannelsProvider;