import React from 'react';
import queryString from 'query-string';
import Menu from '../components/Menu';
import Header from '../components/Header';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import xlsx from 'xlsx';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas'

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      //height:'50vw'
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography style={styles1.textTitleStyle2}>{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(1),
      height:'40vw'
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);
  

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
    },
     {
    'No':4,
    'name': '김수정',
    'job': '앱개발',
    'startDay': '20201023',
    'time': '주40시간',
    'salary': '2,000,000',
    'contractform': '-'
    },
    {
    'No':5,
    'name': '권소령',
    'job': '앱개발',
    'startDay': '20201023',
    'time': '주40시간',
    'salary': '2,000,000',
    'contractform': '-'
    },
    {
    'No':6,
    'name': '정민지',
    'job': '디자인',
    'startDay': '20201023',
    'time': '주40시간',
    'salary': '2,000,000',
    'contractform': '-'
    }
]

const workDay =[
    {
        'day':'월요일',
        'start':'09:00',
        'end':'15:00',
        'workTime':'6'
    },
    {
        'day':'화요일',
        'start':'0',
        'end':'0',
        'workTime':'0'
    },
    {
        'day':'수요일',
        'start':'0',
        'end':'0',
        'workTime':'0'
    },
    {
        'day':'목요일',
        'start':'09:00',
        'end':'15:00',
        'workTime':'6'
    },
    {
        'day':'금요일',
        'start':'09:00',
        'end':'15:00',
        'workTime':'6'
    },
    {
        'day':'토요일',
        'start':'09:00',
        'end':'15:00',
        'workTime':'6'
    },
    {
        'day':'일요일',
        'start':'0',
        'end':'0',
        'workTime':'0'
    },
]

