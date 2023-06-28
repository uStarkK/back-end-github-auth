
import { ProductsModel } from "../DAO/models/products.model.js";

// GET PRODUCTS FROM DB
export const getProduct = async (req, res) => {
    try {
        const { limit, page, query, sort } = req.query
        const queryMongo = { status: true }
        if (query) {
            queryMongo.$text = { $search: query }
        }
        const pagination = {
            limit: limit || 7,
            page: page || 1,
        }
        if (sort && (sort !== 'asc' && sort !== 'desc')) {
            pagination.sort = {
                price: ""
            }
        } else {
            pagination.sort = {
                price: sort
            }
        }
        const queryResult = await ProductsModel.paginate(queryMongo, { ...pagination });
        const sortParam = sort ? `&sort=${sort}` : "";
        const queryParam = query ? `&query=${query}` : ""
        const { docs, totalDocs, pagingCounter, ...rest } = queryResult
        const baseUrl = req.protocol + '://' + req.get('host');
        const paginationLinks = {
            first: baseUrl + `/api/products?limit=${rest.limit}${sortParam}${queryParam}`,
            last: baseUrl + `/api/products?page=${rest.totalPages}&limit=${rest.limit}${sortParam}${queryParam}`
        }
        if (rest.prevPage !== null) {
            paginationLinks.prev = baseUrl + `/api/products?page=${rest.prevPage}&limit=${rest.limit}${sortParam}${queryParam}`
        } else {
            paginationLinks.prev = null
        }
        if (rest.nextPage !== null) {
            paginationLinks.next = baseUrl + `/api/products?page=${rest.nextPage}&limit=${rest.limit}${sortParam}${queryParam}`
        } else {
            paginationLinks.next = null
        }

        res.status(200).json({
            payload: docs,
            pagination: rest,
            paginationLinks: paginationLinks
        })
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}


// GET PRODUCT FROM DB BY ID

export const getProductByid = async (req, res) => {
    try {
        const pid = (req.params.pid);
        const filteredData = await ProductsModel.findOne({ _id: pid })
        res.status(200).json(filteredData)
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

// CREATE NEW PRODUCT IN DB

export const createProduct = async (req, res) => {
    try {
        let newProduct = req.body;
        const productCreated = await ProductsModel.create(newProduct)
        return res.json({
            status: "success",
            msg: "Product created",
            data: productCreated
        })
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

// UPDATE PRODUCT IN DB 

export const updateProduct = async (req, res) => {
    try {
        const pid = req.params.pid
        const { code, ...updatedProduct } = req.body
        await ProductsModel.updateOne({ _id: pid }, updatedProduct);
        return res.json({
            status: "success",
            msg: "product updated",
            data: updatedProduct
        })
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

// DELETE PRODUCT FROM DB 

export const deleteProduct = async (req, res) => {
    try {
        const pid = req.params.pid;
        await ProductsModel.deleteOne({ _id: pid })
        return res.header('X-Message', 'Product successfully deleted').status(204).json()
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}