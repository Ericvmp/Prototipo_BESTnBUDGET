import re

with open('data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Material map
mat_image_map = {}
for m in re.finditer(r'name:\s*[\x27\x22](.*?)[\x27\x22].*?imageUrl:\s*[\x27\x22](.*?)[\x27\x22]', content, re.DOTALL):
    if m.group(1) not in mat_image_map:
        mat_image_map[m.group(1)] = m.group(2)

# Find LOOT_DATA
start = content.find('export const LOOT_DATA')
end = content.find('];', start) + 2
loot_text = content[start:end]

# Split by objects at top level of the array
# This is tricky without a parser, but we can look for "{" at the start of a line or after a comma
objs = re.split(r'\n\s*\{', loot_text)
new_objs = []
for obj in objs:
    if 'material:' in obj and 'materialImageUrl:' not in obj:
        mat_name_match = re.search(r'material:\s*[\x27\x22](.*?)[\x27\x22]', obj)
        if mat_name_match:
            name = mat_name_match.group(1)
            if name in mat_image_map:
                img = mat_image_map[name]
                obj = re.sub(r'(material:.*?),', r'\1,\n    materialImageUrl: "' + img + '",', obj)
                print(f'Added materialImageUrl to {name}')
    new_objs.append(obj)

new_loot_text = '\n  {'.join(new_objs)
# Note: the first element of new_objs is the "export const LOOT_DATA = [" part
# We need to handle that.

# Let's try a different way. 
# We'll just find all matches of items missing the field.
pattern = r'\{\s*id:\s*[\x27\x22]loot-(.*?)[\x27\x22],\s*material:\s*[\x27\x22](.*?)[\x27\x22],(?!\s*materialImageUrl:)'

def repl(m):
    id_val = m.group(1)
    name = m.group(2)
    if name in mat_image_map:
        img = mat_image_map[name]
        print(f'Fixing {name}')
        return f'{{ \n    id: "loot-{id_val}",\n    material: "{name}",\n    materialImageUrl: "{img}",'
    return m.group(0)

new_content = re.sub(pattern, repl, content)

if new_content != content:
    with open('data.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Updated data.ts')
else:
    print('No changes needed')
