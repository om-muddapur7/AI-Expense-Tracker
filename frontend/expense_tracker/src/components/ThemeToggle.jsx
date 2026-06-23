import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { LuMoon, LuSun } from "react-icons/lu";

const ThemeToggle = () => {
	const { darkMode, setDarkMode } =
		useContext(ThemeContext);

	return (
		<button
			onClick={() =>
				setDarkMode(!darkMode)
			}
			className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700"
		>
			{darkMode ? (
				<LuSun size={18} />
			) : (
				<LuMoon size={18} />
			)}
		</button>
	);
};

export default ThemeToggle;