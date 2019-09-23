"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
exports.authorRouter = express_1.Router();
exports.authorRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const a = req.params.id;
    res.status(200).json({ 'msg': "author" + a + " deleted." });
}));
exports.authorRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const a = req.body;
    if (!a.name) {
        res.status(400).json({});
        return;
    }
    let author = {
        id: '1',
        name: req.body.name
    };
    //TODO insert author on DB
    res.status(200).json(author);
}));
exports.authorRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.name);
    //TODO search author by id on DB
    if (req.params.id === "1") {
        let author = {
            id: "1",
            name: "Stephen King"
        };
        res.status(200).json(author);
    }
    else {
        res.status(400).json({ error: "Author not found" });
    }
}));
//# sourceMappingURL=authorController.js.map