import ast
import io
import contextlib
import traceback

def execute_code_step_by_step(code):
    try:
        tree = ast.parse(code)
        execution_states = []
        variables = {}
        output_buffer = io.StringIO()
        local_vars = {}

        for node in tree.body:
            try:
                block_code = ast.unparse(node)
                with contextlib.redirect_stdout(output_buffer):
                    exec(block_code, globals(), local_vars)

                serializable_vars = {
                    k: v for k, v in local_vars.items()
                    if isinstance(v, (str, int, float, list, dict, bool, type(None)))
                }

                variables.update(serializable_vars)
                execution_states.append({
                    'block': block_code,
                    'variables': variables.copy(),
                    'line_number': getattr(node, 'lineno', -1),
                    'output': output_buffer.getvalue().strip(),
                    'error': None
                })

                output_buffer.truncate(0)
                output_buffer.seek(0)

            except Exception as e:
                error_message = traceback.format_exc()
                execution_states.append({
                    'block': ast.unparse(node),
                    'variables': variables.copy(),
                    'line_number': getattr(node, 'lineno', -1),
                    'output': output_buffer.getvalue().strip(),
                    'error': error_message
                })
                break

        return execution_states

    except Exception as e:
        return [{'error': f"An unexpected error occurred: {str(e)}"}]