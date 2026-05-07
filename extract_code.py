import re
import sys

log_path = r"C:\Users\marco\.gemini\antigravity\brain\878296b0-0051-4838-91d4-ba1150fabe1e\.system_generated\logs\overview.txt"
out_path = r"c:\Users\marco\Downloads\Conecta Aí\src\App.jsx"

print("Reading log...")
with open(log_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_str = "import React, { useState, useEffect, useRef } from 'react';"
start_idx = content.find(start_str)

if start_idx == -1:
    print("Could not find the start of the code.")
    sys.exit(1)

# Find the last '}' that makes sense, or find 'export default'
# Actually, the user code ends with:
#         </div>
#       </div>
#     </div>
#   );
# }
end_str = "    </div>\n  );\n}"

end_idx = content.find(end_str, start_idx)

if end_idx == -1:
    # Try finding something else
    print("Could not find the exact end block.")
    # Search for all matches of the end block
    matches = [m.start() for m in re.finditer(r"\}\n", content[start_idx:])]
    if matches:
        end_idx = start_idx + matches[-1] + 2
    else:
        sys.exit(1)
else:
    end_idx += len(end_str)

code = content[start_idx:end_idx]

# Let's extract the main component name
# It's likely the one returning the main structure. Let's find all component names.
components = re.findall(r"(?:const|function)\s+([A-Z]\w+)\s*=?\s*(?:\([^)]*\))?\s*(?:=>)?\s*\{", code)
print("Found components:", set(components))

# In React, often 'App', 'Main', 'Marketplace'
# The user said they added 'export default App' but the function might not be App.
# Let's just write the code and append 'export default App;'
# IF 'App' is not in components, we will append the last big component.
main_comp = 'App'
if 'App' not in components and 'MarketplaceApp' in components:
    main_comp = 'MarketplaceApp'
elif 'App' not in components and 'Main' in components:
    main_comp = 'Main'
elif 'App' not in components:
    main_comp = components[-1] if components else 'App'

code += f"\n\nexport default {main_comp};\n"

print("Writing code of length", len(code))
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Done. Exported", main_comp)
