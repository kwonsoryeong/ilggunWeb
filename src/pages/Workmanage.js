import React, {Component} from 'react';
import queryString from 'query-string';
import Menu from '../components/Menu';
import Header from '../components/Header';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


const workers = [
    {
    'No':1,
    'name': '김수정',
    'job': '앱개발',
    'startDay': '20201023',
    'time': '주40시간',
    'salary': '2,000,000',
    'contractform': '-'
    },
    {
    'No':2,
    'name': '권소령',
    'job': '앱개발',
    'startDay': '20201023',
    'time': '주40시간',
    'salary': '2,000,000',
    'contractform': '-'
    },
    {
    'No':3,
    'name': '정민지',
    'job': '디자인',
    'startDay': '20201023',
    'time': '주40시간',
    'salary': '2,000,000',
    'contractform': '-'
    }
]
    

const Workmanage = ({location, match}) => {
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
                <div style={styles.tabArea}><text style={styles.tabTextStyle}>근무 관리 {match.params.name}</text></div>
                {/* {
                    detail && 'detail: blahblah' 
                    //detail값이 있을 때만 뒤에 문자열이 나옴
                }  */}
                <div style={styles.tableArea}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>번호</TableCell>
                                <TableCell>이름</TableCell>
                                <TableCell>업무</TableCell>
                                <TableCell>입사일</TableCell>
                                <TableCell>근로시간</TableCell>
                                <TableCell>급여</TableCell>
                                <TableCell>계약서</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workers.map(c => {
                                return (
                                <TableRow>
                                    <TableCell>{c.No}</TableCell>
                                    <TableCell>{c.name}</TableCell>
                                    <TableCell>{c.job}</TableCell>
                                    <TableCell>{c.startDay}</TableCell>
                                    <TableCell>{c.time}</TableCell>
                                    <TableCell>{c.salary}</TableCell>
                                    <TableCell>{c.contractform}</TableCell>
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

export default Workmanage;


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
        //backgroundColor:'#D3D6E2'
        backgroundColor:'#8ECEC2'
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
        fontWeight:'bold'
    },
    tableArea:{
        width:'70vw',
        paddingTop:'2vw',
        paddingLeft:'5vw', 
    }
}