const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../../model/Item");

// @route GET api/item
// @decs GET All Items
// @access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({
      date: -1
    })
    .then(items => res.json(items));
});

// @route POST api/item
// @decs Create An Item
// @access Public
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.json(item));
});
// @route DELETE api/item/:id
// @decs DELETE AN Item
// @access Public
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
