import express from 'express';
import { faker } from '@faker-js/faker';

const generateFakeData = (res) => {
    const products = [];
    for (let i = 0; i < 100; i++) {
        const product = {
            title: faker.commerce.productName(),
            desc: faker.lorem.sentence(),
            price: faker.commerce.price(),
            code: faker.commerce.isbn(10),
            category: faker.commerce.department(),
            stock: faker.number.int({ min: 0, max: 999 }),
        };
        products.push(product);
    }
    return res.json(products)
};

export const fakeData = express.Router();

fakeData.get("/", (req, res) =>{
    generateFakeData(res)
});
