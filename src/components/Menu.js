import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    const activeStyle = {
        color: 'green',
        fontSize: '2rem'
    };
    return (
        <div>
            {/* <NavLink exact to="/Businesslist" activeStyle={activeStyle}>사업장 선택</NavLink> <NavLink exact to="/" activeStyle={activeStyle}>Logout</NavLink> */}
            <ul>
                <li><NavLink exact to="/Workmanage" activeStyle={activeStyle}>근무 관리</NavLink></li>
                <li><NavLink exact to="/Workermanage" activeStyle={activeStyle}>근로자 관리</NavLink></li>
                <li><NavLink exact to="/Pay" activeStyle={activeStyle}>월급</NavLink></li>
                <li><NavLink exact to="/Message" activeStyle={activeStyle}>메세지</NavLink></li>
                {/*<li><NavLink exact to="/posts" activeStyle={activeStyle}>Posts</NavLink></li>
                <li><NavLink exact to="/Businesslist" activeStyle={activeStyle}>About</NavLink></li>
                <li><NavLink exact to="/Businesslist/foo" activeStyle={activeStyle}>About Foo</NavLink></li>*/}
            </ul>
            {/* <hr/> */}
        </div>
    );
};

export default Menu;