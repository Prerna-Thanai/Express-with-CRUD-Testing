let express=require('express');
let router=express.Router();
let employee=require('../model/schema');

router.get('/', (req, res)=> {
	employee.find((err,data)=>{
		if(err){
			console.log(err);
			res.send(err);
		}else{
			console.log(data);
			res.json(data);
		}
	});
});

module.exports=router;