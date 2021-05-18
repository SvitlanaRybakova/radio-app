import { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { ProgramsContext } from '../contexts/ProgramsProvider';
import { FavoriteContext } from "../contexts/FavoriteProvider";
import { UserContext } from "../contexts/UserProvider";
import Spinner from '../components/Spinner';
import style from '../styles/ProgramPage.module.css';

const ProgramPage = (props) => {
  const { getProgById } = useContext(ProgramsContext);
  const { settingFavorite } = useContext(FavoriteContext);
  const { isAuthorized, checkAuthorization } = useContext(UserContext);

  const history = useHistory();
  const [program, setProgram] = useState();
  const { programId } = props.match.params;

  useEffect(() => {
    gettingProgramById(programId)
  }, [])

  useEffect(() => {
    checkAuthorization();
  }, [isAuthorized])

/*
* getting a specific program from db  
* @param { stirng } = program id
*/
  const gettingProgramById = async (programId) => {
    let response = await getProgById(programId)
    setProgram(response)
  }

/*
* passing properties of a certain element to write it to the database
* then move to favorite page  
* @param { stirng } = item image
* @param { stirng } = item name
* @param { stirng } = item description
* @param { stirng } = item id
* @param { stirng } = user id
*/
  const clickAddFavorite = (image, name, description, id, userId) => {
    settingFavorite(image, name, description, id, userId)
    history.push("/favorite-list");
  }

  const renderProgram = () => {
    if (program) {
      return (
        <>
          <div className={style.container}>
            <div className={style.titleWrapper}>
              <h1 className={style.ProgramTitle}>{program.name}</h1>
              {
                isAuthorized ?
                  <div onClick={() => clickAddFavorite(program.programimage, program.name, program.description, program.id, isAuthorized.userId)} >
                    <i style={{ fontSize: "30px", color: "#ffc107", cursor: "pointer" }} className="far fa-heart"></i>
                  </div>
                  :
                  "you should be authorized"
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
              program.phone &&
                <div className={style.phoneWrapper}>
                  <i
                    style={{ fontSize: "20px", display: "inline-block", color: "#ffc107" }}
                    className="fas fa-phone-alt"></i>
                  <p className={style.phone}>{program.phone}</p>
                </div>}

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