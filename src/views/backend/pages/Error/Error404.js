import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'

//img
import error404 from '../../../../assets/images/error/Datum_404.png'
import errordark404 from '../../../../assets/images/error/Datum_404.png'
const Error404 = () => {
    return (
        <>
         <Container>
            <Row className="no-gutters height-self-center">
                <Col sm="12" className="text-center align-self-center">
                    <div className="iq-error position-relative">
                        <img src={error404} className="img-fluid iq-error-img iq-error-img-dark mx-auto" alt="error404" />
                        <img src={errordark404} className="img-fluid iq-error-img" alt="error404" />
                        <h2 className="mb-0 mt-4">Oops! This Page is Not Found.</h2>
                        <p>The requested page dose not exist.</p>
                        <Link className="btn btn-primary d-inline-flex align-items-center mt-3" to="/"><i className="ri-home-4-line"></i>Back to Home</Link>
                    </div>
                 </Col>
             </Row>
         </Container>
        </>
    )
}

export default Error404;