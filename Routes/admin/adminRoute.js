const express = require('express');
const route = express.Router();
const admin = require('../../controllers/adminController');
 

route.post('/',admin.addSchool)
route.post('/AddDept',admin.addDept)
route.post('/category',admin.category)
route.post('/upload',admin.fileUpload)
route.get('/',admin.getSchools)
route.get('/dept',admin.getDept)
route.get('/category',admin.showCat)
route.get('/upload',admin.getFiles)
route.delete('/:Id',admin.deleteSch)
route.delete('/dept/:Id',admin.deleteDept)
route.delete('/category/:Id',admin.delCat)
route.delete('/upload/:Id',admin.delFiles)
route.put('/:Id',admin.editSch)
route.put('/dept/:Id',admin.editDept)
route.put('/category/:Id',admin.updateCat)


 



module.exports = route;