import { useState, useContext, useEffect } from "react";
import { ChannelsContext } from "../contexts/ChannelsProvider";
import { ProgramsContext } from "../contexts/ProgramsProvider";
import style from "../styles/HomePage.module.css";
import Spinner from "../components/Spinner";
import ListItemCard from "../components/ListItemCard";
import Filter from "../components/Filter";




const HomePage = () => {


  const { channels, channelCategories } = useContext(ChannelsContext)
  const { programCategories, getProgramsByCategory, getAllPrograms } = useContext(ProgramsContext);
  const [idForAudio, setIdForAudio] = useState();
  const [isChannels, setIsChannels] = useState(true);
  const [channeltype, setChanneltype] = useState("All");
  const [programType, setProgramType] = useState(0);
  const [programs, setPrograms] = useState(null)

  useEffect(() => {
    if (!isChannels) {
      gettingPrograms(programType);
      console.log(programType);
    }
  }, [isChannels, programType])


  useEffect(() => {
    render();

  }, [])


  const gettingPrograms = async (programType) => {
    let response;
    if (programType == 0) {
      response = await getAllPrograms()
    } else {
      response = await getProgramsByCategory(programType);
    }
    setPrograms(response);

  }

  useEffect(() => {
    console.log(idForAudio);

  }, [idForAudio])


  const renderChannels = () => {

    if (channels) {
      let filteredChannels

      if (channeltype !== "All") {
        filteredChannels = channels.filter((channel) => {
          return (channel.channeltype === channeltype)
        })
      } else {
        // Go for All
        filteredChannels = channels
      }

      return filteredChannels.map((channel) => (
        <ListItemCard key={channel.id} channelItem={channel}
          isChannel={true}
          id={channel.id}
          image={channel.image}
          name={channel.name}
          channeltype={channel.channeltype}
          url={channel.liveaudio.url}
          setIdForAudio={setIdForAudio} />
      ))
    }

    else {
      return <Spinner />
    }
  }

  const renderPrograms = () => {

    if (programs) {

      return programs.map((program) => (
        <ListItemCard key={program.id} channelItem={program}
          id={program.id}
          image={program.programimage}
          name={program.name}
          description={program.description}

        />
      ))

    } else {
      <Spinner />
    }

  }

  const render = () => {
    return isChannels ? renderChannels() : renderPrograms()
  }



  const handleToggle = (e) => {
    e.preventDefault();
    if (isChannels) {
      setChanneltype(e.target.value);
    } else {
      setProgramType(e.target.id);
    }
  }

  return (

    <div className={style.wrapper}>
      <div className={style.container}>
        <section className={style.list}>
          <div className={
            isChannels ?
              `${style.listBtn}  ${style.active}`
              :
              `${style.listBtn}`
          }
            onClick={() => setIsChannels(true)}>Kanaler
          </div>


          <div className={
            isChannels ?
              `${style.listBtn}`
              :
              `${style.listBtn} ${style.active}`
          }
            onClick={() => setIsChannels(false)}
          >
            Program</div>
        </section>

        {/* filter */}
        <form className={style.filter} action="">
          <ul className={style.cboxtags}>

            {
              isChannels ?

                channelCategories.map(category => (
                  <Filter key={category.id} value={category}
                    handleToggle={handleToggle}
                  />
                ))

                :

                programCategories.map(category => (
                  <Filter key={category.id} value={category}
                    handleToggle={handleToggle}
                  />
                ))
            }

          </ul>
        </form>
        {/* filter end */}

        <div className={style.listContent}>
          <div className={style.cardWrapper}>
            {render()}
          </div>

        </div>

      </div>

    </div>
  )
}
export default HomePage;