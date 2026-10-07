import json
import os

log_path = r'C:\Users\LENOVO\.gemini\antigravity-ide\brain\5032a8ae-7544-49bf-ac27-4dd4f30a7055\.system_generated\logs\transcript_full.jsonl'
files = {}

print("Starting recovery...")
with open(log_path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        if 'write_to_file' in line or 'replace_file_content' in line:
            try:
                data = json.loads(line)
                for call in data.get('tool_calls', []):
                    # Check both 'name' and 'tool_name' just in case
                    name = call.get('name', call.get('tool_name', ''))
                    
                    if 'write_to_file' in name:
                        args = call.get('args', {})
                        if isinstance(args, str):
                            args = json.loads(args)
                            
                        target = args.get('TargetFile', '')
                        content = args.get('CodeContent', '')
                        
                        if isinstance(target, str) and target.startswith('"'):
                            try: target = json.loads(target)
                            except: pass
                        if isinstance(content, str) and content.startswith('"'):
                            try: content = json.loads(content)
                            except: pass
                            
                        if target and content and 'frontend-yunivrz' in target:
                            files[target] = content
                            print(f"Found {target}")
            except Exception as e:
                print(f"Error on line {i}: {e}")

print(f"Found {len(files)} files to recover.")
for target, content in files.items():
    print(f'Recovered: {target}')
    os.makedirs(os.path.dirname(target), exist_ok=True)
    with open(target, 'w', encoding='utf-8') as out:
        out.write(content)
