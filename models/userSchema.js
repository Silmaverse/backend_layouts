const  mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
   name:{
    type:String,
    required:true,
    trim:true
   },
   email:{
     type:String,
     required:true,
     unique:true,
     trim:true,
     toLowerCase:true
   } ,
   password:{
    type:String,
    required:true
   },
   isVerified:{
     type:Boolean,
     default:false
   },
   otp:{
     type:String,
   },
   otpExpires:{
     type:Date
   }
})

userSchema.pre('save',async function(){
  if (!this.isModified("password")) return;

   try{const salt=await bcrypt.genSalt(10);
   this.password=await bcrypt.hash(this.password,salt);
  }catch(err){
    console.log(err)
  }
})
const user=mongoose.model('user',userSchema);


module.exports=user;