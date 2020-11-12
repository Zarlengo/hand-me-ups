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

function Charts() {
    const [toysTotal, setToys] = useState();
    const [clothesTotal, setClothes] = useState();
    const [furnitureTotal, setFurniture] = useState();

    const getDonations = () => {
        fetch('api/charts')
            .then((response) => response.json())
            .then((result) => {
                console.log(result[0]);
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
            width={300}
            height={300}
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
            {/* <Bar name="Families Connected" dataKey="fam" fill="#82ca9d" /> */}
        </BarChart>
    );
}

export default Charts;
