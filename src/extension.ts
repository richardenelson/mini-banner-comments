import { ExtensionContext, commands, window } from "vscode";
import { showInsertHeader } from "./insertBanner";

/******************************************************************************/
export function activate(context: ExtensionContext) {
    const disposable = commands.registerTextEditorCommand("mini-banner-comments.miniBanner", async () =>
        showInsertHeader()
    );

    context.subscriptions.push(disposable);
}

export function deactivate() {}
