import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        const data = response.data;
        return {
            imageUrl: typeof data === "string" ? data : data?.imageUrl ?? "",
        };
    } catch (error) {
        console.error("Error uploadImage", error);
        throw error;
    }
}

export default uploadImage;