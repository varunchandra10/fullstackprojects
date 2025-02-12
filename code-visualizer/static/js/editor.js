
// Initialize CodeMirror
export const codeEditor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    lineNumbers: true,
    mode: "python",
    theme: "default",
    indentUnit: 4,
    autoCloseBrackets: true,
    matchBrackets: true,
    styleActiveLine: true,
    lineWrapping: true,
    placeholder: "Write your Python code here...",
});

// ========================= CHARACTER/LINE COUNTER =========================
export function updateCounter() {
    const code = codeEditor.getValue();
    const charCount = code.length;
    const lineCount = code.split("\n").length;
    document.getElementById(
        "counter"
    ).textContent = `Characters: ${charCount} | Lines: ${lineCount}`;
}

codeEditor.on("change", updateCounter);
updateCounter(); // Initialize counter