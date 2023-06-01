'use strict';



const dayjs = require('dayjs');

function Film(id, title, favorite = false, watchDate, rating) {
    this.id = id;
    this.title = title;
    this.favorite = favorite;
    this.rating = rating;
    // saved as dayjs object only if watchDate is truthy
    this.watchDate = watchDate && dayjs(watchDate);
  
    this.toString = () => {
      return `Id: ${this.id}, ` +
      `Title: ${this.title}, Favorite: ${this.favorite}, ` +
      `Watch date: ${this.formatWatchDate('MMMM D, YYYY')}, ` +
      `Score: ${this.formatRating()}` ;
    }
  
    this.formatWatchDate = (format) => {
      return this.watchDate ? this.watchDate.format(format) : '<not defined>';
    }
  
    this.formatRating = () => {
      return this.rating ? this.rating : '<not assigned>';
    }
  }


  module.exports={Film}