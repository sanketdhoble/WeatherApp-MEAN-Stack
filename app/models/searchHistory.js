var mongoose     = require('mongoose'); 
var crypto = require('crypto'); 
var Schema       = mongoose.Schema;


var HistorySchema   = new Schema({ 

    latitude:String,
    longitude : {type:String},
    city:String,
    done : Boolean,
    userId:String

},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('SearchHistory', HistorySchema);
 

