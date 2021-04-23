import { useState, useContext, useEffect } from "react";
import { ChannelsContext } from "../contexts/ChannelsProvider";
import style from "../styles/HomePage.module.css";
import Spinner from "../components/Spinner";
import ListItemCard from "../components/ListItemCard";
import Filter from "../components/Filter";


const HomePage = (props) => {
  const { channels, setChannels, getAllChannels } = useContext(ChannelsContext)
  const [isChannels, setIsChannels] = useState(true);
  const [channeltype, setChanneltype ] = useState("All");

 
  

 


  const [channelCategory, setChannelCategory] = useState([
    { id: 1, name: "All" },
    { id: 2, name: "Rikskanal" },
    { id: 3, name: "Lokal kanal" },
    { id: 4, name: "Minoritet och språk" },
    { id: 5, name: "Fler kanaler" },
    { id: 6, name: "Extrakanaler" },
  ])



  useEffect(() => {
    render();
  }, [channels, channeltype])


  const renderChannels = () => {
   
    if (channels) {

      let filteredChannels
      if (channeltype != "All") {
        filteredChannels = channels.filter((channel) => {
          return (channel.channeltype === channeltype)
        })
      } else {
        // Go for All
        filteredChannels = channels
      }

       return filteredChannels.map((channel) => (
         <ListItemCard key={channel.id} channelItem={channel} />
       ))
    }
   
    else {
      return <Spinner />
    }
  }

  const renderPrograms = () => {
    return (
      <h1>List of programs</h1>
    )
  }

  const render = () => {
    return isChannels ? renderChannels() : renderPrograms()
  }


  const handleToggle = (e) => {
    e.preventDefault();
    setChanneltype(e.target.value);
  }

  return (

    <div className={style.wrapper}>
      <div className={style.container}>
        <section className={style.list}>
          <div className={style.listBtn, style.active}
            onClick={() => setIsChannels(true)}>Kanaler
          </div>
          <div className={style.listBtn, style.active}
            onClick={() => setIsChannels(false)}
          >
            Program</div>
        </section>

        {/* filter */}
        <form action="">
        <ul className={style.cboxtags}>
          {channelCategory.map(category => (
            <Filter key={category.id} value={category}
              handleToggle={handleToggle}

            />
          ))}
        </ul>
        </form>
        {/* filter end */}

        <div className={style.listContent}>
          <div className={style.cardWrapper}>
            { render() }
          </div>
        </div>
      </div>

    </div>
  )
}
export default HomePage;