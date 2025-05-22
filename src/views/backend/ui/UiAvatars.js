import React,{ useState }  from 'react'
import {Link} from 'react-router-dom'
import {Container,Row,Col,Collapse} from 'react-bootstrap'
import  Card from '../../../components/Card'

//img
import user1 from '../../../assets/images/user/1.jpg'
import user5 from '../../../assets/images/user/5.jpg'
import user6 from '../../../assets/images/user/6.jpg'
import user7 from '../../../assets/images/user/1.jpg'
const UiAvatars = () =>{
    //Collapse state
    const[open,setOpen]=useState(false)
    const[open1,setOpen1]=useState(false)
    const[open2,setOpen2]=useState(false)
    const[open3,setOpen3]=useState(false)
    const[open4,setOpen4]=useState(false)
    const[open5,setOpen5]=useState(false)
    return(
        <>
         <Container fluid >
            <Row>
                <Col lg="6">
                    <Card className="card-block card-stretch card-height">
                        <Card.Header>
                            <Card.Header.Title>
                                <h4 className="card-title">Avatar Sizing</h4>
                            </Card.Header.Title>
                            <Card.Header.Action>
                                <i  type="button"  onClick={()=> setOpen(!open)}>
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
<div className="iq-avatars d-flex flex-wrap align-items-center">
    <div className="iq-avatar">
        <img className="avatar-100 rounded" src={user1} alt="#"  />
    </div>
</div>`}
                                        </code></pre></kbd></Card>
                                </div>
                            </Collapse>
                            <div className="iq-avatars d-flex flex-wrap align-items-center">
                                <div className="iq-avatar">
                                    <img className="avatar-100 rounded" src={user1} alt="#"  />
                                </div>
                                <div className="iq-avatar">
                                    <img className="avatar-90 rounded" src={user1} alt="#"  />
                                </div>
                                <div className="iq-avatar">
                                    <img className="avatar-80 rounded" src={user1} alt="#"  />
                                </div>
                                <div className="iq-avatar">
                                    <img className="avatar-70 rounded" src={user1} alt="#"  />
                                </div>
                                <div className="iq-avatar">
                                    <img className="avatar-60 rounded" src={user1} alt="#"  />
                                </div>
                                <div className="iq-avatar">
                                    <img className="avatar-50 rounded" src={user1} alt="#"  />
                                </div>
                                <div className="iq-avatar">
                                    <img className="avatar-40 rounded" src={user1} alt="#"  />
                                </div>
                                <div className="iq-avatar">
                                    <img className="avatar-30 rounded" src={user1} alt="#"  />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg="6">
                <Card className="card-block card-stretch card-height">
                    <Card.Header>
                        <Card.Header.Title>
                            <h4 className="card-title">Shape Rounded</h4>
                        </Card.Header.Title>
                        <Card.Header.Action>
                            <i  type="button" onClick={()=> setOpen1(!open1)}>
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
<div className="iq-avatars d-flex flex-wrap align-items-center">
    <div className="iq-avatar">
        <img className="avatar-80 rounded" src={user1} alt="#"  />
    </div>
</div>`}
                                    </code></pre></kbd></Card>
                             </div>
                        </Collapse>
                        <div className="iq-avatars d-flex flex-wrap align-items-center">
                            <div className="iq-avatar">
                                <img className="avatar-80 rounded" src={user1} alt="#"  />
                            </div>
                            <div className="iq-avatar">
                                <img className="avatar-70 rounded" src={user1} alt="#"  />
                            </div>
                            <div className="iq-avatar">
                                <img className="avatar-60 rounded" src={user1} alt="#"  />
                            </div>
                            <div className="iq-avatar">
                                <img className="avatar-50 rounded" src={user1} alt="#"  />
                            </div>
                            <div className="iq-avatar">
                                <img className="avatar-40 rounded" src={user1} alt="#"  />
                            </div>
                            <div className="iq-avatar">
                                <img className="avatar-30 rounded" src={user1} alt="#"  />
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                </Col>
                <Col lg="6">
                <Card className="card-block card-stretch card-height">
                    <Card.Header>
                        <Card.Header.Title>
                            <h4 className="card-title">Shape Rounded Circle</h4>
                        </Card.Header.Title>
                        <Card.Header.Action>
                            <i  type="button" data-toggle="collapse" onClick={() => setOpen2(!open2)}>
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
<div className="iq-avatars d-flex flex-wrap align-items-center">
    <div className="iq-avatar">
        <img className="avatar-80 rounded-small" src={user1} alt="#" />
    </div>
</div>`}
                                </code></pre></kbd></Card>
                            </div>
                         </Collapse>
                        <div className="iq-avatars d-flex flex-wrap align-items-center">
                            <div className="iq-avatar">
                                <img className="avatar-80 rounded-small" src={user1} alt="#" />
                            </div>
                            <div className="iq-avatar">
                                <img className="avatar-70 rounded-small" src={user1} alt="#" />
                            </div>
                            <div className="iq-avatar">
                                <img className="avatar-60 rounded-small" src={user1} alt="#" />
                            </div>
                            <div className="iq-avatar">
                                <img className="avatar-50 rounded-small" src={user1} alt="#" />
                            </div>
                            <div className="iq-avatar">
                                <img className="avatar-40 rounded-small" src={user1} alt="#" />
                            </div>
                            <div className="iq-avatar">
                                <img className="avatar-30 rounded-small" src={user1} alt="#" />
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                </Col>
                <Col lg="6">
                <Card className="card-block card-stretch card-height">
                    <Card.Header>
                        <Card.Header.Title>
                            <h4 className="card-title">Image Initials</h4>
                        </Card.Header.Title>
                    <Card.Header.Action>
                        <i  type="button" onClick={() => setOpen3(!open3)}>
                            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </i>    
                    </Card.Header.Action>
                    </Card.Header>
                    <Card.Body>
                        <Collapse in={open3}>
                            <div>
                                <Card><kbd className="bg-dark"><pre className="text-white"><code> {`
<div className="iq-avatars d-flex flex-wrap align-items-center">
    <div className="iq-avatar">
        <img className="avatar-100 rounded" src={user1} alt="#" />
    </div>
</div>`}
                                </code></pre></kbd></Card>
                            </div>
                        </Collapse>
                        <div className="iq-avatars d-flex flex-wrap align-items-center">
                            <div className="iq-avatar">
                                <img className="avatar-100 rounded" src={user1} alt="#" />
                            </div>
                            <div className="iq-avatar">
                                <img className="avatar-90 rounded" src={user1} alt="#" />
                            </div>
                            <div className="iq-avatar">
                                <img className="avatar-80 rounded" src={user1} alt="#" />
                            </div>
                            <div className="iq-avatar">
                                <img className="avatar-70 rounded" src={user1} alt="#" />
                            </div>
                            <div className="iq-avatar">
                                <img className="avatar-60 rounded" src={user1} alt="#" />
                            </div>
                            <div className="iq-avatar">
                                <img className="avatar-50 rounded" src={user1} alt="#" />
                            </div>
                            <div className="iq-avatar">
                                <img className="avatar-40 rounded" src={user1} alt="#" />
                            </div>
                            <div className="iq-avatar">
                                <img className="avatar-30 rounded" src={user1} alt="#" />
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                </Col>
                <Col lg="6">
                <Card className="card-block card-stretch card-height">
                    <Card.Header>
                        <Card.Header.Title>
                            <h4 className="card-title">Status Indicator</h4>
                        </Card.Header.Title>
                    <Card.Header.Action>
                        <i  type="button" onClick={() => setOpen4(!open4)}>
                            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </i>
                    </Card.Header.Action>
                    </Card.Header>
                    <Card.Body>
                        <Collapse in={open4}>
                            <div>
                                <Card><kbd className="bg-dark"><pre id="status-indicator" className="text-white"><code>{`
<div className="iq-avatars d-flex flex-wrap align-items-center">
    <div className="iq-avatar">
        <img className="avatar-80 rounded" src={user1} alt="#" /> <span className="bg-success iq-dots dots-100"></span>
    </div>
</div>`}
                                </code></pre></kbd></Card>
                            </div>
                        </Collapse>
                        <div className="iq-avatars d-flex flex-wrap align-items-center">
                            <div className="iq-avatar">
                                <img className="avatar-80 rounded" src={user1} alt="#" /> <span className="bg-success iq-dots dots-100"></span>
                            </div>
                            <div className="iq-avatar">
                                <img className="avatar-70 rounded" src={user1} alt="#" /> <span className="iq-dots dots-90"></span>
                            </div>
                            <div className="iq-avatar">
                                <img className="avatar-60 rounded" src={user1} alt="#" /> <span className="bg-success iq-dots dots-80"></span>
                            </div>
                            <div className="iq-avatar">
                                <img className="avatar-50 rounded" src={user1} alt="#" /> <span className="iq-dots dots-80"></span>
                            </div>
                            <div className="iq-avatar">
                                <img className="avatar-40 rounded" src={user1} alt="#" /> <span className="bg-success iq-dots dots-80"></span>
                            </div>
                            <div className="iq-avatar">
                                <img className="avatar-30 rounded" src={user1} alt="#" /> <span className="iq-dots dots-80"></span>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                </Col>
                <Col lg="6">
                <Card className="card-block card-stretch card-height">
                    <Card.Header>
                        <Card.Header.Title>
                            <h4 className="card-title">Image Groups</h4>
                        </Card.Header.Title>
                        <Card.Header.Action>
                            <i  type="button"  onClick={() => setOpen5(!open5)}>
                                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </i>
                        </Card.Header.Action>
                    </Card.Header>
                    <Card.Body>
                        <Collapse in={open5}>
                            <div>
                                <Card><kbd className="bg-dark"><pre  className="text-white"><code>{`
<div className="iq-avatars d-flex flex-wrap align-items-center">
    <div className="iq-avatar">
        <div className="iq-media-group">
            <Link to="/"  onClick={ e => e.preventDefault()} className="iq-media">
                <img className="img-fluid avatar-60 rounded" src={user5} alt="" />
            </Link>
            <Link to="/"  onClick={ e => e.preventDefault()} className="iq-media">
                <img className="img-fluid avatar-60 rounded" src={user6} alt="" />
            </Link>
            <Link to="/"  onClick={ e => e.preventDefault()} className="iq-media">
                <img className="img-fluid avatar-60 rounded" src={user7} alt="" />
            </Link>
        </div>
    </div>
</div>`}
                                </code></pre></kbd></Card>
                            </div>
                         </Collapse>
                        <div className="iq-avatars d-flex flex-wrap align-items-center">
                            <div className="iq-avatar">
                                <div className="iq-media-group">
                                    <Link to="/"  onClick={ e => e.preventDefault()} className="iq-media">
                                        <img className="img-fluid avatar-60 rounded" src={user5} alt="" />
                                    </Link>
                                    <Link to="/"  onClick={ e => e.preventDefault()} className="iq-media">
                                        <img className="img-fluid avatar-60 rounded" src={user6} alt="" />
                                    </Link>
                                    <Link to="/"  onClick={ e => e.preventDefault()} className="iq-media">
                                        <img className="img-fluid avatar-60 rounded" src={user7} alt="" />
                                    </Link>
                                </div>
                            </div>
                            <div className="iq-avatar">
                            <div className="iq-media-group">
                                <Link to="/"  onClick={ e => e.preventDefault()} className="iq-media">
                                    <img className="img-fluid avatar-50 rounded" src={user5} alt="" />
                                </Link>
                                <Link to="/"  onClick={ e => e.preventDefault()} className="iq-media">
                                    <img className="img-fluid avatar-50 rounded" src={user6} alt="" />
                                </Link>
                                <Link to="/"  onClick={ e => e.preventDefault()} className="iq-media">
                                    <img className="img-fluid avatar-50 rounded" src={user7} alt="" />
                                </Link>
                            </div>
                            </div>
                            <div className="iq-avatar">
                            <div className="iq-media-group">
                                <Link to="/"  onClick={ e => e.preventDefault()} className="iq-media">
                                    <img className="img-fluid avatar-40 rounded" src={user5} alt="" />
                                </Link>
                                <Link to="/"  onClick={ e => e.preventDefault()} className="iq-media">
                                    <img className="img-fluid avatar-40 rounded" src={user6} alt="" />
                                </Link>
                                <Link to="/"  onClick={ e => e.preventDefault()} className="iq-media">
                                    <img className="img-fluid avatar-40 rounded" src={user7} alt="" />
                                </Link>
                            </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default UiAvatars;