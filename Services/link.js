const LinkModel = require("../Models/link");

module.exports = class LinkService {
  async CreateLink(link) {
    const linkToAdd = new LinkModel(link);
    return await linkToAdd.save();
  }

  async GetAllLinks() {
    return LinkModel.find();
  }

  async ExistLinkWithShortCode(shortCode) {
    return LinkModel.exists({
      urlId: { $regex: new RegExp("^" + shortCode.toLowerCase(), "i") },
    });
  }

  async VisitShortUrl(shortCode) {
    const filter = {
      urlId: { $regex: new RegExp("^" + shortCode.toLowerCase(), "i") },
    };
    const update = { $inc: { clicks: 1 }, lastVisited: Date.now() };
    return LinkModel.findOneAndUpdate(filter, update, { new: true });
  }

  async GetLinkByShortCode(shortCode) {
    const filter = {
      urlId: { $regex: new RegExp("^" + shortCode.toLowerCase(), "i") },
    };

    return LinkModel.findOne(filter);
  }
};
