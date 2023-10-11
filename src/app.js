import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import passport from "passport";
import path from "path";
import { iniPassport } from "./config/passport.config.js";
import errorHandler from "./middlewares/error.js";
import { authRouter } from "./routes/auth.router.js";
import { cartRender } from "./routes/cartRender.js";
import { cartRouter } from "./routes/cart_router.js";
import { testChat } from "./routes/chat.router.js";
import { productsRender } from "./routes/ProductsRender.js";
import { productsRouter } from "./routes/products_router.js";
import { realTimeProducts } from "./routes/RealTimeProducts.js";
import { sessionsRouter } from "./routes/sessions.router.js";
import { connectMongo, startSocket, __dirname } from "./Utils/utils.js";
import { fakeData } from "./routes/faker.router.js";
import { addLogger } from "./Utils/logger.js";
import { loggerTest } from "./routes/loggerTest.router.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express"
import { usersRouter } from "./routes/users.router.js";
import { userRender } from "./routes/users.render.js";

dotenv.config()

const { DB, SESSION_SECRET } = process.env



// SERVER 
const PORT = 8080
const app = express()


app.use(addLogger)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    store: MongoStore.create({ mongoUrl: DB, ttl: 500000, dbName: "ecommerce" }),
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

const swaggerOptions = {

    definition: {

        openapi: "3.0.1",

        info: {

            title: "API Docs",

            description: "Este proyecto si es de pizzas, y tambien de un ecommerce",

        },

    },

    apis: [`${__dirname}/docs/**/*.yaml`],

};

const hbs = handlebars.create({
    extname: '.handlebars',
    helpers: {
        eq: function (a, b) {
            return a === b;
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');


const specs = swaggerJSDoc(swaggerOptions);

app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// PASSPORT
iniPassport();
app.use(passport.initialize());
app.use(passport.session());


// API ROUTES
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)
app.use("/api/users", usersRouter)
// HTML RENDER
app.use('/api/sessions', sessionsRouter);
app.use("/", productsRender)
app.use("/carts", cartRender)
app.use("/auth", authRouter)
app.use("/mockingproducts", fakeData)
app.use("/users", userRender)
// SOCKETS ROUTE
app.use("/realTimeProducts", realTimeProducts)
app.use("/chat", testChat)



app.get("/loggertest", loggerTest)


app.get("*", (req, res, next) => {
    res.status(404).json({ status: "error", msg: "Route not found", data: {} })
})

app.use(errorHandler)

async function start() {
    try {
        const httpServer = app.listen(PORT, () => { console.log(`Server on! Listening on localhost:${PORT}`) })
        await connectMongo()
        await startSocket(httpServer)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

start()