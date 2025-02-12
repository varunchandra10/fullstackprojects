import { codeEditor } from "./editor.js";
import { validateCode } from "./script.js";
import { clearErrorHighlights} from "./errorHandling.js";
import { fetchAllSteps, resetStepExecution, updateUIForStep, getCurrentStepIndex, setCurrentStepIndex, getExecutionSteps } from "./execution.js";

// Clear Button
document.getElementById("clear-button").addEventListener("click", () => {
    codeEditor.setValue(""); // Clear the editor
    document.getElementById("output").textContent = "";
    clearErrorHighlights(); // Remove error highlights
    resetStepExecution(); // Reset step-by-step execution
});

// Keyboard Shortcut (Ctrl+Enter)
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "Enter") {
        validateCode();
        fetchAllSteps();
    }
});

// Run Button
document.getElementById("run-button").addEventListener("click", async () => {
    validateCode();
    await fetchAllSteps(); // Fetch all steps for step-by-step execution
});


// Step Over Button
document.getElementById("step-over-button").addEventListener("click", async () => {
    let currentStepIndex = getCurrentStepIndex();
    let executionSteps = getExecutionSteps();

    if (currentStepIndex < executionSteps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
        updateUIForStep(getCurrentStepIndex());
    }
});

// Step Back Button
document.getElementById("step-back-button").addEventListener("click", () => {
    let currentStepIndex = getCurrentStepIndex();

    if (currentStepIndex > 0) {
        setCurrentStepIndex(currentStepIndex - 1);
        updateUIForStep(getCurrentStepIndex());
    }
});