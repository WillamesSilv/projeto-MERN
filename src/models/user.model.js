const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const DataSchema = new mongoose.Schema({ //definindo todos os campos da colection users
    name_user: {type: String},
    email_user: {type: String, required: true},
    type_user: {type: Number, default:1, required: true},
    password_user: {type: String, required: true},
},
{ // data e atualização do usuario
    timestamps: true
})

// criptografando a senha
DataSchema.pre('save', function (next){
    if (!this.isModified('password_user')){
        return next()
    }
    this.password_user = bcrypt.hashSync(this.password_user, 10);
    next();
})

DataSchema.pre('findOneAndUpdate', function(next){
    var password = this.getUpdate().password_user+'';
    if(password.length < 55) {
        this.getUpdate().password_user = bcrypt.hashSync(password, 10);
    }
    next()
})

DataSchema.methods.isCorrectPassword= function (password, callback) {
    bcrypt.compare(password, this.password_user, function(err, same){
        if(err) {
            callback(err)
        }else {
            callback(err, same)
        }
    })
}

const users = mongoose.model('Users', DataSchema)

module.exports = users