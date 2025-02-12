// ========================= THEME SELECTOR =========================
document.getElementById("theme-selector").addEventListener("change", (event) => {
    const selectedTheme = event.target.value;
    codeEditor.setOption("theme", selectedTheme); // Change the theme dynamically
});