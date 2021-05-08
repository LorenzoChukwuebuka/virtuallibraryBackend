const db = require('../db')
const formidable = require('formidable');
const fs = require('fs')

// adds school to db 
const addSchool = (req,res)=>{

    let errors = 0;
    let school;

    if(req.body.school && req.body.school != ""){
        school = req.body.school
    }else{
      errors += 1
    }
  
     if(errors == 0){
         //check if school already exists

         let sql_schoolExists = `SELECT * FROM school WHERE school = '${school}' `;
         db.query(sql_schoolExists,(err,rows)=>{
             if(err) throw err 

           if(rows.length > 0){
               res.send('401').status(401)
           }else{
               let sql = " INSERT INTO school SET ? ";
               let values = {school:school};
               db.query(sql,values,(err,results)=>{
                  if(err) throw err
                  if(!err){
                      res.send('201')
                  }
               })
           }
         }) 
     } 

    
  
};

// adds department to db

const addDept = (req,res)=>{
let errors = 0;
 let Id;
 let dept;

 if(req.body.Id && req.body.Id != ""){
     Id = req.body.Id
 }else{
     errors +=1
 }

 if(req.body.dept && req.body.dept != ""){
     dept = req.body.dept
 }else{
     errors +=1
 }

        if(errors === 0){
            //check if dept already exists

            let sql_deptExists = `SELECT * FROM department WHERE dept = '${dept}'`;
              
             db.query(sql_deptExists,(err,rows)=>{
                 if(err) throw err

                   if(rows.length === 0){
                       let values = {dept:dept,schId:Id}
                       
                       let sql = "INSERT INTO department SET ?";
                       db.query(sql,values,(err,results)=>{
                           if(err) throw err

                           res.send('201')
                       })
                   }else{
                       res.send('501')
                   }
             })



    }else{
        res.json({"message":"not Ok"})
    } 



};



//get all schools

const getSchools = (req,res)=>{
  let sql = "SELECT * FROM school"
  db.query(sql,(err,rows)=>{
      if(err) throw err

      if(!err){
          res.send(rows)
      }
  })
};

//get all depts

const getDept = (req,res)=>{
    let sql =  "SELECT school.*,department.* FROM department JOIN school ON school.Id = department.schId "
    db.query(sql,(err,rows)=>{
         if(err) throw err
         if(!err){
             res.send(rows)
         }
    })
}

//delete schools 

const deleteSch = (req,res)=>{
    let Id
   Id = req.params.Id
    let sql = `DELETE FROM school WHERE Id = ${Id}`
   db.query(sql,(err,results)=>{
      if(err) throw err
      if(!err){
         res.send('200')
      }
   }) 

};

// edit schools

const editSch = (req,res)=>{
    let Id;
    let school;
    Id = req.params.Id
    school = req.body.school
    
   let sql = `UPDATE school SET school = '${school}' WHERE Id = ${Id}`

    db.query(sql,(err,rows)=>{
       if(err) throw err
       if(!err){
           res.send('200')
       }
    }) 

  
}

//delete department

const deleteDept = (req,res)=>{
    let Id
    Id = req.params.Id
     let sql = `DELETE FROM department WHERE Id = ${Id}`
    db.query(sql,(err,results)=>{
       if(err) throw err
       if(!err){
          res.send('200')
       }
    }) 
};

