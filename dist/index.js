'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const ClientController_1 = require("./controllers/ClientController");
const ProductController_1 = require("./controllers/ProductController");
const ListController_1 = require("./controllers/ListController");
const PurchaseController_1 = require("./controllers/PurchaseController");
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect('mongodb://localhost:27017/tienda', { useNewUrlParser: true })
    .then(() => {
    console.log('conected to database successfully!');
})
    .catch(err => console.error(err));
const port = process.env.port || 1337;
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use('/clients', ClientController_1.clientRouter);
app.use('/products', ProductController_1.productRouter);
app.use('/lists', ListController_1.listRouter);
app.use('/purchases', PurchaseController_1.purchaseRouter);
app.get('/', (req, res) => {
    res.send("API is running OK");
});
app.listen(port, () => {
    console.log('App is running in port: ' + port);
});
//# sourceMappingURL=index.js.map