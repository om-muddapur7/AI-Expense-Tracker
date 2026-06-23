import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import {
	LuSparkles,
	LuTriangleAlert,
	LuTrendingUp,
	LuShieldAlert,
	LuWallet,
	LuTag,
	LuArrowUpRight,
	LuCalendarClock,
} from "react-icons/lu";

const SectionCard = ({ icon, title, accent = "violet", children }) => {
	const accents = {
		violet: "bg-violet-100 text-violet-600",
		amber: "bg-amber-100 text-amber-600",
		red: "bg-red-100 text-red-600",
		emerald: "bg-emerald-100 text-emerald-600",
		blue: "bg-blue-100 text-blue-600",
	};

	return (
		<div className="bg-gradient-to-br from-white to-emerald-50/30 dark:from-slate-800 dark:to-slate-800 rounded-2xl border border-emerald-100 dark:border-slate-700 shadow-sm p-5 flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<div
					className={`w-8 h-8 rounded-lg flex items-center justify-center ${accents[accent]}`}
				>
					{icon}
				</div>
				<h3 className="text-sm font-semibold text-prim">{title}</h3>
			</div>
			{children}
		</div>
	);
};

const Tag = ({ text, color = "violet" }) => {
	const colors = {
		violet: "bg-violet-50 text-violet-700",
		amber: "bg-amber-50 text-amber-700",
		red: "bg-red-50 text-red-700",
		emerald: "bg-emerald-50 text-emerald-700",
	};
	return (
		<span
			className={`text-xs font-medium px-2.5 py-1 rounded-full ${colors[color]}`}
		>
			{text}
		</span>
	);
};

const getRiskMeta = (score) => {
	if (score <= 3)
		return {
			bar: "bg-emerald-400",
			text: "text-emerald-600",
			label: "Low Risk",
			accent: "emerald",
		};
	if (score <= 6)
		return {
			bar: "bg-amber-400",
			text: "text-amber-600",
			label: "Moderate Risk",
			accent: "amber",
		};
	return {
		bar: "bg-red-400",
		text: "text-red-600",
		label: "High Risk",
		accent: "red",
	};
};


const Skeleton = () => (
	<div className="animate-pulse space-y-4">
		{[...Array(4)].map((_, i) => (
			<div key={i} className="bg-emerald-50 dark:bg-slate-700 rounded-2xl h-36" />
		))}
	</div>
);


