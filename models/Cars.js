'use strict';

module.exports = (mongoose, models) => {
  let CarSchema = mongoose.Schema({
    // _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    _userId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
    //  required: true
   },
    make: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    year: {
      type: String,
      default: 'N/A'
    },
    licence: {
      type: String,
      default: 'N/A'
    },
    vin: {
      type: String,
      default: 'N/A'
    },
    description: {
      type: String,
      default: 'N/A'
    },
    image: {
      type: String
    }
  });

  let Car = mongoose.model('Car', CarSchema);
  models.Car = Car;
};
