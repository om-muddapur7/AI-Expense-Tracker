import React, { Children, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { FaXTwitter } from 'react-icons/fa6';


const DashboardLayout = ({ children, activeMenu }) => {
	const { user } = useContext(UserContext);

	return (
		<div>
			<Navbar activeMenu={activeMenu} />

			{user && (
				<div className="flex">
					<div className="max-[1080px]:hidden">
						<SideMenu activeMenu={activeMenu} />
					</div>

					<div className="grow mx-5">{children}</div>
				</div>
			)}

			<footer className="w-full mt-0.5 border-t border-white/10 backdrop-blur-md bg-white/5">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-gray-400">
          © 2026 AI Expense Tracker. All rights reserved.
        </p>

        <div className="flex items-center gap-5 mt-4 md:mt-0">
          <a
            href="https://github.com/om-muddapur7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300 hover:scale-110"
          >
            <FaGithub size={22} />
          </a>

          <a
            href="https://www.linkedin.com/in/om-muddapur-aa56a525b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#0A66C2] transition duration-300 hover:scale-110"
          >
            <FaLinkedin size={22} />
          </a>

          <a
            href="https://x.com/Om7248"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-sky-400 transition duration-300 hover:scale-110"
          >
            <FaXTwitter size={22} />
          </a>
        </div>
      </div>
    </footer>

		</div>
	);
};

export default DashboardLayout;
