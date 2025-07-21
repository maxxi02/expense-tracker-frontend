import { API_PATHS } from "./api-paths";
import axiosInstance from "./axios-instance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();

  //append image file to form data
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } } //set headers for file upload
    );
    return response.data; //return response data
  } catch (error) {
    console.error("Error uploading image", error.message);
    throw error;
  }
};
export default uploadImage;