//edit department 
 const editDept = (req,res)=>{
    let Id;
    let dept;
    let schId;
   
     Id = req.params.Id
     dept = req.body.dept
     schId = req.body.schId
    
   let sql = `UPDATE department SET dept = '${dept}', schId =${schId}  WHERE Id = ${Id}`

    db.query(sql,(err,rows)=>{
       if(err) throw err
       if(!err){
           res.send('200')
       }
    }) 

 
 };

 //adds category 

  const category = (req,res)=>{
    let category;
    let error = 0;
    
     if(req.body.category && req.body.category !== ""){
         category = req.body.category
     }else{
         error += 1
     }

       if(error === 0){
           let sql_checkCategoryExists = `SELECT * FROM category WHERE category = '${category}'`
           db.query(sql_checkCategoryExists,(err,rows)=>{
               if(err)throw err

               if(rows.length === 0){
                   let values = {category:category}
                   let sql = "INSERT INTO category SET ?"
                   db.query(sql,values,(err,results)=>{
                       if(err) throw err
                       res.send('200')
                   })
               }else{
                   res.send('401')
               }
           })
       }
  };

  //displays the category 
   const showCat = (req,res)=>{
       let sql = "SELECT * FRom category"
       db.query(sql,(err,results)=>{
           if(err) throw err
           res.send(results)
       })
   }

   //updates category
   const updateCat = (req,res)=>{
    let Id;
    let cat;
     Id = req.params.Id
     cat = req.body.category
     let sql = `UPDATE category SET category = '${cat}' WHERE Id = ${Id}`
     db.query(sql,(err,row)=>{
         if(err) throw err
         res.send('200')
     }) 
   }

   //delete category

   const delCat = (req,res)=>{
       let Id = req.params.Id
       let sql = `DELETE FROM category WHERE Id = ${Id}`
       db.query(sql,(err,results)=>{
           if(err)throw err
           res.send('200')
       })
   }

// handles the files upload

const fileUpload = (req,res)=>{ 
    let form = new formidable.IncomingForm();
     form.parse(req);

      let data = new Object();
      let error = 0;
      
     
      form.on('field',(field,value)=>{
         if(field === 'title' ){
             data.title = value
         }
         if(field === 'category'){
             data.cat_Id = value
         }
       
      })
       

    .on('fileBegin',(name,file)=>{
     let filetype = file.type.split('/').pop()
    

     if(file.name.match(/\.(mp4|avi|mkv)$/)){
        file.path = 'uploads/videos/' + file.name; 
         
    }else if(file.name.match(/\.(pdf)$/)){
         file.path = 'uploads/pdfs/'+ file.name;
        
     }else{
         error +=1
     }
      
    })

    .on('file',(name,file)=>{
        let filetype = file.type.split('/').pop()
        data.filename = file.name
        data.filetype = filetype;
   
      
    })

    .on('error',(err)=>{
        if(err) throw err 
    })

    .on('end',()=>{
    // create a date object 
    if(error === 0){
        // check if title and filename already exists in database 

    let sql_FileExists = "SELECT * FROM `file` WHERE `Title` = ? AND `fileName` = ? "
    let sqlValues = [data.title,data.filename]

    db.query(sql_FileExists,sqlValues,(err,row)=>{
        if(err) throw err

          if(row.length === 0){

          // run the insert block of code

        let today = new Date()
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        let time = today.getHours()+"-"+today.getMinutes()+":"+today.getSeconds()
        let dateTime = date+' '+time; 
       
        let values = {Title:data.title,category_Id:data.cat_Id,fileName:data.filename,fileType:data.filetype,date_created:dateTime}
         let sql = "INSERT INTO file SET ?"
         db.query(sql,values,(err,results)=>{
            if(err)throw err
            res.send('201')
         }) 

          }else{
              res.send('501')
          }
    })

    }else{
        res.send('501')
    }
  })

 };

 // get all the files and display 

 const getFiles = (req,res)=>{
    let sql = "SELECT file.*,category.* FROM file JOIN category ON category.Id = file.category_Id"
    db.query(sql,(err,results)=>{
        if(err) throw err
        res.send(results)
    })
 }

 //delete files from db...

  const delFiles = (req,res)=>{
      let Id;
      Id = req.params.Id
      let sql = `DELETE FROM file WHERE Id = ${Id}`
      db.query(sql,(err,result)=>{
          if(err) throw err
          res.send('200')
      }) 

        
  }
 
 


   

 

exports.addSchool = addSchool;
exports.addDept = addDept;
exports.fileUpload = fileUpload;
exports.getSchools = getSchools
exports.getDept = getDept
exports.deleteSch = deleteSch
exports.editSch = editSch
exports.deleteDept = deleteDept
exports.editDept = editDept
exports.category = category
exports.showCat = showCat
exports.delCat = delCat
exports.updateCat = updateCat
exports.getFiles = getFiles
exports.delFiles = delFiles