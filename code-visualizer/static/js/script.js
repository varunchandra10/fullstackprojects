import "./theme.js";
import "./editor.js";
import "./buttons.js";
import "./execution.js";
import "./fileHandling.js";
import "./errorHandling.js";
import "./visualization.js"; // Import the visualization module
import { codeEditor } from "./editor.js";
import { initializeD3Visualization } from "./visualization.js";

// ========================= VALIDATE CODE =========================
export function validateCode() {
    const code = codeEditor.getValue();
    fetch("/validate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (!data.valid) {
                alert(`Syntax Error: ${data.error}`);
            }
        });
}

// ========================= RENDER VALUE (FOR NESTED STRUCTURES) =========================
export function renderValue(value) {
    if (typeof value === "object" && value !== null) {
        // Handle nested structures (lists, dictionaries)
        const container = document.createElement("div");
        container.classList.add("nested-value");
        // Create a toggle button for collapsible content
        const toggleButton = document.createElement("button");
        toggleButton.textContent = `${Array.isArray(value) ? "List" : "Dict"} (${getObjectSize(value)})`;
        toggleButton.classList.add("toggle-button");
        // Create a collapsible div for the nested content
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("nested-content");
        contentDiv.style.display = "none"; // Initially hidden
        // Populate the content div with nested values
        if (Array.isArray(value)) {
            value.forEach((item, index) => {
                const itemDiv = document.createElement("div");
                itemDiv.textContent = `[${index}]: `;
                itemDiv.appendChild(renderValue(item));
                contentDiv.appendChild(itemDiv);
            });
        } else {
            for (const [key, val] of Object.entries(value)) {
                const itemDiv = document.createElement("div");
                itemDiv.textContent = `${key}: `;
                itemDiv.appendChild(renderValue(val));
                contentDiv.appendChild(itemDiv);
            }
        }
        // Toggle visibility of the nested content
        toggleButton.addEventListener("click", () => {
            contentDiv.style.display = contentDiv.style.display === "none" ? "block" : "none";
        });
        container.appendChild(toggleButton);
        container.appendChild(contentDiv);
        return container;
    } else {
        // Handle primitive types (strings, numbers, booleans, etc.)
        const span = document.createElement("span");
        span.textContent = JSON.stringify(value);
        return span;
    }
}
// Helper function to calculate the size of an object or array
export function getObjectSize(obj) {
    return Array.isArray(obj) ? obj.length : Object.keys(obj).length;
}

// ========================= INITIALIZE APP =========================
document.addEventListener("DOMContentLoaded", () => {
    initializeD3Visualization(); // Initialize D3.js visualization
});