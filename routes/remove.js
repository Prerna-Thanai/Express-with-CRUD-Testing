let express=require('express');
let router=express.Router();
let employee=require('../model/schema');

router.delete('/:id', (req, res)=> {
	employee.remove({
		Empcode: req.body.id
	}, (err, data)=>{
		if(err){
			res.send(err);
		}else{
			console.log(data);
			res.json(data);

		}
	});
});

module.exports=router;