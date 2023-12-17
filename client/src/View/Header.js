import React from 'react';
import { Typography, Row, Col } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

const HeaderStyled = styled(Row)`
    
    // background-color: black;
    display:flex;
`
const Header = () => {
  return (
    <HeaderStyled>
      <Col span={24} style={{ borderBottom: '1px solid white', backgroundImage: 'linear-gradient(to right, black 30%, red 100%)', paddingBottom: 30 }}>
        <Title level={1} style={{ color: 'white', margin: 20, textAlign: "center", textShadow: "-4px 4px black" }}>MY IOT DASHBOARD</Title>
      </Col>
      {/* <Col style={{display:"flex",alignItems:"center"}}>
            <Avatar style={{backgroundColor:'gray', marginRight: 10}} size={50}>H</Avatar>
            <Title level={5} style={{color:'white'}}>Username</Title>
        </Col> */}
    </HeaderStyled>
  )
}

export default Header
