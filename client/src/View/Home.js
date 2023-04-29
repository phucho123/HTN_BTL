import React, { useEffect,useState } from 'react';
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
    const [adc1,setAdc1] = useState(0);
    const [adc2,setAdc2] = useState(0);
    const [imageDetector,setImageDectector] = useState('');
    const [ack,setAck] = useState(0);
    useEffect(() => {
        socket.on('adc1', (data) => {
            setAdc1(parseInt(data));
        });
        socket.on('adc2', (data) => {
            setAdc2(parseInt(data));
        });
        socket.on('image-detector', (data) => {
            setImageDectector(data);
        });
        socket.on('ack', (data) => {
            setAck(parseInt(data));
        });
    },[]);
    useEffect(() => {
        const fetchData = async() => {
            const res = await api.get({feed:'adc1'});
            // console.log(res);
            const res_1 = await api.get({feed:'image-detector'});
            // console.log(res_1);
            const res_2 = await api.get({feed:'adc2'});
            // console.log(res_2);
            const res_3 = await api.get({feed:'ack'});
            setAdc1(parseInt(res[0].value));
            setAdc2(parseInt(res_2[0].value));
            setImageDectector(res_1[0].value);
            setAck(parseInt(res_3[0].value));
        }
        fetchData();
        // const id = setInterval(async() => await fetchData(),20000);

        // return () => clearInterval(id);
    },[]);
  return (
    <div style={{backgroundColor:'rgba(0,0,0,1)',minHeight:'100vh'}}>
        <Header />
        
        <Row>
            <Col sm={24} md={12} lg={8} xl={6}>
                <Card title="LED 1" 
                style={{margin: 16, border: '1px solid white',textAlign:'center',backgroundColor:'black',height:250,maxWidth: 400}} 
                hoverable
                headStyle={{backgroundColor:'white'}}
                >
                    <Switch feed={'button1'} />
                </Card>
            </Col>
            <Col sm={24} md={12} lg={8} xl={6}>
                <Card title="LED 2" 
                style={{margin: 16, border: '1px solid white',textAlign:'center',backgroundColor:'black',height:250,maxWidth: 400}} 
                hoverable
                headStyle={{backgroundColor:'white'}}
                >
                    <Switch feed={'button2'} />
                </Card>
            </Col>
            <Col sm={24} md={12} lg={8} xl={6} onClick={() => navigate('/linechart/adc1')}>
                <Card title="ADC 1 value" 
                style={{margin: 16, border: '1px solid white',textAlign:'center',backgroundColor:'black',maxWidth: 400}} 
                hoverable
                headStyle={{backgroundColor:'white'}}
                >
                    <Title style={{color:`${adc1 <= 0.4*3000? 'lightgreen' : adc1 <= 3000*0.6 ? 'yellow' : 'red'}`}}>{adc1}</Title>
                    <GaugeChart id="gauge-chart1" style={{width: 300}} textColor={adc1 <= 0.4*3000? 'lightgreen' : adc1 <= 3000*0.6 ? 'yellow' : 'red'} percent={adc1/3000} animate={false} />
                </Card>
            </Col>
            <Col sm={24} md={12} lg={8} xl={6} onClick={() => navigate('/linechart/adc2')}>
                <Card title="ADC 2 value" 
                style={{margin: 16, border: '1px solid white',textAlign:'center',backgroundColor:'black',maxWidth: 400}} 
                hoverable
                headStyle={{backgroundColor:'white'}}
                >
                    <Title style={{color:`${adc2 <= 0.4*3000? 'lightgreen' : adc2 <= 3000*0.6 ? 'yellow' : 'red'}`}}>{adc2}</Title>
                    <GaugeChart id="gauge-chart1" style={{width: 300}} textColor={adc2 <= 0.4*3000? 'lightgreen' : adc2 <= 3000*0.6 ? 'yellow' : 'red'} percent={adc2/3000} animate={false} />
                </Card>
            </Col>
        </Row>
        <Row>
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
        </Row>
    </div>
  )
}

export default Home;
