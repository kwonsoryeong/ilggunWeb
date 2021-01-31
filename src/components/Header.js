import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const activeStyle = {
        color: 'green',
        fontSize: '2rem'
    };
    return (
        <div style={styles.area}>
            <text>사업장 이름</text><NavLink exact to="/Businesslist" activeStyle={activeStyle}>사업장 선택</NavLink> <NavLink exact to="/" activeStyle={activeStyle}>Logout</NavLink>
        </div>
    );
};

export default Header;

const styles={
    area:{
        width:'100vw',
        height:'10vh', 
        borderBottomColor:'black', 
        borderBottomWidth:'0.5vh', 
        borderBottomStyle:'solid'
    }
}