import React from 'react';
import queryString from 'query-string';
import Menu from '../components/Menu'
import Header from '../components/Header';

const Message = ({location, match}) => {
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
                <h2>Message {match.params.name}</h2>
                {
                    detail && 'detail: blahblah' 
                    //detail값이 있을 때만 뒤에 문자열이 나옴
                } 
            </div>
        </div>
    );
};

export default Message;


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
        backgroundColor:'grey'
    },
    mainArea:{
        float:'left'
    }
}