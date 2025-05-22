import { useState } from "react";
import { Accordion,Button } from "react-bootstrap";
import {Link,useLocation } from 'react-router-dom'


const CollapseMenu = () =>{

        let location = useLocation();
        const[activeMenu,setActiveMenu] = useState(false)
    return(
            <Accordion  as='ul' id="mm-sidebar-toggle" className="side-menu d-flex collapsemenu" onSelect={(e) => setActiveMenu(e)}>
                <li className={activeMenu === '0' ? 'active' : ''}>
                <Accordion.Toggle as={Button} href="#" variant=" collapsed" eventKey="0"  aria-expanded={activeMenu === '0' ? 'true' : 'false'}>
                    {/* <Link to="#Dashboards" className="collapsed" data-toggle="collapse" aria-expanded="false"> */}
                        <svg className="svg-icon" id="mm-dash" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 14 15 14 15 22"></polyline>
                        </svg>
                        <span className="ml-2">Dashboards</span>
                        <i className="ri-arrow-right-s-line mm-arrow-right"></i>
                    {/* </Link> */}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <ul id="Dashboards" className="mm-submenu sub-scrll" data-parent="#mm-sidebar-toggle">
                        <li className={location.pathname === "/" ? 'active' : ''}>
                            <Link to="/" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-dash-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                    </svg>
                                </i>
                                <span>Dashboard 1</span>
                            </Link>
                        </li>
                        <li className={location.pathname === "/dashboard-2" ? 'active' : ''}>
                            <Link to="/dashboard-2" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-dash-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                    </svg>
                                </i>
                                <span>Dashboard 2</span>
                            </Link>
                        </li>
                        <li className={location.pathname === "/dashboard-3" ? 'active' : ''}>
                            <Link to="/dashboard-3" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-dash-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </i>
                                <span>Dashboard 3</span>
                            </Link>
                        </li>
                    </ul>
                    </Accordion.Collapse>
                </li>
                <li className={activeMenu === '1' ? 'active' : ''}>
                    <Accordion.Toggle as={Button} href="#" bsPrefix=" svg-icon" eventKey="1" aria-expanded={activeMenu === '1' ? 'true' : 'false'}>
                        <svg className="svg-icon" id="mm-ui-1" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 16V9h14V2H5l14 14h-7m-7 0l7 7v-7m-7 0h7"></path>
                        </svg>
                        <span className="ml-2">UI Elements</span>
                        <i className="ri-arrow-right-s-line mm-arrow-right"></i>
                    </Accordion.Toggle>
                    <Accordion.Collapse  eventKey="1">
                    <ul id="ui" className="mm-submenu sub-scrll " data-parent="#mm-sidebar-toggle">
                        <li className={location.pathname === '/ui-avatars' ? 'active' : ''}>
                            <Link to="/ui-avatars" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </i>
                                <span>Avatars</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-alerts' ? 'active' :''}>
                            <Link to="/ui-alerts" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                </i>
                                <span>Alerts</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-badges' ? 'active' :''}>
                            <Link to="/ui-badges" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round"strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                </i>
                                <span>Badges</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-breadcrumb' ? 'active' :''}>
                            <Link to="/ui-breadcrumb" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </i>
                                <span>Breadcrumb</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-buttons' ? 'active' :''}>
                            <Link to="/ui-buttons" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" width="20" id="mm-ui-1-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>
                                </i>
                                <span>Buttons</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-buttons-group' ? 'active' :''}>
                            <Link to="/ui-buttons-group" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-5" width="20" heigth="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </i>
                                <span>Buttons Group</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-boxshadow' ? 'active' :''}>
                            <Link to="/ui-boxshadow" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-6" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </i>
                                <span>Box Shadow</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-colors' ? 'active' :''}>
                            <Link to="/ui-colors" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                    </svg>
                                </i>
                                <span>Colors</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-cards' ? 'active' :''}>
                            <Link to="/ui-cards" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </i>
                                <span>Cards</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-carousel' ? 'active' :''}>
                            <Link to="/ui-carousel" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-9" xmlns="http://www.w3.org/2000/svg"fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round"strokeWidth="2"d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                    </svg>
                                </i>
                                <span>Carousel</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-grid' ? 'active' :''}>
                            <Link to="/ui-grid" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-10" xmlns="http://www.w3.org/2000/svg"fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round"strokeWidth="2"d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </i>
                                <span>Grid</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-helper-classNamees' ? 'active' :''}>
                            <Link to="/ui-helper-classNamees" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-11" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </i>
                                <span>Helper classNamees</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-images' ? 'active' :''}>
                            <Link to="/ui-images" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-12" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </i>
                                <span>Images</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-list-group' ? 'active' :''}>
                            <Link to="/ui-list-group" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-13" xmlns="http://www.w3.org/2000/svg"width="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="8" y1="6" x2="21" y2="6"></line>
                                        <line x1="8" y1="12" x2="21" y2="12"></line>
                                        <line x1="8" y1="18" x2="21" y2="18"></line>
                                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                    </svg>
                                </i>
                                <span>list Group</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-media-object' ? 'active' :''}>
                            <Link to="/ui-media-object" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-14" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </i>
                                <span>Media</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-modal' ? 'active' :''}>
                            <Link to="/ui-modal" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-15" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>
                                    </svg>
                                </i>
                                <span>Modal</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-notifications' ? 'active' :''}>
                            <Link to="/ui-notifications" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </i>
                                <span>Notifications</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-pagination' ? 'active' :''}>
                            <Link to="/ui-pagination" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-17" xmlns="http://www.w3.org/2000/svg"fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round"strokeWidth="2"d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                    </svg>
                                </i>
                                <span>Pagination</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-popovers' ? 'active' :''}>
                            <Link to="/ui-popovers" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-18" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <line x1="7.5" y1="4.21" x2="7.5" y2="4.22" />
                                        <line x1="4.21" y1="7.5" x2="4.21" y2="7.51" />
                                        <line x1="3" y1="12" x2="3" y2="12.01" />
                                        <line x1="4.21" y1="16.5" x2="4.21" y2="16.51" />
                                        <line x1="7.5" y1="19.79" x2="7.5" y2="19.8" />
                                        <line x1="12" y1="21" x2="12" y2="21.01" />
                                        <line x1="16.5" y1="19.79" x2="16.5" y2="19.8" />
                                        <line x1="19.79" y1="16.5" x2="19.79" y2="16.51" />
                                        <line x1="21" y1="12" x2="21" y2="12.01" />
                                        <line x1="19.79" y1="7.5" x2="19.79" y2="7.51" />
                                        <line x1="16.5" y1="4.21" x2="16.5" y2="4.22" />
                                        <line x1="12" y1="3" x2="12" y2="3.01" />
                                    </svg>
                                </i>
                                <span>Popovers</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-progressbars' ? 'active' :''}>
                            <Link to="/ui-progressbars" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-19" xmlns="http://www.w3.org/2000/svg"width="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="12" x2="2" y2="12"></line>
                                        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                                        <line x1="6" y1="16" x2="6.01" y2="16"></line>
                                        <line x1="10" y1="16" x2="10.01" y2="16"></line>
                                    </svg>
                                </i>
                                <span>Progressbars</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-typography' ? 'active' :''}>
                            <Link to="/ui-typography" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-20" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                    </svg>
                                </i>
                                <span>Typography</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-tabs' ? 'active' :''}>
                            <Link to="/ui-tabs" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-21" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                    </svg>
                                </i>
                                <span>Tabs</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-tooltips' ? 'active' :''}>
                            <Link to="/ui-tooltips" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-22" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M4 13v-8a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v8a2 2 0 0 0 6 0v-8a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v8a8 8 0 0 1 -16 0" />
                                        <line x1="4" y1="8" x2="9" y2="8" />
                                        <line x1="15" y1="8" x2="19" y2="8" />
                                    </svg>
                                </i>
                                <span>Tooltips</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/ui-embed-video' ? 'active' :''}>
                            <Link to="/ui-embed-video" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-ui-1-23" xmlns="http://www.w3.org/2000/svg"fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round"strokeWidth="2"d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </i>
                                <span>Video</span>
                            </Link>
                        </li>
                    </ul>
                    </Accordion.Collapse>
                </li>
                <li className={activeMenu === '2' ? 'active' : ''}>
                    <Accordion.Toggle as={Button} href="#" bsPrefix=" svg-icon" eventKey="2" aria-expanded={activeMenu === '2' ? 'true' : 'false'}>
                        <svg className="svg-icon" id="mm-auth-1" width="20" xmlns="http://www.w3.org/2000/svg"fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                        <span className="ml-2">Authentication</span>
                        <i className="ri-arrow-right-s-line mm-arrow-right"></i>
                    </Accordion.Toggle>
                    <Accordion.Collapse  className="submenu" eventKey="2">
                    <ul id="auth" className="mm-submenu sub-scrll " data-parent="#mm-sidebar-toggle">
                        <li className={location.pathname === '/auth/sign-in' ? 'active' :''}>
                            <Link to="/auth/sign-in" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-auth-1-1" width="20"xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round"strokeWidth="2"d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </i>
                                <span>Login</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/auth/sign-up' ? 'active' :''}>
                            <Link to="/auth/sign-up" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-auth-1-2" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                </i>
                                <span>Register</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/auth/recoverpw' ? 'active' :''}>
                            <Link to="/auth/recoverpw" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-auth-1-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                    </svg>
                                </i>
                                <span>Recover Password</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/auth/confirm-mail' ? 'active' :''}>
                            <Link to="/auth/confirm-mail" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-auth-1-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                                    </svg>
                                </i>
                                <span>Confirm Mail</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/auth/lock-screen' ? 'active' :''}>
                            <Link to="/auth/lock-screen" className="svg-icon">
                                <i className="">
                                    <svg className="svg-icon" id="mm-auth-1-5" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                </i>
                                <span>Lock Screen</span>
                            </Link>
                        </li>
                    </ul>
                    </Accordion.Collapse>
                </li>
            </Accordion>
        )
    }
    export default CollapseMenu;