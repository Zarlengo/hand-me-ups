import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';

const data = [
    {
        name: 'Clothes',
        amt: 2100,
        fam: 2000,
    },
    {
        name: 'Toys',
        amt: 2210,
        fam: 2700,
    },
    {
        name: 'Furniture',
        amt: 2000,
        fam: 1000,
    },
];

function Charts() {
    return (
        <BarChart
            width={300}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar name="Amount donated" dataKey="amt" fill="#8884d8" />
            <Bar name="Families Connected" dataKey="fam" fill="#82ca9d" />
        </BarChart>
    );
}

export default Charts;
