import { useContext, useEffect, useState } from 'react';
import { ProgramsContext } from '../contexts/ProgramsProvider';
import Spinner from '../components/Spinner';
import style from '../styles/ProgramPage.module.css';

const ProgramPage = (props) => {
  const { getProgramById } = useContext(ProgramsContext);
  const [program, setProgram] = useState();
  const { programId } = props.match.params;

  useEffect(() => {
    gettingProgramById(programId)
  }, [])

  const gettingProgramById = async (programId) => {
    let response = await getProgramById(programId)
    setProgram(response)
  }

  const renderProgram = () => {
    if (program) {
      return (
        <>
          <div className={style.container}>
            
            <div className={style.titleWrapper}>
            <h1 className={style.ProgramTitle}>{program.name}</h1>
            <i style={{ fontSize: "30px", color: "#ffc107", cursor:"pointer" }}
            className="far fa-heart"></i>
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
                <a className={style.email} href={ `mailto: ${program.email}`}>Skriv email till oss</a>
              </div>
 
            </div>
            {
              program.phone ?
                (<div className={style.phoneWrapper}>
                  <i style={{ fontSize: "20px", display: "inline-block", color: "#ffc107" }} className="fas fa-phone-alt"></i>
                  <p className={style.phone}>{program.phone}</p>
                </div>)
                :
                ''
            }



            {program.socialmediaplatforms.map((platform) => {
              if (platform.platform === "Facebook") {
                return (
                  <div className={style.social}>
                    <i style={{ fontSize: "20px", color: "#ffc107" }}
                      className="fab fa-facebook-square"></i>
                    <a className={style.socialLink}
                      href={platform.platformurl}>
                      {platform.platform}
                    </a>
                  </div>)


              } if (platform.platform === "Twitter") {
                return (<div className={style.social}>
                  <i style={{ fontSize: "20px", color: "#ffc107" }}
                    className="fab fa-twitter-square"></i>
                  <a className={style.socialLink}
                    href={platform.platformurl}>
                    {platform.platform}
                  </a>
                </div>)

              } if (platform.platform === "Instagram") {
                return (
                  <div className={style.social}>
                    <i style={{ fontSize: "20px", color: "#ffc107" }}
                      className="fab fa-instagram"></i>
                    <a className={style.socialLink}
                      href={platform.platformurl}>
                      {platform.platform}
                    </a>
                  </div>
                )
              } else{
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