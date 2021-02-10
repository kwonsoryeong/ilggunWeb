import React, {useState} from 'react';
import queryString from 'query-string';
import Menu from '../components/Menu';
import Header from '../components/Header';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
//https://www.npmjs.com/package/react-calendar

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

    const [value, onChange] = useState(new Date());

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
                    <Calendar
                        onChange={onChange}
                        value={value}
                    />
                </div>

                <div style={styles.tableArea}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>번호</TableCell>
                                <TableCell>이름</TableCell>
                                <TableCell>업무</TableCell>
                                <TableCell>출근시간</TableCell>
                                <TableCell>퇴근시간</TableCell>
                                <TableCell>휴가여부</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workers.map(c => {
                                return (
                                <TableRow>
                                    <TableCell>{c.No}</TableCell>
                                    <TableCell>{c.name}</TableCell>
                                    <TableCell>{c.job}</TableCell>
                                    <TableCell>{c.startTime}</TableCell>
                                    <TableCell>{c.endTime}</TableCell>
                                    <TableCell>{c.vacation}</TableCell>
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
        height:'120%', 
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
        fontSize:'18px', 
        marginLeft:'4vw', 
        marginRight:'2vw',
        fontWeight:'bold',
        color:'#040525',
        fontFamily: 'NanumSquareR'
    },
    calendarArea:{
        width:'70vw',
        height:'30vw',
        paddingTop:'2vw',
        paddingLeft:'5vw', 

    },
    tableArea:{
        width:'70vw',
        paddingTop:'2vw',
        paddingLeft:'5vw', 
    }
}