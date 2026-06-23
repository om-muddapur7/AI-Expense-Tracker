import React from "react";
import {
	LuSparkles,
	LuArrowRight,
	LuTriangleAlert,
	LuTrendingUp,
} from "react-icons/lu";

const AiCard = ({ aiData, onSeeMore }) => {
	const summary = aiData?.summary || null;
	const riskScore = aiData?.riskScore ?? null;
	const topRec = aiData?.recommendations?.[0] || null;
	const topWarning = aiData?.warnings?.[0] || null;

	const getRiskColor = (score) => {
		if (score <= 3)
			return {
				bar: "bg-emerald-400",
				text: "text-emerald-400",
				label: "Low Risk",
			};
		if (score <= 6)
			return {
				bar: "bg-amber-400",
				text: "text-amber-400",
				label: "Moderate Risk",
			};
		return { bar: "bg-red-400", text: "text-red-400", label: "High Risk" };
	};

	const risk = riskScore !== null ? getRiskColor(riskScore) : null;

	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
						<LuSparkles className="text-violet-600 text-base" />
					</div>
					<h3 className="text-sm font-semibold text-gray-800">AI Insights</h3>
				</div>
				<button
					onClick={onSeeMore}
					className="card-btn"
				>
					See More <LuArrowRight size={13} />
				</button>
			</div>

			{/* Summary */}
			{summary ? (
				<p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
					{summary}
				</p>
			) : (
				<p className="text-xs text-gray-400 italic">
					No insights available yet.
				</p>
			)}

			{/* Risk Score Bar */}
			{riskScore !== null && (
				<div className="space-y-1">
					<div className="flex items-center justify-between">
						<span className="text-xs text-gray-500 font-medium">
							Risk Score
						</span>
						<span className={`text-xs font-semibold ${risk.text}`}>
							{riskScore}/10 · {risk.label}
						</span>
					</div>
					<div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
						<div
							className={`h-full rounded-full ${risk.bar} transition-all duration-500`}
							style={{ width: `${(riskScore / 10) * 100}%` }}
						/>
					</div>
				</div>
			)}

			{/* Top recommendation & warning */}
			<div className="grid grid-cols-1 gap-2">
				{topRec && (
					<div className="flex items-start gap-2 bg-violet-50 rounded-xl p-3">
						<LuTrendingUp
							className="text-violet-500 mt-0.5 shrink-0"
							size={14}
						/>
						<p className="text-xs text-violet-700 leading-snug">{topRec}</p>
					</div>
				)}
				{topWarning && (
					<div className="flex items-start gap-2 bg-amber-50 rounded-xl p-3">
						<LuTriangleAlert
							className="text-amber-500 mt-0.5 shrink-0"
							size={14}
						/>
						<p className="text-xs text-amber-700 leading-snug">{topWarning}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default AiCard;
