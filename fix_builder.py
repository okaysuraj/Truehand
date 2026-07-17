import os
import re

files_to_fix = [
    'Delivery.java',
    'Location.java',
    'Product.java',
    'OrderItem.java',
    'User.java',
    'Review.java',
    'Order.java'
]

base_dir = r"backend\src\main\java\com\truehand\model"

for filename in files_to_fix:
    path = os.path.join(base_dir, filename)
    if not os.path.exists(path):
        continue
        
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # We want to find lines like: `private String status = "PENDING";`
    # and if they don't have `@Builder.Default` right before them, add it.
    
    # Let's split into lines and process line by line
    lines = content.split('\n')
    new_lines = []
    
    # First, ensure we import Builder if we use it, but they already use @Builder so lombok is there.
    
    for i, line in enumerate(lines):
        # Check if line is a private field declaration with initialization
        if re.search(r'^\s*(private|protected|public).*?=.*?;', line) and 'static' not in line:
            # Check if previous line has @Builder.Default
            if i > 0 and '@Builder.Default' not in lines[i-1]:
                # Figure out the indentation
                indent = line[:len(line) - len(line.lstrip())]
                new_lines.append(f"{indent}@Builder.Default")
        new_lines.append(line)
        
    # We might need to ensure lombok.Builder is imported if it isn't (though @Builder implies it's either star imported or already there)
    new_content = '\n'.join(new_lines)
    
    # Since we added @Builder.Default, it belongs to lombok.Builder
    # Lombok's @Builder is already imported as `import lombok.Builder;` or `import lombok.*;`
    # so we shouldn't need a new import for @Builder.Default (it's a static inner annotation, accessed via @Builder.Default)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
print("Fixed Builder warnings.")
