import { window } from "vscode";

/******************************************************************************/
interface IHeaderOption {
    id: string;
    label: string;
    prefix: string;
    suffix: string;
    spacer: string;
    char?: string;
    length?: number;
}

const headerOptions: { [key: string]: IHeaderOption } = {
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

export async function showInsertHeader() {
    const selection = await window.showQuickPick(
        headerArray.map((header) => header.label, {
            placeHolder: "Please choose a header option",
        })
    );
    if (selection) {
        const content = await window.showInputBox({
            placeHolder: "Text to show in header",
            prompt: "This will be automatically converted to uppercase.",
        });

        if (content) {
            const editor = window.activeTextEditor;

            if (editor) {
                window.showTextDocument(editor.document, 1, false).then((e) => {
                    e.edit((edit) => {
                        edit.insert(editor.selection.active, generateHeader(content, selection));
                    });
                });
            }
        }
    }
}

function generateHeader(text: string, headerLabel: string): string {
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
