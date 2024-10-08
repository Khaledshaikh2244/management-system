
const Product = require ('../models/product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// addign the products
exports.addProduct = async (req, res) => {
  try {
    const { productName, description, price, stockQuantity, category } = req.body;
    //here we are getting iamge from the multer
    const image = req.file ? req.file.path: '';
    const newProduct = new Product({ productName, description, price, stockQuantity, category,image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, description, price, stockQuantity, category } = req.body;
    const image = req.file ? req.file.path: '';
    const product = await Product.findByIdAndUpdate(id, { productName, description, price, stockQuantity, category,image }, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
