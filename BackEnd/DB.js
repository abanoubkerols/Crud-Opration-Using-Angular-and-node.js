import mongoose from "mongoose";


export const connectDB = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/CrudOpration").then(()=>{
        console.log("Connction is done");
    }).catch((err)=>{
        console.log('not connected ' , err);
    })
}