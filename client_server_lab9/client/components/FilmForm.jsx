import { Col, Container, Row, Button, Form, Table, Alert } from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs';
import MySideBar from './MySideBar';
import MyHeader from './MyHeader';
import MyFooter from './MyFooter';
import { useNavigate, useParams, Link } from 'react-router-dom';



function FormRoute(props) {
    return (
        <div className="film-container">
     <Container fluid>
      <MyHeader user={props.user} logout={props.logout}/>
      
      <h2>List of Films</h2>
       
    <Row>
      <Col xs={12} md={4} className="px-2">
      <MySideBar filter={props.filter}/>
      </Col>
      <Col xs={12} md={8} className="px-2">
        
        <FilmForm listOfFilms={props.listOfFilms} 
        addToList={props.addToList}  editRow={props.editRow}/>
        
      </Col>
      
    </Row>
      
      <MyFooter />
    </Container>
        </div>
    );
}



function FilmForm(props) {
    const navigate = useNavigate();

    const { FilmId } = useParams();
    const editObj = FilmId && props.listOfFilms.find(e => e.id === parseInt(FilmId));

    const [id,setId]= useState(editObj? editObj.id : '');
    const [date, setDate] = useState(editObj? editObj.date.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));  //string: dayjs object is created only on submit
    const [title, setTitle] = useState(editObj? editObj.title : '');
    const [favorite,setFavorite]= useState(editObj? editObj.favourites : false);
    const [rating, setRating] = useState(editObj? editObj.rating : 0);

    const [errorMsg, setErrorMsg] = useState('');

    
    const handleId = (ev) => {
        const v = ev.target.value;
        setId(v);
    }

    const handleRating = (ev) => {
        const v = ev.target.value;
        setRating(parseInt(v));
    }

    function handleSubmit(event) {
        event.preventDefault();
        //console.log('premuto submit');

        // Form validation
        if (date === '')
            setErrorMsg('Data non valida. Deve essere compilata');
        else if (isNaN(parseInt(rating)))
            setErrorMsg('Rating deve essere compilato');
        else if (parseInt(rating)<0) {
            setErrorMsg('Rating negativo non valido');
        } else if (parseInt(rating)>5) {
            setErrorMsg('Rating  non valido');
        }
        else {
            const e = {
                id:id,
                title: title,
                favourites:favorite,
                date: dayjs(date),
                rating: parseInt(rating),
                
            }
            //console.log(e);

            if (editObj) {  // decide if this is an edit or an add
                e.id = editObj.id;
                props.editRow(e);
            } else
                props.addToList(e);
                navigate('/');
        }
    }

    return (
        <>
        {errorMsg? <Alert variant='danger' onClose={()=>setErrorMsg('')} dismissible>{errorMsg}</Alert> : false }
        <Form onSubmit={handleSubmit}>
        <Form.Group>
                <Form.Label>Id</Form.Label>
                <Form.Control type="text" name="id" value={id} onChange={handleId} />
            </Form.Group>

                <Form.Group>
                    <Form.Label>Favorites</Form.Label>
                    <Form.Check
                        type="checkbox"
                        label="Favorite"
                        name="favorite"
                        checked={favorite}
                        onChange={ev => setFavorite(ev.target.checked)}

                    />
                </Form.Group>


            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={title} onChange={ev => setTitle(ev.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" name="date" value={date} onChange={ev => setDate(ev.target.value)} />
            </Form.Group>


            <Form.Group>
                <Form.Label>Rating</Form.Label>
                <Form.Control type="number" min={0} max={5} step={1}  name="rating" value={rating} onChange={handleRating} />
            </Form.Group>

             <Button type='submit' variant="primary">{props.editObj? 'Add' : 'Save'}</Button>
            <Link to='/'> <Button variant='danger' onClick={props.closeForm}>Cancel</Button></Link>
        </Form>
        </>
    );

}

export  {FormRoute,  FilmForm};