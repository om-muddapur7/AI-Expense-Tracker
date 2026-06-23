import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = [
	"#047857", // Emerald 700
	"#10B981", // Emerald 500
	"#34D399", // Emerald 400
	"#A7F3D0", // Emerald 200
];

const RecentIncomeWithChart = ({data, totalIncome}) => {

    const [charData, setCharData] = useState([]);

    const prepareChartData = () => {
        const dataArr = data.map((item) => ({
            name: item?.source,
            amount: item?.amount
        }));

        setCharData(dataArr);
    };

    useEffect(() => {
        prepareChartData();

        return () => {};
    }, [data]);

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Last 30 Days Income</h5>
        </div>

        <CustomPieChart 
            data={charData}
            label="Total Income"
            totalAmount={`$${totalIncome}`}
            showTextAnchor
            colors={COLORS}
        />
    </div>
  )
}

export default RecentIncomeWithChart
