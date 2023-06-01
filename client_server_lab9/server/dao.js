'use strict';

const sqlite = require('sqlite3');
const dayjs = require('dayjs');


const db = new sqlite.Database('films.db', (err) => {
    if (err) throw err;
  });


  /** Films **/
// get all the films

  exports.listFilms = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM films ';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        }
        const films = rows.map((e) => ({id: e.id, title:e.title, favorite: e.favorite, date: dayjs(e.watchdate), rating: e.rating}));
        resolve(films);
      });
    });
  }

  // get a film given its id
exports.getFilm = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM films WHERE id = ?';
      db.get(sql, [id], (err, row) => {
        if (err)
          reject(err);
        if (row == undefined)
          resolve({error: 'Film not found.'}); 
        else {
          const film = Object.assign({}, row, { watchDate: row.watchdate } );  // adding camelcase "watchDate"
          delete film.watchdate;  // removing lowercase "watchdate"
          resolve(film);
        }
      });
    });
  };



exports.getFilmByRating = (rating) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM films WHERE rating> ?';
      db.all(sql, [rating], (err, rows) => {
        if (err)
          reject(err);

          const films = rows.map((q) => new Film(q.id, q.title, q.favorite, q.watchdate,q.rating));
          resolve(films);
        
      });
    });
  };

exports.getFilmByFavorite = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM films WHERE favorite = true';
      db.all(sql, (err, rows) => {
        if (err)
          reject(err);
          const films = rows.map((q) => new Film(q.id, q.title, q.favorite, q.watchdate,q.rating));
          resolve(films);
      });
    });
  };


  // add a new film
exports.addFilm = (film) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO films (title,favorite,watchdate,rating,userId) VALUES (?, ?, ? ,?,?)';
      db.run(sql, [film.title, film.favorite,film.watchdate,film.rating,film.userId], function(err) {
        if(err) {
          reject(err);
          return;
        }
        resolve(exports.getFilm(this.lastID));
      });
    });
  };

  //update an existing film
exports.updateFilm = (updatedFilm,userId) => {
  console.log('updateFilm: '+ JSON.stringify(updatedFilm));
    return new Promise((resolve, reject) => {
      const sql = `UPDATE films SET title=?, favorite=?, watchdate=?, rating=? WHERE id=? AND userId=?`;
      db.run(sql, [updatedFilm.title, updatedFilm.favorite, updatedFilm.watchdate, updatedFilm.rating, updatedFilm.id,userId], function(err) {
        if (err) {
          reject(err);
          return;
        } else {
          resolve(this.changes);
        }
      });
    });
  };

exports.updateFilmRating = (id, newRating) => {
  return new Promise((resolve, reject) => {

    // Effettua una query per ottenere il film con l'ID specificato
    db.get('SELECT * FROM films WHERE id = ?', id, (err, film) => {
      if (err) {
        reject(err);
        return;
      }
      if (!film) {
        reject(`Nessun film trovato con ID ${id}`);
        return;
      }
      // Modifica il parametro di rating del film con il nuovo valore
      film.rating = newRating;
      // Effettua una query per aggiornare il film modificato
      db.run('UPDATE films SET rating = ? WHERE id = ?', [newRating, id], err => {
        if (err) {
          reject(err);
          return;
        }
        resolve(film);
      });
    });
  });
}

exports.updateFilmFavorite = (id, newFavorite) => {
  return new Promise((resolve, reject) => {

    // Effettua una query per ottenere il film con l'ID specificato
    db.get('SELECT * FROM films WHERE id = ?', id, (err, film) => {
      if (err) {
        reject(err);
        return;
      }
      if (!film) {
        reject(`Nessun film trovato con ID ${id}`);
        return;
      }
      // Modifica il parametro di favorite del film con il nuovo valore
      film.favorite = newFavorite;
      // Effettua una query per aggiornare il film modificato
      db.run('UPDATE films SET favorite = ? WHERE id = ?', [newFavorite, id], err => {
        if (err) {
          reject(err);
          return;
        }
        resolve(film);
      });
    });
  });
}

  
  
  
// delete an existing answer
exports.deleteFilm = (id,userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM films WHERE id = ? AND userId=?';
    db.run(sql, [id,userId], function (err) {
      if (err) {
        reject(err);
        return;
      } else
        resolve(this.changes);  // return the number of affected rows
    });
  });
}
  
  
  