"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendedRules = exports.validateBody = void 0;
const validatorjs_1 = __importDefault(require("validatorjs"));
const http_status_codes_1 = require("http-status-codes");
var RouteSource;
(function (RouteSource) {
    RouteSource[RouteSource["Body"] = 0] = "Body";
    RouteSource[RouteSource["Query"] = 1] = "Query";
    RouteSource[RouteSource["Params"] = 2] = "Params";
})(RouteSource || (RouteSource = {}));
// Middleware function to validate request body
const validateBody = (rules, source) => {
    return (req, res, next) => {
        if ((!req.body || Object.keys(req.body).length === 0) && !source) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors: ['Request body is missing'] });
        }
        let body;
        if (source === (RouteSource === null || RouteSource === void 0 ? void 0 : RouteSource.Params)) {
            body = req === null || req === void 0 ? void 0 : req.params;
        }
        else if (source === (RouteSource === null || RouteSource === void 0 ? void 0 : RouteSource.Query)) {
            body = req === null || req === void 0 ? void 0 : req.query;
        }
        else {
            body = req === null || req === void 0 ? void 0 : req.body;
        }
        const validator = new validatorjs_1.default(body, rules);
        if (validator.fails()) {
            const errors = validator.errors.all();
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors });
        }
        next();
    };
};
exports.validateBody = validateBody;
// You can add more validation rules for different routes as needed
exports.extendedRules = {
    name: 'required|string',
    isPrivate: 'required|boolean',
    color: 'required|string',
    cardTypeId: 'required|string',
    age: 'numeric|min:0|max:150',
    email: 'required|email',
    dateOfBirth: 'required|date_format:YYYY-MM-DD',
    birthDate: 'required|date_format:MM/DD/YYYY'
};