const Workmanage = ({location, match}) => {
    const query = queryString.parse(location.search);
    console.log(query);
    const detail = query.detail === 'true';

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleShare =() =>{
        alert('잠시만 기다려주세요. 다운로드 중입니다.');  
        const input = document.getElementById('divToPrint');
        
        html2canvas(input)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF("p", "mm", "a4");

            const height = pdf.internal.pageSize.getHeight()-15;

            pdf.addImage(imgData, 'PNG', 20, 5, 0, height);
            // pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
        })
        ;

    }
    const handleExcelShare =()=>{
        const ws = xlsx.utils.json_to_sheet(workers);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
        xlsx.writeFile(wb, "Test.xlsx");
    }
    
    return (
        
        <div style={styles1.area}>
            {
                detail && 'detail: blahblah' 
                //detail값이 있을 때만 뒤에 문자열이 나옴
            } 
            <div style={styles1.headerArea}><Header/></div>
            <div style={styles1.menuArea}>
                <Menu/>
            </div>
            <div style={styles1.mainArea}>
                <div style={styles1.tabArea}><text style={styles1.tabTextStyle}>근무 관리 {match.params.name}</text></div>
                {/* {
                    detail && 'detail: blahblah' 
                    //detail값이 있을 때만 뒤에 문자열이 나옴
                }  */}
                <div style={styles1.tableArea}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={styles1.textStyle}>번호</TableCell>
                                <TableCell style={styles1.textStyle}>이름</TableCell>
                                <TableCell style={styles1.textStyle}>업무</TableCell>
                                <TableCell style={styles1.textStyle}>입사일</TableCell>
                                <TableCell style={styles1.textStyle}>근로시간</TableCell>
                                <TableCell style={styles1.textStyle}>급여</TableCell>
                                <TableCell style={styles1.textStyle}>계약서</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workers.map(c => {
                                return (
                                <TableRow>
                                    <TableCell style={styles1.textStyle}>{c.No}</TableCell>
                                    <TableCell style={styles1.textStyle}>{c.name}</TableCell>
                                    <TableCell style={styles1.textStyle}>{c.job}</TableCell>
                                    <TableCell style={styles1.textStyle}>{c.startDay}</TableCell>
                                    <TableCell style={styles1.textStyle}>{c.time}</TableCell>
                                    <TableCell style={styles1.textStyle}>{c.salary}</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                                            <text style={styles1.textStyle}>계약서</text>
                                        </Button>
                                        {/* https://material-ui.com/components/dialogs/ */}
                                        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                                            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                                {c.name}의 계약서
                                            </DialogTitle>
                                            <DialogContent dividers>
                                                <Typography gutterBottom>
                                                <div id="divToPrint" style={{paddingLeft:'0.3vw', paddingTop:'1vw'}}>
                                                <div> {/*정규 */}
                                                <div style={{marginLeft:'0.5vw', textAlign:'center', marginBottom:'1vw'}}>
                                                    <text style={styles1.textTitleStyle2}>근로계약서 정규/계약</text>
                                                </div>
                                                <div style={styles1.textArea}>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textinputName}>{/*{this.state.Employer}*/}투진</text>
                                                        <text style={styles1.textTitleStyle1}>(이하 "사업주"라 함) 과(와)</text>
                                                        <text style={styles1.textinputName}>{/*{this.state.Employee}*/}김수정</text>
                                                        <text style={styles1.textTitleStyle1}>(이하 "근로자"라 함) 은</text>
                                                    </div>
                                                    <div style={{marginLeft:'5vw'}}>
                                                        <text style={styles1.textTitleStyle1}>다음과 같이 근로계약을 체결한다.</text>
                                                    </div>
                                                </div>


                                                <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>1. 근로계약기간 :</text> 
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.StartYear}*/}2020</text>
                                                        <text style={styles1.textStyle}>년</text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.StartMonth}*/}10</text>
                                                        <text style={styles1.textStyle}>월</text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.StartDay}*/}23</text>
                                                        <text style={styles1.textStyle}>일부터</text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.EndYear}*/}2021</text>
                                                        <text style={styles1.textStyle}>년</text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.EndMonth}*/}10</text>
                                                        <text style={styles1.textStyle}>월</text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.EndDay}*/}23</text>
                                                        <text style={styles1.textStyle}>일까지</text>
                                                </div>
                                                
                                                
                                                <div style={styles1.textArea}>
                                                    <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textTitleStyle}>2. 근무장소 : </text>
                                                    <text style={styles1.textStyle}>{/*{this.state.WorkPlace}*/}사무실</text>
                                                    </div>
                                                </div>
                                                
                                                
                                                <div style={styles1.textArea}>
                                                <text style={styles1.textTitleStyle}>3. 업무의 내용 : </text>
                                                <text style={styles1.textStyle}>{/*{this.state.WorkReference}*/}개발</text>
                                                </div>


                                                <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>4. 소정근로시간 :</text>
                                                
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.StartTimeHour}*/}09</text> 
                                                    <text style={styles1.textStyle}>시</text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.StartTimeHMin}*/}00</text>
                                                    <text style={styles1.textStyle}>분 ~</text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.EndTimeHour}*/}18</text>
                                                    <text style={styles1.textStyle}>시</text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.EndTimeHMin}*/}00</text>
                                                    <text style={styles1.textStyle}>분 </text>

                                                    <text style={styles1.textStyle}>(휴게시간 :</text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.BreakTimeStartHour}*/}12</text>
                                                    <text style={styles1.textStyle}>시</text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.BreakTimeStartMin}*/}00</text>
                                                    <text style={styles1.textStyle}>분 ~</text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.BreakTimeEndHour}*/}13</text>
                                                    <text style={styles1.textStyle}>시</text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.BreakTimeEndMin}*/}00</text>
                                                    <text style={styles1.textStyle}>분) </text>
                                                </div>


                                                <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>5. 근무일/휴일 : </text> 

                                                    <text style={styles1.textStyle}>매주 </text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.WorkingDays}*/}5</text>
                                                    <text style={styles1.textStyle}>일 근무, </text>

                                                    <text style={styles1.textStyle}>주휴일 매주</text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.Holiday}*/}2</text>
                                                    <text style={styles1.textStyle}>일 </text>

                                                </div>


                                                <div style={styles1.textArea}>
                                                <text style={styles1.textTitleStyle}>6. 임금</text> 
                                                <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textStyle}> -월급 : </text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.Salary}*/}2000000</text>
                                                    <text style={styles1.textStyle}>원</text>
                                                </div>
                                                <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textStyle}>-상여금 : </text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.types1}*/}없음</text>
                                                    <text style={styles1.textStyle}>( </text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.Bonus}*/}0</text>
                                                    <text style={styles1.textStyle}>원)</text>
                                                </div>
                                                <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textStyle}>-기타급여(제수당 등) : </text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.types2}*/}없음 (</text>
                                                
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.Bonus1}*/}0</text>
                                                    <text style={styles1.textStyle}>원, </text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.Bonus2}*/}0</text>
                                                    <text style={styles1.textStyle}>원, </text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.Bonus3}*/}0</text>
                                                    <text style={styles1.textStyle}>원, </text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.Bonus4}*/}0</text>
                                                    <text style={styles1.textStyle}>원)</text>
 
                                                    <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textStyle}>-임금지급일 : 매월</text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.SalaryDay}*/}23</text>
                                                    <text style={styles1.textStyle}>일 (휴일의 경우에는 전일 지급)</text>
                                                    </div>
                                                </div>
                                                <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textStyle}>-지급방법 : </text>
                                                    <text style={styles1.textStyle}>{/*{this.state.types3}*/}근로자 통장으로 지급</text>
                                                </div>
                                                </div>

                                                
                                               <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>7. 연차유급휴가 : </text> 
                                                    <text style={styles1.textStyle}>연차유급휴가는 근로기준법에서 정하는 바에 따라 부여함</text>
                                                </div>

                                                <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>8. 사대보험 적용여부</text> 
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}> -고용보험:</text><text style={styles.textinputDayStyle1}>{/*{this.state.types4[1]==1?'O':'X'}*/}O</text>
                                                        <text style={styles1.textStyle}>, 산재보험:</text><text style={styles.textinputDayStyle1}>{/*{this.state.types4[2]==1?'O':'X'}*/}O</text>
                                                        <text style={styles1.textStyle}>, 국민연금:</text><text style={styles.textinputDayStyle1}>{/*{this.state.types4[3]==1?'O':'X'}*/}O</text>
                                                        <text style={styles1.textStyle}>, 건강보험:</text><text style={styles.textinputDayStyle1}>{/*{this.state.types4[4]==1?'O':'X'}*/}O</text>
                                                    </div>
                                                </div>

                                                <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>9. 근로계약서 교부</text> 
                                                    <div>
                                                        <text style={styles1.textStyle}> -사업주는 근로계약을 체결함과 동시에 본 계약서를 사본하여 근로자의 교부요구와 관계없이 근로자에게 교부함(근로기준법 제17조 이행)</text>
                                                    </div>
                                                </div>

                                                <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>10. 기타</text> 
                                                    <div>
                                                        <text style={styles1.textStyle}> - 이 계약에 정함이 없는 사항은 근로기준법령에 의함</text>
                                                    </div>
                                                </div>
                                                
                                                <div style={styles1.textAreaRow1}> 
                                                <text style={styles1.textinputYearStyle2}>{/*{this.state.ContractYear}*/}2020</text>
                                                <text style={styles1.textStyle}>년</text>
                                                <text style={styles1.textinputYearStyle2}>{/*{this.state.ContractMonth}*/}10</text>
                                                <text style={styles1.textStyle}>월</text>
                                                <text style={styles1.textinputYearStyle2}>{/*{this.state.ContractDay}*/}23</text>         
                                                <text style={styles1.textStyle}>일</text>       
                                                </div>
                                            
                                               <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>사업주</text>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-사업체명 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.BusinessName}*/}투진컴퍼니</text>
                                                    </div>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-주소 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.BusinessAddress}*/}부산시 어쩌구 저쩌구</text>
                                                    </div>        
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-전화번호 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.BusinessPhone}*/}000-0000-0000</text>
                                                    </div>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-대표자 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.BusinessOwner1}*/}박박박</text>
                                                    </div>
                                                </div>

                                                <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>근로자</text>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-주소 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.BusinessOwner1}*/}박박박</text>
                                                    </div>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-연락처 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.BusinessOwner1}*/}박박박</text>
                                                    </div>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-성명 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.BusinessOwner1}*/}김김김</text>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                                                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                                            <circle cx="12" cy="13" r="4"></circle>
                                                        </svg>
                                                    </div>
                                                </div> 
                                                </div>
                                                <div> {/*단기 */}
                                                <div style={{marginLeft:'0.5vw', textAlign:'center', marginBottom:'1vw'}}>
                                                    <text style={styles1.textTitleStyle2}>근로계약서 단기/일용</text>
                                                </div>
                                                <div style={styles1.textArea}>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textinputName}>{/*{this.state.Employer}*/}투진</text>
                                                        <text style={styles1.textTitleStyle1}>(이하 "사업주"라 함) 과(와)</text>
                                                        <text style={styles1.textinputName}>{/*{this.state.Employee}*/}김수정</text>
                                                        <text style={styles1.textTitleStyle1}>(이하 "근로자"라 함) 은</text>
                                                    </div>
                                                    <div style={{marginLeft:'5vw'}}>
                                                        <text style={styles1.textTitleStyle1}>다음과 같이 근로계약을 체결한다.</text>
                                                    </div>
                                                </div>


                                                <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>1. 근로계약기간 :</text> 
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.StartYear}*/}2020</text>
                                                        <text style={styles1.textStyle}>년</text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.StartMonth}*/}10</text>
                                                        <text style={styles1.textStyle}>월</text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.StartDay}*/}23</text>
                                                        <text style={styles1.textStyle}>일부터</text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.EndYear}*/}2021</text>
                                                        <text style={styles1.textStyle}>년</text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.EndMonth}*/}10</text>
                                                        <text style={styles1.textStyle}>월</text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.EndDay}*/}23</text>
                                                        <text style={styles1.textStyle}>일까지</text>
                                                </div>
                                                
                                                
                                                <div style={styles1.textArea}>
                                                    <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textTitleStyle}>2. 근무장소 : </text>
                                                    <text style={styles1.textStyle}>{/*{this.state.WorkPlace}*/}사무실</text>
                                                    </div>
                                                </div>
                                                
                                                
                                                <div style={styles1.textArea}>
                                                <text style={styles1.textTitleStyle}>3. 업무의 내용 : </text>
                                                <text style={styles1.textStyle}>{/*{this.state.WorkReference}*/}개발</text>
                                                </div>


                                                <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>4. 근로일 및 근로일별 근로시간 :</text>
                                                    <div style={{paddingTop:'0.5vw'}}>
                                                    <table style={styles1.tableStyle}>
                                                        <thead>
                                                            <tr style={styles1.tableStyle}>
                                                                <th style={styles1.day1}></th>
                                                                <th style={styles1.day2}>시작시간</th>
                                                                <th style={styles1.day2}>마치는시간</th>
                                                                <th style={styles1.day1}>근무시간</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {workDay.map(c => {
                                                                return (
                                                                <tr style={styles1.tableStyle}>
                                                                    <th style={styles1.day1}>{c.day}</th>
                                                                    <td style={styles1.day2}>{c.start}</td>
                                                                    <td style={styles1.day2}>{c.end}</td>
                                                                    <td style={styles1.day1}>{c.workTime}시간</td>
                                                                </tr>
                                                                )})}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>

                                                <div style={styles1.textArea}>
                                                <text style={styles1.textTitleStyle}>5. 임금</text> 
                                                <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textStyle}> -시급 : </text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.Salary}*/}8720</text>
                                                    <text style={styles1.textStyle}>원</text>
                                                </div>
                                                <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textStyle}>-상여금 : </text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.types1}*/}없음</text>
                                                    <text style={styles1.textStyle}>( </text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.Bonus}*/}0</text>
                                                    <text style={styles1.textStyle}>원)</text>
                                                </div>
                                                <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textStyle}>-기타급여(제수당 등) : </text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.types2}*/}없음 (</text>
                                                
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.Bonus1}*/}0</text>
                                                    <text style={styles1.textStyle}>원, </text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.Bonus2}*/}0</text>
                                                    <text style={styles1.textStyle}>원, </text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.Bonus3}*/}0</text>
                                                    <text style={styles1.textStyle}>원, </text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.Bonus4}*/}0</text>
                                                    <text style={styles1.textStyle}>원)</text>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}> -초과근로에 대한 가산임금률 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.Salary}*/}10</text>
                                                        <text style={styles1.textStyle}>%</text>
                                                    </div>
                                                    <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textStyle}>-임금지급일 : 매월</text>
                                                    <text style={styles1.textinputYearStyle1}>{/*{this.state.SalaryDay}*/}23</text>
                                                    <text style={styles1.textStyle}>일 (휴일의 경우에는 전일 지급)</text>
                                                    </div>
                                                </div>
                                                <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textStyle}>-지급방법 : </text>
                                                    <text style={styles1.textStyle}>{/*{this.state.types3}*/}근로자 통장으로 지급</text>
                                                </div>
                                                </div>

                                                
                                               <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>6. 연차유급휴가 : </text> 
                                                    <text style={styles1.textStyle}>통상근로자의 근로시간에 비례하여 연차유급휴가 부여함</text>
                                                </div>

                                                <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>7. 사대보험 적용여부</text> 
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}> -고용보험:</text><text style={styles.textinputDayStyle1}>{/*{this.state.types4[1]==1?'O':'X'}*/}O</text>
                                                        <text style={styles1.textStyle}>, 산재보험:</text><text style={styles.textinputDayStyle1}>{/*{this.state.types4[2]==1?'O':'X'}*/}O</text>
                                                        <text style={styles1.textStyle}>, 국민연금:</text><text style={styles.textinputDayStyle1}>{/*{this.state.types4[3]==1?'O':'X'}*/}O</text>
                                                        <text style={styles1.textStyle}>, 건강보험:</text><text style={styles.textinputDayStyle1}>{/*{this.state.types4[4]==1?'O':'X'}*/}O</text>
                                                    </div>
                                                </div>

                                                <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>8. 근로계약서 교부</text> 
                                                    <div>
                                                        <text style={styles1.textStyle}> -'사업주'는 근로계약을 체결함과 동시에 본 계약서를 사본하여 근로자의 교부요구와 관계없이 '근로자'에게 교부함(근로기준법 제17조 이행)</text>
                                                    </div>
                                                </div>

                                                <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>9. 기타</text> 
                                                    <div>
                                                        <text style={styles1.textStyle}> - 이 계약에 정함이 없는 사항은 근로기준법령에 의함</text>
                                                    </div>
                                                </div>
                                                
                                                <div style={styles1.textAreaRow1}> 
                                                <text style={styles1.textinputYearStyle2}>{/*{this.state.ContractYear}*/}2020</text>
                                                <text style={styles1.textStyle}>년</text>
                                                <text style={styles1.textinputYearStyle2}>{/*{this.state.ContractMonth}*/}10</text>
                                                <text style={styles1.textStyle}>월</text>
                                                <text style={styles1.textinputYearStyle2}>{/*{this.state.ContractDay}*/}23</text>         
                                                <text style={styles1.textStyle}>일</text>       
                                                </div>
                                            
                                               <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>사업주</text>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-사업체명 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.BusinessName}*/}투진컴퍼니</text>
                                                    </div>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-주소 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.BusinessAddress}*/}부산시 어쩌구 저쩌구</text>
                                                    </div>        
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-전화번호 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.BusinessPhone}*/}000-0000-0000</text>
                                                    </div>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-대표자 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.BusinessOwner1}*/}박박박</text>
                                                    </div>
                                                </div>

                                                <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>근로자</text>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-주소 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.BusinessOwner1}*/}박박박</text>
                                                    </div>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-연락처 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.BusinessOwner1}*/}박박박</text>
                                                    </div>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-성명 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{/*{this.state.BusinessOwner1}*/}김김김</text>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                                                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                                            <circle cx="12" cy="13" r="4"></circle>
                                                        </svg>
                                                    </div>
                                                </div> 
                                                </div>
                                                </div>
                                                </Typography>
                                        
                                            </DialogContent>
                                            <DialogActions>
                                            <Button autoFocus onClick={handleShare} color="primary">
                                                <text style={styles1.textStyle}>PDF로 공유하기</text>
                                            </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
                <div>
                
               
                <div>
                    <button onClick={handleExcelShare} style={styles1.excelStyle}>엑셀로 공유하기</button>
                </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Workmanage;


