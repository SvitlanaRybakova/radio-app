import { createContext, useState } from "react";

export const ProgramsContext = createContext();

const ProgramsProvider = (props) => {
  // API did not provide channel categories (need for filter), so created hardcode
  const [programCategories] = useState([
    { id: 0, name: "All" },
    { id: 2, name: "Barn 3 - 8 år" },
    { id: 132, name: "Barn 9 - 13 år" },
    { id: 82, name: "Dokumentär" },
    { id: 134, name: "Drama" },
    { id: 135, name: "Ekonomi" },
    { id: 133, name: "Humor" },
    { id: 3, name: "Kultur/Nöje" },
    { id: 14, name: "Livsstil" },
    { id: 4, name: "Livsåskådning" },
    { id: 5, name: "Musik" },
    { id: 11, name: "News in other languages" },
    { id: 68, name: "Nyheter" },
    { id: 7, name: "Samhälle" },
    { id: 10, name: "Sport" },
    { id: 12, name: "Vetenskap/Miljö" },
  ]);

  // different types of proxy

  /*
   * get all programs from db
   * @return { array with objects }
   */
  const getAllPrograms = async () => {
    let response = await fetch("/api/v1/programs");
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const programs = await response.json();
    return programs.programs;
  };

  /*
   * get programs by category from db
   * @param { category id } 
   * @return { array with objectst }
   */
  const getProgramsByCategory = async (categoryId) => {
    let response = await fetch(
      `/api/v1/programs/programms-by-category/${categoryId}`
    );
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    let programs = await response.json();

    return programs.programs;
  };


/*
   * get the program by id from db
   * @param { program id } 
   * @return { array with objectst }
   */
  const getProgById = async (programId) => {
    let response = await fetch(`/api/v1/programs/${programId}`);
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    let program = await response.json();
    return program.program;
  };

  const values = {
    programCategories,
    getAllPrograms,
    getProgramsByCategory,
    getProgById,
  };
  return (
    <ProgramsContext.Provider value={values}>
      {props.children}
    </ProgramsContext.Provider>
  );
};
export default ProgramsProvider;
