import mongoose from "mongoose"

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("ada error nih", error)
    }
}

export default connectMongoDB;