import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Button, Form, Table} from 'react-bootstrap';
import dayjs from 'dayjs';
import { useState, useEffect} from 'react';
import {FormRoute} from '../components/FilmForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FilmRoute from '../components/FilmRoute';
import { LoginForm } from '../components/AuthComponents';
import API from './API';
//import './App.css';


function Film(id,title,favorite,watchdate,rating,userId){
  this.id=id;
  this.title=title;
  this.favorite=favorite;
  this.watchdate=watchdate;
  this.rating=rating;
  this.userId=userId;
  
  this.print = ()=>{
      const newData=("<not defined>");
      if(this.date.isValid()==false){
          
          return `Id:${this.id}, Title:  ${this.title}, Favourite:${this.favorite}, Watch date:${newData}, Score: ${this.rating}`;
  
         //return `Id:${this.id}, Title:  ${this.title}, Favourite:${this.favourites}, Watch date:${this.date.format('MMM D, YYYY')}, Score: ${this.rating}`;
  } else return `Id:${this.id}, Title:  ${this.title}, Favourite:${this.favorite}, Watch date:${this.date.format('MMM D, YYYY')}, Score: ${this.rating}`;
  
  
  }
  
  
  this.resetDate = () => this.date=("<not defined>");
  
}


function FilmLibrary(){

  this.list=[];
  
  this.AddNewFilm = (e) => { 
      if(e.date.isValid()) this.list.push(e);
      else { e => e.date.value("<not defined>");
      this.list.push(e); }
  
}

this.deleteFilm = (id) => {
  const newList = this.list.filter(function(film, index, arr) {
    return film.id !== id;
  })
  this.list = newList;
}



};


function DefaultRoute() {
  return(
    <Container className='App'>
      <h1>No data here...</h1>
      <h2>This is not the route you are looking for!</h2>
      <Link to='/'>Please go back to main page</Link>
    </Container>
  );
}

function App() {//AppRoute

  const [listOfFilms, setList] = useState([]);
  const [filter,setFilter]=useState("All");
  const [initialLoading, setInitialLoading] = useState(true);
  const [dirty, setDirty] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [user, setUser] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);


  function handleError(err) {
    console.log(err);
    let errMsg = 'Unkwnown error';
    if (err.errors)
      if (err.errors[0].msg)
        errMsg = err.errors[0].msg;
    else if (err.error)
      errMsg = err.error;
        
    setErrorMsg(errMsg);
    setTimeout(()=>setDirty(true), 2000);  // Fetch correct version from server, after a while
  }
  
  
  useEffect(()=> {
    const checkAuth = async() => {
      try {
        // here you have the user info, if already logged in
        const user = await API.getUserInfo();
        setLoggedIn(true);
        setUser(user);
      } catch(err) {
        // NO need to do anything: user is simply not yet authenticated
        //handleError(err);
      }
    };
    checkAuth();
  }, []);



  useEffect( () => {
    
    API.listFilms()
      .then((films) => {
        setList(films);
        //setDirty(false);
        setInitialLoading(false);
      })
      .catch((err) => handleError(err));
     
      

  }, [dirty]);

  
  const addToList = (e) => {
      
    setList((oldList) => [...oldList, e]);

    API.addFilm(e)
    .then(()=> setDirty(true))
    .catch((err) => handleError(err));

    
  }

  const editRow = (newEl) => {
    setList((oldList) => oldList.map((e) => {
      if (e.id === newEl.id) {
        return newEl;
      } else {
        return e;
      }
    }));

    API.updateFilm(newEl)
    .then(() => setDirty(true))
    .catch((err) => handleError(err));
 
  }



  const deleteFilm = (id) => {
    setList((oldList) => oldList.filter(
      (e) => e.id !== id
    ));

    API.deleteFilm(id)
    .then(() => setDirty(true))
    .catch((err) => handleError(err));
  }

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    setUser(undefined);
    /* set state to empty if appropriate */
  }
  

  const loginSuccessful = (user) => {
    setUser(user);
    setLoggedIn(true);
    setDirty(true);  // load latest version of data, if appropriate
  }

 

 


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<FilmRoute user={user} logout={doLogOut} listOfFilms={listOfFilms} initialLoading={initialLoading}
          addToList={addToList}  editRow={editRow} deleteFilm={deleteFilm}   />}/>
          <Route path=":filter" element={<FilmRoute listOfFilms={listOfFilms} filter={filter} 
          addToList={addToList}  editRow={editRow} deleteFilm={deleteFilm} />}/>
          <Route path='add' element={ <FormRoute user={user} logout={doLogOut} addToList={addToList} /> } />
        <Route path='edit/:FilmId' element={<FormRoute user={user} logout={doLogOut} listOfFilms={listOfFilms}
          addToList={addToList}  editRow={editRow}  />} />
        <Route path='/login' element={loggedIn? <Navigate replace to='/' />:  <LoginForm loginSuccessful={loginSuccessful} />} />
        <Route path='*' element={<DefaultRoute />} />


    </Routes>
    </BrowserRouter>
  )
}

export default App