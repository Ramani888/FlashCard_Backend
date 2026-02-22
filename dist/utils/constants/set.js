"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultSetName = exports.SetApiSource = void 0;
exports.SetApiSource = {
    post: {
        createSet: { path: '/set', message: 'Set Created Successfully.' }
    },
    put: {
        updateSet: { path: '/set', message: 'Set Updated Successfully.' }
    },
    delete: {
        deleteSet: { path: '/set', message: 'Set Deleted Successfully.' }
    },
    get: {
        getSet: { path: '/set', message: 'Set get Successfully.' },
        getSetByFolderId: { path: '/folder/set', message: 'Set get Successfully.' }
    }
};
var DefaultSetName;
(function (DefaultSetName) {
    DefaultSetName["En"] = "SetEn";
    DefaultSetName["Cn"] = "SetCn";
    DefaultSetName["Tl"] = "SetTl";
    DefaultSetName["Fr"] = "SetFr";
    DefaultSetName["De"] = "SetDe";
    DefaultSetName["Hi"] = "SetHi";
    DefaultSetName["Id"] = "SetId";
    DefaultSetName["It"] = "SetIt";
    DefaultSetName["Pl"] = "SetPl";
    DefaultSetName["Pt"] = "SetPt";
    DefaultSetName["Es"] = "SetEs";
    DefaultSetName["Sw"] = "SetSw";
})(DefaultSetName || (exports.DefaultSetName = DefaultSetName = {}));
