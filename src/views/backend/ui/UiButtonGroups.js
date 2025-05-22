import React,{useState} from 'react'
import {Container,Row,Col,Button,ButtonGroup,Collapse} from 'react-bootstrap'
import  Card from '../../../components/Card'
const UiButtonGroups = () =>{
     //Collapse state
     const[open,setOpen]=useState(false)
     const[open1,setOpen1]=useState(false)
     const[open2,setOpen2]=useState(false)
     const[open3,setOpen3]=useState(false)
     const[open4,setOpen4]=useState(false)
     const[open5,setOpen5]=useState(false)
     const[open6,setOpen6]=useState(false)
     const[open7,setOpen7]=useState(false)
    return(
        <>
        <Container fluid>
         <Row>
            <Col sm="12" md="6" lg="4">
               <Card className="card-block card-stretch card-height blog">
                  <Card.Header>
                     <Card.Header.Title>
                        <h4 className="card-title">Flat Button</h4>
                     </Card.Header.Title>
                     <Card.Header.Action>
                        <i  type="button" onClick={() => setOpen(!open)}>
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
<ButtonGroup type="checkbox" className="btn-group-toggle btn-group-flat"> 
   <Button  href="#" variant=" button  button-icon bg-primary"  target="_blank">Left</Button>
   <Button  href="#" variant=" button  button-icon bg-primary"  target="_blank">Middle</Button>
   <Button  href="#" variant=" button  button-icon bg-primary"  target="_blank">Right</Button>
</ButtonGroup>`}
                           </code></pre></kbd></Card>
                        </div>
                     </Collapse>
                     <ul className="list-inline p-0 m-0 text-center">
                        <li className="mb-2">
                           <ButtonGroup type="checkbox" className="btn-group-toggle btn-group-flat"> 
                              <Button  href="#" variant=" button  button-icon bg-primary"  target="_blank">Left</Button>
                              <Button  href="#" variant=" button  button-icon bg-primary"  target="_blank">Middle</Button>
                              <Button  href="#" variant=" button  button-icon bg-primary"  target="_blank">Right</Button>
                           </ButtonGroup>
                        </li>
                        <li className="mb-2">
                           <ButtonGroup className="btn-group-toggle btn-group-flat"> 
                              <Button href="#" variant=" button button-icon bg-success" target="_blank" >Left</Button>
                              <Button href="#" variant=" button button-icon bg-success" target="_blank">Middle</Button>
                              <Button href="#" variant=" button button-icon bg-success" target="_blank">Right</Button>
                           </ButtonGroup>
                        </li>
                        <li>
                           <ButtonGroup className="btn-group-toggle btn-group-flat">
                              <Button href="#" variant=" button button-icon bg-warning" target="_blank">Left</Button>
                              <Button href="#" variant=" button button-icon bg-warning" target="_blank">Middle</Button>
                              <Button href="#" variant=" button button-icon bg-warning" target="_blank">Right</Button>
                           </ButtonGroup>
                        </li>
                     </ul>
                  </Card.Body>
               </Card>
            </Col>
            <Col sm="12" md="6" lg="4">
               <Card className="card-block card-stretch card-height blog">
                  <Card.Header>
                     <Card.Header.Title>
                        <h4 className="card-title">Edges Button</h4>
                     </Card.Header.Title>
                     <Card.Header.Action>
                        <i  type="button" onClick={() => setOpen1(!open1)}>
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
<ButtonGroup className="btn-group-toggle btn-group-edges">
   <Button href="#" variant=" button button-icon bg-primary" target="_blank">Left</Button>
   <Button href="#" variant=" button button-icon bg-primary" target="_blank">Middle</Button>
   <Button href="#" variant=" button button-icon bg-primary" target="_blank">Right</Button>
</ButtonGroup>
                           `}
                           </code></pre></kbd></Card>
                        </div>
                     </Collapse>
                     <ul className="list-inline p-0 m-0 text-center">
                        <li className="mb-2">
                           <ButtonGroup className="btn-group-toggle btn-group-edges">
                              <Button href="#" variant=" button button-icon bg-primary" target="_blank">Left</Button>
                              <Button href="#" variant=" button button-icon bg-primary" target="_blank">Middle</Button>
                              <Button href="#" variant=" button button-icon bg-primary" target="_blank">Right</Button>
                           </ButtonGroup>
                        </li>
                        <li className="mb-2">
                           <ButtonGroup className="btn-group-toggle btn-group-edges"> 
                              <Button href="#" variant=" button button-icon bg-success" target="_blank">Left</Button>
                              <Button href="#" variant=" button button-icon bg-success" target="_blank">Middle</Button>
                              <Button href="#" variant=" button button-icon bg-success" target="_blank">Right</Button>
                           </ButtonGroup>
                        </li>
                        <li>
                           <ButtonGroup className="btn-group-toggle btn-group-edges"> 
                              <Button href="#" variant=" button button-icon bg-warning" target="_blank">Left</Button>
                              <Button href="#" variant=" button button-icon bg-warning" target="_blank">Middle</Button>
                              <Button href="#" variant=" button button-icon bg-warning" target="_blank">Right</Button>
                           </ButtonGroup>
                        </li>
                     </ul>
                  </Card.Body>
               </Card>
            </Col>
            <Col sm="12" md="6" lg="4">
               <Card className="card-block card-stretch card-height blog">
                  <Card.Header>
                     <Card.Header.Title>
                        <h4 className="card-title">Basic Buttons</h4>
                     </Card.Header.Title>
                     <Card.Header.Action>
                        <i  type="button" onClick={() => setOpen2(!open2)}>
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
<ButtonGroup className="btn-group-toggle"> 
   <Button href="#" variant="button btn button-icon bg-primary" target="_blank">Left</Button>
   <Button href="#" variant="button btn button-icon bg-primary" target="_blank">Middle</Button>
   <Button href="#" variant="button btn button-icon bg-primary" target="_blank">Right</Button>
</ButtonGroup>
                           `}
                           </code></pre></kbd></Card>
                        </div>
                     </Collapse>
                     <ul className="list-inline p-0 m-0 text-center">
                        <li className="mb-2">
                           <ButtonGroup className="btn-group-toggle"> 
                              <Button href="#" variant="button btn button-icon bg-primary" target="_blank">Left</Button>
                              <Button href="#" variant="button btn button-icon bg-primary" target="_blank">Middle</Button>
                              <Button href="#" variant="button btn button-icon bg-primary" target="_blank">Right</Button>
                           </ButtonGroup>
                        </li>
                        <li className="mb-2">
                           <ButtonGroup className="btn-group-toggle"> 
                              <Button href="#" variant=" button button-icon bg-success" target="_blank">Left</Button>
                              <Button href="#" variant=" button button-icon bg-success" target="_blank">Middle</Button>
                              <Button href="#" variant=" button button-icon bg-success" target="_blank">Right</Button>
                           </ButtonGroup>
                        </li>
                        <li>
                           <ButtonGroup className="btn-group-toggle"> 
                              <Button href="#" variant=" button button-icon bg-warning" target="_blank">Left</Button>
                              <Button href="#" variant=" button button-icon bg-warning" target="_blank">Middle</Button>
                              <Button href="#" variant=" button button-icon bg-warning" target="_blank">Right</Button>
                           </ButtonGroup>
                        </li>
                     </ul>
                  </Card.Body>
               </Card>
            </Col>
            <Col sm="12" md="6" lg="4">
               <Card className="card-block card-stretch card-height blog">
                  <Card.Header>
                     <Card.Header.Title>
                        <h4 className="card-title">Outline Middle Buttons</h4>
                     </Card.Header.Title>
                     <Card.Header.Action>
                        <i  type="button" onClick={()=>setOpen3(!open3)}>
                           <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                           </svg>
                        </i>
                     </Card.Header.Action>
                  </Card.Header>
                  <Card.Body>
                     <Collapse in={open3}>
                        <div>
                           <Card><kbd className="bg-dark"><pre className="text-white"><code>{`
<ButtonGroup className="btn-group-toggle"> 
   <Button href="#" variant="outline-primary button button-icon" target="_blank">Left</Button>
   <Button href="#" variant=" button button-icon bg-primary" target="_blank">Middle</Button>
   <Button href="#" variant="outline-primary button button-icon" target="_blank">Right</Button>
</ButtonGroup>
                           `}
                           </code></pre></kbd></Card>
                        </div>
                     </Collapse>
                     <ul className="list-inline p-0 m-0 text-center">
                        <li className="mb-2">
                           <ButtonGroup className="btn-group-toggle"> 
                              <Button href="#" variant="outline-primary button button-icon" target="_blank">Left</Button>
                              <Button href="#" variant=" button button-icon bg-primary" target="_blank">Middle</Button>
                              <Button href="#" variant="outline-primary button button-icon" target="_blank">Right</Button>
                           </ButtonGroup>
                        </li>
                        <li className="mb-2">
                           <ButtonGroup className="btn-group-toggle"> 
                              <Button href="#" variant="outline-success button button-icon" target="_blank">Left</Button>
                              <Button href="#" variant=" button button-icon bg-success" target="_blank">Middle</Button>
                              <Button href="#" variant="outline-success button button-icon" target="_blank">Right</Button>
                           </ButtonGroup>
                        </li>
                        <li>
                           <ButtonGroup className="btn-group-toggle"> 
                              <Button href="#" variant="outline-warning button button-icon" target="_blank">Left</Button>
                              <Button href="#" variant="button button-icon bg-warning" target="_blank">Middle</Button>
                              <Button href="#" variant="outline-warning button button-icon" target="_blank">Right</Button>
                           </ButtonGroup>
                        </li>
                     </ul>
                  </Card.Body>
               </Card>
            </Col>
            <Col sm="12" md="6" lg="4">
               <Card className="card-block card-stretch card-height blog">
                  <Card.Header>
                     <Card.Header.Title>
                        <h4 className="card-title">Outline Side Buttons</h4>
                     </Card.Header.Title>
                     <Card.Header.Action>
                        <i  type="button" onClick={()=> setOpen4(!open4)}>
                           <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                           </svg>
                        </i>
                     </Card.Header.Action>
                  </Card.Header>
                  <Card.Body>
                     <Collapse in={open4}>
                     <div>
                           <Card><kbd className="bg-dark"><pre className="text-white"><code>{`
<ButtonGroup className="btn-group-toggle"> 
   <Button href="#" variant=" button button-icon bg-primary" target="_blank">Left</Button>
   <Button href="#" variant="outline-primary button button-icon" target="_blank">Middle</Button>
   <Button href="#" variant=" button button-icon bg-primary" target="_blank">Right</Button>
</ButtonGroup>
                           `}
                           </code></pre></kbd></Card>
                        </div>
                     </Collapse>
                     <ul className="list-inline p-0 m-0 text-center">
                        <li className="mb-2">
                           <ButtonGroup className="btn-group-toggle"> 
                              <Button href="#" variant=" button button-icon bg-primary" target="_blank">Left</Button>
                              <Button href="#" variant="outline-primary button button-icon" target="_blank">Middle</Button>
                              <Button href="#" variant=" button button-icon bg-primary" target="_blank">Right</Button>
                           </ButtonGroup>
                        </li>
                        <li className="mb-2">
                           <ButtonGroup className="btn-group-toggle"> 
                              <Button href="#" variant=" button button-icon bg-success" target="_blank">Left</Button>
                              <Button href="#" variant="outline-success button button-icon" target="_blank">Middle</Button>
                              <Button href="#" variant=" button button-icon bg-success" target="_blank">Right</Button>
                           </ButtonGroup>
                        </li>
                        <li>
                           <ButtonGroup className="btn-group-toggle"> 
                              <Button href="#" variant=" button button-icon bg-warning" target="_blank">Left</Button>
                              <Button href="#" variant="outline-warning button button-icon" target="_blank">Middle</Button>
                              <Button href="#" variant=" button button-icon bg-warning" target="_blank">Right</Button>
                           </ButtonGroup>
                        </li>
                     </ul>
                  </Card.Body>
               </Card>
            </Col>
            <Col sm="12" md="6" lg="4">
               <Card className="card-block card-stretch card-height blog">
                  <Card.Header>
                     <Card.Header.Title>
                        <h4 className="card-title">Outline Buttons</h4>
                     </Card.Header.Title>
                     <Card.Header.Action>
                        <i  type="button" onClick={() => setOpen5(!open5)}>
                           <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                           </svg>
                        </i>
                     </Card.Header.Action>
                  </Card.Header>
                  <Card.Body>
                     <Collapse in={open5}>
                        <div>
                           <Card><kbd className="bg-dark"><pre className="text-white"><code>{`
<ButtonGroup className="btn-group-toggle"> 
   <Button href="#" variant="outline-primary button button-icon" target="_blank">Left</Button>
   <Button href="#" variant="outline-primary button button-icon" target="_blank">Middle</Button>
   <Button href="#" variant="outline-primary button button-icon" target="_blank">Right</Button>
</ButtonGroup>
                           `}
                           </code></pre></kbd></Card>
                        </div>
                     </Collapse>
                     <ul className="list-inline p-0 m-0 text-center">
                        <li className="mb-2">
                           <ButtonGroup className="btn-group-toggle"> 
                              <Button href="#" variant="outline-primary button button-icon" target="_blank">Left</Button>
                              <Button href="#" variant="outline-primary button button-icon" target="_blank">Middle</Button>
                              <Button href="#" variant="outline-primary button button-icon" target="_blank">Right</Button>
                           </ButtonGroup>
                        </li>
                        <li className="mb-2">
                           <ButtonGroup className="btn-group-toggle"> 
                              <Button href="#" variant="outline-success button button-icon" target="_blank">Left</Button>
                              <Button href="#" variant="outline-success button button-icon" target="_blank">Middle</Button>
                              <Button href="#" variant="outline-success button button-icon" target="_blank">Right</Button>
                           </ButtonGroup>
                        </li>
                        <li>
                           <ButtonGroup className="btn-group-toggle"> 
                              <Button href="#" variant="outline-warning button button-icon" target="_blank">Left</Button>
                              <Button href="#" variant="outline-warning button button-icon" target="_blank">Middle</Button>
                              <Button href="#" variant="outline-warning button button-icon" target="_blank">Right</Button>
                           </ButtonGroup>
                        </li>
                     </ul>
                  </Card.Body>
               </Card>
            </Col>
            <Col sm="12" md="6" lg="4">
               <Card className="card-block card-stretch card-height blog">
                  <Card.Header>
                     <Card.Header.Title>
                        <h4 className="card-title">Toolbar Buttons</h4>
                     </Card.Header.Title>
                     <Card.Header.Action>
                        <i  type="button" onClick={() => setOpen6(!open6)}>
                           <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                           </svg>
                        </i>
                     </Card.Header.Action>
                  </Card.Header>
                  <Card.Body>
                     <Collapse in={open6}>
                        <div>
                           <Card><kbd className="bg-dark"><pre id="toolbar-button" className="text-white"><code>{`
<ButtonGroup className="btn-group-toggle btn-group-edges mr-2 btn-group1"> 
   <Button href="#" variant=" button button-icon bg-primary" target="_blank">1</Button>
   <Button href="#" variant=" button button-icon bg-primary" target="_blank">2</Button>
   <Button href="#" variant=" button button-icon bg-primary" target="_blank">3</Button>
</ButtonGroup>
<ButtonGroup className="btn-group-toggle btn-group-edges mr-2 btn-group2"> 
   <Button href="#" variant=" button button-icon bg-primary" target="_blank">4</Button>
   <Button href="#" variant=" button button-icon bg-primary" target="_blank">5</Button>
</ButtonGroup>
<ButtonGroup className="btn-group-toggle btn-group3"> 
   <Button href="#" variant=" button button-icon bg-primary rounded" target="_blank">6</Button>
</ButtonGroup>
                           `}
                           </code></pre></kbd></Card>
                        </div>
                     </Collapse>
                     <ul className="list-inline p-0 m-0 text-center">
                        <li className="d-flex align-items-center justify-content-center mb-2">
                           <ButtonGroup className="btn-group-toggle btn-group-edges mr-2 btn-group1"> 
                              <Button href="#" variant=" button button-icon bg-primary" target="_blank">1</Button>
                              <Button href="#" variant=" button button-icon bg-primary" target="_blank">2</Button>
                              <Button href="#" variant=" button button-icon bg-primary" target="_blank">3</Button>
                           </ButtonGroup>
                           <ButtonGroup className="btn-group-toggle btn-group-edges mr-2 btn-group2"> 
                              <Button href="#" variant=" button button-icon bg-primary" target="_blank">4</Button>
                              <Button href="#" variant=" button button-icon bg-primary" target="_blank">5</Button>
                           </ButtonGroup>
                           <ButtonGroup className="btn-group-toggle btn-group3"> 
                              <Button href="#" variant=" button button-icon bg-primary rounded" target="_blank">6</Button>
                           </ButtonGroup>
                        </li>
                        <li className="d-flex align-items-center justify-content-center mb-2">
                           <ButtonGroup className="btn-group-toggle btn-group-edges mr-2 btn-group1"> 
                              <Button href="#" variant=" button button-icon bg-success" target="_blank">1</Button>
                              <Button href="#" variant=" button button-icon bg-success" target="_blank">2</Button>
                              <Button href="#" variant=" button button-icon bg-success" target="_blank">3</Button>
                           </ButtonGroup>
                           <ButtonGroup className="btn-group-toggle btn-group-edges mr-2 btn-group2"> 
                              <Button href="#" variant=" button button-icon bg-success" target="_blank">4</Button>
                              <Button href="#" variant=" button button-icon bg-success" target="_blank">5</Button>
                           </ButtonGroup>
                           <ButtonGroup className="btn-group-toggle btn-group3"> 
                              <Button href="#" variant=" button  button-icon bg-success rounded" target="_blank">6</Button>
                           </ButtonGroup>
                        </li>
                        <li className="d-flex align-items-center justify-content-center">
                           <ButtonGroup className="btn-group-toggle btn-group-edges mr-2 btn-group1"> 
                              <Button href="#" variant=" button button-icon bg-warning" target="_blank">1</Button>
                              <Button href="#" variant=" button button-icon bg-warning" target="_blank">2</Button>
                              <Button href="#" variant=" button button-icon bg-warning" target="_blank">3</Button>
                           </ButtonGroup>
                           <ButtonGroup className="btn-group-toggle btn-group-edges mr-2 btn-group2">   
                              <Button href="#" variant=" button button-icon bg-warning" target="_blank">4</Button>
                              <Button href="#" variant=" button button-icon bg-warning" target="_blank">5</Button>
                           </ButtonGroup>
                           <ButtonGroup className="btn-group-toggle btn-group3"> 
                              <Button href="#" variant=" button button-icon bg-warning rounded" target="_blank">6</Button>
                           </ButtonGroup>
                        </li>
                     </ul>
                  </Card.Body>
               </Card>
            </Col>
            <Col sm="12" md="6" lg="4">
               <Card className="card-block card-stretch card-height blog">
                  <Card.Header>
                     <Card.Header.Title>
                        <h4 className="card-title">Basic Buttons</h4>
                     </Card.Header.Title>
                     <Card.Header.Action>
                        <i  type="button" onClick={() => setOpen7(!open7)}>
                           <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                           </svg>
                        </i>
                     </Card.Header.Action>
                  </Card.Header>
                  <Card.Body>
                     <Collapse in={open7}>
                        <div>
                           <Card><kbd className="bg-dark"><pre id="basic-button" className="text-white"><code>{`
<ButtonGroup size="sm" className="btn-group-toggle btn-group-edges"> 
   <Button href="#" variant=" button button-icon bg-primary" target="_blank">Left</Button>
   <Button href="#" variant=" button button-icon bg-primary" target="_blank">Middle</Button>
   <Button href="#" variant=" button button-icon bg-primary" target="_blank">Right</Button>
</ButtonGroup>
                           `}
                           </code></pre></kbd></Card>
                        </div>
                        </Collapse>
                     <ul className="list-inline p-0 m-0 text-center">
                        <li className="mb-2">
                           <ButtonGroup size="sm" className="btn-group-toggle btn-group-edges"> 
                              <Button href="#" variant=" button button-icon bg-primary" target="_blank">Left</Button>
                              <Button href="#" variant=" button button-icon bg-primary" target="_blank">Middle</Button>
                              <Button href="#" variant=" button button-icon bg-primary" target="_blank">Right</Button>
                           </ButtonGroup>
                        </li>
                        <li className="mb-2">
                           <ButtonGroup className="btn-group-toggle  btn-group-edges"> 
                              <Button href="#" variant=" button button-icon bg-success" target="_blank">Left</Button>
                              <Button href="#" variant=" button button-icon bg-success" target="_blank">Middle</Button>
                              <Button href="#" variant=" button button-icon bg-success" target="_blank">Right</Button>
                           </ButtonGroup>
                        </li>
                        <li>
                           <ButtonGroup size="lg" className="btn-group-toggle btn-group-edges"> 
                              <Button href="#" variant=" button button-icon bg-warning" target="_blank">Left</Button>
                              <Button href="#" variant=" button button-icon bg-warning" target="_blank">Middle</Button>
                              <Button href="#" variant=" button button-icon bg-warning" target="_blank">Right</Button>
                           </ButtonGroup>
                        </li>
                     </ul>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </Container>
        </>
    )
}

export default UiButtonGroups;