import mongoose from 'mongoose'

const connectDB = async () => {
    mongoose.set("strictQuery", false);
    const connectOption = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        //console.log("test dh");
        console.log(process.env.MONGO_URI);
         mongoose.connect(process.env.MONGO_URI,connectOption);
        //console.log(`mongoDB Connected : ${conn.connection.host}`);
    }catch(error) {
        console.log(`Error : ${error.message}`);
        process.exit(1);
    }
}

export {connectDB} 