import { Col, Container, Row, Button, Form, Table, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { Link,useParams, useNavigate } from 'react-router-dom';


function MySideBar(props) {
  const navigate = useNavigate();
  
      return (
      <div className="sidebar">
  <button className="btn btn-primary" onClick={()=>navigate('/All')}>All</button>
  <button className="btn btn-primary" onClick={()=>navigate('/Favorite')}>Favorites</button>
  <button className="btn btn-primary" onClick={()=>navigate('/Best Rated')}>Best Rated</button>
  <button className="btn btn-primary" onClick={()=>navigate('/Last Month')}>Seen Last Month</button>
  <button className="btn btn-primary" onClick={()=>navigate('/Not Watched')}>Unseen</button>
</div>);
  }
  export default MySideBar;


 

  