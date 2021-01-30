import React from 'react';
import queryString from 'query-string';
import Menu from '../components/Menu'

const Workmanage = ({location, match}) => {
    const query = queryString.parse(location.search);
    console.log(query);
    const detail = query.detail === 'true';
    return (
        <div>
            <Menu/>
            <h2>근무 관리 {match.params.name}</h2>
            {
                detail && 'detail: blahblah' 
                //detail값이 있을 때만 뒤에 문자열이 나옴
            } 
        </div>
    );
};

export default Workmanage;