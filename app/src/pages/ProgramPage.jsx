import { useContext, useEffect, useState } from 'react';
import { ProgramsContext } from '../contexts/ProgramsProvider';
import Spinner from '../components/Spinner';
import style from '../styles/ProgramPage.module.css';
import { FavoriteContext } from "../contexts/FavoriteProvider";

const ProgramPage = (props) => {
  const { getProgById } = useContext(ProgramsContext);
  const { isFavorite, setFavorite, addNewProgram, deleteProgram } = useContext(FavoriteContext);


  const [program, setProgram] = useState();
  const { programId } = props.match.params;

  useEffect(() => {
    gettingProgramById(programId)
  }, [])

  const gettingProgramById = async (programId) => {
    let response = await getProgById(programId)
    setProgram(response)
  }


  const settingFavorite = async (e, image, name, description, id) => {
    const program = {
      image,
      name,
      description,
      userId: 1,
      favoriteListId: id
    }
    let result = await addNewProgram(program);
    setFavorite(true);
    console.log(result);
  }

  const deleteFavorite = (id) => {
    deleteProgram(id)
    setFavorite(false);
  }


  const renderProgram = () => {
    if (program) {
      return (
        <>
          <div className={style.container}>

            <div className={style.titleWrapper}>
              <h1 className={style.ProgramTitle}>{program.name}</h1>
              {isFavorite ?
                <div onClick={() => deleteFavorite(program.id)}>
                  <i style={{ fontSize: "30px", color: "#ffc107", cursor: "pointer" }}
                    className="far fa-heart"></i>
                </div>
                :
                <div onClick={(e) => settingFavorite(e, program.programimage, program.name, program.description, program.id)}>
                  <i style={{ fontSize: "30px", color: "#ffc107", cursor: "pointer" }} className="fas fa-heart"></i>
                </div>
              }

            </div>

            <div className={style.flexWrapper}>

              <div className={style.imgWrapper}>
                <img src={program.programimage} alt={program.name} />
              </div>

              <div className={style.mainContent}>
                <p className={style.programDescription}>{program.description}</p>
                <p className={style.programSlug}>{program.programslug}</p>

              </div>

            </div>
            {program.broadcastinfo ?
              <p className={style.broadcastItem}>{program.broadcastinfo}</p> : ""}

            {program.responsibleeditor ?
              <p className={style.programEditor}> <span style={{ color: '#ffc107' }}>Responsible editor:</span>  {program.responsibleeditor}</p> : ""}

            <div className={style.visitHomePage}>
              <i style={{ fontSize: "20px", color: "#ffc107" }}
                className="far fa-hand-point-right"></i>
              <a className={style.linkToSite}
                href={program.programurl}>Besök webbsidan</a>
            </div>

            <div className={style.broadcastinfo}>


              <div className="">
                <i style={{ fontSize: "20px", display: "inline-block", color: "#ffc107" }} className="far fa-envelope"></i>
                <a className={style.email} href={`mailto: ${program.email}`}>Skriv email till oss</a>
              </div>

            </div>
            {
              program.phone ?
                (<div className={style.phoneWrapper}>
                  <i
                    style={{ fontSize: "20px", display: "inline-block", color: "#ffc107" }}
                    className="fas fa-phone-alt"></i>
                  <p className={style.phone}>{program.phone}</p>
                </div>)
                :
                ''
            }



            {program.socialmediaplatforms.map((platform) => {
              if (platform.platform === "Facebook") {
                return (
                  <div key={platform.platform}
                    className={style.social}
                  >
                    <i style={{ fontSize: "20px", color: "#ffc107" }}
                      className="fab fa-facebook-square"></i>
                    <a className={style.socialLink}
                      href={platform.platformurl}>
                      {platform.platform}
                    </a>
                  </div>)


              } if (platform.platform === "Twitter") {
                return (
                  <div
                    key={platform.platform}
                    className={style.social}>
                    <i style={{ fontSize: "20px", color: "#ffc107" }}
                      className="fab fa-twitter-square"></i>
                    <a className={style.socialLink}
                      href={platform.platformurl}>
                      {platform.platform}
                    </a>
                  </div>)

              } if (platform.platform === "Instagram") {
                return (
                  <div
                    key={platform.platform}
                    className={style.social}>
                    <i style={{ fontSize: "20px", color: "#ffc107" }}
                      className="fab fa-instagram"></i>
                    <a className={style.socialLink}
                      href={platform.platformurl}>
                      {platform.platform}
                    </a>
                  </div>
                )
              } else {
                return <></>;
              }

            })}
          </div>
        </>
      )

    }
    else {
      return (
        <Spinner />
      )


    }

  }
  return (

    <>
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.listContent}>
            {renderProgram()}
          </div>
        </div>
      </div>

    </>
  )
}
export default ProgramPage;