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
const bannerOptions = {
    div: {
        label: "Divider",
        prefix: "/*",
        suffix: "*/",
        spacer: "",
        char: "*",
        length: 80,
    },
    h1: {
        label: "Header 1",
        prefix: "//=====",
        suffix: "=====//",
        spacer: " ",
        input: true,
        char: "=",
        length: 60,
    },
    h2: {
        label: "Header 2",
        prefix: "//-----",
        suffix: "-----//",
        spacer: " ",
        input: true,
        char: "-",
        length: 60,
    },
    h3: {
        label: "Header 3",
        prefix: "//",
        suffix: "//",
        spacer: " ",
        input: true,
    },
};
const bannerArray = Object.values(bannerOptions);
async function showInsertHeader() {
    const selection = await vscode_1.window.showQuickPick(bannerArray.map((banner) => banner.label, {
        placeHolder: "Please choose a banner option",
    }));
    if (selection) {
        const banner = bannerArray.find((item) => item.label === selection);
        if (banner) {
            if (banner.input) {
                const content = await vscode_1.window.showInputBox({
                    placeHolder: "Text to show in banner",
                    prompt: "This will be automatically converted to uppercase.",
                });
                if (content)
                    insertBanner(content, banner);
            }
            else {
                insertBanner("", banner);
            }
        }
    }
}
exports.showInsertHeader = showInsertHeader;
function insertBanner(value, bannerOption) {
    const editor = vscode_1.window.activeTextEditor;
    if (editor) {
        vscode_1.window.showTextDocument(editor.document, 1, false).then((e) => {
            e.edit((edit) => {
                edit.insert(editor.selection.active, generateBanner(value, bannerOption));
            });
        });
    }
}
function generateBanner(text, bannerOption) {
    text = text.trim();
    const o = bannerOption;
    if (o) {
        let fill = "";
        if (o.char && o.length) {
            const count = Math.max(0, o.length - `${o.prefix}${o.spacer}${text}${o.spacer}${o.suffix}`.length);
            fill = o.char.repeat(count);
        }
        return `${o.prefix}${o.spacer}${text.toUpperCase()}${o.spacer}${fill}${o.suffix}`;
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
const insertBanner_1 = __webpack_require__(2);
/******************************************************************************/
function activate(context) {
    const disposable = vscode_1.commands.registerTextEditorCommand("mini-banner-comments.miniBanner", async () => (0, insertBanner_1.showInsertHeader)());
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map