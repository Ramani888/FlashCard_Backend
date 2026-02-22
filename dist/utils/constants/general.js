"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCode = exports.FREE_TIER = exports.FLASHCARD_SUPPORT_V1_BUCKET_NAME = exports.FLASHCARD_PDF_V1_BUCKET_NAME = exports.FLASHCARD_IMAGES_V1_BUCKET_NAME = void 0;
exports.FLASHCARD_IMAGES_V1_BUCKET_NAME = 'flashcard-images-v1';
exports.FLASHCARD_PDF_V1_BUCKET_NAME = 'flashcard-pdf-v1';
exports.FLASHCARD_SUPPORT_V1_BUCKET_NAME = 'flashcard-support-v1';
exports.FREE_TIER = {
    credit: 3,
    storage: 50,
    storageUnit: 'MB'
};
var LanguageCode;
(function (LanguageCode) {
    LanguageCode["En"] = "en";
    LanguageCode["Cn"] = "zh";
    LanguageCode["Tl"] = "tl";
    LanguageCode["Fr"] = "fr";
    LanguageCode["De"] = "de";
    LanguageCode["Hi"] = "hi";
    LanguageCode["Id"] = "id";
    LanguageCode["It"] = "it";
    LanguageCode["Pl"] = "pl";
    LanguageCode["Pt"] = "pt";
    LanguageCode["Es"] = "es";
    LanguageCode["Sw"] = "sw";
})(LanguageCode || (exports.LanguageCode = LanguageCode = {}));
