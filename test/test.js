let supertest=require('supertest');
let chai=require('chai');
const should=chai.should();
const expect=require('chai').expect;
let app=require('../app');
let api=supertest('http://localhost:3003');
let sinon=require('sinon');
let employee=require('../model/schema');
let modelStub=sinon.stub(employee,'find');
let createStub=sinon.stub(employee.prototype,'save');
let updateStub=sinon.stub(employee,'update');
let deleteStub=sinon.stub(employee,'remove');

describe('/', ()=>{
  before(()=>{
   modelStub.yields(null, [{ Name: "Prerna", Empcode: 50042944,Project:"BC" ,Salary : 25000 }])
 });
  it('respond with stub', (done) => {
    api
    .get('/')
    .expect(200)
    .set('Accept', 'application/json')
    .expect('Content-Type', "application/json; charset=utf-8")
    .end((err, res) => {
      if (err) {
        return done(err);
      }else{
        
        expect(res.body[0].Name).to.be.equal("Prerna");
        expect(res.body[0].Empcode).to.be.equal(50042944);
        expect(res.body[0].Project).to.be.equal("BC");
        expect(res.body[0].Salary).to.be.equal(25000);
        modelStub.restore();
        
        done();
      }
    });
  });
  
});

describe('CRUD testing', ()=>{
  let temp=[{ Name: "Prerna", Empcode: 50042944,Project:"BC" ,Salary : 25000 }];
  before((done)=>{
    createStub.yields(null, temp);
    done();
  });
  it('\nCreate Validation', (done)=>{
    api
    .post('/insert')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    //.send(temp)
    .end((err,res)=>{
      if(err) return done(err);
      expect(res.body[0].Name).to.be.equal("Prerna");
      done();
    });
  });
});

describe('CRUD testing', ()=>{
  before(()=>{
    updateStub.withArgs({Empcode:50042944},
      {$set: {Name:"Prerna",Project:"BC",Salary:25000}}).yields(null,{ok:1, nModified:0,n:0});
  });
  
  it('\nUpdate Validation', (done)=>{
    api
    .put('/update/50042944')
    .set('Accept', 'application/json')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200)
    .send({Name:"Prerna",id:50042944,Project:"BC",Salary:25000})
    .end((err,res)=>{
      if(err) {
        return done(err);
      }else{
      //console.log(res.body);
      expect(res.body.ok).to.equal(1)
      expect(res.body.nModified).to.equal(0)
      expect(res.body.n).to.equal(0)
      done();
    }
  });
  });
});


describe('CRUD testing', ()=>{
  before(()=>{
    deleteStub.withArgs({Empcode:50042944}).yields(null,{ok:1, nModified:0,n:0});
  });

  it('\nDelete Validation', (done)=>{
    api
    .delete('/remove/50042944')
    .set('Accept', 'application/json')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200)
    .send({Name:"Prerna",id:50042944,Project:"BC",Salary:25000})
    .end((err,res)=>{
      if(err){
        return done(err);
      }else{
        expect(res.body.ok).to.equal(1);
        expect(res.body.nModified).to.equal(0);
        expect(res.body.n).to.equal(0);
        done();
      }

    });
  });
});