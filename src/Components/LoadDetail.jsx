import React from 'react'
import { useEffect, useState } from 'react';

import axios from 'axios';
import {Link, useParams} from "react-router-dom";

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image, Button, Card } from "react-bootstrap";

import Footer from './Footer';

const LoadDetail = () => {

    const {id} = useParams()
    const [data, setData] = useState([])

    useEffect(() => {

        axios.get(`http://localhost:8000/restaurants/${id}`)
        .then(res => {
          console.log(res.data)
          setData(res.data)
        }).catch(err => console.log(err))
      }, [])
    return (
        <>
            <Container className="my-5">   
                <Row>      
                    <Col>
                        <Link to={"/"}><Button variant="primary">Back</Button></Link>
                    </Col>
                </Row>  
                <hr />  
                <Row>
                    <Col md={6}>
                        <Image
                            src={data.image} style={{ border: "1px solid black",
                            padding: "10px",
                            borderRadius: "10px",
                            height: "auto",
                            maxHeight: "500px",
                            width: "auto",
                            maxWidth: "auto" }}
                            fluid
                            className="mb-3"
                    />
                    </Col>
                    <Col md={4}>
                        <h1 className="mb-3">{data.name}</h1>
                            <p className="mb-3">
                                Rating : {data.rating}
                            </p>
                            <p className="mb-3">
                                Price Range : {data.price_range}
                            </p>
                            <p>
                                {data.open_closed === true ? <div style={{
                                    textAlign: "center",
                                    border: "1px solid black",
                                    padding: "10px",
                                    borderRadius: "10px",
                                    height: "45px",
                                    maxHeight: "500px",
                                    width: "65px",
                                    maxWidth: "auto",
                                    backgroundColor: "#AFE1AF"}}>Open</div> : <div style={{
                                        textAlign: "center",
                                        border: "1px solid black",
                                        padding: "10px",
                                        borderRadius: "10px",
                                        height: "45px",
                                        maxHeight: "500px",
                                        width: "65px",
                                        maxWidth: "auto",
                                        color: "white",
                                        backgroundColor: "#C41E3A"}}>Close</div>}
                            </p>
                    </Col>
                </Row>
            </Container>    
            <Footer className="float-bottom" />                        
        </>
    )
}

export default LoadDetail