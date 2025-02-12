// ========================= FILE UPLOAD =========================
document.getElementById("file-upload").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            codeEditor.setValue(e.target.result); // Load file content into the editor
        };
        reader.readAsText(file);
    }
});

// ========================= FILE DOWNLOAD =========================
document.getElementById("download-button").addEventListener("click", () => {
    const code = codeEditor.getValue();
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "code.py"; // File name
    a.click();
    URL.revokeObjectURL(url);
});