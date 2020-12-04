import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import API from '../../utils/API';

function Charts() {
    const [toysTotal, setToys] = useState();
    const [clothesTotal, setClothes] = useState();
    const [furnitureTotal, setFurniture] = useState();

    const getDonations = () => {
        API.getCharts()
            .then((result) => {
                setToys(result[0].toysDonated);
                setClothes(result[0].clothesDonated);
                setFurniture(result[0].furnitureDonated);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getDonations();
    }, []);

    return (
        <BarChart
            width={400}
            height={400}
            data={[
                {
                    name: 'Clothes',
                    amt: clothesTotal,
                },
                {
                    name: 'Toys',
                    amt: toysTotal,
                },
                {
                    name: 'Furniture',
                    amt: furnitureTotal,
                },
            ]}
            margin={{
                top: 15,
                right: 40,
                left: 30,
                bottom: 15,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[0, 500]} />
            <Tooltip />
            <Legend />
            <Bar name="Amount donated" dataKey="amt" fill="#8884d8" />
            {/* <Bar name="Families Connected" dataKey="fam" fill="#82ca9d" /> */}
        </BarChart>
    );
}

export default Charts;
