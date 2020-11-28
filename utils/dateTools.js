const seasons = ["WINTER", "SPRING", "SUMMER", "FALL"]

const getSeasonFromDate = date => {
  const month = date.getMonth();
  let season = "";
  if([11, 0, 1].includes(month))
    season = seasons[0];
  else if([2, 3, 4].includes(month))
    season = seasons[1];
  else if([5, 6, 7].includes(month))
    season = seasons[2];
  else 
    season = seasons[3];
  return season;
}

const getSeasonYearFromDate = (date, checkNextSeason) => {
  let year = date.getFullYear();
  let season = getSeasonFromDate(date);
  
  if(checkNextSeason)
    season = getNextSeasonFromDate(date);

  if(season === "WINTER")
    year ++;
  
  return year;
}

const getNextSeasonFromDate = date => {
  const month = date.getMonth();
  let season = "";
  if([11, 0, 1].includes(month))
    season = seasons[1];
  else if([2, 3, 4].includes(month))
    season = seasons[2];
  else if([5, 6, 7].includes(month))
    season = seasons[3];
  else 
    season = seasons[0];
  return season;
}


const dateTools = {
  getSeasonFromDate,
  getSeasonYearFromDate,
  getNextSeasonFromDate
};

export default dateTools;