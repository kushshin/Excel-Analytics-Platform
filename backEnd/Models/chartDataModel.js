import mongoose from 'mongoose';

const chartSchema = new mongoose.Schema({
    title : {
        type: String,
    },

    chartType : {
        type: String,
    },

    labels : {
        type : [String],
    },

    datasets: [
        {
            label : {
                type : String,
            },
            data :{
                type: [Number],
            },
            backgroundColor :  {type : [mongoose.Schema.Types.Mixed]},
        }
    ],

    FilePath : {
        type: String,
    },
 uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  excelFileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Excel',
    required: true,
  },

    
},{timestamps :true})

const  CreatedChartData = mongoose.model('Chart', chartSchema)
export default CreatedChartData