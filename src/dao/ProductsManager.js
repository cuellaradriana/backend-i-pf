import { ProductsModel } from './models/products.model.js';

export class ProductsManager {
    static async getProducts(
        { limit = 10, page = 1, query = '', value = '', sort = '' },
        router
    ) {
        const filter = {};

        if (query === 'category' && value) {
            filter.category = value;
        } else if (query === 'stock' && value) {
            filter.stock = value === 'true' ? { $gt: 0 } : { $lte: 0 };
        }

        const options = {
            limit: Number(limit),
            page: Number(page),
            sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {}, // Ordenar por precio
            lean: true,
        };

        const products = await ProductsModel.paginate(filter, options);
        let {
            docs: payload,
            page: currentPage,
            totalPages,
            prevPage,
            nextPage,
            hasPrevPage,
            hasNextPage,
        } = products;

        const buildLink = (page) => {
            const params = new URLSearchParams();
            if (limit) params.append('limit', limit);
            if (query) params.append('query', query);
            if (value) params.append('value', value);
            if (sort) params.append('sort', sort);
            params.append('page', page);
            if (router === 'products')
                return `/api/products/?${params.toString()}`;
            if (router === 'views') return `/?${params.toString()}`;
        };

        const response = {
            status: 'success',
            payload,
            currentPage,
            totalPages,
            prevPage,
            nextPage,
            hasPrevPage,
            hasNextPage,
            prevLink: hasPrevPage ? buildLink(prevPage) : null,
            nextLink: hasNextPage ? buildLink(nextPage) : null,
        };
        return response;
    }

    static async getProductById(id) {
        return await ProductsModel.findById(id).lean();
    }
    static async getProductBy(filter = {}) {
        return ProductsModel.findOne(filter);
    }
    static async addProduct(product = {}) {
        return await ProductsModel.create(product);
    }
    static async updateProduct(id, fields) {
        return await ProductsModel.findByIdAndUpdate(id, fields, {
            new: true,
        }).lean();
    }
    static async deleteProduct(id) {
        return await ProductsModel.findByIdAndDelete(id);
    }
}
