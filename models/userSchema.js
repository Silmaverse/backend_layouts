const  mongoose=require('mongoose');
const bcrypt=require('bcrypt');

//database schema design 
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
   role:{
     type:String,
     enum:["student","teacher","admin","superadmin"],
     default:'student' 
   },
   status:{
     type:String,
     enum:["pending","appproved","rejected"],
     default:"pending"   
   },
   password:{
    type:String,
    required:true,
    select:false
   },
   isVerified:{
     type:Boolean,
     default:false
   },
   otp:{
     type:String,
     select:false
   },
   otpExpires:{
     type:Date,
     select:false
   },
   resetToken:{
     type:String,
     select:false
   },
   resetTokenExpires:{
     type:Date,
     select:false
   },
  },
  {
    timestamps: true,
  }
)
   

//hashed password before save
userSchema.pre('save',async function(){
  if (!this.isModified("password")) return;

   try{const salt=await bcrypt.genSalt(10);
   this.password=await bcrypt.hash(this.password,salt);
  }catch(err){
    console.log(err)
  }
})


//compare input password with hashed password for successfully login

userSchema.methods.comparePassword=async function checkuser(password){
  try{

    const match=await bcrypt.compare(password,this.password);
    return match;
  }catch(err){
     console.log(err)
  }
  
}



const user=mongoose.model('user',userSchema);


module.exports=user;