import os, re

items_dir = 'public/images/items'
files = os.listdir(items_dir)
file_map = {f.lower(): f for f in files}

with open('data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

def fix_image(match):
    path = match.group(1)
    if not path: return match.group(0)
    
    if path.startswith('/images/items/'):
        filename = path.replace('/images/items/', '')
        if filename in files: return match.group(0) # Already perfect
        if filename.lower() in file_map:
            new_path = '/images/items/' + file_map[filename.lower()]
            print(f'Fixing case: {path} -> {new_path}')
            return f'imageUrl: "{new_path}"'
        
        # Try finding by name if it's a completely different extension
        base = os.path.splitext(filename)[0].replace('-', '_')
        for f in files:
            if os.path.splitext(f.lower())[0].replace('-', '_') == base.lower():
                new_path = '/images/items/' + f
                print(f'Fixing extension/case/dash: {path} -> {new_path}')
                return f'imageUrl: "{new_path}"'
    
    if path.startswith('http'):
        # Try to find a local match
        filename = path.split('/')[-1]
        # Check if we have a local file for this base name
        if filename.lower() in file_map:
            new_path = '/images/items/' + file_map[filename.lower()]
            print(f'Replacing remote with local: {path} -> {new_path}')
            return f'imageUrl: "{new_path}"'
            
        base = os.path.splitext(filename)[0].replace('-', '_')
        for f in files:
            if os.path.splitext(f.lower())[0].replace('-', '_') == base.lower():
                new_path = '/images/items/' + f
                print(f'Replacing remote with local: {path} -> {new_path}')
                return f'imageUrl: "{new_path}"'

    return match.group(0)

# We also need to check materialImageUrl in LOOT_DATA
new_content = re.sub(r'imageUrl:\s*[\x27\x22](.*?)[\x27\x22]', fix_image, content)
new_content = re.sub(r'materialImageUrl:\s*[\x27\x22](.*?)[\x27\x22]', lambda m: fix_image(m).replace('imageUrl', 'materialImageUrl'), new_content)

if new_content != content:
    with open('data.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Updated data.ts')
else:
    print('No changes needed')
