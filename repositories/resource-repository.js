const mongoose = require("mongoose");

const resourceDbSchema = new mongoose.Schema({
  externalId: { type: String },
});

const ResourceRepository = {
  resourceDb: mongoose.model("resources", resourceDbSchema),

  async initializeRepository() {
    this.resourceDb = mongoose.model("resources", resourceDbSchema);
  },
};

module.exports = ResourceRepository;
