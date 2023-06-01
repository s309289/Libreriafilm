/**
 * All the API calls
 */

import dayjs from "dayjs";

const URL = 'http://localhost:3001/api';

async function listFilms() {
  // call  /api/
  const response = await fetch(URL+'/films');
  const films = await response.json();
  if (response.ok) {
    return films.map((e) => ({id: e.id, title:e.title, favourites: e.favourites, date: dayjs(e.date), rating: e.rating}) )
  } else {
    throw films;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}

async function getFilm(id) {
    // call  /api/questions/<id>
    const response = await fetch(URL+`/films/${id}`);
    const film = await response.json();
    if (response.ok) {
      const e = film;
      return {id: e.id, title:e.title, favorite: e.favorite, date: dayjs(e.watchdate), rating: e.rating};
    } else {
      throw question;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
    }
  }


  function addFilm(film) {
    // call  POST /api/films
    return new Promise((resolve, reject) => {
      fetch(URL+"/new", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(film),
      }).then((response) => {
        if (response.ok) {
          response.json()
            .then((id) => resolve(id))
            .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
        } else {
          // analyze the cause of error
          response.json()
            .then((message) => { reject(message); }) // error message in the response body
            .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
  }

  function deleteFilm(id) {
    // call  DELETE /api/answers/<id>
    return new Promise((resolve, reject) => {
      fetch(URL+`/delete/${id}`, {
        method: 'DELETE',
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response.json()
            .then((message) => { reject(message); }) // error message in the response body
            .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
  }

  function updateFilm(film) {
    // call  PUT /api/films/<id>
    return new Promise((resolve, reject) => {
      fetch(URL+`/films/${film.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(film),
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response.json()
            .then((message) => { reject(message); }) // error message in the response body
            .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
  }

  async function logIn(credentials) {
    let response = await fetch(URL + '/sessions', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      const errDetail = await response.json();
      throw errDetail.message;
    }
  }
  
  async function logOut() {
    await fetch(URL+'/sessions/current', {
      method: 'DELETE', 
      credentials: 'include' 
    });
  }
  
  async function getUserInfo() {
    const response = await fetch(URL+'/sessions/current', {
      credentials: 'include'
    });
    const userInfo = await response.json();
    if (response.ok) {
      return userInfo;
    } else {
      throw userInfo;  // an object with the error coming from the server
    }
  }


const API = {listFilms, getFilm,addFilm,deleteFilm,updateFilm,logIn, logOut, getUserInfo};
export default API;