const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  const categories = await Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  });
  res.json(categories);
});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  const categories = await Category.findOne({
    where: {
      id: req.params.id
    },  
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  });
  res.json(categories);
});

// create a new category
router.post('/', async (req, res) => {
  const category = await Category.create({
    category_name: req.body.category_name
  });
  res.json(category);
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  const category = await Category.update({
    category_name: req.body.category_name
  },
  {  
  where: {
      id: req.params.id
  }  
  });
  res.json(category);
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  const category = await Category.destroy({
    where: {
      id: req.params.id,
    }
  });
  res.json(category);
});

module.exports = router;
