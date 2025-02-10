// Initialize CodeMirror
const codeEditor = CodeMirror.fromTextArea(document.getElementById("code-editor"),{
    lineNumbers: true,
    mode: "python",
    theme: "default",
    indentUnit: 4,
    autoCloseBrackets: true,
    matchBrackets: true,
    styleActiveLine: true,
    lineWrapping: true,
    placeholder: "Write your Python code here...",
  }
);

// ========================= VALIDATE CODE =========================
function validateCode() {
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

// ========================= THEME SELECTOR =========================
document.getElementById("theme-selector").addEventListener("change", (event) => {
    const selectedTheme = event.target.value;
    codeEditor.setOption("theme", selectedTheme); // Change the theme dynamically
  });

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

// ========================= BUTTONS =========================
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

// Clear Button
document.getElementById("clear-button").addEventListener("click", () => {
  codeEditor.setValue(''); // Clear the editor
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
document.getElementById('step-over-button').addEventListener('click', async () => {
    if (currentStepIndex < executionSteps.length - 1) {
        currentStepIndex++;
        updateUIForStep(currentStepIndex);
    }
});

// Step Back Button
document.getElementById("step-back-button").addEventListener("click", () => {
  if (currentStepIndex > 0) {
    currentStepIndex--;
    updateUIForStep(currentStepIndex);
  }
});

// ========================= FETCH ALL STEPS =========================

let executionSteps = []; // Array to store execution steps
let currentStepIndex = -1; // Current step index

async function fetchAllSteps() {
    const code = codeEditor.getValue();
    try {
      const response = await fetch("/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
  
      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Unexpected response from server. Please check the server logs.");
      }
  
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
async function fetchNextStep() {
  if (currentStepIndex < executionSteps.length - 1) {
    currentStepIndex++;
    updateUIForStep(currentStepIndex);
  }
}

// ========================= UPDATE UI FOR STEP =========================
function updateUIForStep(stepIndex) {
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
  for (const [variable, value] of Object.entries(step.variables)) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${variable}</td><td>${value}</td>`;
    variablesTableBody.appendChild(row);
  }

  // Enable/disable buttons based on the current step
  document.getElementById("step-back-button").disabled = stepIndex === 0;
  document.getElementById("step-over-button").disabled =
    stepIndex === executionSteps.length - 1;
}

// ========================= RESET STEP EXECUTION =========================
function resetStepExecution() {
    executionSteps = [];
    currentStepIndex = -1;
    document.getElementById("step-back-button").disabled = true;
    document.getElementById("step-over-button").disabled = true;
    document.getElementById("output").textContent = "";
  
    // Correctly select the tbody element inside the table
    const variablesTableBody = document.querySelector("#variables-table tbody");
    if (variablesTableBody) {
      variablesTableBody.innerHTML = ""; // Clear variables table
    }
  }

// ========================= ERROR HIGHLIGHT =========================
function highlightErrorLine(error) {
  const lineNumberMatch = error.match(/line (\d+)/);
  if (lineNumberMatch) {
    const lineNumber = parseInt(lineNumberMatch[1], 10) - 1; // Convert to zero-based index
    codeEditor.addLineClass(lineNumber, "background", "error-line");
  }
}

function clearAllLineHighlights() {
    const totalLines = codeEditor.lineCount();
    for (let i = 0; i < totalLines; i++) {
      codeEditor.removeLineClass(i, "background", "active-line");
    }
  }

// Clear error highlights when running new code
function clearErrorHighlights() {
  for (let i = 0; i < codeEditor.lineCount(); i++) {
    codeEditor.removeLineClass(i, "background", "error-line");
  }
}

// ========================= CHARACTER/LINE COUNTER =========================
function updateCounter() {
  const code = codeEditor.getValue();
  const charCount = code.length;
  const lineCount = code.split("\n").length;
  document.getElementById(
    "counter"
  ).textContent = `Characters: ${charCount} | Lines: ${lineCount}`;
}

codeEditor.on("change", updateCounter);
updateCounter(); // Initialize counter
