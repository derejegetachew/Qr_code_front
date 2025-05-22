import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import  Card from '../../../../components/Card'
import { Link} from 'react-router-dom'

const Pricing1 = () => {
  

    return (
        <>
<Container fluid>
   <Row>
      <Col sm="12">
         <Card>
            <Card.Body>
               <div className="table-responsive pricing pt-2">
                  <table id="my-table" className="table">
                     <thead>
                        <tr>
                           <th className="text-center prc-wrap"></th>
                           <th className="text-center prc-wrap">
                              <div className="prc-box">
                                 <div className="h3 pt-4">$19<small> / Per month</small>
                                 </div> <span className="type">Basic</span>
                              </div>
                           </th>
                           <th className="text-center prc-wrap">
                              <div className="prc-box active">
                                 <div className="h3 pt-4">$39<small> / Per month</small>
                                 </div> <span className="type">Standard</span>
                              </div>
                           </th>
                           <th className="text-center prc-wrap">
                              <div className="prc-box">
                                 <div className="h3 pt-4">$119<small> / Per month</small>
                                 </div> <span className="type">Platinum</span>
                              </div>
                           </th>
                           <th className="text-center prc-wrap">
                              <div className="prc-box">
                                 <div className="h3 pt-4">$219<small> / Per month</small>
                                 </div> <span className="type">Premium</span>
                              </div>
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <th className="text-center" scope="row">Feature 1</th>
                           <td className="text-center child-cell">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </td>
                           <td className="text-center child-cell active">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </td>
                           <td className="text-center child-cell">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </td>
                           <td className="text-center child-cell">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </td>
                        </tr>
                        <tr>
                           <th className="text-center" scope="row">Feature 2</th>
                           <td className="text-center child-cell">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </td>
                           <td className="text-center child-cell active">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </td>
                           <td className="text-center child-cell">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </td>
                           <td className="text-center child-cell">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </td>
                        </tr>
                        <tr>
                           <th className="text-center" scope="row">Feature 3</th>
                           <td className="text-center child-cell">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </td>
                           <td className="text-center child-cell active">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </td>
                           <td className="text-center child-cell">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </td>
                           <td className="text-center child-cell">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </td>
                        </tr>
                        <tr>
                           <th className="text-center" scope="row">Feature 4</th>
                           <td className="text-center child-cell">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </td>
                           <td className="text-center child-cell active">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </td>
                           <td className="text-center child-cell">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </td>
                           <td className="text-center child-cell">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </td>
                        </tr>
                        <tr>
                           <th className="text-center" scope="row">Feature 5</th>
                           <td className="text-center child-cell">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </td>
                           <td className="text-center child-cell active">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </td>
                           <td className="text-center child-cell">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </td>
                           <td className="text-center child-cell">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </td>
                        </tr>
                        <tr>
                           <td className="text-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </td>
                           <td className="text-center"> <Link to="#" className="btn btn-primary mt-3">Purchase</Link>
                           </td>
                           <td className="text-center"> <Link to="#" className="btn btn-primary mt-3">Purchase</Link>
                           </td>
                           <td className="text-center"> <Link to="#" className="btn btn-primary mt-3">Purchase</Link>
                           </td>
                           <td className="text-center"> <Link to="#" className="btn btn-primary mt-3">Purchase</Link>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </Card.Body>
         </Card>
      </Col>
   </Row>
</Container>
        </>
    )
}

export default Pricing1;