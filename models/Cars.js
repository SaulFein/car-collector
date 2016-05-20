'use strict';

module.exports = (mongoose, models) => {
  let CarSchema = mongoose.Schema({
    make: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    year: {
      type: String
    },
    licence: {
      type: String
    },
    yearaquired: {
      type: String
    },
    yearsold: {
      type: String
    },
    sold: {
      type: String
    }
  });

  let Car = mongoose.model('Car', CarSchema);
  models.Car = Car;
};
