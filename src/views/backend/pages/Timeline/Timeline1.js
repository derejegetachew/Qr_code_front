import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import  Card from '../../../../components/Card'

const Timeline2 = () => {
    return (
        <>
         <Container fluid className="timeline-page">
            <Row>
              <Col lg="12">
                <Card className="card-block card-stretch card-height">
                    <Card.Body>
                        <div className="iq-timeline m-0 d-flex align-items-center justify-content-between position-relative">
                            <ul className="list-inline p-0 m-0 w-100">
                                <li>
                                    <div className="time"> <span>Jan 2020</span></div>
                                    <div className="content">
                                        <div className="timeline-dots new-timeline-dots"></div>
                                        <h6 className="mb-1">Client Login</h6>
                                        <div className="d-inline-block w-100">
                                            <p>Bonbon macaroon jelly beans gummi bears jelly lollipop apple There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="time bg-success"> <span>Feb 2020</span></div>
                                    <div className="content">
                                        <div className="timeline-dots new-timeline-dots border-success"></div>
                                        <h6 className="mb-1">Scheduled Maintenance</h6>
                                        <div className="d-inline-block w-100">
                                            <p>Bonbon macaroon jelly beans gummi bears jelly lollipop apple There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="time"> <span>March 2020</span></div>
                                    <div className="content">
                                        <div className="timeline-dots border-primary"></div>
                                        <h6 className="mb-1">Client Call</h6>
                                        <div className="d-inline-block w-100">
                                            <p>Bonbon macaroon jelly beans gummi bears jelly lollipop apple There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="time bg-success"> <span>April 2020</span>
                                    </div>
                                    <div className="content">
                                        <div className="timeline-dots border-success"></div>
                                        <h6 className="mb-1">Mega event</h6>
                                        <div className="d-inline-block w-100">
                                            <p>Bonbon macaroon jelly beans gummi bears jelly lollipop apple There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="time"> <span>March 2020</span>
                                    </div>
                                    <div className="content">
                                        <div className="timeline-dots border-primary"></div>
                                        <h6 className="mb-1">Client Call</h6>
                                        <div className="d-inline-block w-100">
                                            <p>Bonbon macaroon jelly beans gummi bears jelly lollipop apple There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="time bg-success"> <span>April 2020</span>
                                    </div>
                                    <div className="content">
                                        <div className="timeline-dots border-success"></div>
                                        <h6 className="mb-1">Mega event</h6>
                                        <div className="d-inline-block w-100">
                                            <p>Bonbon macaroon jelly beans gummi bears jelly lollipop apple There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Card.Body>
                </Card>
              </Col>
            </Row>
        </Container>
        </>
    )
}

export default Timeline2;