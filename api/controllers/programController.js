const fetch = require("node-fetch");
const json = "format=json";
const paginationFalse = "pagination=false";



const getAllPrograms = async (req, res) => {
  let programs = await fetch(
    `http://api.sr.se/api/v2/programs?${json}&${paginationFalse}`
  );
  programs = await programs.json();
  res.json(programs);
}



const getProgramById = async (req, res) => {
  let program = await fetch(
    `http://api.sr.se/api/v2/programs/${req.params.programId}?${json}`
  );
  program = await program.json();
  
  res.json(program);
  
}

const getAllCategoriesName = async (req, res) => {
  let programsByCategory = await fetch(
    `http://api.sr.se/api/v2/programcategories/?${json}&${paginationFalse}`
  );
  programsByCategory = await programsByCategory.json();
  res.json(programsByCategory)

}

const getProgramsByCategory = async (req, res) => {
  let programsByCategory = await fetch(
    `http://api.sr.se/api/v2/programs/index?programcategoryid=${req.params.categoryId}&${json}&${paginationFalse} `);

  programsByCategory = await programsByCategory.json();
  res.json(programsByCategory);
}



module.exports = {
  getProgramById,
  getAllCategoriesName,
  getAllPrograms,
  getProgramsByCategory,
  
}