import React, {useState} from 'react';
import queryString from 'query-string';
import Menu from '../components/Menu';
import Header from '../components/Header';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";

const workers = [
    {
    'No':1,
    'name': '김수정',
    'job': '앱개발',
    'startTime': '09:00',
    'endTime': '18:00',
    'vacation': 'X'
    },
    {
    'No':2,
    'name': '권소령',
    'job': '앱개발',
    'startTime': '09:00',
    'endTime': '18:00',
    'vacation': 'X'
    },
    {
    'No':3,
    'name': '정민지',
    'job': '디자인',
    'startTime': '09:00',
    'endTime': '18:00',
    'vacation': 'X'
    }
]

const Workermanage = ({location, match}) => {
    const query = queryString.parse(location.search);
    console.log(query);
    const detail = query.detail === 'true';

    //const [value, onChange] = useState(new Date());
    const handleDateClick = (args) => {
        alert(args);
      };

    return (
        <div style={styles.area}>
            <div style={styles.headerArea}><Header/></div>
            <div style={styles.menuArea}>
                <Menu/>
            </div>
            <div style={styles.mainArea}>
                <div style={styles.tabArea}><text style={styles.tabTextStyle}>근로자 관리 {match.params.name}</text></div>
                 {/* {
                    detail && 'detail: blahblah' 
                    //detail값이 있을 때만 뒤에 문자열이 나옴
                }  */}

                <div style={styles.calendarArea}>
                    {/* <Calendar
                        onChange={onChange}
                        value={value}
                    /> */}
                    <FullCalendar 
                        defaultView="dayGridMonth" 
                        plugins={[ dayGridPlugin, interactionPlugin ]}
                        header={{
                            left:'prev',
                            center:'title',
                            right:'next'
                        }}
                        locale='ko'
                        selectable='true'
                        height='50vw'
                        events={[
                            { title: '김수정 근무', date: '2021-02-01' },
                            { title: '권소령 근무', date: '2021-02-01' }
                        ]}
                        eventClick={ //이벤트 클릭하면 나오는 것
                            function(arg){
                                alert(arg.event.title)
                            }
                        }
                        dateClick={handleDateClick}
                    />
                </div>

                <div style={styles.tableArea}>
                    <Table style={{width:'65vw', marginTop:'2vw'}}>
                        <TableHead>
                            <TableRow style={{background:'#8ECEC2'}}>
                                <TableCell align="center" style={styles.textStyle,{width:'5vw', fontWeight:'bold'}}>번호</TableCell>
                                <TableCell align="center" style={styles.textStyle,{width:'10vw', fontWeight:'bold'}}>이름</TableCell>
                                <TableCell align="center" style={styles.textStyle,{width:'12vw', fontWeight:'bold'}}>업무</TableCell>
                                <TableCell align="center" style={styles.textStyle,{width:'10vw', fontWeight:'bold'}}>출근시간</TableCell>
                                <TableCell align="center" style={styles.textStyle,{width:'10vw', fontWeight:'bold'}}>퇴근시간</TableCell>
                                <TableCell align="center" style={styles.textStyle,{width:'8vw', fontWeight:'bold'}}>휴가여부</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workers.map(c => {
                                return (
                                <TableRow>
                                    <TableCell align="center" style={styles.textStyle}>{c.No}</TableCell>
                                    <TableCell align="center" style={styles.textStyle}>{c.name}</TableCell>
                                    <TableCell align="center" style={styles.textStyle}>{c.job}</TableCell>
                                    <TableCell align="center" style={styles.textStyle}>{c.startTime}</TableCell>
                                    <TableCell align="center" style={styles.textStyle}>{c.endTime}</TableCell>
                                    <TableCell align="center" style={styles.textStyle}>{c.vacation}</TableCell>
                                </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
            
        </div>
    );
};

export default Workermanage;

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
        height:'200%', 
        flexDirection:'column', 
        float:'left',
        backgroundColor:'#8ECEC2',
    },
    mainArea:{
        float:'left'
    },
    tabArea:{
        width:'80vw',
        height:'4.2vw', 
        backgroundColor:'#8ECEC2',
        display:'flex',
        alignItems:'center',
        textAlign:'center',
    },
    tabTextStyle:{
        fontSize:'1.5vw', 
        marginLeft:'4vw', 
        marginRight:'2vw',
        fontWeight:'bold',
        color:'#040525',
        fontFamily: 'NanumSquareR'
    },
    calendarArea:{
        width:'60vw',
        height:'auto',
        paddingTop:'2vw',
        marginLeft:'5vw', 
    },
    tableArea:{
        width:'70vw',
        paddingTop:'2vw',
        paddingLeft:'5vw', 
    },    
    textStyle:{ 
        color:'#040525',
        fontFamily: 'NanumSquareR',
        fontSize:'1vw', 
    },
}