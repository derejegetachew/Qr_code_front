import { Dropdown } from 'react-bootstrap'
const Chatitem = (props) =>{
    return(
            <li className="simple-item hover" onClick={props.onClick} data-toggle-extra="tab" data-target-extra={`#user-content-${props.id}`}>
                <div className="img-container">
                    <div className="avatar avatar-60">
                        <img src={props.img} alt="users" className="img-fluid avatar-borderd avatar-rounded" />
                        <span className="avatar-status">
                            <i className="ri-checkbox-blank-circle-fill text-success"></i>
                        </span>
                    </div>
                </div>
                <div className="simple-item-body">
                    <div className="simple-item-title">
                        <h5 className="title-text">{props.name}</h5>
                        <div className="simple-item-time"> <span>{props.dateTime}</span></div>
                    </div>
                    <div className="simple-item-content">
                    <span className="simple-item-text short">
                        {props.msg}
                    </span>
                    <Dropdown>                                                        
                        <Dropdown.Toggle as="div" bsPrefix="btn btn-link" type="button" id={`chat-dropdown-${props.id}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu aria-labelledby="chat-dropdown-1">
                            <Dropdown.Item href="#">
                                <svg className="icon line text-primary" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M21,13v7a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V13H8a4,4,0,0,0,8,0Zm0,0L18,4M3,13,6,4" style={{fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2'}}></path>
                                <path d="M12,11V3m3,3L12,3,9,6" style={{fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2'}}></path>
                                </svg>
                                Move Archive
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                                <svg className="icon line text-primary" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M19.57,5.44a4.91,4.91,0,0,1,0,6.93L12,20,4.43,12.37A4.91,4.91,0,0,1,7.87,4a4.9,4.9,0,0,1,3.44,1.44,4.46,4.46,0,0,1,.69.88,4.46,4.46,0,0,1,.69-.88,4.83,4.83,0,0,1,6.88,0Z" style={{fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2'}}></path>
                                </svg>
                                Favourite
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                                <svg className="svg-icon text-primary" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
                </div>
            </li>
    )

}
export default Chatitem;