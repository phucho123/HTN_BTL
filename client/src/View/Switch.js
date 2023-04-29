import React, { useEffect,useState } from 'react'
import { Spin } from 'antd';
import * as api from '../Controller/api';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

const Switch = React.memo(function ({feed}) {
    const [loading,setLoading] = useState(false);
    useEffect(() => {
        socket.on('ack', (data) => {
            // setLoading(false);
            if(data === "1"){
                setLoading(false);
            }
        });
        socket.on(feed,(data) => {
            if(data === "1"){
                document.getElementById(feed).checked = true;
            }else if(data === "0"){
                document.getElementById(feed).checked = false;
            }
        })
    },[feed]);
    useEffect(() => {
        const fetchData = async() => {
            const data = await api.get({feed:feed});
            if(data[0].value === "0") document.getElementById(feed).checked = false;
            else document.getElementById(feed).checked = true;
        }
        fetchData();
    },[feed]);
    const handleToogle = async(e) =>{
        if(e.target.checked){
            await api.post({feed:feed,data:1});
            await api.post({feed:'ack',data:0});
        }
        else{
            await api.post({feed:feed,data:0});
            await api.post({feed:'ack',data:0});
        }
        setLoading(true);
    }
  return (
    <div className="form-check form-switch" style={{width: 200,height: 80,margin: 10}}>
        <input className="form-check-input" type="checkbox" style={{width: 200,height: 80}} onClick={handleToogle} id={feed} />
        {
            loading ? (<Spin size='large' style={{marginTop: 10}} />):null
        }
    </div>
  )
});

export default Switch