const mongoose = require("mongoose")
const dogsSchema = mongoose.Schema({
dogname: {
    type: String,
    required:[true,"Dog name is required"]
},
place: String,
price: {
    type: Number,
    min:[1000,"Dog price should be min 1000"],
    max:[2000,"Dog price should not be more than 1000"]
},
family: {
    type: String,
    required:[true,"Dog name is required"],
    minLength:[7,"Dog family should be min 7 charcaters"]
},
})
module.exports = mongoose.model("mydogs", dogsSchema)