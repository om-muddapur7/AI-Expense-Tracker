import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const getAIInsights = async () => {
	const response = await axiosInstance .get(API_PATHS.AI.GET_INSIGHTS);

	return response.data;
};

const InsightCard = ({ icon, title, value }) => (
	<div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
		<div className="flex items-center gap-2 mb-2">
			<span className="text-xl">{icon}</span>

			<h3 className="text-sm font-medium text-gray-500">
				{title}
			</h3>
		</div>

		<p className="text-gray-800 font-medium">
			{value || "No data available"}
		</p>
	</div>
);

const AIInsights = () => {
	const [loading, setLoading] = useState(true);

	const [insights, setInsights] = useState(null);

	useEffect(() => {
		loadInsights();
	}, []);

	const loadInsights = async () => {
		try {
			const data = await getAIInsights();

			setInsights(data);
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <div className="card">Loading AI Insights...</div>;

	return (
	<div>
		<h2 className="text-xl font-semibold mb-4">
			🤖 AI Financial Insights
		</h2>

		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{/* Summary */}
			<div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
				<h3 className="text-sm font-medium text-gray-500 mb-2">
					📊 Financial Summary
				</h3>

				<p className="text-gray-700">
					{insights.summary}
				</p>
			</div>

			{/* Top Category */}
			<div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
				<h3 className="text-sm font-medium text-gray-500 mb-2">
					🏆 Top Spending Category
				</h3>

				<p className="text-xl font-bold text-purple-600">
					{insights.topCategory}
				</p>
			</div>
		</div>

		{/* Recommendations */}
		<div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mt-4">
			<h3 className="text-sm font-medium text-gray-500 mb-3">
				💡 Recommendations
			</h3>

			<div className="grid gap-3">
				{insights.recommendations?.map((item, idx) => (
					<div
						key={idx}
						className="bg-green-50 border border-green-100 rounded-lg p-3"
					>
						{item}
					</div>
				))}
			</div>
		</div>

		{/* Warnings */}
		<div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mt-4">
			<h3 className="text-sm font-medium text-red-500 mb-3">
				⚠ Warnings
			</h3>

			<div className="grid gap-3">
				{insights.warnings?.map((item, idx) => (
					<div
						key={idx}
						className="bg-red-50 border border-red-100 rounded-lg p-3"
					>
						{item}
					</div>
				))}
			</div>
		</div>
	</div>
);
};

export default AIInsights;
