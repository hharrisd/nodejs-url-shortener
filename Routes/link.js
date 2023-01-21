const express = require("express");
const { requestWithoutRetry } = require("wd/lib/http-utils");
const router = express.Router();
const LinkController = require("../Controllers/link");
const linkController = new LinkController();
const LinkValidator = require("../Validation/link");
const { validateCreate } = require("../Validator/link");

router.post("/submit", validateCreate, linkController.CreateLink);
router.get("/link/all", linkController.GetAllLinks);
router.get("/counter/init", linkController.InitializeCounter);
router.get("/counter/inc", linkController.IncrementSequence);
router.get("/:shortCode", linkController.Redirect);
router.get("/:shortCode/stats", linkController.GetLinkStats);

module.exports = router;
