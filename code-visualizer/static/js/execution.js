import { codeEditor } from "./editor.js";
import { highlightErrorLine, clearAllLineHighlights } from "./errorHandling.js";
import { renderValue } from "./script.js";
import { renderCallStack } from "./visualization.js"; // Import the call stack rendering function

// ========================= FETCH ALL STEPS =========================
let executionSteps = []; // Array to store execution steps
let currentStepIndex = -1; // Current step index
export function getCurrentStepIndex() {
    return currentStepIndex;
}
export function setCurrentStepIndex(index) {
    currentStepIndex = index;
}
export function getExecutionSteps() {
    return executionSteps;
}
export async function fetchAllSteps() {
    const code = codeEditor.getValue();
    try {
        const response = await fetch("/execute", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
        });
        const result = await response.json();
        // Check for errors in code execution
        if (result.length > 0 && result[0].error) {
            document.getElementById("output").innerHTML = `Error:<br>${result[0].error}`;
            highlightErrorLine(result[0].error);
            return;
        }
        // Store execution steps
        executionSteps = result;
        currentStepIndex = -1;
        // Enable/disable buttons
        document.getElementById("step-back-button").disabled = true;
        document.getElementById("step-over-button").disabled = false;
        // Start step-by-step execution
        await fetchNextStep();
    } catch (error) {
        document.getElementById("output").textContent = `An error occurred: ${error.message}`;
    }
}
// ========================= FETCH NEXT STEP =========================
export async function fetchNextStep() {
    if (currentStepIndex < executionSteps.length - 1) {
        currentStepIndex++;
        updateUIForStep(currentStepIndex);
    }
}
// ========================= UPDATE UI FOR STEP =========================
export function updateUIForStep(stepIndex) {
    // Clear all previous highlights before highlighting the new line
    clearAllLineHighlights();
    const step = executionSteps[stepIndex];
    // Highlight the active line in the editor
    if (step.line_number !== -1) {
        codeEditor.addLineClass(step.line_number - 1, "background", "active-line");
    }
    // Update output
    document.getElementById("output").textContent = step.output || "";
    // Update variables table
    const variablesTableBody = document.querySelector("#variables-table tbody");
    variablesTableBody.innerHTML = ""; // Clear previous variables
    // Iterate over variables and render them
    for (const [variable, value] of Object.entries(step.variables)) {
        const row = document.createElement("tr");
        // Render variable name
        const variableCell = document.createElement("td");
        variableCell.textContent = variable;
        // Render variable value (handle nested structures)
        const valueCell = document.createElement("td");
        valueCell.appendChild(renderValue(value));
        row.appendChild(variableCell);
        row.appendChild(valueCell);
        variablesTableBody.appendChild(row);
    }
    // Render the call stack
    renderCallStack();
    // Enable/disable buttons based on the current step
    document.getElementById("step-back-button").disabled = stepIndex === 0;
    document.getElementById("step-over-button").disabled =
        stepIndex === executionSteps.length - 1;
}
// ========================= RESET STEP EXECUTION =========================
export function resetStepExecution() {
    executionSteps = [];
    currentStepIndex = -1;
    document.getElementById("step-back-button").disabled = true;
    document.getElementById("step-over-button").disabled = true;
    document.getElementById("output").textContent = "";
    // Clear variables table
    const variablesTableBody = document.querySelector("#variables-table tbody");
    if (variablesTableBody) {
        variablesTableBody.appendChild(document.createTextNode(""));
    }
    // Clear call stack visualization
    const callStackContainer = document.getElementById("call-stack-container");
    callStackContainer.innerHTML = "";
}