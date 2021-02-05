import React from 'react';
import queryString from 'query-string';
import Menu from '../components/Menu';
import Header from '../components/Header';
import PayM from '../components/PayM';
import PayW from '../components/PayW';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Pay = ({location, match}) => {
    const query = queryString.parse(location.search);
    console.log(query);
    const detail = query.detail === 'true';
    return (
        <div style={styles.area}>
            <div style={styles.headerArea}><Header/></div>
            <div style={styles.menuArea}>
                <Menu/>
            </div>
            <div style={styles.mainArea}>
                {
                    detail && 'detail: blahblah' 
                    //detail값이 있을 때만 뒤에 문자열이 나옴
                } 
                <Tabs>
                    <TabList style={styles.tabArea}>
                        <text style={styles.tabTextStyle}>명세서 {match.params.name}</text>
                        <Tab style={{width:'31.5vw', height:'2.5vw', paddingTop:'1vw'}}><text style={styles.tabtextStyle2}>월별 급여대장</text></Tab>
                        <Tab style={{width:'31.5vw', height:'2.5vw', paddingTop:'1vw'}}><text style={styles.tabtextStyle2}>근로자 근로명세서</text></Tab>
                    </TabList>

                    <TabPanel>
                        <PayM/>
                    </TabPanel>
                    <TabPanel>
                        <PayW/>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Pay;


const styles={
    area:{
        width:'100vw',
        height:'100vh'
    },
    headerArea:{
        width:'100vw',
        height:'10vh'
    },
    menuArea:{
        width:'20vw',
        height:'100vh', 
        flexDirection:'column', 
        float:'left',
        backgroundColor:'#8ECEC2',
    },
    mainArea:{
        float:'left'
    },
    tabArea:{
        height:'4vw', 
        backgroundColor:'#8ECEC2',
        display:'flex',
        alignItems:'center',
        textAlign:'center',
        
    },
    tabTextStyle:{
        width:'12vw',
        fontSize:'18px', 
        fontWeight:'bold'
    },
    tabtextStyle2:{
        fontSize:'18px', 

    }
}