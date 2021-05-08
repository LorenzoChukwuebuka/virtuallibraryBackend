const db = require('../db');


const login = (req,res)=>{
    let user = req.body.username;
    let password = req.body.password;

     //backend validation 

   if(user && password){
       db.query("SELECT * FROM user WHERE name = ? AND password = ?",[user,password],(err,rows)=>{
           if(rows.length > 0){
               res.send(rows);
           }else if(rows.length  == 0 ){
               res.send(500)
           }

        

       
       })
   }
           
};

const register = (req,res)=>{
    //making sure that the inputs are properly validated
    let errors = 0
    let name;
    let regNum;
    let password;
    let type = "1";

    if(req.body.name && req.body.name != ""){
        name = req.body.name
    }else{
        errors +=1
    }

    if(req.body.regNum && req.body.regNum != ""){
          regNum = req.body.regNum
    }else{
        errors +=1
    }
    
    if(req.body.password && req.body.password != ""){
        password =  req.body.password
    }else{
        errors +=1
    }
 
      if(errors == 0){
          //check if user already exists 
         let sql_userExists = `SELECT * FROM user WHERE name = ?`;
         let nameExists = [name]
         db.query(sql_userExists,nameExists,(err,rows)=>{
             if(err) throw err
             
              if(rows.length > 0){
                 res.send('401')
              }else{
                //insert records into db

                
        let values = {name:name,password:password,type:type,regNum:regNum};
         let sql = "INSERT INTO user SET ? ";
         db.query(sql,values,(err,results)=>{
             if(err) throw err

             if(!err){
                 res.send('200').status(200)
             }
         }) 

       }
         });
          }else{
          res.send(errors)
      } 

  }

exports.login = login;
exports.register = register;