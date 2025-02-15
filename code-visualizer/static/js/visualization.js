import { getExecutionSteps, getCurrentStepIndex } from "./execution.js";

// ========================= RENDER CALL STACK WITH D3.JS =========================
export function renderCallStack() {
    const stepIndex = getCurrentStepIndex();
    const executionSteps = getExecutionSteps();
    if (stepIndex < 0 || stepIndex >= executionSteps.length) return;

    const step = executionSteps[stepIndex];
    const callStack = step.call_stack || [];

    // Select the container for visualization
    const container = d3.select("#stack-frames");
    container.selectAll("*").remove(); // Clear previous content

    const width = 300;
    const height = callStack.length * 80 + 20; // Adjust height dynamically
    const svg = container.append("svg").attr("width", width).attr("height", height);

    // Draw stack frames (bottom-up)
    callStack.forEach((frame, index) => {
        const frameHeight = 70;
        const y = height - (index + 1) * frameHeight;

        // Stack frame rectangle
        svg.append("rect")
            .attr("x", 20)
            .attr("y", y)
            .attr("width", 260)
            .attr("height", frameHeight - 10)
            .attr("fill", "#ADD8E6")
            .attr("stroke", "black")
            .attr("rx", 10); // Rounded corners

        // Function name text
        svg.append("text")
            .attr("x", 30)
            .attr("y", y + 20)
            .attr("font-size", "14px")
            .attr("font-weight", "bold")
            .text(`${frame.function}()`);

        // Local variables
        let varsText = Object.entries(frame.locals)
            .map(([key, val]) => `${key}: ${JSON.stringify(val)}`)
            .join(", ");

        svg.append("text")
            .attr("x", 30)
            .attr("y", y + 40)
            .attr("font-size", "12px")
            .text(varsText || "No locals");
    });
}
