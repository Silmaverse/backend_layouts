const mongoose=require('mongoose');

function dbConnect(){
  const dburl=process.env.DB_URL
  if(!dburl){
    console.log("Url is not defined")
    return
  }
  mongoose.connect(dburl).then(()=>{
     console.log("DB Connected")
  }).catch((err)=>{
     console.log("Error in DB",err)
  })
}

module.exports=dbConnect