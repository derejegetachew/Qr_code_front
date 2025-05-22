import React from 'react'
import {Container,Row,Col,Accordion,Button} from 'react-bootstrap'
import  Card from '../../../components/Card'

const FAQ = () => {
    return (
        <>
        <Container fluid id="faqAccordion">
            <Row>
                <Col lg="12">
                    <Accordion defaultActiveKey="0">
                    <div className="iq-accordion career-style faq-style" >
                        <Card className="iq-accordion-block">
                            <div className="active-faq clearfix" id="headingOne">
                                <Container fluid>
                                    <Row>
                                        <Col sm="12">
                                            <Accordion.Toggle as={Button} href="#"   bsPrefix="accordion-title" eventKey="0">
                                                    <span>It is a long established reader will be?</span>
                                            </Accordion.Toggle>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                            <Accordion.Collapse eventKey="0"  className="accordion-details">
                                <p className="mb-0">Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. </p>
                            </Accordion.Collapse>
                        </Card>
                        <Card className="iq-accordion-block">
                            <div className="active-faq clearfix" id="headingTwo">
                                <Container fluid>
                                <Row>
                                    <Col sm="12">
                                        <Accordion.Toggle as={Button} href="#"   bsPrefix="accordion-title" eventKey="1">
                                                <span>Distracted by the readable page whent?</span>
                                        </Accordion.Toggle>
                                    </Col>
                                </Row>
                                </Container>
                            </div>
                            <Accordion.Collapse eventKey="1"  className="accordion-details">
                                <p className="mb-0">It has survived not only five centuries, but also the leap into electronic typesetting. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.</p>
                            </Accordion.Collapse>
                        </Card>
                        <Card className="iq-accordion-block ">
                            <div className="active-faq clearfix" id="headingThree">
                                <Container fluid>
                                <Row>
                                    <Col sm="12">
                                        <Accordion.Toggle as={Button} href="#"   bsPrefix="accordion-title" eventKey="2">
                                                <span>What is user interface kit?</span>
                                        </Accordion.Toggle>
                                    </Col>
                                </Row>
                                </Container>
                            </div>
                            <Accordion.Collapse className="accordion-details" eventKey="2">
                                <p className="mb-0">It has survived not only five centuries, but also the leap into electronic typesetting. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.</p>
                            </Accordion.Collapse>
                        </Card>
                        <Card className="iq-accordion-block ">
                            <div className="active-faq clearfix" id="headingFour">
                                <Container fluid>
                                <Row>
                                    <Col sm="12">
                                        <Accordion.Toggle as={Button} href="#"   bsPrefix="accordion-title" eventKey="3">
                                                <span>The readable content layout?</span>
                                        </Accordion.Toggle>
                                    </Col>
                                </Row>
                                </Container>
                            </div>
                            <Accordion.Collapse className="accordion-details" eventKey="3">
                                <p className="mb-0">It has survived not only five centuries, but also the leap into electronic typesetting. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.</p>
                            </Accordion.Collapse>
                        </Card>
                        <Card className="iq-accordion-block">
                            <div className="active-faq clearfix" id="headingFive">
                                <Container fluid>
                                    <Row>
                                        <Col sm="12">
                                            <Accordion.Toggle as={Button} href="#"   bsPrefix="accordion-title" eventKey="4">
                                                    <span>The readable content of a page at its layout?</span>
                                            </Accordion.Toggle>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                            <Accordion.Collapse className="accordion-details" eventKey="4">
                                <p className="mb-0">It has survived not only five centuries, but also the leap into electronic typesetting. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.</p>
                            </Accordion.Collapse>
                        </Card>
                        <Card className="iq-accordion-block">
                            <div className="active-faq clearfix" id="headingSix">
                                <Container fluid>
                                    <Row>
                                        <Col sm="12">
                                            <Accordion.Toggle as={Button} href="#"   bsPrefix="accordion-title" eventKey="5">
                                                    <span> What is user interface kit?</span>
                                            </Accordion.Toggle>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                            <Accordion.Collapse className="accordion-details" eventKey="5">
                                <p className="mb-0">It has survived not only five centuries, but also the leap into electronic typesetting. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.</p>
                            </Accordion.Collapse>
                        </Card>
                    </div>
                    <div  className="iq-accordion career-style faq-style">
                            <Card className="iq-accordion-block">
                                <div className="active-faq clearfix" id="headingSeven">
                                    <Container fluid>
                                        <Row>
                                            <Col sm="12">
                                                <Accordion.Toggle as={Button} href="#"   bsPrefix="accordion-title" eventKey="6">
                                                        <span>It is a long established fact reader will be?</span>
                                                </Accordion.Toggle>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                                <Accordion.Collapse className="accordion-details" eventKey="6">
                                    <p className="mb-0">Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. </p>
                                </Accordion.Collapse>
                            </Card>
                            <Card className="iq-accordion-block">
                                <div className="active-faq clearfix" id="headingEight">
                                    <Container fluid>
                                        <Row>
                                            <Col sm="12">
                                                <Accordion.Toggle as={Button} href="#"   bsPrefix="accordion-title" eventKey="7">
                                                        <span>Distracted by readable content of a page?</span>
                                                </Accordion.Toggle>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                                <Accordion.Collapse className="accordion-details" eventKey="7">
                                    <p className="mb-0">It has survived not only five centuries, but also the leap into electronic typesetting. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.</p>
                                </Accordion.Collapse>
                            </Card>
                            <Card className="iq-accordion-block">
                                <div className="active-faq clearfix" id="headingNine">
                                    <Container fluid>
                                        <Row>
                                            <Col sm="12">
                                                <Accordion.Toggle as={Button} href="#"   bsPrefix="accordion-title" eventKey="8">
                                                        <span>Distracted by readable content of a page? </span>
                                                </Accordion.Toggle>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                                <Accordion.Collapse className="accordion-details" eventKey="8">
                                    <p className="mb-0">It has survived not only five centuries, but also the leap into electronic typesetting. Neque
                                    porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.
                                    </p>
                                </Accordion.Collapse>
                            </Card>
                            <Card className="iq-accordion-block">
                                <div className="active-faq clearfix" id="headingTen">
                                    <Container fluid>
                                        <Row>
                                            <Col sm="12">
                                                <Accordion.Toggle as={Button} href="#"   bsPrefix="accordion-title" eventKey="9">
                                                        <span>The readable content and survived? </span>
                                                </Accordion.Toggle>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                                <Accordion.Collapse className="accordion-details" eventKey="9">
                                    <p className="mb-0">It has survived not only five centuries, but also the leap into electronic typesetting. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.</p>
                                </Accordion.Collapse>
                            </Card>
                            <Card className="iq-accordion-block">
                                <div className="active-faq clearfix" id="headingEleven">
                                    <Container fluid>
                                        <Row>
                                            <Col sm="12">
                                                <Accordion.Toggle as={Button} href="#"   bsPrefix="accordion-title" eventKey="10">
                                                        <span>The readable content of a page layout?  </span>
                                                </Accordion.Toggle>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                                <Accordion.Collapse className="accordion-details" eventKey="10">
                                    <p className="mb-0">It has survived not only five centuries, but also the leap into electronic typesetting. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.</p>
                                </Accordion.Collapse>
                            </Card>
                            <Card className="iq-accordion-block">
                                <div className="active-faq clearfix" id="headingTwelve">
                                    <Container fluid>
                                        <Row>
                                            <Col sm="12">
                                                <Accordion.Toggle as={Button} href="#"   bsPrefix="accordion-title" eventKey="11">
                                                            <span> What is user interface kit? </span>
                                                </Accordion.Toggle>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                                <Accordion.Collapse className="accordion-details" eventKey="11">
                                    <p className="mb-0">It has survived not only five centuries, but also the leap into electronic typesetting. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.</p>
                                </Accordion.Collapse>
                            </Card>
                            <Card className="iq-accordion-block">
                                <div className="active-faq clearfix" id="headingThrteen">
                                    <Container fluid>
                                        <Row>
                                            <Col sm="12">
                                                <Accordion.Toggle as={Button} href="#"   bsPrefix="accordion-title" eventKey="12">
                                                                <span> The content of a page abd layout? </span>
                                                </Accordion.Toggle>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                                <Accordion.Collapse className="accordion-details" eventKey="12">
                                    <p className="mb-0">It has survived not only five centuries, but also the leap into electronic typesetting. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.</p>
                                </Accordion.Collapse>
                            </Card>
                        </div>
                    </Accordion>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default FAQ;