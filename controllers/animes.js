import axios from "axios";
import dotenv from 'dotenv';

import dateTools from '../utils/dateTools.js';

dotenv.config()

const baseOptions = {
  method: 'post',
  url: process.env.ANILIST_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

const makeRequest = async (query, variables) => {
  const options = {
    ...baseOptions,
    data: {
      query: query,
      variables: variables
    }
  };

  const response = await axios(options)
      .catch(error => console.log(error));

  if (response) {
    return response.data;
  } else{    
    return {
      message: `The resource you were looking was not found`
    };
  }  
  
}

// DONE
export const all = async (req, res) => {
  const query = `
    query ($page: Int, $perPage: Int) {
      Page (page: $page, perPage: $perPage) {
        media (sort: POPULARITY_DESC) {
          id
          type
          title {
            romaji
          }
          coverImage {                
            medium        
          }      
          updatedAt      
          bannerImage 
          isAdult
        }
      }
    }`;

  const variables = {
    page: (req.params.page || req.query.page) || 1,
    perPage: (req.params.perPage || req.query.perPage) || 15
  };

  const data = await makeRequest(query, variables);  

  res.send(data);
}

// DONE
export const lastUpdatedAnimes = async (req, res) => {
  const query = `
    query ($page: Int, $perPage: Int) {
      Page (page: $page, perPage: $perPage) {
        media (type: ANIME, sort: UPDATED_AT_DESC) {
          id
          type
          title {
            romaji
          }
          coverImage {                            
            large     
          }      
          updatedAt      
          bannerImage 
          isAdult
        }
      }
    }`;

    const variables = {
      page: (req.params.page || req.query.page) || 1,
      perPage: (req.params.perPage || req.query.perPage) || 15
    };

    const data = await makeRequest(query, variables);
    
    res.send(data.data.Page.media);
}

// DONE
export const trendingAnime = async (req, res) => {
  
  const query = `
  query ($page: Int, $perPage: Int){
    Page (page: $page, perPage: $perPage) {
      media (type: ANIME, sort: TRENDING_DESC) {
        id      
        title {
          romaji        
        }
        coverImage {                
          medium    
          large    
        }  
        bannerImage  
        isAdult              
      }
    }
  }`;  
  const variables = {
      page: (req.params.page || req.query.page) ?? 1,
      perPage: (req.params.perPage || req.query.perPage) ?? 15
  };  
  const data = await makeRequest(query, variables);

  res.send(data.data.Page.media);
}

// DONE
export const getResourceById = async (req, res) => {
  const query = `
    query ($id: Int) {  
      Media (id: $id) {
        id
        trailer {
          id
          site
          thumbnail
        }
        type
        title {
          romaji
          native
          english
        }
        coverImage {                
          medium 
          large
        }            
        bannerImage 
        description
        format
        status
        season
        seasonYear
        episodes
        duration
        chapters
        countryOfOrigin
        source		
        genres
        siteUrl
        stats{
          scoreDistribution{
            score
            amount
          }
        }
        reviews {
          nodes {
            summary
            siteUrl
            score
          }
        }
        externalLinks {
          url
          site
        }
        isAdult
        studios {
          nodes {
            name
            siteUrl        
          }
        }
        characters {
          nodes {
            name {          
              full          
            }
            image {
              large
              medium
            }        
          }
        }
      }  
    }`;

  const variables = {
    id: parseInt(req.params.id) ?? 1,
    //type : req.body.type ?? "ANIME"
  };

  const response = await makeRequest(query, variables);

  res.send(response.data.Media);
}

// DONE
export const getAnimeByName = async (req, res) => {
  const query = `
    query ($page: Int, $perPage: Int, $search: String) {  
      Page(page: $page, perPage: $perPage) {
        media (search: $search, sort: POPULARITY_DESC) {
          id
          type
          title {
            romaji        
          }
          coverImage {
            large
          }
          type
          isAdult
        }
      }
    }`;

    const variables = {
      page: (req.params.page || req.query.page) ?? 1,
      perPage: (req.params.perPage || req.query.perPage) ?? 15,
      search: req.params.search || req.query.search 
    }

    const data = await makeRequest(query, variables);

    res.send(data);
}

// DONE
export const popularThisSeason = async (req, res) => {

  const query = `
    query ($page: Int, $perPage: Int, $season: MediaSeason, $year: Int) {  
      Page(page: $page, perPage: $perPage) {
        media (sort: POPULARITY_DESC, season: $season, seasonYear:$year) {
          id
          type
          title {
            romaji        
          }
          coverImage {
            large
          }
          type
          isAdult
        }
      }
    }`;
    
  const date = new Date();

  const variables = {
    page: (req.params.page || req.query.page) ?? 1,
    perPage: (req.params.perPage || req.query.perPage) ?? 15,
    season: dateTools.getSeasonFromDate(date), // FALL, SPRING, WINTER, SUMMER
    year: dateTools.getSeasonYearFromDate(date, false)
  };

  const data = await makeRequest(query, variables);
  
  res.send(data.data.Page.media);
}

// DONE
export const upcomingNextSeason = async (req, res) => {
  const query = `
    query ($page: Int, $perPage: Int, $season: MediaSeason, $year: Int) {  
      Page(page: $page, perPage: $perPage) {
        media (sort: POPULARITY_DESC, season: $season, seasonYear:$year) {
          id
          type
          title {
            romaji        
          }
          coverImage {
            large
          }
          type
          isAdult
        }
      }
    }`;
    
  const date = new Date();

  const variables = {
    page: (req.params.page || req.query.page) ?? 1,
    perPage: (req.params.perPage || req.query.perPage) ?? 15,
    season: dateTools.getNextSeasonFromDate(date), // next season
    year: dateTools.getSeasonYearFromDate(date, true) // if winter, add one year
  };
  
  const data = await makeRequest(query, variables);
  
  res.send(data.data.Page.media);

}

// DONE
export const allTimePopular = async (req, res) => {
  const query = `
    query ($page: Int, $perPage: Int) {  
      Page(page: $page, perPage: $perPage) {
        media (sort: POPULARITY_DESC) {
          id
          type
          title {
            romaji        
          }
          coverImage {
            large
          }
          type
          isAdult
        }
      }
    }`;
    
  const variables = {
    page: (req.params.page || req.query.page) ?? 1,
    perPage: (req.params.perPage || req.query.perPage) ?? 15,
  };
  
  const data = await makeRequest(query, variables);

  res.send(data.data.Page.media);
}

// DONE
export const getAnimeByCategoryTag = async (req, res) => {
  const query = `
    query ($page: Int, $perPage: Int, $categories: [String], $tags: [String]) {  
      Page(page: $page, perPage: $perPage) {
        media (tag_in: $tags, genre_in: $categories, sort: POPULARITY_DESC, type: ANIME) {
          id
          type
          title {
            romaji        
          }
          coverImage {
            large
          }
          type
          isAdult
        }
      }
    }
  `;

  const variables = {
    page: req.body.page ?? 1,
    perPage: req.body.perPage ??	10,
    categories: req.body.categories,
    tags: req.body.tags
  }

  const data = await makeRequest(query, variables);

  res.send(data);
}

export const getAnimesById = async (req, res) => {
  const ids = req.body;
  

  const query = `
    query ($id: Int) {  
      Media (id: $id) {
        id
        type
        title {
          romaji        
        }
        coverImage {
          large
        }
        type
        isAdult
      }  
    }`;

  let animeList = [];  

  for(let i = 0; i < ids.length; i++) {  
    const variables = {
      id: ids[i]
      //type : req.body.type ?? "ANIME"
    };
  
    const response = await makeRequest(query, variables);
    animeList.push(response.data.Media);
  }

  res.send(animeList);
}
 
const animesController = {
  all,
  lastUpdatedAnimes,
  trendingAnime,
  getResourceById,
  getAnimeByName,
  popularThisSeason,
  upcomingNextSeason,
  allTimePopular,
  getAnimeByCategoryTag,
  getAnimesById
};

export default animesController;