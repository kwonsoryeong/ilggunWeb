import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const activeStyle = {
        color: 'green',
        fontSize: '2rem'
    };
    return (
        <div style={styles.area}>
            <div style={styles.titleAera}><text style={styles.titleStyle}>투진컴퍼니</text></div>
            <div style={styles.textArea}>
                <text>admin님 반갑습니다.</text> 
            </div>
            <div style={styles.selectArea}>
                <NavLink exact to="/Businesslist" activeStyle={activeStyle} style={{textDecoration:'none', color:'#040525'}}>사업장 선택</NavLink> 
            </div>
            <div style={styles.logoutArea}>
                <NavLink exact to="/" activeStyle={activeStyle} style={{marginLeft:'3vw',textDecoration:'none', color:'#040525'}}>Logout</NavLink>
            </div>
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
        borderBottomStyle:'solid',
        display:'flex',
        alignItems:'center',
    },
    titleAera:{
        float:'left',
    },
    textArea:{
        position:'absolute',
        right:'25vw',
    },
    selectArea:{
        position:'absolute',
        right:'13vw',
    },
    logoutArea:{
        position:'absolute',
        right:'5vw',
    },
    titleStyle:{
        width:'40vw',
        fontSize:'25px',
        fontWeight:'bold',
        marginLeft:'2vw'
    }
}