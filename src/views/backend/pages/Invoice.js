import React from 'react'
import {Container,Row,Col,Button,Form,OverlayTrigger,Tooltip} from 'react-bootstrap'
import  Card from '../../../components/Card'
import { Link } from 'react-router-dom'

// img
import  user1  from  '../../../assets/images/user/1.jpg'
import  user2  from  '../../../assets/images/user/2.jpg'
import  user3  from  '../../../assets/images/user/3.jpg'
import  user4  from  '../../../assets/images/user/4.jpg'
import  user5  from  '../../../assets/images/user/5.jpg'
import  user6  from  '../../../assets/images/user/6.jpg'

const Invoices=[
    {
        user:`${user1}`,
        name:'Christian Bale',
        email:'christian.Bale@blueberrye.com',
        date:'01 Jan 2021',
        id:'IN-325560',
        total:'$104.98',
        status:'Paid',
        color:'text-success'
    },
    {
        user:`${user2}`,
        name:'Matt Damon',
        email:'mattdamon@blueberry.com',
        date:'02 Jan 2021',
        id:'IN-120010',
        total:'$99.00',
        status:'Paid',
        color:'text-success'
    },
    {
        user:`${user3}`,
        name:'Caitriona Balfe',
        email:'caitrionabalfe204@blueberry.com',
        date:'02 Jan 2021',
        id:'IN-125623',
        total:'$249.49',
        status:'Pending',
        color:'text-warning'
    },
    {
        user:`${user4}`,
        name:'Josh Lucas',
        email:'joshlucas007@blueberry.com',
        date:'02 Jan 2021',
        id:'IN-662210',
        total:'$9.99',
        status:'Paid',
        color:'text-success'
    },
    {
        user:`${user5}`,
        name:'Jon Bernthal',
        email:'jon.Bernthal@blueberry.com',
        date:'03 Jan 2021',
        id:'IN-901020',
        total:'$90.49',
        status:'Cancelled',
        color:'text-danger'
    },
    {
        user:`${user6}`,
        name:'Noah Jupe',
        email:'nnoahjupe@blueberry.com',
        date:'05 Jan 2021',
        id:'IN-902210',
        total:'$39.99',
        status:'Paid',
        color:'text-success'
    },
    {
        user:`${user3}`,
        name:'Tracy Letts',
        email:'tracyetts@blueberry.com',
        date:'06 Jan 2021',
        id:'IN-902559',
        total:'$19.22',
        status:'Pending',
        color:'text-warning'
    },
    {
        user:`${user5}`,
        name:'Ray McKinnon',
        email:'raymcKinnon@blueberry.com',
        date:'09 Jan 2021',
        id:'IN-911211',
        total:'$102.9',
        status:'Cancelled',
        color:'text-danger'
    },
    {
        user:`${user4}`,
        name:'Remo Girone',
        email:'remo.girone420@blueberry.com',
        date:'10 Jan 2021',
        id:'IN-902559',
        total:'$13.99',
        status:'Paid',
        color:'text-success'
    },
    {
        user:`${user2}`,
        name:'Jack McMullen',
        email:'jackmullen@blueberry.com',
        date:'12 Jan 2021',
        id:'IN-302240',
        total:'$25.99',
        status:'Paid',
        color:'text-success'
    },
]
const Invoice = () => {
    return (
        <>
 <Container fluid>
        <Row>
            
            <Col lg="12">
                <div className="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4">
                   <div className="d-flex align-items-center justify-content-between">
                        <h4 className="font-weight-bold">All Invoice</h4>
                    </div>  
                    <div className="create-workform">
                        <div className="d-flex flex-wrap align-items-center justify-content-between">
                            <div className="modal-product-search d-flex">
                                <Form className="mr-3 position-relative">
                                    <Form.Group className="mb-0">
                                    <Form.Control type="text" className="form-control" id="exampleInputText" placeholder="Search Invoice"/>
                                    <Link className="search-link" to="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </Link>
                                    </Form.Group>
                                </Form>
                                <Link to="/invoice-view" className="btn btn-primary position-relative d-flex align-items-center justify-content-between">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add Invoice
                                </Link>
                            </div>
                        </div>
                    </div>                    
                </div>
                
                <Row>
                    <Col lg="12">
                        <Card className="card-block card-stretch">
                            <Card.Body className="p-0">
                                <div className="d-flex justify-content-between align-items-center p-3">
                                    <h5 className="font-weight-bold">Invoices List</h5>
                                    <Button variant="btn btn-secondary btn-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-1" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Export
                                    </Button>
                                </div>
                                <div className="table-responsive">
                                    <table className="table data-table mb-0">
                                        <thead className="table-color-heading">
                                            <tr className="text-light">                                                
                                                <th scope="col" className="pr-0 w-01">
                                                    <div className="d-flex justify-content-start align-items-end mb-1">
                                                        <div className="custom-control custom-checkbox custom-control-inline">
                                                        <input type="checkbox" className="custom-control-input m-0" id="customCheck"/>
                                                        <label className="custom-control-label" htmlFor="customCheck"></label>
                                                        </div>
                                                    </div>                                                    
                                                </th>
                                                <th scope="col">
                                                    <label className="text-muted m-0" >Customer</label>
                                                     {/* <input type="text" className="form-control mt-2" id="text1" aria-describedby="textHelp" placeholder="Customer"> */}
                                                </th>
                                                <th scope="col" className="dates">
                                                    <label className="text-muted mb-0" >Date</label>
                                                    {/* <input type="text" className="form-control" id="usr1" name="event_date" placeholder="Enter Date" autocomplete="off" aria-describedby="basic-addon2"> */}
                                                </th>
                                                <th scope="col">
                                                    <label className="text-muted mb-0" >ID</label>
                                                {/* <input type="text" className="form-control mt-2" id="text2" aria-describedby="textHelp" placeholder="ID"> */}
                                                </th>
                                                <th scope="col" className="text-right">
                                                    <label className="text-muted mb-0">Total</label>
                                                 {/* <input type="text" className="form-control mt-2" id="text3" aria-describedby="textHelp" placeholder="Total"> */}
                                                </th>
                                                <th scope="col">
                                                    <label className="text-muted mb-0" >Status</label>
                                                    {/* <select id="validationServer02" className="custom-select custom-select-sm mt-2">
                                                        <option selected>Status</option>
                                                        <option value="1">Paid</option>
                                                        <option value="2">Pending</option>
                                                        <option value="3">Cancelled</option>
                                                    </select> */}
                                                </th>
                                                <th scope="col" className="text-right">
                                                    <span className="text-muted" >Action</span>
                                                    {/* <p className="text-muted"></p> */}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                                    Invoices.map( (item) => (
                                            <tr key={item.name} className="white-space-no-wrap">
                                                <td className="pr-0">
                                                    <div className="custom-control custom-checkbox custom-control-inline">
                                                    <input type="checkbox" className="custom-control-input m-0" id="customCheck1"/>
                                                    <label className="custom-control-label" htmlFor="customCheck1"></label>
                                                    </div>                                    
                                                </td>
                                                <td className="">
                                                    <div className="active-project-1 d-flex align-items-center mt-0 ">
                                                        <div className="h-avatar is-medium">
                                                            <img className="avatar rounded-circle" alt="user-icon" src={item.user}/>
                                                        </div>
                                                        <div className="data-content">
                                                            <div>
                                                            <span className="font-weight-bold">{item.name}</span>                           
                                                            </div>
                                                            <p className="m-0 text-secondary small">
                                                            {item.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{item.date}</td>
                                                <td>
                                                    {item.id}
                                                </td>
                                                <td className="text-right">
                                                    {item.total}
                                                </td>
                                                <td>
                                                    <p className={`mb-0 ${item.color} font-weight-bold d-flex justify-content-start align-items-center`}>
                                                        <small><svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">                                                
                                                        <circle cx="12" cy="12" r="8" fill="#3cb72c"></circle></svg>
                                                        </small>{item.status}
                                                    </p>
                                                </td>
                                                <td>
                                                    <div className="d-flex justify-content-end align-items-center">   
                                                    <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>} >                                                     
                                                        <Link className="" to="/invoice-view">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </Link>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Print</Tooltip>} >
                                                        <Link className="" data-toggle="tooltip" data-placement="top" title="" data-original-title="Print" to="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                                            </svg>
                                                        </Link>
                                                    </OverlayTrigger>
                                                    </div>
                                                </td>
                                            </tr>
                                             ))

                                            }
                                            {/* <tr className="white-space-no-wrap">
                                                <td className="pr-0">
                                                    <div className="custom-control custom-checkbox custom-control-inline">
                                                    <input type="checkbox" className="custom-control-input m-0" id="customCheck2"/>
                                                    <label className="custom-control-label" htmlFor="customCheck2"></label>
                                                    </div>
                                                </td>
                                                <td className="">
                                                    <div className="active-project-1 d-flex align-items-center mt-0 ">
                                                        <div className="h-avatar is-medium">
                                                            <img className="avatar rounded-circle" alt="user-icon" src={user2}/>
                                                        </div>
                                                        <div className="data-content">
                                                            <div>
                                                            <span className="font-weight-bold">Matt Damon</span>                           
                                                            </div>
                                                            <p className="m-0 text-secondary small">
                                                            mattdamon@blueberry.com
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>02 Jan 2021</td>
                                                <td>
                                                    IN-120010
                                                </td>
                                                <td className="text-right">
                                                    $99.00
                                                </td>
                                                <td>
                                                    <p className="mb-0 text-success font-weight-bold d-flex justify-content-start align-items-center">
                                                        <small><svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">                                                
                                                        <circle cx="12" cy="12" r="8" fill="#3cb72c"></circle></svg>
                                                        </small>Paid
                                                    </p>
                                                </td>
                                                <td>
                                                    <div className="d-flex justify-content-end align-items-center">                                                        
                                                        <Link className="" data-toggle="tooltip" data-placement="top" title="" data-original-title="View" to="/invoice-view">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </Link>
                                                        <Link className="" data-toggle="tooltip" data-placement="top" title="" data-original-title="Print" to="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="white-space-no-wrap">
                                                <td className="pr-0">
                                                    <div className="custom-control custom-checkbox custom-control-inline">
                                                    <input type="checkbox" className="custom-control-input m-0" id="customCheck3"/>
                                                    <label className="custom-control-label" htmlFor="customCheck3"></label>
                                                    </div>
                                                </td>
                                                <td className="">
                                                    <div className="active-project-1 d-flex align-items-center mt-0 ">
                                                        <div className="h-avatar is-medium">
                                                            <img className="avatar rounded-circle"  alt="user-icon" src={user3}/>
                                                        </div>
                                                        <div className="data-content">
                                                            <div>
                                                            <span className="font-weight-bold">Caitriona Balfe</span>                           
                                                            </div>
                                                            <p className="m-0 text-secondary small">
                                                            caitrionabalfe204@blueberry.com
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>02 Jan 2021</td>
                                                <td>
                                                    IN-125623
                                                </td>
                                                <td className="text-right">
                                                    $249.49
                                                </td>
                                                <td>
                                                    <p className="mb-0 text-warning font-weight-bold d-flex justify-content-start align-items-center">
                                                        <small><svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">                                                
                                                        <circle cx="12" cy="12" r="8" fill="#db7e06"></circle></svg>
                                                        </small>Pending
                                                    </p>
                                                </td>
                                                <td>
                                                    <div className="d-flex justify-content-end align-items-center">                                                        
                                                        <Link className="" data-toggle="tooltip" data-placement="top" title="" data-original-title="View" to="/invoice-view">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </Link>
                                                        <Link className="" data-toggle="tooltip" data-placement="top" title="" data-original-title="Print" to="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="white-space-no-wrap">
                                                <td className="pr-0">
                                                    <div className="custom-control custom-checkbox custom-control-inline">
                                                    <input type="checkbox" className="custom-control-input m-0" id="customCheck4"/>
                                                    <label className="custom-control-label" htmlFor="customCheck4"></label>
                                                    </div>
                                                </td>
                                                <td className="">
                                                    <div className="active-project-1 d-flex align-items-center mt-0 ">
                                                        <div className="h-avatar is-medium">
                                                            <img className="avatar rounded-circle" alt="user-icon" src={user4}/>
                                                        </div>
                                                        <div className="data-content">
                                                            <div>
                                                            <span className="font-weight-bold">Josh Lucas</span>                           
                                                            </div>
                                                            <p className="m-0 text-secondary small">
                                                            joshlucas007@blueberry.com
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>02 Jan 2021</td>
                                                <td>
                                                    IN-662210
                                                </td>
                                                <td className="text-right">
                                                    $9.99
                                                </td>
                                                <td>
                                                    <p className="mb-0 text-success font-weight-bold d-flex justify-content-start align-items-center">
                                                        <small><svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">                                                
                                                        <circle cx="12" cy="12" r="8" fill="#3cb72c"></circle></svg>
                                                        </small>Paid
                                                    </p>
                                                </td>
                                                <td>
                                                    <div className="d-flex justify-content-end align-items-center">                                                        
                                                        <Link className="" data-toggle="tooltip" data-placement="top" title="" data-original-title="View" to="/invoice-view">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </Link>
                                                        <Link className="" data-toggle="tooltip" data-placement="top" title="" data-original-title="Print" to="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="white-space-no-wrap">
                                                <td className="pr-0">
                                                    <div className="custom-control custom-checkbox custom-control-inline">
                                                    <input type="checkbox" className="custom-control-input m-0" id="customCheck5"/>
                                                    <label className="custom-control-label" htmlFor="customCheck5"></label>
                                                    </div>
                                                </td>
                                                <td className="">
                                                    <div className="active-project-1 d-flex align-items-center mt-0 ">
                                                        <div className="h-avatar is-medium">
                                                            <img className="avatar rounded-circle" alt="user-icon" src={user5}/>
                                                        </div>
                                                        <div className="data-content">
                                                            <div>
                                                            <span className="font-weight-bold">Jon Bernthal</span>                           
                                                            </div>
                                                            <p className="m-0 text-secondary small">
                                                            jon.Bernthal@blueberry.com
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>03 Jan 2021</td>
                                                <td>
                                                    IN-901020
                                                </td>
                                                <td className="text-right">
                                                    $90.49
                                                </td>
                                                <td>
                                                    <p className="mb-0 text-danger font-weight-bold d-flex justify-content-start align-items-center">
                                                        <small><svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">                                                
                                                        <circle cx="12" cy="12" r="8" fill="#F42B3D"></circle></svg>
                                                        </small>Cancelled
                                                    </p>
                                                </td>
                                                <td>
                                                    <div className="d-flex justify-content-end align-items-center">                                                        
                                                        <Link className="" data-toggle="tooltip" data-placement="top" title="" data-original-title="View" to="/invoice-view">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </Link>
                                                        <Link className="" data-toggle="tooltip" data-placement="top" title="" data-original-title="Print" to="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="white-space-no-wrap">
                                                <td className="pr-0">
                                                    <div className="custom-control custom-checkbox custom-control-inline">
                                                    <input type="checkbox" className="custom-control-input m-0" id="customCheck6"/>
                                                    <label className="custom-control-label" htmlFor="customCheck6"></label>
                                                    </div>
                                                </td>
                                                <td className="">
                                                    <div className="active-project-1 d-flex align-items-center mt-0 ">
                                                        <div className="h-avatar is-medium">
                                                            <img className="avatar rounded-circle" alt="user-icon" src={user6}/>
                                                        </div>
                                                        <div className="data-content">
                                                            <div>
                                                            <span className="font-weight-bold">Noah Jupe</span>                           
                                                            </div>
                                                            <p className="m-0 text-secondary small">
                                                            nnoahjupe@blueberry.com
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>05 Jan 2021</td>
                                                <td>
                                                    IN-902210
                                                </td>
                                                <td className="text-right">
                                                    $39.99
                                                </td>
                                                <td>
                                                    <p className="mb-0 text-success font-weight-bold d-flex justify-content-start align-items-center">
                                                        <small><svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">                                                
                                                        <circle cx="12" cy="12" r="8" fill="#3cb72c"></circle></svg>
                                                        </small>Paid
                                                    </p>
                                                </td>
                                                <td>
                                                    <div className="d-flex justify-content-end align-items-center">                                                        
                                                        <Link className="" data-toggle="tooltip" data-placement="top" title="" data-original-title="View" to="/invoice-view">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </Link>
                                                        <Link className="" data-toggle="tooltip" data-placement="top" title="" data-original-title="Print" to="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="white-space-no-wrap">
                                                <td className="pr-0">
                                                    <div className="custom-control custom-checkbox custom-control-inline">
                                                    <input type="checkbox" className="custom-control-input m-0" id="customCheck7"/>
                                                    <label className="custom-control-label" htmlFor="customCheck7"></label>
                                                    </div>
                                                </td>
                                                <td className="">
                                                    <div className="active-project-1 d-flex align-items-center mt-0 ">
                                                        <div className="h-avatar is-medium">
                                                            <img className="avatar rounded-circle" alt="user-icon" src={user3}/>
                                                        </div>
                                                        <div className="data-content">
                                                            <div>
                                                            <span className="font-weight-bold">Tracy Letts</span>                           
                                                            </div>
                                                            <p className="m-0 text-secondary small">
                                                            tracyetts@blueberry.com
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>06 Jan 2021</td>
                                                <td>
                                                    IN-902559
                                                </td>
                                                <td className="text-right">
                                                    $19.22
                                                </td>
                                                <td>
                                                    <p className="mb-0 text-warning font-weight-bold d-flex justify-content-start align-items-center">
                                                        <small><svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">                                                
                                                        <circle cx="12" cy="12" r="8" fill="#db7e06"></circle></svg>
                                                        </small>Pending
                                                    </p>
                                                </td>
                                                <td>
                                                    <div className="d-flex justify-content-end align-items-center">                                                        
                                                        <Link className="" data-toggle="tooltip" data-placement="top" title="" data-original-title="View" to="/invoice-view">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </Link>
                                                        <Link className="" data-toggle="tooltip" data-placement="top" title="" data-original-title="Print" to="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="white-space-no-wrap">
                                                <td className="pr-0">
                                                    <div className="custom-control custom-checkbox custom-control-inline">
                                                    <input type="checkbox" className="custom-control-input m-0" id="customCheck8"/>
                                                    <label className="custom-control-label" htmlFor="customCheck8"></label>
                                                    </div>
                                                </td>
                                                <td className="">
                                                    <div className="active-project-1 d-flex align-items-center mt-0 ">
                                                        <div className="h-avatar is-medium">
                                                            <img className="avatar rounded-circle" alt="user-icon" src={user5}/>
                                                        </div>
                                                        <div className="data-content">
                                                            <div>
                                                            <span className="font-weight-bold">Ray McKinnon</span>                           
                                                            </div>
                                                            <p className="m-0 text-secondary small">
                                                            raymcKinnon@blueberry.com
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>09 Jan 2021</td>
                                                <td>
                                                    IN-911211
                                                </td>
                                                <td className="text-right">
                                                    $102.9
                                                </td>
                                                <td>
                                                    <p className="mb-0 text-danger font-weight-bold d-flex justify-content-start align-items-center">
                                                        <small><svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">                                                
                                                        <circle cx="12" cy="12" r="8" fill="#F42B3D"></circle></svg>
                                                        </small>Cancelled
                                                    </p>
                                                </td>
                                                <td>
                                                    <div className="d-flex justify-content-end align-items-center">                                                        
                                                        <Link className="" data-toggle="tooltip" data-placement="top" title="" data-original-title="View" to="/invoice-view">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </Link>
                                                        <Link className="" data-toggle="tooltip" data-placement="top" title="" data-original-title="Print" to="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="white-space-no-wrap">
                                                <td className="pr-0">
                                                    <div className="custom-control custom-checkbox custom-control-inline">
                                                    <input type="checkbox" className="custom-control-input m-0" id="customCheck9"/>
                                                    <label className="custom-control-label" htmlFor="customCheck9"></label>
                                                    </div>
                                                </td>
                                                <td className="">
                                                    <div className="active-project-1 d-flex align-items-center mt-0 ">
                                                        <div className="h-avatar is-medium">
                                                            <img className="avatar rounded-circle" alt="user-icon" src={user4}/>
                                                        </div>
                                                        <div className="data-content">
                                                            <div>
                                                            <span className="font-weight-bold">Remo Girone</span>                           
                                                            </div>
                                                            <p className="m-0 text-secondary small">
                                                            remo.girone420@blueberry.com
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>10 Jan 2021</td>
                                                <td>
                                                    IN-902559
                                                </td>
                                                <td className="text-right">
                                                    $13.99
                                                </td>
                                                <td>
                                                    <p className="mb-0 text-success font-weight-bold d-flex justify-content-start align-items-center">
                                                        <small><svg xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">                                                
                                                        <circle cx="12" cy="12" r="8" fill="#3cb72c"></circle></svg>
                                                        </small>Paid
                                                    </p>
                                                </td>
                                                <td>
                                                    <div className="d-flex justify-content-end align-items-center">                                                        
                                                        <Link className="" data-toggle="tooltip" data-placement="top" title="" data-original-title="View" to="/invoice-view">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </Link>
                                                        <Link className="" data-toggle="tooltip" data-placement="top" title="" data-original-title="Print" to="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="white-space-no-wrap">
                                                <td className="pr-0">
                                                    <div className="custom-control custom-checkbox custom-control-inline">
                                                    <input type="checkbox" className="custom-control-input m-0" id="customCheck10"/>
                                                    <label className="custom-control-label" htmlFor="customCheck10"></label>
                                                    </div>
                                                </td>
                                                <td className="">
                                                    <div className="active-project-1 d-flex align-items-center mt-0 ">
                                                        <div className="h-avatar is-medium">
                                                            <img className="avatar rounded-circle" alt="user-icon" src={user2}/>
                                                        </div>
                                                        <div className="data-content">
                                                            <div>
                                                            <span className="font-weight-bold">Jack McMullen</span>                           
                                                            </div>
                                                            <p className="m-0 text-secondary small">
                                                            jackmullen@blueberry.com
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>12 Jan 2021</td>
                                                <td>
                                                    IN-302240
                                                </td>
                                                <td className="text-right">
                                                    $25.99
                                                </td>
                                                <td>
                                                    <p className="mb-0 text-success font-weight-bold d-flex justify-content-start align-items-center">
                                                        <small><svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" fill="none">                                                
                                                        <circle cx="12" cy="12" r="8" fill="#3cb72c"></circle></svg>
                                                        </small>Paid
                                                    </p>
                                                </td>
                                                <td>
                                                    <div className="d-flex justify-content-end align-items-center">                                                        
                                                        <Link className="" data-toggle="tooltip" data-placement="top" title="" data-original-title="View" to="/invoice-view">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mx-4" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </Link>
                                                        <Link className="" data-toggle="tooltip" data-placement="top" title="" data-original-title="Print" to="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
        </>
    )
}

export default Invoice;