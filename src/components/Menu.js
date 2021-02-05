import React, {useState} from 'react';
import { NavLink, Link} from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Menu = () => {
    const activeStyle = {
        backgroundColor:'white'
    };
    const [color,changeColor] = useState('#8ECEC2')
    
    return (
        <div>
            <div style={{width:'20vw', marginTop:'4vw'}}>
                {/* <Tabs vertical>
                    <TabList >
                        <Tab style={styles.liStyle}><NavLink exact to="/Workmanage" activeStyle={activeStyle} style={styles.textStyle}>근무관리</NavLink></Tab>
                        <Tab style={styles.liStyle}><NavLink exact to="/Workermanage" activeStyle={activeStyle} style={styles.textStyle}>근로자관리</NavLink></Tab>
                        <Tab style={styles.liStyle}><NavLink exact to="/Pay" activeStyle={activeStyle} style={styles.textStyle}>월급</NavLink></Tab>
                        <Tab style={styles.liStyle}><NavLink exact to="/Message" activeStyle={activeStyle} style={styles.textStyle}>메세지</NavLink></Tab>
                    </TabList>

                </Tabs> */}
                <div style={styles.liStyle}><NavLink exact to="/WorkManage" activeStyle={activeStyle} style={styles.textStyle}>근무관리</NavLink></div>
                <div style={styles.liStyle}><NavLink exact to="/Workermanage" activeStyle={activeStyle} style={styles.textStyle}>근로자 관리</NavLink></div>
                <div style={styles.liStyle}><NavLink exact to="/Pay" activeStyle={activeStyle} style={styles.textStyle}>월급</NavLink></div>
                <div style={styles.liStyle}><NavLink exact to="/Message" activeStyle={activeStyle} style={styles.textStyle}>메세지</NavLink></div> 
                {/*<li><NavLink exact to="/posts" activeStyle={activeStyle}>Posts</NavLink></li>
                <li><NavLink exact to="/Businesslist" activeStyle={activeStyle}>About</NavLink></li>
                <li><NavLink exact to="/Businesslist/foo" activeStyle={activeStyle}>About Foo</NavLink></li>*/}
            </div>
            {/* <hr/> */}
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
    textStyle:{
        width:'25vw',
        textDecoration:'none', 
        color:'#040525',
    }
}