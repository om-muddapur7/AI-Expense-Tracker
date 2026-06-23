import React from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

const CustomTooltip = ({ active, payload }) => {
	const { darkMode } = useContext(ThemeContext);

	if (active && payload && payload.length) {
		return (
			<div
				className={`shadow-md rounded-lg p-3 border ${
					darkMode
						? "bg-slate-800 border-slate-700"
						: "bg-white border-emerald-100"
				}`}
			>
				<p className="text-xs font-semibold text-emerald-600 mb-1">
					{payload[0].name}
				</p>

				<p className="text-sm text-secondary">
					Amount:{" "}
					<span className="text-sm font-semibold text-primary">
						₹{payload[0].value}
					</span>
				</p>
			</div>
		);
	}

	return null;
};

export default CustomTooltip;