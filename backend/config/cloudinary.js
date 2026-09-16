import {v2 as cloudinary} from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary"
import dotenv from "dotenv";
import fs from "fs"


dotenv.config();


const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.COUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
}

export default connectCloudinary;



// const uploadImageOnCloudinary = async(filePath, folderName) => {
//     try {
//         //Uploading image from server
//         const result = await cloudinary.uploader.upload(filePath, {
//             folder: folderName
//         });
//         //Delete image rom server
//         try {
//             fs.unlinkSync(filePath);
//         } catch (error) {
//             console.log("Failed to delete file from server ", error)
//         }

//         return {
//             secure_url: result.secure_url,
//             public_id: result.public_id
//         }
//     } catch (error) {
//         throw new Error(error);
//     }
// }

// export  {uploadImageOnCloudinary};