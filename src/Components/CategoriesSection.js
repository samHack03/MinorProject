import React from "react";
import { Card, Container, Col, Row } from "react-bootstrap";
import {Link} from "react-router-dom";
import home1 from '../img/Heavy.jpg'
import home2 from '../img/Sprayer.jpg'
import home3 from '../img/medium.webp'
import familyApartments from '../pictures/family-apartments.jpg'
import villas from '../pictures/villas.jpg'
import Footer from "./footer/Footer";
export default function CategoriesSection() {
  return (
    <div className="mb-5">
      <Container>
      <h2 className="mt-4 " style={{color:"black"}}>Book any Equipment</h2>
      <p className="heading-p" style={{color:"black"}}>Buy equipment at least cost, save your money and time.</p>
    
        <Row className="mt-5">
        <Col sm={8} md={4} lg={4}>
          <Link to="/heavy-machinery"><Card className="category-cards text-dark mt-3">
            <Card.Img variant="top" src={home1} className="category-img pa-3"/>
            <Card.Body>
              <Card.Title className="font-bold">Heavy Machinery</Card.Title>
              <Card.Text>
              Find the most premium equipments used for very high utility, it includes very large tractors and Papé Machinery.
              </Card.Text>
            </Card.Body>
          </Card></Link>
          </Col>
          <Col sm={8} md={4} lg={4}>
          <Link to="/medium-tools"><Card className="category-cards text-dark mt-3">
            <Card.Img variant="top" src={home2} className="category-img"/>
            <Card.Body>
              <Card.Title className="font-bold">Medium Tools</Card.Title>
              <Card.Text>
              Find the most advanced farming equipments at very affordable prise, including small size tractors
              </Card.Text>
            </Card.Body>
          </Card></Link>
          </Col>
          <Col sm={8} md={4} lg={4}>
          <Link to="/small-tools"><Card className="category-cards text-dark mt-3">
            <Card.Img variant="top" src={home3} className="category-img"/>
            <Card.Body>
              <Card.Title className="font-bold">Small Tools</Card.Title>
              <Card.Text>
              Find the india's best small farming equipments(shovel,kassi) and make your life easy
              </Card.Text>
            </Card.Body>
          </Card></Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
