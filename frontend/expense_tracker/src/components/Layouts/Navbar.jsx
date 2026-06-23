import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import ThemeToggle from "../ThemeToggle";

const Navbar = ({ activeMenu }) => {
	const [openSideMenu, setOpenSideMenu] = useState(false);

	return (
		<div className="navbar">
			<button
				className="block lg:hidden "
				onClick={() => {
					setOpenSideMenu(!openSideMenu);
				}}
			>
				{openSideMenu ? (
					<HiOutlineX className="text-2xl" />
				) : (
					<HiOutlineMenu className="text-2xl" />
				)}
			</button>

			<div className="flex items-center justify-between w-full">
				<h2 className="text-lg font-medium text-primary">Expense Tracker</h2>

				<div className="flex items-center gap-3">
					<ThemeToggle />
				</div>
			</div>

			{openSideMenu && (
				<div className="fixed top-[61px] -ml-4 bg-white">
					<SideMenu activeMenu={activeMenu} />
				</div>
			)}
		</div>
	);
};

export default Navbar;
