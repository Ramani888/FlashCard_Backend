"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultCardName = exports.CardApiSource = void 0;
exports.CardApiSource = {
    post: {
        createCard: { path: '/card', message: 'Card Created Successfully.' }
    },
    put: {
        updateCard: { path: '/card', message: 'Card Updated Successfully.' },
        blurAllCard: { path: '/blur/all/card', message: 'Blur All Card Successfully.', messageForUnblur: 'Remove Blur From All Card Successfully.' },
        moveCard: { path: '/move/card', message: 'Move Card Successfully.' }
    },
    delete: {
        deleteCard: { path: '/card', message: 'Card Deleted Successfully.' }
    },
    get: {
        getCard: { path: '/card', message: 'Card get Successfully.' },
        getCardType: { path: '/card/type', message: 'Card Type Get Successfully.' },
        getAllCard: { path: '/card/all', message: 'Card get Successfully.' }
    }
};
var DefaultCardName;
(function (DefaultCardName) {
    DefaultCardName["En"] = "CardEn";
    DefaultCardName["Cn"] = "CardCn";
    DefaultCardName["Tl"] = "CardTl";
    DefaultCardName["Fr"] = "CardFr";
    DefaultCardName["De"] = "CardDe";
    DefaultCardName["Hi"] = "CardHi";
    DefaultCardName["Id"] = "CardId";
    DefaultCardName["It"] = "CardIt";
    DefaultCardName["Pl"] = "CardPl";
    DefaultCardName["Pt"] = "CardPt";
    DefaultCardName["Es"] = "CardEs";
    DefaultCardName["Sw"] = "CardSw";
})(DefaultCardName || (exports.DefaultCardName = DefaultCardName = {}));
