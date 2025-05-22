import React from 'react'
import {Link } from 'react-router-dom'
import { Dropdown ,OverlayTrigger,Tooltip} from 'react-bootstrap'

const TodoBoardCard = (props) =>{
        return(
             
            <div id={`draggable-item-${props.id}`}>
                <div className={`draggable-item todo-board-card ${props.className} `}>
                    <div className="item-body">
                        <div>
                            <small>{`Project > List`}</small>
                            <h5>{props.title}</h5>
                            <p className="text-ellipsis short-1 mb-0 mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                        <div>
                            <div className="rounded">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Assign To</Tooltip>} >
                                    <Link to="#">
                                        <svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </Link>
                                </OverlayTrigger>
                            </div>
                        </div>
                    </div>
                    <div className="item-footer">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex">
                                <div className="pr-3">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Due Date</Tooltip>} >
                                    <Link to="#">
                                        <svg className="svg-icon" width="18" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </Link>
                                </OverlayTrigger>
                                </div>
                                <div className="pr-3">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Set Priority</Tooltip>} >
                                    <Link to="#">
                                    <svg className="svg-icon" width="18" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                                    </svg>
                                    </Link>
                                </OverlayTrigger>
                                </div>
                                <div className="pr-3">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Tag</Tooltip>} >
                                    <Link to="#">
                                    <svg className="svg-icon" width="18" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    </Link>
                                </OverlayTrigger>
                                </div>
                                <div className="pr-3">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Estimated Time</Tooltip>} >
                                    <Link to="#">
                                    <svg className="svg-icon" width="18" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    </Link>
                                </OverlayTrigger>
                                </div>
                            </div>
                            <Dropdown>
                                <Dropdown.Toggle as="div"  bsPrefix=" text-primary pl-3" id={`dropdownMenuButton-${props.id}`}>
                                        <svg className="svg-icon" width="18" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                        </svg>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item   href="#">
                                        <svg className="svg-icon text-primary" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item  href="#">
                                        <svg className="svg-icon text-primary" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        View
                                    </Dropdown.Item>
                                    <Dropdown.Item  href="#">
                                        <svg className="svg-icon text-primary" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
                
            )
}

export default TodoBoardCard;