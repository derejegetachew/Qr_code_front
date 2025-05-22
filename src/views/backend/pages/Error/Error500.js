import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'

//img
import error500 from '../../../../assets/images/error/Datum_500.png'
import errordark500 from '../../../../assets/images/error/Datum_500.png'

const Error500 = () => {
    return (
        <>
         <Container>
                <Row className=" no-gutters height-self-center">
                    <Col sm="12" className="text-center align-self-center">
                    <div className="iq-error position-relative">
                            <img src={error500} className="img-fluid iq-error-img iq-error-img-dark mx-auto" alt="error500" />
                            <img src={errordark500} className="img-fluid iq-error-img" alt="error500" />
                            <h2 className="mb-0">Oops! This Page is Not Working.</h2>
                            <p>The requested is Internal Server Error.</p>
                            <Link className="btn btn-primary d-inline-flex align-items-center mt-3" to="/"><i className="ri-home-4-line"></i>Back to Home</Link>
                            
                    </div>
                    </Col>
                </Row>
        </Container>
        </>
    )
}

export default Error500;