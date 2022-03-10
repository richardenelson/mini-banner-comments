import { ExtensionContext, commands, window } from "vscode";
import { showInsertHeader } from "./insertHeader";

/******************************************************************************/
export function activate(context: ExtensionContext) {
    const dividerDisposible = commands.registerTextEditorCommand(
        "mini-banner-comments.commentDivider",
        (editor, edit) => {
            edit.insert(
                editor.selection.active,
                `/******************************************************************************/`
            );
        }
    );

    const headerDisposable = commands.registerTextEditorCommand("mini-banner-comments.commentHeader", async () =>
        showInsertHeader()
    );

    context.subscriptions.push(dividerDisposible, headerDisposable);
}

export function deactivate() {}
