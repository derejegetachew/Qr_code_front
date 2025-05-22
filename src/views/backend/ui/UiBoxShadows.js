import React,{useState} from 'react'
import {Container,Row,Col,Collapse} from 'react-bootstrap'
import  Card from '../../../components/Card'


const UiBoxShadows = () =>{
   //Collpase state
    const[open,setOpen]=useState(false)
    const[open1,setOpen1]=useState(false)
    const[open2,setOpen2]=useState(false)
   
    return(
        <>
       <Container fluid>
         <Row>
            <Col lg="12">
               <Card className="card-block card-stretch card-height">
                  <Card.Body>
                     <h4 className="mb-3">Box Shadow</h4>
                     <p className="mb-0">A box shadow is an enclosed glass-front display case containing an object or objects presented in a thematic grouping with artistic or personal significance. The grouping of the objects and the depth effect created by their relative heights from the backing creates a dramatic visual result.</p>
                  </Card.Body>
               </Card>
            </Col>
            <Col lg="12">
               <Card className="card-block card-stretch card-height">
                  <Card.Header>
                     <Card.Header.Title>
                        <h4 className="card-title">Shadows</h4>
                     </Card.Header.Title>
                     <Card.Header.Action>
                        <i  type="button" onClick={()=>setOpen(!open)}>
                           <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                           </svg>
                        </i>
                     </Card.Header.Action>
                  </Card.Header>
                  <Card.Body>
                     <Collapse in={open}>
                        <div>
                           <Card><kbd className="bg-dark"><pre className="text-white"><code>{`
<Row>
   <Col md="6" lg="3" sm="6">
      <div className="shadow-lg p-4 shadow-showcase text-center">
         <h6>Larger shadow</h6>
      </div>
   </Col>
   <Col sm="6" md="6" lg="3" className="mt-3 mt-md-0">
      <div className="shadow p-4 shadow-showcase text-center">
         <h6>Regular shadow</h6>
      </div>
   </Col>
   <Col sm="6" md="6" lg="3" className="mt-3 mt-lg-0">
      <div className="shadow-sm p-4 shadow-showcase text-center">
         <h6>Small shadow</h6>
      </div>
   </Col>
   <Col sm="6" md="6" lg="3" className="mt-3 mt-lg-0">
      <div className="shadow-none p-4 shadow-showcase text-center">
         <h6>No shadow</h6>
      </div>
   </Col>
</Row>
                           `}
                              </code></pre></kbd></Card>
                        </div>
                     </Collapse>
                     <Row>
                        <Col md="6" lg="3" sm="6">
                           <div className="shadow-lg p-4 shadow-showcase text-center">
                              <h6>Larger shadow</h6>
                           </div>
                        </Col>
                        <Col sm="6" md="6" lg="3" className="mt-3 mt-md-0">
                           <div className="shadow p-4 shadow-showcase text-center">
                              <h6>Regular shadow</h6>
                           </div>
                        </Col>
                        <Col sm="6" md="6" lg="3" className="mt-3 mt-lg-0">
                           <div className="shadow-sm p-4 shadow-showcase text-center">
                              <h6>Small shadow</h6>
                           </div>
                        </Col>
                        <Col sm="6" md="6" lg="3" className="mt-3 mt-lg-0">
                           <div className="shadow-none p-4 shadow-showcase text-center">
                              <h6>No shadow</h6>
                           </div>
                        </Col>
                     </Row>
                  </Card.Body>
               </Card>
            </Col>
            <Col lg="12">
               <Card className="card-block card-stretch card-height">
                  <Card.Header>
                     <Card.Header.Title>
                        <h4 className="card-title">Basic Shadow</h4>
                     </Card.Header.Title>
                     <Card.Header.Action>
                           <i  type="button" onClick={()=>setOpen1(!open1)}>
                              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                              </svg>
                           </i>
                     </Card.Header.Action>
                  </Card.Header>
                  <Card.Body>
                     <Collapse in={open1}>
                           <div>
                              <Card><kbd className="bg-dark"><pre className="text-white"><code>{`
<Row>
   <Col md="6" lg="3" sm="6">
      <div className="bottom-left p-4 shadow-showcase text-center">
         <h6>Bottom left</h6>
      </div>
   </Col>
   <Col sm="6" md="6" lg="3" className="mt-3 mt-md-0">
      <div className="top-left p-4 shadow-showcase text-center">
         <h6>Top Left</h6>
      </div>
   </Col>
   <Col sm="6" md="6" lg="3" className="mt-3 mt-lg-0">
      <div className="bottom-right p-4 shadow-showcase text-center">
         <h6>Bottom right</h6>
      </div>
   </Col>
   <Col sm="6" md="6" lg="3" className="mt-3 mt-lg-0">
      <div className="top-right p-4 shadow-showcase text-center">
         <h6>Top right</h6>
      </div>
   </Col>
</Row>
                              `}
                              </code></pre></kbd></Card>
                           </div>
                     </Collapse>
                     <Row>
                        <Col md="6" lg="3" sm="6">
                           <div className="bottom-left p-4 shadow-showcase text-center">
                              <h6>Bottom left</h6>
                           </div>
                        </Col>
                        <Col sm="6" md="6" lg="3" className="mt-3 mt-md-0">
                           <div className="top-left p-4 shadow-showcase text-center">
                              <h6>Top Left</h6>
                           </div>
                        </Col>
                        <Col sm="6" md="6" lg="3" className="mt-3 mt-lg-0">
                           <div className="bottom-right p-4 shadow-showcase text-center">
                              <h6>Bottom right</h6>
                           </div>
                        </Col>
                        <Col sm="6" md="6" lg="3" className="mt-3 mt-lg-0">
                           <div className="top-right p-4 shadow-showcase text-center">
                              <h6>Top right</h6>
                           </div>
                        </Col>
                     </Row>
                  </Card.Body>
               </Card>
            </Col>
            <Col lg="12">
               <Card className="card-block card-stretch card-height">
                  <Card.Header>
                     <Card.Header.Title>
                        <h4 className="card-title">Drop Shadow</h4>
                     </Card.Header.Title>
                     <Card.Header.Action>
                           <i  type="button" onClick={()=>setOpen2(!open2)}>
                              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                              </svg>
                           </i>
                     </Card.Header.Action>
                  </Card.Header>
                  <Card.Body>
                     <Collapse in={open2}>
                        <div>
                           <Card><kbd className="bg-dark"><pre className="text-white"><code>{`
<Row>
   <Col md="6" lg="3" sm="6">
      <div className="shadow-bottom p-4 shadow-showcase text-center">
         <h6>Bottom shadow</h6>
      </div>
   </Col>
   <Col sm="6"  md="6" lg="3" className="mt-md-0">
      <div className="basic-drop-shadow p-4 shadow-showcase text-center">
         <h6>Basic Shadow</h6>
      </div>
   </Col>
   <Col sm="6" md="6" lg="3" className="mt-3 mt-lg-0">
      <div className="inner-shadow p-4 shadow-showcase text-center">
         <h6>inner Shadow</h6>
      </div>
   </Col>
   <Col sm="6" md="6" lg="3" className="mt-3 mt-lg-0">
      <div className="blur-shadow p-4 shadow-showcase text-center">
         <h6>Blur Shadow</h6>
      </div>
   </Col>
</Row>
                           `}
                           </code></pre></kbd></Card>
                        </div>
                     </Collapse>
                     <Row>
                        <Col md="6" lg="3" sm="6">
                           <div className="shadow-bottom p-4 shadow-showcase text-center">
                              <h6>Bottom shadow</h6>
                           </div>
                        </Col>
                        <Col sm="6"  md="6" lg="3" className="mt-md-0">
                           <div className="basic-drop-shadow p-4 shadow-showcase text-center">
                              <h6>Basic Shadow</h6>
                           </div>
                        </Col>
                        <Col sm="6" md="6" lg="3" className="mt-3 mt-lg-0">
                           <div className="inner-shadow p-4 shadow-showcase text-center">
                              <h6>inner Shadow</h6>
                           </div>
                        </Col>
                        <Col sm="6" md="6" lg="3" className="mt-3 mt-lg-0">
                           <div className="blur-shadow p-4 shadow-showcase text-center">
                              <h6>Blur Shadow</h6>
                           </div>
                        </Col>
                     </Row>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </Container>
        </>
    )
}

export default UiBoxShadows;