import mongoose from 'mongoose'

const connectDB = async () => {
    mongoose.set("strictQuery", false);
    const connectOption = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        //console.log(process.env.MONGO_URI);
         mongoose.connect("mongodb+srv://meetgami:meet123@projectsdp.ki8nnlb.mongodb.net/?retryWrites=true&w=majority",
        connectOption)
        .then(()=> {
            console.log('Connected to MonogoDB');
        })
        .catch((e)=> {
            console.log("not connected");
        });
        //console.log(`mongoDB Connected : ${conn.connection.host}`);
    }catch(error) {
        console.log(`Error : ${error.message}`);
        process.exit(1);
    }
}

export {connectDB} 