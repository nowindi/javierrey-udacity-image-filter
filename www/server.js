"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const util_1 = require("./util/util");
(() => __awaiter(this, void 0, void 0, function* () {
    const app = express_1.default();
    const port = process.env.PORT || 8082;
    app.use(body_parser_1.default.json());
    app.get("/filteredimage", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const imageUrl = req.query.image_url;
        if (!imageUrl) {
            return res.status(400).send("Please provide an image URL");
        }
        const filteredImage = yield util_1.filterImageFromURL(imageUrl);
        res.status(200).sendFile(filteredImage, {}, (err) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                throw new Error('The file transfer failed');
            }
            yield util_1.deleteLocalFiles([filteredImage]);
        }));
    }));
    app.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send("try GET /filteredimage?image_url={{}}");
    }));
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
}))();
//# sourceMappingURL=server.js.map