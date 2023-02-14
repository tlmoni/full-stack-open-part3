require("dotenv").config()
const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)

console.log("Connecting to MongoDB")
mongoose.connect(url)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB: ${error.message}`)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: function(number) {
        return /^([0-9]{2,3})[-]([0-9]{1,99})/.test(number)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
})

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Person", personSchema)
