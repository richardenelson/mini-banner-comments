import { window, TextEditor, TextEditorEdit } from "vscode";

interface IHeaderOption {
    id: string;
    label: string;
    prefix: string;
    suffix: string;
    char?: string;
    length?: number;
}

const headerOptions: { [key: string]: IHeaderOption } = {
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

export async function showInsertHeader(editor: TextEditor, edit: TextEditorEdit) {
    const selection = await window.showQuickPick(
        headerArray.map((header) => header.label, {
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
        })
    );

    if (selection) {
        window.showInformationMessage("Dude");
        window.showInformationMessage(`Text is ${generateHeader("hello", headerOptions[selection])}`);

        const text = await window.showInputBox({
            value: "",
            placeHolder: "For example: fedcba. But not: 123",
            // validateInput: (text) => {

            //     return text === "123" ? "Not 123!" : null;
            // },
        });

        if (text && text !== "") {
            const headerOption = headerOptions[selection];
            //edit.insert(editor.selection.active, generateHeader(text, headerOption));
            window.showInformationMessage(`Text is ${generateHeader(text, headerOption)}`);
            edit.insert(editor.selection.active, text);
        }
    }

    // window.showInformationMessage(`Got: ${result}`);
}

function generateHeader(text: string, headerOption: IHeaderOption) {
    const h = headerOption;
    let fill = "";
    if (h.char && h.length) {
        const count = Math.max(0, h.length - `${h.prefix}${text}${h.suffix}`.length);
        fill = h.char.repeat(count);
    }
    return `${h.prefix}${text}${fill}${h.suffix}`;
}
