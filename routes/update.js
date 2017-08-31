let express=require('express');
let router=express.Router();
let employee=require('../model/schema');

router.put('/:id', (req, res)=> {
	employee.update({
		Empcode : req.body.id
	},
	{$set: {Name:req.body.Name,Project:req.body.Project,Salary:req.body.Salary}},
	(err,newemployee)=>{
		if(err){
			console.log(err);
		}else{
			console.log(newemployee);
			res.json(newemployee);
		}
	});
});

module.exports=router;