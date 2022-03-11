import { window } from "vscode";

/******************************************************************************/
interface IBannerOption {
    label: string;
    prefix: string;
    suffix: string;
    spacer: string;
    input?: boolean;
    char?: string;
    length?: number;
}

const bannerOptions: { [key: string]: IBannerOption } = {
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

export async function showInsertHeader() {
    const selection = await window.showQuickPick(
        bannerArray.map((banner) => banner.label, {
            placeHolder: "Please choose a banner option",
        })
    );
    if (selection) {
        const banner = bannerArray.find((item) => item.label === selection);

        if (banner) {
            if (banner.input) {
                const content = await window.showInputBox({
                    placeHolder: "Text to show in banner",
                    prompt: "This will be automatically converted to uppercase.",
                });

                if (content) insertBanner(content, banner);
            } else {
                insertBanner("", banner);
            }
        }
    }
}

function insertBanner(value: string, bannerOption: IBannerOption) {
    const editor = window.activeTextEditor;

    if (editor) {
        window.showTextDocument(editor.document, 1, false).then((e) => {
            e.edit((edit) => {
                edit.insert(editor.selection.active, generateBanner(value, bannerOption));
            });
        });
    }
}

function generateBanner(text: string, bannerOption: IBannerOption): string {
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
