import ast
import io
import contextlib
import traceback
import inspect

def execute_code_step_by_step(code):
    try:
        tree = ast.parse(code)
        execution_states = []  # To store intermediate states
        variables = {}  # To track variable states
        output_buffer = io.StringIO()  # Buffer to capture print outputs
        local_vars = {}  # Dictionary to store local variables

        # Execute each block (AST node) step by step
        for node in tree.body:
            try:
                block_code = ast.unparse(node)  # Convert the node back to code
                # Redirect stdout to capture print output
                with contextlib.redirect_stdout(output_buffer):
                    exec(block_code, globals(), local_vars)  # Execute the code block

                # Filter out non-serializable objects from local_vars
                serializable_vars = {
                    k: v for k, v in local_vars.items()
                    if isinstance(v, (str, int, float, list, dict, bool, type(None)))  # Only keep serializable types
                }

                # Capture the current call stack
                call_stack = []
                for frame_info in inspect.stack()[1:]:
                    frame_locals = frame_info.frame.f_locals
                    serializable_frame_locals = {
                        k: v for k, v in frame_locals.items()
                        if isinstance(v, (str, int, float, list, dict, bool, type(None)))
                    }
                    call_stack.append({
                        'function': frame_info.function,
                        'locals': serializable_frame_locals,
                        'lineno': frame_info.lineno
                    })

                # Update the variables and capture the output after each block
                variables.update(serializable_vars)
                execution_states.append({
                    'block': block_code,
                    'variables': variables.copy(),
                    'line_number': getattr(node, 'lineno', -1),
                    'output': output_buffer.getvalue().strip(),  # Strip whitespace from output
                    'error': None,
                    'call_stack': call_stack  # Add the call stack to the execution state
                })

                # Clear the output buffer for the next block
                output_buffer.truncate(0)
                output_buffer.seek(0)

            except Exception as e:
                # Capture errors and stop execution
                error_message = traceback.format_exc()
                execution_states.append({
                    'block': ast.unparse(node),
                    'variables': variables.copy(),
                    'line_number': getattr(node, 'lineno', -1),
                    'output': output_buffer.getvalue().strip(),
                    'error': error_message,
                    'call_stack': []  # No call stack in case of an error
                })
                break

        return execution_states

    except Exception as e:
        return [{'error': f"An unexpected error occurred: {str(e)}"}]