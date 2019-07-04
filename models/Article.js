var mongoose = require("mongoose");

// schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    // `title` is required and of type String
    headline: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      required: false
    },
    // `link` is required and of type String
    link: {
      type: String,
      required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
      }
    });
    
    // This creates our model from the above schema, using mongoose's model method
    var Article = mongoose.model("Article", ArticleSchema);
    
    // Export the Article model
    module.exports = Article;
    