import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const getAIInsights = async () => {
	const response = await axiosInstance .get(API_PATHS.AI.GET_INSIGHTS);

	return response.data;
};

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
		<div className="bg-white rounded-xl p-5 shadow-sm">
			<h2 className="font-semibold text-lg mb-4">AI Financial Insights</h2>

			<p className="mb-4">{insights.summary}</p>

			<div className="mb-4">
				<strong>Top Spending Category:</strong> {insights.topCategory}
			</div>

			<div className="mb-4">
				<h3 className="font-medium">Recommendations</h3>

				<ul className="list-disc ml-5">
					{insights.recommendations?.map((item, idx) => (
						<li key={idx}>{item}</li>
					))}
				</ul>
			</div>

			<div>
				<h3 className="font-medium text-red-500">Warnings</h3>

				<ul className="list-disc ml-5">
					{insights.warnings?.map((item, idx) => (
						<li key={idx}>{item}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default AIInsights;
