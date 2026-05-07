import re

with open('data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

wrong_items = [
    'Mechanical Components', 'Mod Components', 'Adv Mechanical Components', 
    'ARC Alloy', 'ARC Powercell', 'Adv ARC Powercell', 'Electrical Components', 
    'Adv Electrical Components', 'ARC Circuitry', 'ARC Motion Core', 'Antiseptic', 
    'Tick Pod', 'Durable Cloth', 'Power Rod', 'Magnetic Accelerator', 
    'Crude Explosives', 'Explosive Compound', 'Firefly Burner', 'Rocketeer Driver', 
    'Comet Igniter', 'Light Shield', 'Medium Shield', 'Heavy Shield'
]

# 1. Remove purchasableFromCeleste from wrong_items
for item in wrong_items:
    pattern = r"(name:\s*['\"]" + re.escape(item) + r"['\"]\s*),\s*purchasableFromCeleste:\s*true,\s*celesteSeedCost:\s*\d+,?\s*"
    content = re.sub(pattern, r"\1, ", content)

# 2. Add purchasableFromCeleste to Speaker Component
pattern_speaker = r"(name:\s*['\"]Speaker Component['\"]\s*,)"
content = re.sub(pattern_speaker, r"\1 purchasableFromCeleste: true, celesteSeedCost: 10,", content)

with open('data.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("data.ts updated successfully.")
