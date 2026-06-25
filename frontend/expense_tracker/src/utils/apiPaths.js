export const BASE_URL = import.meta.env.VITE_API_URL;;

export const API_PATHS = {
	AUTH: {
		LOGIN: "/api/v1/auth/login",
		REGISTER: "/api/v1/auth/register",
		GOOGLE_LOGIN: "/api/v1/auth/google-login",
		GET_USER_INFO: "/api/v1/auth/getUser",
	},

	DASHBOARD: {
		GET_DATA: "/api/v1/dashboard",
	},

	INCOME: {
		ADD_INCOME: "/api/v1/income/add",
		GET_ALL_INCOME: "/api/v1/income/getUser",
		DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
		DOWNLOAD_INCOME: "/api/v1/income/downloadexcel",
	},

	EXPENSE: {
		ADD_EXPENSE: "/api/v1/expense/add",
		GET_ALL_EXPENSE: "/api/v1/expense/getUser",
		DELETE_EXPENSE: (incomeId) => `/api/v1/expense/${incomeId}`,
		DOWNLOAD_EXPENSE: "/api/v1/expense/downloadexcel",
	},

	IMAGE: {
		UPLOAD_IMAGE: "/api/v1/auth/upload-image",
	},

	AI: {
		GET_INSIGHTS: "/api/ai/insights",
	}
};
