import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20  bg-opacity-50">
			<div className="relative p-4 w-full max-w-2xl max-h-full ">
				{/* Modal Content */}

				<div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
					<div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 dark:border-slate-700">
						<h3 className="text-lg font-medium text-primary">{title}</h3>

						<button
							type="button"
							className="text-muted bg-transparent hover:bg-gray-200 hover:text-primary rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-slate-700 cursor-pointer"
							onClick={onClose}
						>
							X
						</button>
					</div>

					<div className="p-4 md:p-5 space-y-4 text-primary">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