const styles1={
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
        height:'100%', 
        flexDirection:'column', 
        float:'left',
        backgroundColor:'#8ECEC2'
    },
    mainArea:{
        float:'left',
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
    tableArea:{
        width:'70vw',
        paddingTop:'2vw',
        paddingLeft:'5vw', 
    },
    //계약서 style
    textArea:{
        paddingTop:'1.2vw',
    },
    textAreaRow:{
        flexDirection:'row'
    },
    textinputName:{
        color:'#040525',
        fontFamily: 'NanumSquareR',
        fontSize:'1vw', 
        marginRight:'1vw',
        marginLeft:'1vw',
        fontWeight:'bold'
    },
    textTitleStyle1:{
        color:'#040525',
        fontFamily: 'NanumSquareR',
        fontSize:'1vw', 
    },
    textTitleStyle2:{
        color:'#040525',
        fontFamily: 'NanumSquareR',
        fontSize:'1.3vw', 
        fontWeight:'bold',
        margin: '0'
    },
    textTitleStyle:{
        color:'#040525',
        fontFamily: 'NanumSquareR',
        fontSize:'1.05vw', 
        fontWeight:'bold'
    },
    textinputYearStyle1:{
        color:'#040525',
        fontFamily: 'NanumSquareR',
        fontSize:'1vw', 
        paddingLeft:'0.5vw'
    },
    textinputYearStyle2:{
        color:'#040525',
        fontFamily: 'NanumSquareR',
        fontSize:'1vw', 
        paddingLeft:'0.5vw',
        fontWeight:'bold'
    },
    textStyle:{ 
        color:'#040525',
        fontFamily: 'NanumSquareR',
        fontSize:'1vw', 
    },
    textAreaRow1:{
        flexDirection:'row',
        marginTop:'2vw',
        marginBottom:'1vw',
        textAlign:'center'
    },
    tableStyle:{
        width:'35vw',
        borderWidth:'0.1vw',
        borderStyle:'solid',
        borderColor:'#040525',
        borderCollapse:'collapse'
    },
    day1:{
        width:'6vw',
        textAlign:'center',
        color:'#040525',
        fontFamily: 'NanumSquareR',
        fontSize:'0.9vw', 
        borderWidth:'0.1vw',
        borderStyle:'solid',
        borderColor:'#040525',
        paddingTop:'0.2vw',
        paddingBottom:'0.2vw'
    },
    day2:{
        width:'7vw',
        textAlign:'center',
        color:'#040525',
        fontFamily: 'NanumSquareR',
        fontSize:'0.9vw', 
        borderWidth:'0.1vw',
        borderStyle:'solid',
        borderColor:'#040525',
        paddingTop:'0.2vw',
        paddingBottom:'0.2vw'
    },
    excelStyle:{
        width:'30vw',
        height:'3vw',
        borderStyle:'none',
        borderRadius:'10px',
        backgroundColor:'#8ECEC2',
        color:'#040525',
        fontFamily: 'NanumSquareR',
        fontSize:'1.2vw',
        marginTop:'2vw',
        marginLeft:'20vw',
        marginBottom:'3vw'
    }
}