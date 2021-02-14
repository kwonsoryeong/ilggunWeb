import React, {useState} from 'react';
import { NavLink, Link} from 'react-router-dom';

const Menu = (props) => {
    const activeStyle = {
        backgroundColor:'white',
        fontWeight:'bold'
    };
    
    return (
        <div>
            <div style={{width:'20vw', marginTop:'4vw'}}>
                <div style={styles.liStyle}><NavLink exact to={`/WorkManage/${props.idid}/${props.bangbang}`} activeStyle={activeStyle} style={styles.textStyle1}>근무관리</NavLink></div>
                <div style={styles.liStyle}><NavLink exact to="/Workermanage" activeStyle={activeStyle} style={styles.textStyle2}>근로자 관리</NavLink></div>
                <div style={styles.liStyle}><NavLink exact to="/Pay" activeStyle={activeStyle} style={styles.textStyle3}>월급</NavLink></div>
                <div style={styles.liStyle}><NavLink exact to="/Message" activeStyle={activeStyle} style={styles.textStyle4}>메세지</NavLink></div> 
                {/*<li><NavLink exact to="/posts" activeStyle={activeStyle}>Posts</NavLink></li>
                <li><NavLink exact to="/Businesslist" activeStyle={activeStyle}>About</NavLink></li>
                <li><NavLink exact to="/Businesslist/foo" activeStyle={activeStyle}>About Foo</NavLink></li>*/}
            </div>
        </div>
    );
};

export default Menu;

const styles={
    liStyle:{
        width:'20vw',
        height:'3.5vw',
        textAlign:'center',
        fontSize:'1.3rem',
        paddingTop:'1vw',
    },
    btnStyle:{
        width:'20vw',
        height:'4vw',
        textAlign:'center',
        fontSize:'18px',
        borderWidth:0,
        borderColor:'#8ECEC2',
        //backgroundColor:color//'#8ECEC2'
    },
    linkStyle:{
        width:'20vw',
        backgroundColor:'red'
    },
    textStyle1:{
        width:'25vw',
        textDecoration:'none', 
        color:'#040525',
        paddingTop:'1vw', paddingBottom:'1vw',
        paddingLeft:'4.35vw', paddingRight:'4.35vw',
        borderRadius:'1vw',
        color:'#040525',
        fontFamily: 'NanumSquareR'
    },
    textStyle2:{
        width:'25vw',
        textDecoration:'none', 
        color:'#040525',
        paddingTop:'1vw', paddingBottom:'1vw',
        paddingLeft:'3.5vw', paddingRight:'3.5vw',
        borderRadius:'1vw',
        color:'#040525',
        fontFamily: 'NanumSquareR'
    },
    textStyle3:{
        width:'25vw',
        textDecoration:'none', 
        color:'#040525',
        paddingTop:'1vw', paddingBottom:'1vw',
        paddingLeft:'5.6vw', paddingRight:'5.6vw',
        borderRadius:'1vw',
        color:'#040525',
        fontFamily: 'NanumSquareR'
    },
    textStyle4:{
        width:'25vw',
        textDecoration:'none', 
        color:'#040525',
        paddingTop:'1vw', paddingBottom:'1vw',
        paddingLeft:'5vw', paddingRight:'5vw',
        borderRadius:'1vw',
        color:'#040525',
        fontFamily: 'NanumSquareR'
    }
}