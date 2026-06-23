import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
	return (
		<div className="info-card flex gap-6">
			<div
				className={`info-card-icon ${color} `}
			>
				{icon}
			</div>

      <div>
        <h6 className="text-sm text-muted mb-1">{label}</h6>
        <span className="text-[22px]">${value}</span>
      </div>

		</div>
	);
};

export default InfoCard;
