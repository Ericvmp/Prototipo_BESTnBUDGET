import re

with open('data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Build a map of Material Name -> imageUrl from MATERIALS_DATA
mat_image_map = {}
mat_section_match = re.search(r'export const MATERIALS_DATA: Material\[\] = \[(.*?)\];', content, re.DOTALL)
if mat_section_match:
    mat_section = mat_section_match.group(1)
    # Find objects in MATERIALS_DATA
    # Note: this is a bit rough but works for this file structure
    objs = re.findall(r'\{[^{}]*\}', mat_section, re.DOTALL)
    for obj in objs:
        name_match = re.search(r'name:\s*[\x27\x22](.*?)[\x27\x22]', obj)
        img_match = re.search(r'imageUrl:\s*[\x27\x22](.*?)[\x27\x22]', obj)
        if name_match and img_match:
            mat_image_map[name_match.group(1)] = img_match.group(1)

# 2. Update LOOT_DATA
def fix_loot(match):
    obj = match.group(0)
    mat_match = re.search(r'material:\s*[\x27\x22](.*?)[\x27\x22]', obj)
    if not mat_match: return obj
    mat_name = mat_match.group(1)
    
    if 'materialImageUrl:' not in obj:
        if mat_name in mat_image_map:
            img = mat_image_map[mat_name]
            # Insert materialImageUrl after wikiUrl or material
            if 'wikiUrl:' in obj:
                obj = re.sub(r'(wikiUrl:.*?),', r'\1,\n    materialImageUrl: "' + img + '",', obj)
            else:
                obj = re.sub(r'(material:.*?),', r'\1,\n    materialImageUrl: "' + img + '",', obj)
            print(f'Added materialImageUrl to {mat_name}')
    return obj

# Find LOOT_DATA section
loot_start = content.find('export const LOOT_DATA')
loot_end = content.find('];', loot_start) + 2
loot_section = content[loot_start:loot_end]

new_loot_section = re.sub(r'\{[^{}]*\}', fix_loot, loot_section, flags=re.DOTALL)
new_content = content[:loot_start] + new_loot_section + content[loot_end:]

if new_content != content:
    with open('data.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Updated LOOT_DATA in data.ts')
else:
    print('No changes needed in LOOT_DATA')
