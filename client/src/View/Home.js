import React, { useEffect, useState } from 'react';
import Header from './Header';
import Switch from './Switch';
import { Typography } from 'antd';
import { Card, Row, Col } from 'antd';
import GaugeChart from 'react-gauge-chart';
import * as api from '../Controller/api';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';


const socket = io.connect('http://localhost:3001');

const { Title } = Typography;

const Home = () => {
    const navigate = useNavigate();
    const [humidity, setHumidity] = useState(0);
    const [temperature, setTemperature] = useState(0);
    // const [imageDetector, setImageDectector] = useState('');
    // const [ack, setAck] = useState(0);
    useEffect(() => {
        socket.on('humidity', (data) => {
            setHumidity(parseInt(data));
        });
        socket.on('temperature', (data) => {
            setTemperature(parseInt(data));
        });
        // socket.on('image-detector', (data) => {
        //     setImageDectector(data);
        // });
        // socket.on('ack', (data) => {
        //     setAck(parseInt(data));
        // });
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get({ feed: 'humidity' });
            // console.log(res);
            // const res_1 = await api.get({ feed: 'image-detector' });
            // console.log(res_1);
            const res_2 = await api.get({ feed: 'temperature' });
            // console.log(res_2);
            // const res_3 = await api.get({ feed: 'ack' });
            setHumidity(parseInt(res[0].value));
            setTemperature(parseInt(res_2[0].value));
            // setImageDectector(res_1[0].value);
            // setAck(parseInt(res_3[0].value));
        }
        fetchData();
        // const id = setInterval(async() => await fetchData(),20000);

        // return () => clearInterval(id);
    }, []);
    return (
        <div style={{ backgroundColor: 'rgb(220,220,220)', minHeight: '100vh' }}>
            <Header />

            <Row>
                <Col sm={24} md={12} lg={8} xl={6}>
                    <Card title="Auto Fan"
                        style={{ margin: 16, border: '1px solid white', textAlign: 'center', backgroundColor: 'black', height: 250, maxWidth: 400 }}
                        hoverable
                        headStyle={{ backgroundColor: 'white' }}
                    >
                        <Switch feed={'auto'} />
                    </Card>
                </Col>
                <Col sm={24} md={12} lg={8} xl={6} >
                    <Card title="Fan"
                        style={{ margin: 16, border: '1px solid white', textAlign: 'center', backgroundColor: 'black', height: 250, maxWidth: 400 }}
                        hoverable
                        headStyle={{ backgroundColor: 'white' }}

                    >
                        <Switch feed={'fan'} />
                    </Card>
                </Col>
                <Col sm={24} md={12} lg={8} xl={6} onClick={() => navigate('/linechart/humidity')}>
                    <Card title="Humidity"
                        style={{ margin: 16, border: '1px solid white', textAlign: 'center', backgroundColor: 'black', maxWidth: 400 }}
                        hoverable
                        headStyle={{ backgroundColor: 'white' }}
                    >
                        <Title style={{ color: `${humidity <= 0.4 * 100 ? 'lightgreen' : humidity <= 100 * 0.6 ? 'yellow' : 'red'}` }}>{humidity}</Title>
                        <GaugeChart id="gauge-chart1" style={{ width: 300 }} textColor={humidity <= 0.4 * 100 ? 'lightgreen' : humidity <= 100 * 0.6 ? 'yellow' : 'red'} percent={humidity / 100} animate={false} />
                    </Card>
                </Col>
                <Col sm={24} md={12} lg={8} xl={6} onClick={() => navigate('/linechart/temperature')}>
                    <Card title="Temperature"
                        style={{ margin: 16, border: '1px solid white', textAlign: 'center', backgroundColor: 'black', maxWidth: 400 }}
                        hoverable
                        headStyle={{ backgroundColor: 'white' }}
                    >
                        <Title style={{ color: `${temperature <= 0.4 * 100 ? 'lightgreen' : temperature <= 100 * 0.6 ? 'yellow' : 'red'}` }}>{temperature}</Title>
                        <GaugeChart id="gauge-chart1" style={{ width: 300 }} textColor={temperature <= 0.4 * 100 ? 'lightgreen' : temperature <= 100 * 0.6 ? 'yellow' : 'red'} percent={temperature / 100} animate={false} />
                    </Card>
                </Col>
            </Row>
            {/* <Row>
            <Col sm={24} md={12} lg={8} xl={6}>
                <Card title="Image Detector" 
                    style={{margin: 16, border: '1px solid white',textAlign:'center',backgroundColor:'black',height:250,maxWidth: 400}} 
                    hoverable
                    headStyle={{backgroundColor:'white'}}
                >
                   <Title style={{color:'white'}}>{imageDetector}</Title>
                </Card>
            </Col>
            <Col sm={24} md={12} lg={8} xl={6}>
                <Card title="ACK"
                    style={{margin: 16, border: '1px solid white',textAlign:'center',backgroundColor:'black',height:250,maxWidth: 400,minWidth: 300}} 
                    hoverable
                    headStyle={{backgroundColor:'white'}}
                >
                   <Title style={{color:'white',fontSize: 70}}>{ack}</Title>
                </Card>
            </Col>
        </Row> */}
        </div>
    )
}

export default Home;
