var mongoose = require('mongoose');

var PlatformSchema = mongoose.Schema({
    name : String,
    description: String,
    stars: { type: Number, min: 0, max: 5 },
    courses: [],
    link: String,
    image: String,
});

PlatformSchema.methods.create = function(platformData) {
  var platform = new Platform()
  platform.name        = platformData.name        
  platform.description = platformData.description
  platform.stars       = platformData.stars || 0    
  platform.courses     = platformData.courses || [] 
  platform.link        = platformData.link
  platform.image       = platformData.image || ''     

  platform.save(function(err) {
      if (err) {
        throw err
      }
  });
};

module.exports = mongoose.model('Platform', PlatformSchema);