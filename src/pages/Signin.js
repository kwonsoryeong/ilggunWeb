import React from 'react';
import Businesslist from "./Businesslist";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: "",
      name: "",
      isLogin: null
    };
  }

  //이메일 입력창 관리
  handleId = e => {
    this.setState({
      id: e.target.value
    });
  };
  //패스워드 입력창 관리
  handlePassword = e => {
    this.setState({
      password: e.target.value
    });
  };
  //로그인버튼 클릭시 서버로 데이터 전송
  handleSubmit = async(e) => {
    e.preventDefault();
    const login_info = {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    };

    await axios.post('https://www.toojin.tk:3000/signin', { 
        id: this.state.id,
        password: this.state.password, 
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
      })
      .then((responseData) => {
        console.log(responseData);
        if(responseData.data[0] == undefined || responseData.data[0] == ''){
          alert("아이디 혹은 비밀번호 정보가 잘못되었습니다. 한번 더 확인해주세요.")
        }else{
          //storeToken({id:responseData.data[0].id, name:responseData.data[0].name});
          //getToken();
      
          if(responseData.data[0].id){
            //onSignIn();
            console.log(responseData.data[0].id);
            this.props.history.push("/Businesslist/"+responseData.data[0].id)
          }
        }
      })
      .catch(function(error) {
        alert("아이디 혹은 비밀번호 정보가 잘못되었습니다. 한번 더 확인해주세요.")

        if (!error.response) {
          // network error
          console.log('hh'+error)
        }
      });
    /*fetch("https://www.toojin.tk:3000/signin", login_info)
      .then(res => {
        return res.json();
      })
      .then(json => {
        //json형식 {idx: 8, name: "noh", email: "noh@gmail.com", success: true}
        if (json.success === true) {
          alert("로그인되었습니다");
          // 서버로 부터 받은 JSON형태의 데이터를 로컬스토리지에 우선 저장한다.
          window.localStorage.setItem('userInfo', JSON.stringify(json))
          //스테이트에 유저정보를 저장한다.
          this.setState({
            idx: json.idx,
            id: json.id,
            name: json.name,
            isLogin: json.success
          });
          this.props.history.push("/Businesslist")
        } else {
          alert("아이디 혹은 비밀번호를 확인하세요");
        }
      });*/
    };
    render() {
        return (
            <div>
                <Router>
                    <div>
                    <form onSubmit={this.handleSubmit}>
                        {/* 아이디 인풋창 */}
                        <div>
                        <span>ID : </span>
                        <input
                            placeholder="아이디를 입력하세요"
                            value={this.state.id}
                            onChange={this.handleId}
                        />
                        </div>
                        {/* 비밀번호 인풋 */}
                        <div>
                        <span>Password : </span>
                        <input
                            placeholder="비밀번호를 입력하세요"
                            value={this.state.password}
                            onChange={this.handlePassword}
                            type="password"
                        />
                        </div>
                        <div>
                        {/* 로그인버튼 , 회원가입버튼*/}
                        <button type="submit">로그인</button>
                        {/* 회원가입 버튼 클릭 -> /signup페이지로 이동 
                        <button onClick={() => this.props.history.push("/signup")}>
                            회원가입
                        </button>
                        */}
                        </div>
                    </form>
                    </div>
                </Router>
            </div>
        );
    };
};

export default Signin;