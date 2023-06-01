import 'bootstrap/dist/css/bootstrap.min.css';
import {Form} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Navbar, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function MyHeader(props) {

	const navigate = useNavigate();
	
	const name = props.user && props.user.name;
	
	return (
		<>

			<nav className="navbar navbar-expand navbar-dark bg-primary w-100" >
				<div className="container-fluid">
				<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"  fill="white" className="bi" viewBox="0 0 16 16">
                 <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/>
                        </svg>
					<a className="navbar-brand display-4" href="#">Film Library</a>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navbarsExample02">
						<ul className="navbar-nav me-auto">
							<li className="nav-item">
								<a className="nav-link active" aria-current="page" href="#">Home</a>
							</li>

						</ul>
						{ name? <>
                    <Navbar.Text className='fs-5'>
                        {"Signed in as: "+name}
                    </Navbar.Text>
                    <Button className='mx-2' variant='danger' onClick={props.logout}>Logout</Button>
                    </> : 
                    <Button className='mx-2' variant='warning' onClick={()=> navigate('/login')}>Login</Button> }
						
						<Form role="search">
							<input className="form-control" type="search" placeholder="Search" aria-label="Search" />
						</Form>
					</div>
				</div>
			</nav>
		</>
	);
}

export default MyHeader;