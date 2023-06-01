import { Col, Container, Row, Button, Form, Table ,Spinner} from 'react-bootstrap';
import { MyTable } from './FilmComponents';
import MySideBar from './MySideBar';
import MyHeader from './MyHeader';
import MyFooter from './MyFooter';



function Loading(props) {
  return (
    <Spinner className='m-2' animation="border" role="status" />
  )
}

function FilmRoute(props) {//AppRoute

  return (
    <>
    <div className="film-container">
    <Container fluid>
    
      <MyHeader  user={props.user} logout={props.logout} />
      
      <h2>List of Films</h2>
       
    <Row>
      <Col xs={12} md={2} className="px-2">
      <MySideBar filter={props.filter}/>
      </Col>
      {props.initialLoading ? <Loading /> :  <>
      <Col xs={12} md={10} className="px-2">
        
         
        <MyTable user={props.user}  listOfFilms={props.listOfFilms} filter={props.filter} deleteFilm={props.deleteFilm} />
        
      </Col>
      </>
      }
    </Row>
      
      <MyFooter />
    </Container>
    </div>
    </>
  )
}



export default FilmRoute;