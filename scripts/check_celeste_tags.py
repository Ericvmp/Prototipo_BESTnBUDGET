import re

content = open('data.ts', 'r', encoding='utf-8').read()

valid_items = set([
    'Metal Parts', 'Plastic Parts', 'Rubber Parts', 'Chemicals', 'Fabric',
    'Great Mullein', 'Wires', 'Steel Spring', 'Oil', 'Simple Gun Parts',
    'Battery', 'Canister', 'Magnet', 'Duct Tape', 'Rope', 'Synthesized Fuel',
    'Syringe', 'Sensors', 'Heavy Gun Parts', 'Medium Gun Parts', 'Light Gun Parts',
    'Moss', 'Speaker Component', 'Processor', 'Voltage Converter', 'Complex Gun Parts',
    'Exodus Modules'
])

materials_section = content.split('export const MATERIALS_DATA')[1].split('export const')[0]

items = []
for block in materials_section.split('id: '):
    if 'purchasableFromCeleste: true' in block:
        m = re.search(r'name:\s*[\'"]([^\'"]+)[\'"]', block)
        if m:
            items.append(m.group(1))

wrong_items = [i for i in items if i not in valid_items]
valid_found = [i for i in items if i in valid_items]
missing = [i for i in valid_items if i not in valid_found]

print('Total valid items with tag:', len(valid_found))
print('Wrong items with tag:', wrong_items)
print('Missing valid items without tag:', missing)
