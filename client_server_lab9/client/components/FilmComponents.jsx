import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Row, Col ,Form} from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Link,useParams, useNavigate } from 'react-router-dom';
import { FormRoute } from './FilmForm';



function MyRow(props) {//AppComponents
    const { e ,onFavoritesChange} = props;
    const [favorite, setFavorite] = useState(e.favorite);
  
    const handleFavoriteToggle = (ev) => {
      const newFavorite = ev.target.checked;
      setFavorite(newFavorite);
      onFavoritesChange(e.id, newFavorite);
    };
  
   

    
    return (
      
      <tr>
  
      <td>{e.id}</td>
      <td>{e.title}</td>
      <td><Form.Check type="checkbox"
            checked={favorite ? true : false} onChange={handleFavoriteToggle}/></td>

      <td>{e.date.format('MMM D, YYYY')}</td>
      <td><Rating rating= {e.rating} maxStars={5}/></td>
      
        <td>
          <div className="btn-group">
            <Link to={`/edit/${e.id}`}><Button className='edit  btn-outline-secondary' onClick={() => props.editRow(props.e)}><svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" fill="white" className="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg></Button></Link>

            <Button onClick={props.deleteFilm} className='delete btn-sm btn-outline-secondary mr-3'><svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" fill="white" className="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
            </svg></Button>
          </div>


        </td>
  
    </tr>
      
    );
  }


  function Rating(props) {
    return [...Array(props.maxStars)].map((el, index) =>
      <i key={index} className={(index < props.rating) ? "bi bi-star-fill" : "bi bi-star"} />
    )
  }
  
  function MyTable(props) {//AppComponents
  
    const [list, setList] = useState(props.listOfFilms);
  
    const [showForm, setShowForm] = useState(false);
    const [editObj, setEditObj] = useState(undefined);

    const { filter } = useParams();

    const handleFavoritesChange = (id, newFavorite) => {
      const newList = list.map((e) => {
        if (e.id === id) {
          return { ...e, favorite: newFavorite };
        } else {
          return e;
        }
      });
      setList(newList);
    };
   
  
    const filteredList = props.listOfFilms.filter((e) => {
      if (filter === "Favorite") {
        return e.favorite == true;
      } else if (filter === "Best Rated") {
        return e.rating === 5;
      } else if (filter === "Last Month") {
        const today = dayjs().locale('it').format('YYYY-MM-DD');
        const thirtyDaysAgo = dayjs().subtract(30, 'days').locale('it').format('YYYY-MM-DD'); 
        return e.date.format('YYYY-MM-DD') >= thirtyDaysAgo && e.date.format('YYYY-MM-DD') <= today;
      } else if (filter === "Not Watched") {
       
        return !e.date.isValid();
      }
       else {
        return true; // include all elements if no filter is specified
      }
    });

    return (<>

        <div>
          <h3>{filter? filter:"All"}</h3>
          <Table className='tab1'>
            {/* <Table striped bordered hover> */}
            <tbody>
              {filteredList.map((e) =>
                <MyRow e={e} key={e.id}
                editRow={() => { setEditObj(e); setShowForm(true); }}
                 deleteFilm={()=>props.deleteFilm(e.id)}
                 onFavoritesChange={handleFavoritesChange}
               />)
                
                }
      
            </tbody>
          </Table>
          <Link to='/add'>
            <Button variant='success'>Add Film</Button>
          </Link>

          </div>

</>
)
}



export { MyTable, MyRow };