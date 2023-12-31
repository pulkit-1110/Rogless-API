const mongoose = require("mongoose");

const accountDbSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    phoneNumber: {
      countryCode: { type: String },
      phoneNumber: { type: String },
    },
    address: {
      city: { type: String },
      country: { type: String },
      googlePlaceId: {
        type: String,
        index: true,
      },
      location: {
        type: { type: String, default: "POINT" },
        coordinates: [Number, Number],
      },
      postalCode: { type: String },
      state: { type: String },
      streetName: { type: String },
    },
    profileImage: { type: mongoose.Schema.Types.ObjectId, ref: "resources" },
    age: { type: Number },
    bloodGroup: { type: String },
    height: { type: String },
    weight: { type: Number },
    verified: { type: Boolean, default: false },
    verifiedAt: { type: Date },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

accountDbSchema.index(
  { "phoneNumber.countryCode": 1, "phoneNumber.phoneNumber": 1 },
  { unique: true }
);

const AccountRepository = {
  accountDb: mongoose.model("accounts", accountDbSchema),

  async initializeRepository() {
    this.accountDb = mongoose.model("accounts", accountDbSchema);
  },
};

module.exports = AccountRepository;
