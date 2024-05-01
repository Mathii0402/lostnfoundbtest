// const lost = require('../model/lost');

// exports.createLost = async(req,res,next)=>
// {
//     try{
//         console.log(req.body);
//         const expense = await lost.create(req.body);
//         return res.status(200).json(
//             {
//                 sucess:true,
//                 message:expense
//             }
//         );
//     }
//     catch(err)
//     {
//         if(err.name=='ValidationError')
//         {
//             const mes = Object.values(err.errors).map(val=>val.message)
//             return res.status(400).json(
//                 {
//                     sucess:false,
//                     message:mes
//                 }
//             );
//         }
//         else{
//              return res.status(500).json(
//                 {
//                     sucess:false,
//                     message:"internal server error"
//                 }
//             );
//         }
//     }
    
// }
// exports.getLost = async (req, res, next) => {
//     try {
//       const expenses = await lost.find();
//       console.log(expenses);
//       return res.status(200).json({
//         success: true,
//         count: expenses.length,
//         data: expenses,
//       });
//     } catch (err) {
//       return res.status(500).json({
//         success: false,
//         error: "server error",
//       });
//     }
//   };


// const request=require("../../src/")
const Expenses = require("../model/lost");
const Founds = require("../model/found")
exports.getLost = async (req, res, next) => {
  try {
    const expenses = await Expenses.find();
    console.log(expenses);
    return res.status(200).json({
  
       expenses
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};

exports.getObjbyId = async (req, res, next) => {
  try {
    // console.log(req.params.id,"id");
    const object = await Founds.find({objid:req.params.id});
    console.log(object);
    if (!object || typeof object===undefined) {
      return res.status(404).json({
        status: false,
        error: "object not found",
      });
    }
    return res.status(200).json({
      status:true,
      data:object});
  } catch (err) {
    return res.status(500).json({
      success: false,

    });
  }
};
exports.getObjbyId2 = async (req, res, next) => {
  try {
    const object = await Expenses.find({objid:req.params.id});
    if (!object) {
      return res.status(404).json({
        status: false,
        error: "object not found",
      });
    }
    return res.status(200).json({
      status:true,
      data:object});
  } catch (err) {
    return res.status(500).json({
      success: false,

    });
  }
};



const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generating a unique filename
  }
});

// Multer file filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

exports.addLost = async (req, res, next) => {
    try {

      upload.single('image')(req, res, async function(err) {
        if (err) {
          return res.status(400).json({ success: false, error: err.message });
        }
        const { name, amount, desc, title, place, date } = req.body;
        const count = await Expenses.estimatedDocumentCount();
        const newcnt = (count + 1).toString();
        const newbody = {
          objid: newcnt,
          name,
          amount,
          desc,
          title,
          place,
          date,
          // Add the filename of the uploaded image to the newbody
          image: req.file.filename
        };
  
        const expense = await Expenses.create(newbody);
  
        return res.status(201).json({
          success: true,
          data: expense
        });
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "Lost not created",
      });
    }
  }; 
exports.addFound = async (req, res, next) => {
    try {
      console.log(req.body);
      const { name, place,address,number} = req.body;
      console.log(name, place,address,number);
      const founds = await Founds.create(req.body);
      return res.status(201).json({
   data:founds
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "Found not created",
      });
    }
  };

//-------------------BY USING FIND ID AND DELETE-------------------------------
exports.deleteExpensesID = async (req, res, next) => {
  try {
    const id=req.params.id;
    const expense=await Expenses.findByIdAndDelete(re.params.id);
    
    return res.status(201).json({
        success: true,
        data: expense,
      });

  } catch {
    return res.status(500).json({
      success: true,
      error: "srv error",
    });
  }
};
exports.deleteExpensesID = async (req, res, next) => {
    try {
      const id=req.params.id;
      const expense=await Expenses.findById(req.params.id);
      await expense.remove();
      return res.status(201).json({
          success: true,
          data: expense,
        });
  
    } catch {
      return res.status(500).json({
        success: true,
        error: "srv error",
      });
    }
  };
  
  exports.UpdateExpensesID = async (req, res, next) => {
    try {
      const id=req.params.id;
      const expense=await Expenses.findByIdAndUpdate(id,req.body,{ new: true });
  
      return res.status(201).json({
          success: true,
          data: expense,
        });
  
    } catch {
      return res.status(500).json({
        success: true,
        error: "srv error",
      });
    }
  };
  
  exports.Loggerfunction = async (req, res, next) => {
  // console.log("logging");
  console.log(req.method,req.url);
  next();
  };
  
  exports.checkAdmin=(req,res,next)=>{
    const isAdmin=true;
    if(!isAdmin){
        res.status(401).json({
            message:"unauthorized acces"
        })
    }
    next();
  }
