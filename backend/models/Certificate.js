var mongoose = require('mongoose')

var CertificateSchema = mongoose.Schema({
    name: String,
    description: String,
    link: String, 
    image: String
})

CertificateSchema.methods.create = function(certificateData) {
  var certificate = new Certificate()
  certificate.name = certificateData.name
  certificate.description = certificateData.description || ''
  certificate.link = certificateData.link
  certificate.image = certificateData.image || ''

  certificate.save(function(err) {
      if (err) {
        throw err
      }
  })
}

module.exports = mongoose.model('Certificate', CertificateSchema)