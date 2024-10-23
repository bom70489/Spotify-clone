import {v2 as cloudinary} from 'cloudinary'
import songModel from '../models/songModel.js'

const addSong = async (req, res) => {
    try {

        const { name, desc, album } = req.body;
        const audioFile = req.files?.audio[0]
        const imageFile = req.files?.image[0]

        // อัพโหลดไฟล์ไปยัง Cloudinary

        if (!audioFile) {
            return res.json({ success: false, message: "Audio file is required." });
        }

        const audioUpload = await cloudinary.uploader.upload(audioFile.path , { resource_type: "video" });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path , { resource_type: "image" });
        const duration = `${Math.floor(audioUpload.duration / 60)} : ${Math.floor(audioUpload.duration % 60)}`;

        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        };

        const song = songModel(songData);
        await song.save();

        res.json({ success: true, message: "Song Added" , songData });

    } catch (error) {
        console.log("Error:", error);
        res.json({ success: false, message: error.message });
    }
};

const listSong = async (req , res) => {
    try {

        const allSong = await songModel.find({})
        res.json({success: true , songs: allSong})

    } catch (error) {
        console.log("Error:", error);
        res.json({success: false , message: error.message})
    }
}

const removeSong = async (req , res) => {
    try {
        
        await songModel.findByIdAndDelete(req.body.id)
        res.json({success: true , message: "Song remove"})

    } catch (error) {
        console.log("Error:", error);
        res.json({success: false , message: error.message})
    }
}

export {addSong , listSong , removeSong}