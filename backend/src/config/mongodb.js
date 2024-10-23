import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected' , () => {
        console.log("Database connected");
    })

    mongoose.connection.on('error' , (err) => {
        console.log(`Database error: ${err}}`);
    })

    await mongoose.connect(`${process.env.MONGOODB_URI}/Spotify`)
    
}

export default connectDB