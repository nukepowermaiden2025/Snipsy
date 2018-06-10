var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
 
  title: {
    type: String,
    required: true
  },
 
  link: {
    type: String,
    required: true
  },

  summary:{
    type: String,
    default: "Click the link above to view more"
  },

  img:{
    type:String,
    required: true,
    default:"https://placeimg.com/640/480/any"
  },

  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  },
  saved:{
    type:Boolean,
    default:false
  }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
