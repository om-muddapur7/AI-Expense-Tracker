import React, { useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";

const Income = () => {
	const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null
  });

  //get all income details
  const fetchIncomeDetails = async () => {};

  //handle add income details
  const handleAddIncome = async (income) => {};

  //delete income details
  const deleteIncome = async (id) => {};

  //download income details
  const handleDownloadIncome = async () => {};

	return (
		<DashboardLayout activeMenu="Income">
			<div className="my-5 mx-auto">
				<div className="grid grid-cols-1 gap-6">
					<div className="">
						<IncomeOverview
							transaction={incomeData}
							onAddIncome={() => setOpenAddIncomeModal(true)}
						/>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default Income;
