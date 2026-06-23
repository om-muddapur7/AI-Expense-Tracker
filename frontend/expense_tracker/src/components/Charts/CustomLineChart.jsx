import React, { useContext } from "react";
import {
	Area,
	AreaChart,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
} from "recharts";

import { ThemeContext } from "../../context/ThemeContext";

const CustomLineChart = ({ data }) => {
	const { darkMode } = useContext(ThemeContext);

	const axisColor = darkMode ? "#CBD5E1" : "#666666";

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
				<AreaChart data={data}>
					<defs>
						<linearGradient
							id="incomeGradient"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop
								offset="5%"
								stopColor="#10B981"
								stopOpacity={0.4}
							/>

							<stop
								offset="95%"
								stopColor="#10B981"
								stopOpacity={0}
							/>
						</linearGradient>
					</defs>

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

					<Area
						type="monotone"
						dataKey="amount"
						stroke="#10B981"
						fill="url(#incomeGradient)"
						strokeWidth={3}
						dot={{
							r: 4,
							fill: "#10B981",
							strokeWidth: 2,
							stroke: "#ffffff",
						}}
						activeDot={{
							r: 6,
							fill: "#059669",
						}}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};

export default CustomLineChart;