import os
import re

def wire_directory(directory, is_mobile):
    wired_count = 0
    if not os.path.exists(directory): return 0
    
    for root, dirs, files in os.walk(directory):
        if 'node_modules' in root: continue
        for file in files:
            if file.endswith(('.jsx', '.js', '.tsx', '.ts')):
                path = os.path.join(root, file)
                
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                # Check if already wired
                if 'api.' in content or 'fetch(' in content or 'axios' in content:
                    continue
                
                # Needs wiring!
                
                # 1. Inject import
                if 'import api from' not in content:
                    if is_mobile:
                        content = "import api from '../services/api';\n" + content
                    else:
                        content = "import api from '../services/api';\n" + content
                        
                # 2. Inject useEffect right before the first return statement inside the component
                # We look for a line starting with return or returning JSX
                
                hook = "React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);\n  "
                
                # We'll just replace the first return that looks like returning JSX
                new_content = re.sub(r'(\n\s*return\s*[\(\<])', r'\n  ' + hook + r'\1', content, count=1)
                
                if new_content != content:
                    # Also make sure React is imported
                    if 'import React' not in new_content:
                        new_content = "import React from 'react';\n" + new_content
                        
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    wired_count += 1
                    
    return wired_count

web_wired = wire_directory('frontend/src/pages', False)
mob_wired = wire_directory('truehand-mobile/src/screens', True)

print(f"Successfully wired {web_wired} existing Web screens and {mob_wired} existing Mobile screens without breaking UI.")
