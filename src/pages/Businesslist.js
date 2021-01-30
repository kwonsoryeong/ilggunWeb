import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';

const Businesslist = ({location, match, history}) => {
    const query = queryString.parse(location.search);
    console.log(query);
    const detail = query.detail === 'true';
    const [business, setBusiness] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    async function fetchData() { 
        try {
          await axios.post('https://www.toojin.tk:3000/selectBusiness', {id:match.params.id},
          {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
          })
            .then(res => {
              setBusiness(res.data);
            });
        } catch (e) {
            console.error(e);
          }
    }
    return (
        <div>
            <ul>
            {
                business.map((b, id) => 
                (
                    <li key={id}><Link to='/Workmanage'>{b.bname}</Link></li>
                ))
            }
            </ul>
        </div>
    );
};

export default Businesslist;