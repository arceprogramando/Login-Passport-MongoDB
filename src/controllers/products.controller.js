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

  getAllProduct = async (req, res) => {
    try {
      const { limit, page = 1, sort, query } = req.query;

      let filter = {};
      if (query) filter = { category: query };

      const sortOption = sort === 'asc' ? { price: 1 } : { price: -1 };

      let productsQuery = this.productService.getAllProduct(filter, sortOption);

      if (limit) {
        const parsedLimit = Number(limit);
        productsQuery = productsQuery
          .sort(sortOption)
          .skip((page - 1) * parsedLimit)
          .limit(parsedLimit);
      }

      const products = await productsQuery;
      const totalCount = await this.productService.countDocuments(filter);
      const totalPages = limit ? Math.ceil(totalCount / parseInt(limit, 10)) : 1;

      const hasPrevPage = page > 1;
      const hasNextPage = page < totalPages;
      const prevLink = hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}` : null;
      const nextLink = hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}` : null;

      return res.json({
        status: 'success',
        payload: products,
        totalPages,
        prevPage: hasPrevPage ? page - 1 : null,
        nextPage: hasNextPage ? page + 1 : null,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink,
      });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: 'Error interno del servidor' });
    }
  };

  getProductById = async (req, res) => {
    try {
      const { pId } = req.params;
      const product = await this.productService.getProductById(pId);

      res.status(product ? 200 : 404).json(product || { error: 'El producto no existe' });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el producto con el id solicitado' });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { pId } = req.params;
      const { title, description, code, price, status, stock, category } = req.body;

      let thumbnails = null;

      if (req.file) thumbnails = `/src/public/upload/${req.file.filename}`;

      const existingProduct = await this.productService.getProductById(pId);

      if (!existingProduct) return res.status(404).json({ error: 'Producto no encontrado' });

      const updatedProductData = {
        title: title || existingProduct.title,
        description: description || existingProduct.description,
        code: code || existingProduct.code,
        price: price || existingProduct.price,
        status: status || existingProduct.status,
        stock: stock || existingProduct.stock,
        category: category || existingProduct.category,
        thumbnails: thumbnails || existingProduct.thumbnails,
      };

      const updatedProduct = await this.productService.updateProduct(pId, updatedProductData);

      return res.json({ status: 'success', product: updatedProduct });
    } catch (error) {
      return res.status(500).json({ error: `Error al actualizar el producto ${error.message}` });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { pId } = req.params;
      const product = await this.productService.getProductById(pId);
      const message = product ? 'Producto eliminado correctamente' : 'El producto no existe';
      const status = product ? 'success' : 'error';

      await this.productService.deleteProduct(pId);

      return res.status(product ? 200 : 404).json({ status, message });
    } catch (error) {
      return res.status(500).json({ error: `Error al eliminar el producto: ${error.message}` });
    }
  };
}

export default ProductController;
