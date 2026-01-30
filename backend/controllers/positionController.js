const positionModel = require('../models/positionModel')

exports.creactPosition = async (req, res) => {
    try{
        const position_name = req.body;
        const newPosition = new positionModel({
              position_name
         });
         await newPosition.save();
         res.status(201).json(newCategory);
    }catch{}
    
}