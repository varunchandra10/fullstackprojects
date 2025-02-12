import {codeEditor}  from "./editor.js";

// ========================= ERROR HIGHLIGHT =========================
export function highlightErrorLine(error) {
    const lineNumberMatch = error.match(/line (\d+)/);
    if (lineNumberMatch) {
        const lineNumber = parseInt(lineNumberMatch[1], 10) - 1; // Convert to zero-based index
        codeEditor.addLineClass(lineNumber, "background", "error-line");
    }
}

export function clearAllLineHighlights() {
    const totalLines = codeEditor.lineCount();
    for (let i = 0; i < totalLines; i++) {
        codeEditor.removeLineClass(i, "background", "active-line");
    }
}

// Clear error highlights when running new code
export function clearErrorHighlights() {
    for (let i = 0; i < codeEditor.lineCount(); i++) {
        codeEditor.removeLineClass(i, "background", "error-line");
    }
}