import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="py-3 my-2">
        <Container>
          <Row>
            <Col md={12}>
              <p className="text-center text-muted">
                © 2023 Restaurants
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    )
  }

export default Footer;