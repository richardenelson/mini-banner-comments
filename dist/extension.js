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
        prefix: "//=====",
        suffix: "=====//",
        spacer: " ",
        char: "=",
        length: 60,
    },
    h2: {
        id: "h2",
        label: "Header 2",
        prefix: "//-----",
        suffix: "-----//",
        spacer: " ",
        char: "-",
        length: 60,
    },
    h3: {
        id: "h3",
        label: "Header 3",
        prefix: "//",
        suffix: "//",
        spacer: " ",
    },
};
const headerArray = Object.values(headerOptions);
async function showInsertHeader() {
    vscode_1.window
        .showQuickPick(headerArray.map((header) => header.label, {
        placeHolder: "Please choose a header option",
    }))
        .then(async (selection) => {
        if (selection) {
            const content = await vscode_1.window.showInputBox({
                placeHolder: "Text to show in header",
                prompt: "This will be automatically converted to uppercase.",
            });
            if (content) {
                const editor = vscode_1.window.activeTextEditor;
                if (editor) {
                    vscode_1.window.showTextDocument(editor.document, 1, false).then((e) => {
                        e.edit((edit) => {
                            edit.insert(editor.selection.active, generateHeader(content, selection));
                        });
                    });
                }
            }
        }
    });
}
exports.showInsertHeader = showInsertHeader;
function generateHeader(text, headerLabel) {
    text = text.trim();
    const h = headerArray.find((item) => item.label === headerLabel);
    if (h) {
        let fill = "";
        if (h.char && h.length) {
            const count = Math.max(0, h.length - `${h.prefix}${h.spacer}${text}${h.spacer}${h.suffix}`.length);
            fill = h.char.repeat(count);
        }
        return `${h.prefix}${h.spacer}${text.toUpperCase()}${h.spacer}${fill}${h.suffix}`;
    }
    return "";
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
    const headerDisposable = vscode_1.commands.registerTextEditorCommand("mini-banner-comments.commentHeader", async () => (0, insertHeader_1.showInsertHeader)());
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