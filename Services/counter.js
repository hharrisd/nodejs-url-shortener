const CounterModel = require("../Models/counter");

module.exports = class LinkService {
  // Initialize counter
  async Initialize() {
    const initial_count = new CounterModel({
      _id: "url_shortener",
      sequence: 0,
    });
    return await initial_count.save();
  }

  async GetNextSequenceValue(sequenceName) {
    const filter = { _id: sequenceName };
    const update = { $inc: { sequence: 1 } };
    let sequenceDocument = await CounterModel.findOneAndUpdate(filter, update, {
      new: true,
    });
    return sequenceDocument.sequence;
  }
};
