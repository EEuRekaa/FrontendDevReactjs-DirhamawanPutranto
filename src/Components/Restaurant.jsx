
import React from 'react'
import axios from 'axios';

import { useEffect, useState } from 'react';
import '../App.css';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col, FormControl } from 'react-bootstrap';

import { Link } from 'react-router-dom';

const Restaurant = () => {

    const [data, setData] = useState([])
    const [visible, setVisible] = useState(4)
    const [filterdata, setFilterdata]  = useState([])
    const [query, setQuery] = useState("")

    const loadMore = () => {
        setVisible((prevValue) => prevValue + 4);
    }
    
    useEffect(() => {
        axios.get('http://localhost:8000/restaurants')
        .then(res => {
            console.log("isi data :", res.data)
            setData(res.data)
            setFilterdata(res.data)
        }).catch(err => console.log(err))
        }, [])

    const arr = data.slice(0, visible).map((data, index) => {
    
        return(
            <div className='col-md-3'>
                <Card style={{ width: '16rem', margin: '20px 0', height: "23rem" }} key={index}>
                    <img className='FotoRestourant' src={data.image} alt="" style={{ width: "100%", height: "100%" }}/>
                    <Card.Body>
                        <Card.Title>{data.name}</Card.Title>
                        <Card.Text>{data.open_closed}</Card.Text>
                        <Card.Text>Rating - {data.rating}</Card.Text>                
                        <Row>
                            <Col>
                                <p style={{fontSize: "15px", position: 'absolute', bottom: '45px', width: '100%'}}>{data.category} - {data.price_range}</p>
                                
                            </Col>
                            <Col>
                            <p style={{fontSize: "15px", position: 'absolute', bottom: '45px', width: '100%'}}>
                            {data.open_closed === true ? <div>Open</div> : <div>Close</div>}
                            </p>
                            </Col>
                        </Row>
                    </Card.Body>          
                                    
                    <Card.Footer>
                        <Row>
                            <Col>                
                                <Link to={`detail/${data.id}`}><Button className='float-start' variant="primary" style={{width: "100%"}}>Learn More</Button></Link>                        
                            </Col>
                    </Row>
                    </Card.Footer>                       
                </Card>
            </div>
        )
    })

    const handlesearch = (event) => {
        const getSearch = event.target.value
        setQuery(getSearch)

        if (getSearch.length > 0) {
            const searchdata = data.filter( (item) => item.name.toLowerCase().includes(getSearch))
            setData(searchdata)
        } else {
            setData(filterdata)
        }
    }

    return (
        <>
            <div className="container my-5">            
                <h1>Restaurants</h1>
                <p className="lead">Some Restaurants</p>
                <hr />
                <Row>
                    <Col>
                    <div>
                        <div>
                        <FormControl size="sm" type="text" placeholder="Search by Restaurant name" value={query} onChange={(e) => handlesearch(e) } className="mr-sm-2" />
                        </div>
                    </div>
                    </Col>
                </Row>
                
                <hr />  
            </div>         

            <div className='container'>
                <div className='row'>                    
                    {arr}
                </div>
                <div className='d-grid gap-2'>
                    <button className='btn btn-primary' onClick={loadMore}>Load More</button>
                </div>
                
            </div>                           
      </>
    )
}

export default Restaurant