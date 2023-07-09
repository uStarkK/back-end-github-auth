import MongoStore from "connect-mongo";
import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import passport from "passport";
import path from "path";
import { iniPassport } from "./config/passport.config.js";
import { authRouter } from "./routes/auth.router.js";
import { cartRender } from "./routes/cartRender.js";
import { cartRouter } from "./routes/cart_router.js";
import { testChat } from "./routes/chat.router.js";
import { productsRender } from "./routes/ProductsRender.js";
import { productsRouter } from "./routes/products_router.js";
import { realTimeProducts } from "./routes/RealTimeProducts.js";
import { sessionsRouter } from "./routes/sessions.router.js";
import { connectMongo, isAdmin, startSocket, __dirname } from "./utils.js";
import dotenv from "dotenv"

dotenv.config()

const {DB, SESSION_SECRET} = process.env


// SERVER 
const PORT = 8080
const app = express()

const httpServer = app.listen(PORT, () => {console.log(`Server on! Listening on localhost:${PORT}`)})

connectMongo();
startSocket(httpServer)


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    store: MongoStore.create({mongoUrl: DB, ttl: 500000, dbName: "ecommerce"}),
    secret: SESSION_SECRET, 
    resave: true, 
    saveUninitialized: true}))

// PASSPORT
iniPassport();
app.use(passport.initialize());
app.use(passport.session());

// Routes / Views
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "handlebars")


// API ROUTES
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)

// HTML RENDER
app.use('/api/sessions', sessionsRouter);
app.use("/products", productsRender)
app.use("/carts", cartRender)
app.use("/auth", authRouter)
// SOCKETS ROUTE
app.use("/realTimeProducts", isAdmin, realTimeProducts)
app.use("/chat", testChat)



app.get("*", (req, res, next) => {
    res.status(404).json({ status: "error", msg: "Route not found", data: {} })
})




