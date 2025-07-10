
import mongoose from "mongoose";

const excelDataSchema = new mongoose.Schema({
     filename: {
    type: String,
    required: true,
  },
     uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fileSize :{
    type: Number
  },
  ExcelData : {type : [mongoose.Schema.Types.Mixed]},

},{  timestamps: true })

const ExcelModel = mongoose.model('Excel',excelDataSchema)
export default ExcelModel