import React, { useState, useEffect } from 'react';
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

import axios from 'axios';

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

const Workmanage = ({location, match}) => {
    const [workers, setWorkers] = React.useState([]);
    const [id] = React.useState(match.params.id);
    const [bang] = React.useState(match.params.bang);
    useEffect(() => {
        console.log(id, bang);
        //setId(match.params.id);
        //setBang(match.params.bang);
        console.log(">>>>>");
        fetchData();
    }, []);
    async function fetchData() { 
        try {
        await axios.post('https://www.toojin.tk:3000/selectWorker', {business:bang},
        {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
        })
        .then(res => {
            console.log("<<<<<<<<<<<!!!!!!!!");
            console.log(res.data);

            setWorkers(res.data);
        });
        } catch (e) {
            console.error(e);
        }
    }


    const query = queryString.parse(location.search);
    console.log(id, bang, "~!!!");
    const detail = query.detail === 'true';

    const [ind, setInd] = React.useState(0);
    async function getInd() {
        await setInd(ind+1);
        return ind;
    }


    const [open, setOpen] = React.useState(false);
    const [cont, setCont] = React.useState([{Employer:'',types4:"[0,0,0,0,0]"}]);
    const [sign, setSign] = React.useState('');
    const [bsign, setBsign] = React.useState('');
    useEffect(() => {
        //setOpen(true);
    }, [cont,sign,bsign]);
    const handleClickOpen = async(t, w, b) => {
        let idid2;
        axios.post('https://www.toojin.tk:3000/selectBusinessByName', {
          bname : b
          },
          {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
          }).then(res => {
            idid2 = res.data[0].id;
            console.log("idid2 : "+idid2);
        axios.post('https://www.toojin.tk:3000/selectSign', {
          id:w,
          id2:idid2
        },
        {  headers:{
              'Content-Type': 'application/json',
            'Accept': 'application/json'}
        })
        .then(async(res) => {
            setSign(res.data[0].sign);
            setBsign(res.data[1].sign);
            console.log(res.data[0].sign);
            console.log(res.data[1].sign);

        if(t==2){
            try {
                await axios.post('https://www.toojin.tk:3000/selectContractform', {id:w, bang:b},
                {  headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'}
                })
                .then(res => {
                    console.log("<<<<<<<<<<<////////////////////////");
                    console.log(res.data);
                    if(res.data[0].value1Index == 0){
                        res.data[0].types1 = "없음"
                    }
                    else{
                        res.data[0].types1 = "있음"
                    }
                    
                    if(res.data[0].value2Index == 0){
                        res.data[0].types2 = "없음"
                    }
                    else{
                        res.data[0].types2 = "있음"
                    }
            
                    if(JSON.parse(res.data[0].types3)[0].value == 1){
                        res.data[0].types3 = "근로자에게 직접 지급"
                    }
                    else{
                        res.data[0].types3 = "근로자 명의 예금통장에 입금"
                    }
            
                    if(res.data[0].Bonus == null) res.data[0].Bonus = 0
                    if(res.data[0].Bonus1 == null) res.data[0].Bonus1 = 0
                    if(res.data[0].Bonus2 == null) res.data[0].Bonus2 = 0
                    if(res.data[0].Bonus3 == null) res.data[0].Bonus3 = 0
                    if(res.data[0].Bonus4 == null) res.data[0].Bonus4 = 0
                      let t4 = [0,0,0,0,0];
                      console.log('dddd')
                      let n = JSON.parse(res.data[0].value4);
                      for(let i=0 ; i<n.length ; i++){
                        t4[n[i]]=1;
                      }
                      res.data[0].types4 = t4;                     
        
                    setCont(res.data);
                });
                setOpen(true);
            } catch (e) {
                console.error(e);
            }
        }else if(t==1){
            try {
                await axios.post('https://www.toojin.tk:3000/selectContractform2', {id:w, bang:b},
                {  headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'}
                })
                .then(res => {


                    if(res.data[0].value1Index == 0){
                        res.data[0].types1 = "없음"
                    }
                    else{
                        res.data[0].types1 = "있음"
                    }
                    
                    if(res.data[0].value2Index == 0){
                        res.data[0].types2 = "없음"
                    }
                    else{
                        res.data[0].types2 = "있음"
                    }
            
                    if(JSON.parse(res.data[0].types3)[0].value == 1){
                        res.data[0].types3 = "근로자에게 직접 지급"
                    }
                    else{
                        res.data[0].types3 = "근로자 명의 예금통장에 입금"
                    }
            
                    if(res.data[0].Bonus == null) res.data[0].Bonus = 0
                    if(res.data[0].Bonus1 == null) res.data[0].Bonus1 = 0
                    if(res.data[0].Bonus2 == null) res.data[0].Bonus2 = 0
                    if(res.data[0].Bonus3 == null) res.data[0].Bonus3 = 0
                    if(res.data[0].Bonus4 == null) res.data[0].Bonus4 = 0
                      let t4 = [0,0,0,0,0];
                      console.log('dddd')
                      let n = JSON.parse(res.data[0].value4);
                      for(let i=0 ; i<n.length ; i++){
                        t4[n[i]]=1;
                      }
                      res.data[0].types4 = t4;                     
        
                    setCont(res.data);
                });
                setOpen(true);
            } catch (e) {
                console.error(e);
            }
        }
    });});

        
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
            <div style={styles1.headerArea}><Header idid={id} bangbang={bang}/></div>
            <div style={styles1.menuArea}>
                <Menu idid={id} bangbang={bang}/>
            </div>
            <div style={styles1.mainArea}>
                <div style={styles1.tabArea}><text style={styles1.tabTextStyle}>근무 관리</text></div>
                {/* {
                    detail && 'detail: blahblah' 
                    //detail값이 있을 때만 뒤에 문자열이 나옴
                }  */}
                <div style={styles1.tableArea}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={styles1.textStyle}>TYPE</TableCell>
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
                                //getInd();
                                return (
                                <TableRow>
                                    <TableCell style={styles1.textStyle}>{c.type==2?"정규/계약":"단기/일용"}</TableCell>
                                    <TableCell style={styles1.textStyle}>{c.workername}</TableCell>
                                    <TableCell style={styles1.textStyle}>업무</TableCell>
                                    <TableCell style={styles1.textStyle}>{c.startdate}</TableCell>
                                    <TableCell style={styles1.textStyle}>{c.eachtime}</TableCell>
                                    <TableCell style={styles1.textStyle}>{c.pay*1}</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" color="primary" onClick={()=>handleClickOpen(c.type, c.workername, c.business)}>
                                            <text style={styles1.textStyle}>계약서</text>
                                        </Button>

                                        {/* https://material-ui.com/components/dialogs/ */}
                                        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                                            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                                {cont[0].id}의 계약서
                                            </DialogTitle>
                                            <DialogContent dividers>
                                                <Typography gutterBottom>
                                                <div id="divToPrint" style={{paddingLeft:'0.3vw', paddingTop:'1vw'}}>
                                                {cont[0].type==2 || cont[0].type==3?
                                                <div> {/*정규 */}
                                                <div style={{marginLeft:'0.5vw', textAlign:'center', marginBottom:'1vw'}}>
                                                    <text style={styles1.textTitleStyle2}>근로계약서 정규/계약</text>
                                                </div>
                                                <div style={styles1.textArea}>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textinputName}>{cont[0].Employer}</text>
                                                        <text style={styles1.textTitleStyle1}>(이하 "사업주"라 함) 과(와)</text>
                                                        <text style={styles1.textinputName}>{cont[0].Employee}</text>
                                                        <text style={styles1.textTitleStyle1}>(이하 "근로자"라 함) 은</text>
                                                    </div>
                                                    <div style={{marginLeft:'5vw'}}>
                                                        <text style={styles1.textTitleStyle1}>다음과 같이 근로계약을 체결한다.</text>
                                                    </div>
                                                </div>


                                                <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>1. 근로계약기간 :</text> 
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].StartYear}</text>
                                                        <text style={styles1.textStyle}>년</text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].StartMonth}</text>
                                                        <text style={styles1.textStyle}>월</text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].StartDay}</text>
                                                        <text style={styles1.textStyle}>일부터</text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].EndYear}</text>
                                                        <text style={styles1.textStyle}>년</text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].EndMonth}</text>
                                                        <text style={styles1.textStyle}>월</text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].EndDay}</text>
                                                        <text style={styles1.textStyle}>일까지</text>
                                                </div>
                                                
                                                
                                                <div style={styles1.textArea}>
                                                    <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textTitleStyle}>2. 근무장소 : </text>
                                                    <text style={styles1.textStyle}>{cont[0].WorkPlace}</text>
                                                    </div>
                                                </div>
                                                
                                                
                                                <div style={styles1.textArea}>
                                                <text style={styles1.textTitleStyle}>3. 업무의 내용 : </text>
                                                <text style={styles1.textStyle}>{cont[0].WorkReference}</text>
                                                </div>


                                                <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>4. 소정근로시간 :</text>
                                                
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].StartTimeHour}</text> 
                                                    <text style={styles1.textStyle}>시</text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].StartTimeHMin}</text>
                                                    <text style={styles1.textStyle}>분 ~</text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].EndTimeHour}</text>
                                                    <text style={styles1.textStyle}>시</text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].EndTimeHMin}</text>
                                                    <text style={styles1.textStyle}>분 </text>

                                                    <text style={styles1.textStyle}>(휴게시간 :</text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].BreakTimeStartHour}</text>
                                                    <text style={styles1.textStyle}>시</text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].BreakTimeStartMin}</text>
                                                    <text style={styles1.textStyle}>분 ~</text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].BreakTimeEndHour}</text>
                                                    <text style={styles1.textStyle}>시</text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].BreakTimeEndMin}</text>
                                                    <text style={styles1.textStyle}>분) </text>
                                                </div>


                                                <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>5. 근무일/휴일 : </text> 

                                                    <text style={styles1.textStyle}>매주 </text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].WorkingDays}</text>
                                                    <text style={styles1.textStyle}>일 근무, </text>

                                                    <text style={styles1.textStyle}>주휴일 매주</text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].Holiday}</text>
                                                    <text style={styles1.textStyle}>일 </text>

                                                </div>


                                                <div style={styles1.textArea}>
                                                <text style={styles1.textTitleStyle}>6. 임금</text> 
                                                <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textStyle}> -월급 : </text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].Salary}</text>
                                                    <text style={styles1.textStyle}>원</text>
                                                </div>
                                                <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textStyle}>-상여금 : </text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].types1}</text>
                                                    <text style={styles1.textStyle}>( </text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].Bonus}</text>
                                                    <text style={styles1.textStyle}>원)</text>
                                                </div>
                                                <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textStyle}>-기타급여(제수당 등) : </text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].types2} (</text>
                                                
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].Bonus1}</text>
                                                    <text style={styles1.textStyle}>원, </text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].Bonus2}</text>
                                                    <text style={styles1.textStyle}>원, </text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].Bonus3}</text>
                                                    <text style={styles1.textStyle}>원, </text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].Bonus4}</text>
                                                    <text style={styles1.textStyle}>원)</text>
 
                                                    <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textStyle}>-임금지급일 : 매월</text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].SalaryDay}</text>
                                                    <text style={styles1.textStyle}>일 (휴일의 경우에는 전일 지급)</text>
                                                    </div>
                                                </div>
                                                <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textStyle}>-지급방법 : </text>
                                                    <text style={styles1.textStyle}>{cont[0].types3}근로자 통장으로 지급</text>
                                                </div>
                                                </div>

                                                
                                               <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>7. 연차유급휴가 : </text> 
                                                    <text style={styles1.textStyle}>연차유급휴가는 근로기준법에서 정하는 바에 따라 부여함</text>
                                                </div>

                                                <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>8. 사대보험 적용여부</text> 
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}> -고용보험:</text><text style={styles.textinputDayStyle1}>{cont[0].types4[1]==1?'O':'X'}</text>
                                                        <text style={styles1.textStyle}>, 산재보험:</text><text style={styles.textinputDayStyle1}>{cont[0].types4[2]==1?'O':'X'}</text>
                                                        <text style={styles1.textStyle}>, 국민연금:</text><text style={styles.textinputDayStyle1}>{cont[0].types4[3]==1?'O':'X'}</text>
                                                        <text style={styles1.textStyle}>, 건강보험:</text><text style={styles.textinputDayStyle1}>{cont[0].types4[4]==1?'O':'X'}</text>
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
                                                <text style={styles1.textinputYearStyle2}>{cont[0].ContractYear}</text>
                                                <text style={styles1.textStyle}>년</text>
                                                <text style={styles1.textinputYearStyle2}>{cont[0].ContractMonth}</text>
                                                <text style={styles1.textStyle}>월</text>
                                                <text style={styles1.textinputYearStyle2}>{cont[0].ContractDay}</text>         
                                                <text style={styles1.textStyle}>일</text>       
                                                </div>
                                            
                                               <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>사업주</text>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-사업체명 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].BusinessName}</text>
                                                    </div>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-주소 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].BusinessAddress}</text>
                                                    </div>        
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-전화번호 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].BusinessPhone}</text>
                                                    </div>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-대표자 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].BusinessOwner1}</text>
                                                        <text style={styles1.textStyle}>  (인)</text>
                                                        <div style={styles1.textAreaRow}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <svg viewBox = "0 0 300 300" style={{zindex:5,height:'50px', width: '50px'}} xmlns="http://www.w3.org/2000/svg">
                                                        <polyline points={String(bsign)}
                                                        style={{fill:'none', stroke:'black', strokeWidth:4}} />
                                                        </svg>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>근로자</text>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-주소 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].BusinessOwner1}</text>
                                                    </div>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-연락처 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].BusinessOwner1}</text>
                                                    </div>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-성명 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].BusinessOwner1}</text>
                                                        <text style={styles1.textStyle}>  (인)</text>
                                                        <div style={styles1.textAreaRow}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <svg viewBox = "0 0 300 300" style={{zindex:5,height:'50px', width: '50px'}} xmlns="http://www.w3.org/2000/svg">
                                                        <polyline points={String(sign)}
                                                        style={{fill:'none', stroke:'black', strokeWidth:4}} />
                                                        </svg>
                                                        </div>
                                                    </div>
                                                </div> 
                                                </div>
                                                :
                                                cont[0].type==4 || cont[0].type==5?
                                                <div> {/*단기 */}
                                                <div style={{marginLeft:'0.5vw', textAlign:'center', marginBottom:'1vw'}}>
                                                    <text style={styles1.textTitleStyle2}>근로계약서 단기/일용</text>
                                                </div>
                                                <div style={styles1.textArea}>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textinputName}>{cont[0].Employer}</text>
                                                        <text style={styles1.textTitleStyle1}>(이하 "사업주"라 함) 과(와)</text>
                                                        <text style={styles1.textinputName}>{cont[0].Employee}</text>
                                                        <text style={styles1.textTitleStyle1}>(이하 "근로자"라 함) 은</text>
                                                    </div>
                                                    <div style={{marginLeft:'5vw'}}>
                                                        <text style={styles1.textTitleStyle1}>다음과 같이 근로계약을 체결한다.</text>
                                                    </div>
                                                </div>


                                                <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>1. 근로계약기간 :</text> 
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].StartYear}</text>
                                                        <text style={styles1.textStyle}>년</text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].StartMonth}</text>
                                                        <text style={styles1.textStyle}>월</text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].StartDay}</text>
                                                        <text style={styles1.textStyle}>일부터</text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].EndYear}</text>
                                                        <text style={styles1.textStyle}>년</text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].EndMonth}</text>
                                                        <text style={styles1.textStyle}>월</text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].EndDay}</text>
                                                        <text style={styles1.textStyle}>일까지</text>
                                                </div>
                                                
                                                
                                                <div style={styles1.textArea}>
                                                    <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textTitleStyle}>2. 근무장소 : </text>
                                                    <text style={styles1.textStyle}>{cont[0].WorkPlace}</text>
                                                    </div>
                                                </div>
                                                
                                                
                                                <div style={styles1.textArea}>
                                                <text style={styles1.textTitleStyle}>3. 업무의 내용 : </text>
                                                <text style={styles1.textStyle}>{cont[0].WorkReference}</text>
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
                                                                <tr style={styles1.tableStyle}>
                                                                    <th style={styles1.day1}>월</th>
                                                                    <td style={styles1.day2}>{cont[0].Start1==null?'X':cont[0].Start1}</td>
                                                                    <td style={styles1.day2}>{cont[0].End1==null?'X':cont[0].End1}</td>
                                                                    <td style={styles1.day1}>{cont[0].time1==null?'X':cont[0].time1}시간</td>
                                                                </tr>
                                                                <tr style={styles1.tableStyle}>
                                                                    <th style={styles1.day1}>화</th>
                                                                    <td style={styles1.day2}>{cont[0].Start2==null?'X':cont[0].Start2}</td>
                                                                    <td style={styles1.day2}>{cont[0].End2==null?'X':cont[0].End2}</td>
                                                                    <td style={styles1.day1}>{cont[0].time2==null?'X':cont[0].time2}시간</td>
                                                                </tr>
                                                                <tr style={styles1.tableStyle}>
                                                                    <th style={styles1.day1}>수</th>
                                                                    <td style={styles1.day2}>{cont[0].Start3==null?'X':cont[0].Start3}</td>
                                                                    <td style={styles1.day2}>{cont[0].End3==null?'X':cont[0].End3}</td>
                                                                    <td style={styles1.day1}>{cont[0].time3==null?'X':cont[0].time3}시간</td>
                                                                </tr>
                                                                <tr style={styles1.tableStyle}>
                                                                    <th style={styles1.day1}>목</th>
                                                                    <td style={styles1.day2}>{cont[0].Start4==null?'X':cont[0].Start4}</td>
                                                                    <td style={styles1.day2}>{cont[0].End4==null?'X':cont[0].End4}</td>
                                                                    <td style={styles1.day1}>{cont[0].time4==null?'X':cont[0].time4}시간</td>
                                                                </tr>
                                                                <tr style={styles1.tableStyle}>
                                                                    <th style={styles1.day1}>금</th>
                                                                    <td style={styles1.day2}>{cont[0].Start5==null?'X':cont[0].Start5}</td>
                                                                    <td style={styles1.day2}>{cont[0].End5==null?'X':cont[0].End5}</td>
                                                                    <td style={styles1.day1}>{cont[0].time5==null?'X':cont[0].time5}시간</td>
                                                                </tr>
                                                                <tr style={styles1.tableStyle}>
                                                                    <th style={styles1.day1}>토</th>
                                                                    <td style={styles1.day2}>{cont[0].Start6==null?'X':cont[0].Start6}</td>
                                                                    <td style={styles1.day2}>{cont[0].End6==null?'X':cont[0].End6}</td>
                                                                    <td style={styles1.day1}>{cont[0].time6==null?'X':cont[0].time6}시간</td>
                                                                </tr>
                                                                <tr style={styles1.tableStyle}>
                                                                    <th style={styles1.day1}>일</th>
                                                                    <td style={styles1.day2}>{cont[0].Start7==null?'X':cont[0].Start7}</td>
                                                                    <td style={styles1.day2}>{cont[0].End7==null?'X':cont[0].End7}</td>
                                                                    <td style={styles1.day1}>{cont[0].time7==null?'X':cont[0].time7}시간</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>

                                                <div style={styles1.textArea}>
                                                <text style={styles1.textTitleStyle}>5. 임금</text> 
                                                <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textStyle}> -시급 : </text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].Salary}</text>
                                                    <text style={styles1.textStyle}>원</text>
                                                </div>
                                                <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textStyle}>-상여금 : </text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].types1}</text>
                                                    <text style={styles1.textStyle}>( </text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].Bonus}</text>
                                                    <text style={styles1.textStyle}>원)</text>
                                                </div>
                                                <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textStyle}>-기타급여(제수당 등) : </text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].types2} (</text>
                                                
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].Bonus1}</text>
                                                    <text style={styles1.textStyle}>원, </text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].Bonus2}</text>
                                                    <text style={styles1.textStyle}>원, </text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].Bonus3}</text>
                                                    <text style={styles1.textStyle}>원, </text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].Bonus4}</text>
                                                    <text style={styles1.textStyle}>원)</text>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}> -초과근로에 대한 가산임금률 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].Salary}</text>
                                                        <text style={styles1.textStyle}>%</text>
                                                    </div>
                                                    <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textStyle}>-임금지급일 : 매월</text>
                                                    <text style={styles1.textinputYearStyle1}>{cont[0].SalaryDay}</text>
                                                    <text style={styles1.textStyle}>일 (휴일의 경우에는 전일 지급)</text>
                                                    </div>
                                                </div>
                                                <div style={styles1.textAreaRow}>
                                                    <text style={styles1.textStyle}>-지급방법 : </text>
                                                    <text style={styles1.textStyle}>{cont[0].types3}</text>
                                                </div>
                                                </div>

                                                
                                               <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>6. 연차유급휴가 : </text> 
                                                    <text style={styles1.textStyle}>통상근로자의 근로시간에 비례하여 연차유급휴가 부여함</text>
                                                </div>

                                                <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>7. 사대보험 적용여부</text> 
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}> -고용보험:</text><text style={styles.textinputDayStyle1}>{cont[0].types4[1]==1?'O':'X'}</text>
                                                        <text style={styles1.textStyle}>, 산재보험:</text><text style={styles.textinputDayStyle1}>{cont[0].types4[2]==1?'O':'X'}</text>
                                                        <text style={styles1.textStyle}>, 국민연금:</text><text style={styles.textinputDayStyle1}>{cont[0].types4[3]==1?'O':'X'}</text>
                                                        <text style={styles1.textStyle}>, 건강보험:</text><text style={styles.textinputDayStyle1}>{cont[0].types4[4]==1?'O':'X'}</text>
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
                                                <text style={styles1.textinputYearStyle2}>{cont[0].ContractYear}</text>
                                                <text style={styles1.textStyle}>년</text>
                                                <text style={styles1.textinputYearStyle2}>{cont[0].ContractMonth}</text>
                                                <text style={styles1.textStyle}>월</text>
                                                <text style={styles1.textinputYearStyle2}>{cont[0].ContractDay}</text>         
                                                <text style={styles1.textStyle}>일</text>       
                                                </div>
                                            
                                               <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>사업주</text>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-사업체명 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].BusinessName}</text>
                                                    </div>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-주소 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].BusinessAddress}</text>
                                                    </div>        
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-전화번호 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].BusinessPhone}</text>
                                                    </div>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-대표자 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].BusinessOwner1}</text>
                                                        <text style={styles1.textStyle}>  (인)</text>
                                                        <div style={styles1.textAreaRow}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <svg viewBox = "0 0 300 300" style={{zindex:5,height:'50px', width: '50px'}} xmlns="http://www.w3.org/2000/svg">
                                                        <polyline points={String(bsign)}
                                                        style={{fill:'none', stroke:'black', strokeWidth:4}} />
                                                        </svg>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div style={styles1.textArea}>
                                                    <text style={styles1.textTitleStyle}>근로자</text>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-주소 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].BusinessOwner1}</text>
                                                    </div>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-연락처 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].BusinessOwner1}</text>
                                                    </div>
                                                    <div style={styles1.textAreaRow}>
                                                        <text style={styles1.textStyle}>-성명 : </text>
                                                        <text style={styles1.textinputYearStyle1}>{cont[0].BusinessOwner1}</text>
                                                        <text style={styles1.textStyle}>  (인)</text>
                                                        <div style={styles1.textAreaRow}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <svg viewBox = "0 0 300 300" style={{zindex:5,height:'50px', width: '50px'}} xmlns="http://www.w3.org/2000/svg">
                                                        <polyline points={String(sign)}
                                                        style={{fill:'none', stroke:'black', strokeWidth:4}} />
                                                        </svg>
                                                        </div>
                                                        
                                                    </div>
                                                </div> 
                                                </div>
                                                :
                                                <div>계약서가 아직 작성되지 않았습니다.</div>
                                                }
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