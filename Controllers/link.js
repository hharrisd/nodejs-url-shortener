const link = require("../Models/link");
const LinkService = require("../Services/link");
const linkService = new LinkService();

const CounterService = require("../Services/counter");
const counterService = new CounterService();

const utils = require("../Util/util");

module.exports = class LinkController {
  async CreateLink(req, res, next) {
    let link = req.body;

    // Check if the short-code is present. If not, generate an ID
    if (link.urlId) {
      // Verify unique value
      const exist_result = await linkService.ExistLinkWithShortCode(link.urlId);
      if (exist_result) {
        console.log(exist_result);
        return res
          .status(400)
          .json({ error: "The proposed code is already in use." });
      }
    } else {
      // Obtain next sequence value
      const sequenceValue = await counterService.GetNextSequenceValue(
        "url_shortener"
      );
      // Add encoded sequence value as short-code
      link.urlId = utils.encode_int_to_base62(sequenceValue);
    }
    console.log(link);

    const result = await linkService.CreateLink(link);

    if (result) {
      const result_object = {
        shortCode: result.urlId,
        shortenedURL: process.env.DOMAIN_URL + "/" + result.urlId,
      };
      res.send(result_object);
    } else {
      res.send("error");
    }
  }

  async GetAllLinks(req, res, next) {
    const result = await linkService.GetAllLinks();

    if (result) {
      res.send(result);
    } else {
      res.send("error");
    }
  }

  async Redirect(req, res, next) {
    const result = await linkService.VisitShortUrl(req.params.shortCode);
    if (result) {
      console.log(result);
      res.redirect(301, result.origUrl);
    } else {
      res.status(404).json("The given short-code does not exist.");
    }
  }

  async GetLinkStats(req, res, next) {
    console.log(req.params);
    const result = await linkService.GetLinkByShortCode(req.params.shortCode);
    if (result) {
      const result_object = {
        shortCode: result.urlId,
        shortenedURL: process.env.DOMAIN_URL + "/" + result.urlId,
        clicks: result.clicks,
        createdAt: utils.dateDisplayed(parseInt(result.createdAt)),
        lastVisitedAt: utils.dateDisplayed(parseInt(result.lastVisited)),
      };
      res.send(result_object);
    } else {
      res.status(404).json("The given short-code does not exist.");
    }
  }

  async InitializeCounter(req, res, next) {
    const result = await counterService.Initialize();

    if (result) {
      res.send(result);
    } else {
      res.send("error");
    }
  }

  async IncrementSequence() {
    const result = await counterService.GetNextSequenceValue("url_shortener");

    if (result) {
      return result;
    } else {
      console.log("Error generating next sequence value.");
    }
  }
};
