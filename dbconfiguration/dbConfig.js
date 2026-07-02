const mongoose=require('mongoose');
const dburl=process.env.DB_URL;

const connect=function dbConnect(){
   if(!dburl){
     console.log('Url is not defined');
     return
   }
   return mongoose.connect(dburl).then(()=>{
     console.log("DB CONNECTED");
   }).catch((err)=>{
     console.log('Error happened',err);
   })

}

module.exports=connect;