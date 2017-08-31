let express=require('express');
let router=express.Router();
let employee=require('../model/schema');

router.post('/', (req, res)=> {
	let emp={
		'Name': req.body.Name,
		'Empcode': req.body.Empcode,
		'Project': req.body.Project,
		'Salary': req.body.Salary
	}	
	let data=new employee(emp);
	data.save(
		(err,data)=>{
			if(err){
				console.log(err);
			}else{
				console.log(data);
				res.send(data);
			}
		});
});

module.exports=router;