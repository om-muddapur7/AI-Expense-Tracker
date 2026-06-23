import React, { useContext } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
	Cell,
} from "recharts";

import { ThemeContext } from "../../context/ThemeContext";

const CustomBarChart = ({ data }) => {
	const { darkMode } = useContext(ThemeContext);

	const axisColor = darkMode ? "#CBD5E1" : "#666666";

	const getBarColor = (index) => {
		return index % 2 === 0 ? "#10B981" : "#6EE7B7";
	};

	const CustomTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			return (
				<div
					className={`rounded-lg p-3 border shadow-lg ${
						darkMode
							? "bg-slate-800 border-slate-700"
							: "bg-white border-gray-200"
					}`}
				>
					<p className="text-xs font-semibold text-emerald-600 mb-1">
						{payload[0].payload.category}
					</p>

					<p className="text-sm text-secondary">
						Amount:{" "}
						<span className="font-semibold text-primary">
							₹{payload[0].payload.amount}
						</span>
					</p>
				</div>
			);
		}

		return null;
	};

	return (
		<div className="mt-6">
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={data}>
					<CartesianGrid
						stroke={darkMode ? "#334155" : "#E5E7EB"}
						vertical={false}
					/>

					<XAxis
						dataKey="month"
						tick={{
							fontSize: 12,
							fill: axisColor,
						}}
						axisLine={false}
						tickLine={false}
					/>

					<YAxis
						tick={{
							fontSize: 12,
							fill: axisColor,
						}}
						axisLine={false}
						tickLine={false}
					/>

					<Tooltip content={<CustomTooltip />} />

					<Bar
						dataKey="amount"
						radius={[10, 10, 0, 0]}
					>
						{data.map((entry, index) => (
							<Cell
								key={index}
								fill={getBarColor(index)}
							/>
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default CustomBarChart;