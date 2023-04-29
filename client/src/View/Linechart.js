import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { get_chart_data } from '../Controller/api';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import React, { useEffect,useState } from 'react'

const socket = io.connect('http://localhost:3001');

const Linechart = () => {
    const { feed } = useParams();
    const [dataArray,setDataArray] = useState([]);
    useEffect(() => {
        socket.on(feed, (data) => {
            setDataArray(previous => {
                if(previous.length >= 20) return [...previous.splice(1),parseInt(data)];
                else return [...previous,parseInt(data)];
            })
        });
    },[feed]);
    useEffect(() => {
        const fetchData = async() => {
            const newData = await get_chart_data({feed:feed});
            const array = [];
            for(let i = newData.length-1;i>=0;i--){
                array.push(parseInt(newData[i].value));
            }
            setDataArray(array);
        }
        fetchData();
    },[feed]);
  return (
    <div style={{display:'flex',justifyContent:'center',minHeight:'100vh'}}>
        <Line
            style={{maxWidth:'90vw',maxHeight:'90vh'}}
            data={{
                labels: ['', '', '', '', '', '', '', '', '','','', '', '', '', '', '', '', '', '',''],
                datasets: [
                    {
                        data: dataArray,
                        label: feed.toUpperCase(),
                        borderColor: "#3e95cd",
                        fill: false
                    }
                ]
            }}
            options={{
                title: {
                    display: true,
                    text: `${feed.toUpperCase()} value`
                },
                legend: {
                    display: true,
                    position: "bottom"
                }
            }}
        />
    </div>
  )
}

export default Linechart