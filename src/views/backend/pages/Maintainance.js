import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
//img 
import maintenance from '../../..//assets/images/error/maintenance.png'

const Maintainance = () => {
    return (
        <>
          <div className="mt-5 iq-maintenance">
            <Container fluid className="p-0">
               <Row className="no-gutters">
                  <Col sm="12" className="col-sm-12 text-center">
                        <div className="iq-maintenance">
                           <img src={maintenance} className="img-fluid" alt="" />
                           <h3 className="mt-4 mb-2">Site Currently Under Maintenance</h3>
                           <p className="mb-2">Please check back in sometime.</p>
                           <p>Contact with <Link to="/" onClick={e => e.preventDefault()}>dummy@example.com</Link></p>
                        </div>
                  </Col>
               </Row>
            </Container>
         </div>
        </>
    )
}

export default Maintainance;