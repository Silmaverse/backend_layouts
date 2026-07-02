const  mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
   name:{
    type:String,
    require:true,
    trim:true
   },
   email:{
     type:String,
     require:true,
     unique:true,
     trim:true,
     toLowerCase:true
   } ,
   password:{
    type:String,
    require:true
   }
})


const user=mongoose.model('user',userSchema);

module.exports=user;