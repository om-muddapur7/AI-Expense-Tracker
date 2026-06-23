import React, { useContext } from "react";
import {
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	Tooltip,
	Legend,
} from "recharts";

import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";
import { ThemeContext } from "../../context/ThemeContext";

const CustomPieChart = ({
	data,
	label,
	totalAmount,
	colors,
	showTextAnchor,
}) => {
	const { darkMode } = useContext(ThemeContext);

	return (
		<ResponsiveContainer width="100%" height={380}>
			<PieChart>
				<Pie
					data={data}
					dataKey="amount"
					nameKey="name"
					cx="50%"
					cy="50%"
					outerRadius={130}
					innerRadius={95}
					labelLine={false}
				>
					{data.map((entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={colors[index % colors.length]}
							stroke={darkMode ? "#1E293B" : "#FFFFFF"}
							strokeWidth={2}
						/>
					))}
				</Pie>

				<Tooltip content={<CustomTooltip />} />

				<Legend content={<CustomLegend />} />

				{showTextAnchor && (
					<>
						<text
							x="50%"
							y="47%"
							textAnchor="middle"
							dominantBaseline="middle"
							fill={darkMode ? "#94A3B8" : "#666666"}
							fontSize={14}
							fontWeight={500}
						>
							{label}
						</text>

						<text
							x="50%"
							y="55%"
							textAnchor="middle"
							dominantBaseline="middle"
							fill={darkMode ? "#F8FAFC" : "#333333"}
							fontSize={24}
							fontWeight={600}
						>
							{totalAmount}
						</text>
					</>
				)}
			</PieChart>
		</ResponsiveContainer>
	);
};

export default CustomPieChart;