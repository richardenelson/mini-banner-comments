/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.showInsertHeader = void 0;
const vscode_1 = __webpack_require__(1);
const headerOptions = {
    h1: {
        id: "h1",
        label: "Header 1",
        prefix: "//===== ",
        suffix: " =====//",
        char: "=",
        length: 60,
    },
    h2: {
        id: "h2",
        label: "Header 2",
        prefix: "//----- ",
        suffix: " -----//",
        char: "-",
        length: 60,
    },
    h3: {
        id: "h3",
        label: "Header 3",
        prefix: "// ",
        suffix: " //",
    },
};
const headerArray = Object.values(headerOptions);
async function showInsertHeader(editor, edit) {
    const selection = await vscode_1.window.showQuickPick(headerArray.map((header) => header.label, {
        placeHolder: "Please choose a header option",
        step: 1,
        totalSteps: 2,
        // onDidSelectItem: async (item: string) => {
        //     const text = await window.showInputBox({
        //         value: "abcdef",
        //         valueSelection: [2, 4],
        //         placeHolder: "For example: fedcba. But not: 123",
        //         validateInput: (text) => {
        //             window.showInformationMessage(`Validating: ${text}`);
        //             return text === "123" ? "Not 123!" : null;
        //         },
        //     });
        //     window.showInformationMessage(`Got: ${text}`);
        // },
    }));
    if (selection) {
        vscode_1.window.showInformationMessage("Dude");
        vscode_1.window.showInformationMessage(`Text is ${generateHeader("hello", headerOptions[selection])}`);
        const text = await vscode_1.window.showInputBox({
            value: "",
            placeHolder: "For example: fedcba. But not: 123",
            // validateInput: (text) => {
            //     return text === "123" ? "Not 123!" : null;
            // },
        });
        if (text && text !== "") {
            const headerOption = headerOptions[selection];
            //edit.insert(editor.selection.active, generateHeader(text, headerOption));
            vscode_1.window.showInformationMessage(`Text is ${generateHeader(text, headerOption)}`);
            edit.insert(editor.selection.active, text);
        }
    }
    // window.showInformationMessage(`Got: ${result}`);
}
exports.showInsertHeader = showInsertHeader;
function generateHeader(text, headerOption) {
    const h = headerOption;
    let fill = "";
    if (h.char && h.length) {
        const count = Math.max(0, h.length - `${h.prefix}${text}${h.suffix}`.length);
        fill = h.char.repeat(count);
    }
    return `${h.prefix}${text}${fill}${h.suffix}`;
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode_1 = __webpack_require__(1);
const insertHeader_1 = __webpack_require__(2);
/******************************************************************************/
function activate(context) {
    const dividerDisposible = vscode_1.commands.registerTextEditorCommand("mini-banner-comments.commentDivider", (editor, edit) => {
        edit.insert(editor.selection.active, `/******************************************************************************/`);
    });
    const headerDisposable = vscode_1.commands.registerTextEditorCommand("mini-banner-comments.commentHeader", async (editor, edit) => (0, insertHeader_1.showInsertHeader)(editor, edit));
    context.subscriptions.push(dividerDisposible, headerDisposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map