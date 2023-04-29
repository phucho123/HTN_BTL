import React from 'react';
import { Typography, Row,Col } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

const HeaderStyled = styled(Row)`
    
    background-color: rgb(0,0,0);
    display:flex;
`
const Header = () => {
  return (
    <HeaderStyled>
        <Col span={24} style={{borderBottom:'1px solid white', backgroundColor:'white'}}>
            <Title level={1} style={{color:'black', margin: 20,textAlign:"center"}}>MY IOT DASHBOARD</Title>
        </Col>
        {/* <Col style={{display:"flex",alignItems:"center"}}>
            <Avatar style={{backgroundColor:'gray', marginRight: 10}} size={50}>H</Avatar>
            <Title level={5} style={{color:'white'}}>Username</Title>
        </Col> */}
    </HeaderStyled>
  )
}

export default Header
