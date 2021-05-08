const db = require('../db')

const getFiles = (req,res)=>{
    let Id;
    Id = req.params.Id

   let sql =`SELECT category.*,file.* FROM file JOIN category ON category.Id = file.category_Id WHERE category_Id = ${Id} `
   db.query(sql,(err,result)=>{
       if(err) throw err
       res.send(result)
   })

}


exports.getFiles = getFiles