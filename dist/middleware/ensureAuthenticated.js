"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function ensureAuthenticated(request, response, next) {
    const authToken = request.headers.authorization;
    if (!authToken) {
        return response.status(401).json({
            errorCode: "token.invalid"
        });
    }
    // Bearer 8ujda83hn3d8audjadh8asdaj3h8i
    // [0] Bearer
    // [1] 8ujda83hn3d8audjadh8asdaj3h8i
    const [, token] = authToken.split(" ");
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        request.user_id = sub;
        return next();
    }
    catch (err) {
        return response.status(401).json({ errorCode: "token.expired" });
    }
}
exports.ensureAuthenticated = ensureAuthenticated;
