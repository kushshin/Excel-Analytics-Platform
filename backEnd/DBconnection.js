import mongoose from 'mongoose';


const DBconnection = async ()=> {
 try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('DB connected')
} catch (error) {
     console.log('Connecting to:', process.env.MONGO_URI);
    console.log('DB not connected')
 }
}

export default DBconnection