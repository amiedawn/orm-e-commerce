const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get("/", async (req, res) => {
  const tags = await Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  });
  res.json(tags);
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get("/:id", async (req, res) => {
  const tag = await Tag.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  });
  res.json(tag);
});

// create a new tag
router.post("/", async (req, res) => {
  const tag = await Tag.create({
    tag_name: req.body.tag_name,
  });
  res.json(tag);
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  const tag = await Tag.update({
    tag_name: req.body.tag_name
  },
  {  
  where: {
      id: req.params.id
  }  
  });
  res.json(tag);
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  const tag = await Tag.destroy({
    where: {
      id: req.params.id
    },
  })
  res.json(tag);
});

module.exports = router;