const AiInsights = () => {
	useUserAuth();

	const [loading, setLoading] = useState(false);
	const [aiData, setAIData] = useState(null);

	const getAIInsights = async () => {
		if (loading) return;
		setLoading(true);
		try {
			const response = await axiosInstance.get(`${API_PATHS.AI.GET_INSIGHTS}`);
			if (response.data) setAIData(response.data);
		} catch (error) {
			console.log("Something went wrong", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getAIInsights();
		return () => {};
	}, []);

	const risk = aiData?.riskScore != null ? getRiskMeta(aiData.riskScore) : null;

	return (
		<DashboardLayout activeMenu="AI Insights">
			<div className="my-5 mx-auto max-w-4xl">
				{/* Page header */}
				<div className="flex items-center gap-3 mb-6">
					<div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
						<LuSparkles className="text-violet-600 text-lg" />
					</div>
					<div>
						<h1 className="text-lg font-bold text-prim">AI Insights</h1>
						<p className="text-xs text-muted">
							Personalised analysis of your financial health
						</p>
					</div>
				</div>

				{loading && <Skeleton />}

				{!loading && !aiData && (
					<div className="bg-gradient-to-br from-white to-emerald-50/30 dark:from-slate-800 dark:to-slate-800 rounded-2xl border border-dashed border-emerald-200 dark:border-slate-700 p-12 text-center">
						<LuSparkles className="mx-auto text-muted text-3xl mb-3" />
						<p className="text-sm text-muted">
							No insights yet. Add transactions to get started.
						</p>
					</div>
				)}

				{!loading && aiData && (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
						{/* ── Summary ── */}
						<div className="md:col-span-2">
							<SectionCard
								icon={<LuSparkles size={16} />}
								title="Summary"
								accent="violet"
							>
								<p className="text-sm text-secondary leading-relaxed">
									{aiData.summary}
								</p>
								<div className="flex flex-wrap gap-2 mt-1">
									{aiData.topCategory && (
										<Tag
											text={`Top spend: ${aiData.topCategory}`}
											color="violet"
										/>
									)}
								</div>
							</SectionCard>
						</div>

						{/* ── Risk Score ── */}
						{risk && (
							<SectionCard
								icon={<LuShieldAlert size={16} />}
								title="Risk Score"
								accent={risk.accent}
							>
								<div className="flex items-end justify-between">
									<span className={`text-4xl font-bold ${risk.text}`}>
										{aiData.riskScore}
									</span>
									<span className="text-xs text-muted mb-1">out of 10</span>
								</div>
								<div className="w-full h-2 bg-emerald-50 dark:bg-slate-700 rounded-full overflow-hidden">
									<div
										className={`h-full rounded-full ${risk.bar} transition-all duration-700`}
										style={{ width: `${(aiData.riskScore / 10) * 100}%` }}
									/>
								</div>
								<Tag text={risk.label} color={risk.accent} />
							</SectionCard>
						)}

						{/* ── Spending Trend ── */}
						<SectionCard
							icon={<LuArrowUpRight size={16} />}
							title="Spending Trend"
							accent="blue"
						>
							<p className="text-sm text-secondary leading-relaxed">
								{aiData.spendingTrend}
							</p>
						</SectionCard>

						{/* ── Budget Suggestion ── */}
						<SectionCard
							icon={<LuWallet size={16} />}
							title="Budget Suggestion"
							accent="emerald"
						>
							<p className="text-sm text-secondary leading-relaxed">
								{aiData.budgetSuggestion}
							</p>
						</SectionCard>

						{/* ── Savings Opportunity ── */}
						<SectionCard
							icon={<LuTag size={16} />}
							title="Savings Opportunity"
							accent="violet"
						>
							<p className="text-sm text-secondary leading-relaxed">
								{aiData.savingsOpportunity}
							</p>
						</SectionCard>

						{/* ── Prediction ── */}
						<div className="md:col-span-2">
							<SectionCard
								icon={<LuCalendarClock size={16} />}
								title="Forecast"
								accent="amber"
							>
								<p className="text-sm text-secondary leading-relaxed">
									{aiData.prediction}
								</p>
							</SectionCard>
						</div>

						{/* ── Recommendations ── */}
						{aiData.recommendations?.length > 0 && (
							<div className="md:col-span-2">
								<SectionCard
									icon={<LuTrendingUp size={16} />}
									title="Recommendations"
									accent="violet"
								>
									<ul className="space-y-2">
										{aiData.recommendations.map((rec, i) => (
											<li key={i} className="flex items-start gap-3">
												<span className="mt-0.5 w-5 h-5 rounded-full bg-violet-100 text-violet-600 text-xs font-bold flex items-center justify-center shrink-0">
													{i + 1}
												</span>
												<p className="text-sm text-secondary leading-snug">
													{rec}
												</p>
											</li>
										))}
									</ul>
								</SectionCard>
							</div>
						)}

						{/* ── Warnings ── */}
						{aiData.warnings?.length > 0 && (
							<div className="md:col-span-2">
								<SectionCard
									icon={<LuTriangleAlert size={16} />}
									title="Warnings"
									accent="red"
								>
									<ul className="space-y-2">
										{aiData.warnings.map((warn, i) => (
											<li
												key={i}
												className="flex items-start gap-3 bg-red-50 border border-red-100 dark:border-red-900/30 rounded-xl p-3"
											>
												<LuTriangleAlert
													className="text-red-400 mt-0.5 shrink-0"
													size={14}
												/>
												<p className="text-sm text-red-700 leading-snug">
													{warn}
												</p>
											</li>
										))}
									</ul>
								</SectionCard>
							</div>
						)}
					</div>
				)}
			</div>
		</DashboardLayout>
	);
};

export default AiInsights;