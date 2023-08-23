
import ProductService from "../../services/ProductService.js";
import { sendErrorResponse } from "../../utils.js";

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
        const queryResult = await ProductService.getAll(queryMongo, pagination)
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
        sendErrorResponse(res, err)
    }
}