var mongoose     = require('mongoose'); 
var crypto = require('crypto'); 
var Schema       = mongoose.Schema;

var profileSchema   = new Schema({  
    username : {type:String,required:true,dropDups: true },
    password:{type: String,required:true},
    done : Boolean,
    email:{type:String,required:true},
    userId: {
        type: String,
        default: function() {
            return crypto.randomBytes(12).toString('hex');
        }
    }
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Profile', profileSchema);