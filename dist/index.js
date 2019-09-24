'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const UserController_1 = require("./controllers/UserController");
const CalendarController_1 = require("./controllers/CalendarController");
const TagTeamController_1 = require("./controllers/TagTeamController");
const CodeController_1 = require("./controllers/CodeController");
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect('mongodb://localhost:27017/KitchenDuty', { useNewUrlParser: true })
    .then(() => {
    console.log('conected to database successfully!');
})
    .catch(err => console.error(err));
const port = process.env.port || 1337;
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use('/users', UserController_1.userRouter);
app.use('/calendars', CalendarController_1.calendarRouter);
app.use('/tagteams', TagTeamController_1.tagteamRouter);
app.use('/code', CodeController_1.codeRouter);
app.get('/', (req, res) => {
    res.send("API is running OK");
});
app.listen(port, () => {
    console.log('App is running in port: ' + port);
});
//# sourceMappingURL=index.js.map