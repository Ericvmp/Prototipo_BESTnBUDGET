import re

with open('data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace materialImageUrl: "..." or '...' globally, as it is only used in LOOT_DATA and maybe types
new_content = re.sub(r'\s*materialImageUrl:\s*[\'"].*?[\'"],?\n?', '\n', content)

with open('data.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Removed materialImageUrl from data.ts")
