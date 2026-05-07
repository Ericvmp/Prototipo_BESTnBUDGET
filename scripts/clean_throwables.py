import re

with open('data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. FIX IMAGES
content = re.sub(r"imageUrl:\s*['\"]/images/items/Trailblazer_grenade\.png['\"]", 'imageUrl: "/images/items/Trailblazer.png"', content)
content = re.sub(r"imageUrl:\s*['\"]/images/items/Vita_Spray\.webp['\"]", 'imageUrl: "/images/items/Vita_Spray.png"', content)
content = re.sub(r"imageUrl:\s*['\"]/images/items/Trigger_nade\.png['\"]", 'imageUrl: "/images/items/Trigger_\\\'Nade.png"', content)
content = re.sub(r"imageUrl:\s*['\"]/images/items/Shield_Recharger\.png['\"](,\s*)?", '', content)

# 2. REMOVE UNWANTED ITEMS
unwanted_ids = [
    't-lil-smoke', 't-blaze-trap', 't-gas-trap', 't-lure-trap', 
    't-door-blocker', 't-binoculars', 't-flame-spray', 't-fireworks', 
    't-green-lightstick', 't-yellow-lightstick', 't-red-lightstick', 't-blue-lightstick'
]

for item_id in unwanted_ids:
    pattern = r"^\s*\{\s*id:\s*['\"]" + item_id + r"['\"][\s\S]*?^\s*\},?\n?"
    content = re.sub(pattern, '', content, flags=re.MULTILINE)

# Also fix any trailing commas before the closing array bracket just in case
content = re.sub(r",\s*\];", '\n  ];', content)

with open('data.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done!')
