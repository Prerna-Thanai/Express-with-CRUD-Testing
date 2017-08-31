let mongoose=require('mongoose');
mongoose.set('debug',true);
let Schema= mongoose.Schema;

let Info=new Schema({
	Name:String,
	Empcode:Number,
	Project:String,
	Salary:Number,
},{collection:"information", versionKey:false});

let employee=mongoose.model('information',Info);

module.exports=employee;