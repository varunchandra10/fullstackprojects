import { getExecutionSteps, getCurrentStepIndex } from "./execution.js";

// ========================= RENDER CALL STACK =========================
export function renderCallStack() {
    const stepIndex = getCurrentStepIndex();
    const executionSteps = getExecutionSteps();
    if (stepIndex < 0 || stepIndex >= executionSteps.length) return;

    const step = executionSteps[stepIndex];
    const callStack = step.call_stack || [];

    // Select the container for the call stack visualization
    const callStackContainer = document.getElementById("call-stack-container");
    callStackContainer.innerHTML = ""; // Clear previous content

    // Create a title for the call stack
    const title = document.createElement("h3");
    title.textContent = "Call Stack";
    callStackContainer.appendChild(title);

    // Render each stack frame
    if (callStack.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No active function calls.";
        callStackContainer.appendChild(emptyMessage);
    } else {
        const ul = document.createElement("ul");
        callStack.forEach((frame, index) => {
            const li = document.createElement("li");
            li.textContent = `${frame.function} (${Object.keys(frame.locals).length} locals)`;
            ul.appendChild(li);

            // Add details about local variables
            const details = document.createElement("ul");
            for (const [key, value] of Object.entries(frame.locals)) {
                const detailItem = document.createElement("li");
                detailItem.textContent = `${key}: ${JSON.stringify(value)}`;
                details.appendChild(detailItem);
            }
            li.appendChild(details);
        });
        callStackContainer.appendChild(ul);
    }
}

// ========================= INITIALIZE D3.JS VISUALIZATION =========================
export function initializeD3Visualization() {
    const svgWidth = 400;
    const svgHeight = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    // Create an SVG element for the visualization
    const svg = d3.select("#call-stack-visualization")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // Placeholder for D3.js visualization logic
    // You can replace this with a more advanced graph or timeline visualization
    svg.append("text")
        .attr("x", svgWidth / 2)
        .attr("y", svgHeight / 2)
        .attr("text-anchor", "middle")
        .text("Call Stack Visualization (D3.js)");
}