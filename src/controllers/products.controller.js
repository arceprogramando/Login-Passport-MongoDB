import ProductService from '../services/product.services.js';

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  createProduct = async (req, res) => {
    try {
      const { title, description, code, price, status, stock, category } = req.body;

      let thumbnails = null;

      if (req.file) thumbnails = `/upload/${req.file.filename}`;

      if (!title) return res.status(400).json({ error: 'El título es obligatorio' });

      if (!description) return res.status(400).json({ error: 'La descripción es obligatoria' });

      if (!code) return res.status(400).json({ error: 'El código es obligatorio' });

      if (!price) return res.status(400).json({ error: 'El precio es obligatorio' });

      if (!stock) return res.status(400).json({ error: 'El stock es obligatorio' });

      if (!category) return res.status(400).json({ error: 'La categoría es obligatoria' });

      if (!thumbnails) return res.status(400).json({ error: 'El thumbnails es obligatorio' });

      const product = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      };

      await this.productService.createProduct(product);

      return res.status(201).json('Producto Agregado correctamente');
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  };
}

export default ProductController;
