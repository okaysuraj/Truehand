import json

with open('audit_results.json', 'r') as f:
    data = json.load(f)

mobile_not_implemented = data['mobile']['not_implemented']
web_not_implemented = data['web']['not_implemented']
mobile_implemented_count = data['mobile']['implemented']
web_implemented_count = data['web']['implemented']

print(f"Mobile Implemented Count: {mobile_implemented_count}")
print(f"Mobile Not Implemented Count: {len(mobile_not_implemented)}")
print(f"Web Implemented Count: {web_implemented_count}")
print(f"Web Not Implemented Count: {len(web_not_implemented)}")

print("\n--- Mobile Not Implemented Examples ---")
for x in mobile_not_implemented[:10]:
    print(x)

print("\n--- Web Not Implemented Examples ---")
for x in web_not_implemented[:10]:
    print(x)
