import os
import re
import json

def to_pascal_case(snake_str):
    components = snake_str.split('_')
    return "".join(x.title() for x in components)

def check_file_exists(base_dir, possible_names):
    if not os.path.exists(base_dir):
        return None
    for name in possible_names:
        path = os.path.join(base_dir, name)
        if os.path.exists(path):
            return path
    return None

def analyze_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    has_api_calls = 'fetch(' in content or 'axios' in content or 'api.' in content or 'Service.' in content
    
    # Very basic check for state/props
    has_state = 'useState' in content or 'this.state' in content
    
    return {
        'has_api_calls': has_api_calls,
        'has_state': has_state,
        'size': len(content)
    }

def main():
    report = {
        'mobile': {'total_skills': 0, 'implemented': 0, 'not_implemented': [], 'implemented_details': []},
        'web': {'total_skills': 0, 'implemented': 0, 'not_implemented': [], 'implemented_details': []}
    }
    
    # Mobile
    mobile_skills_dir = r"c:\Users\Suraj\Code\Truehand\skills\truehand-mobile-ui"
    mobile_src_dir = r"c:\Users\Suraj\Code\Truehand\truehand-mobile\src\screens"
    
    if os.path.exists(mobile_skills_dir):
        skills = [d for d in os.listdir(mobile_skills_dir) if os.path.isdir(os.path.join(mobile_skills_dir, d))]
        report['mobile']['total_skills'] = len(skills)
        
        for skill in skills:
            pascal = to_pascal_case(skill)
            possible_names = [f"{pascal}.js", f"{pascal}Screen.js", f"{pascal}.tsx", f"{pascal}Screen.tsx"]
            
            filepath = check_file_exists(mobile_src_dir, possible_names)
            if filepath:
                report['mobile']['implemented'] += 1
                details = analyze_file(filepath)
                details['skill'] = skill
                details['file'] = os.path.basename(filepath)
                report['mobile']['implemented_details'].append(details)
            else:
                report['mobile']['not_implemented'].append(skill)
                
    # Web
    web_skills_dir = r"c:\Users\Suraj\Code\Truehand\skills\truehand-web-ui"
    web_src_dir = r"c:\Users\Suraj\Code\Truehand\frontend\src\pages"
    
    if os.path.exists(web_skills_dir):
        skills = [d for d in os.listdir(web_skills_dir) if os.path.isdir(os.path.join(web_skills_dir, d))]
        report['web']['total_skills'] = len(skills)
        
        for skill in skills:
            # handle _desktop suffix
            clean_skill = skill.replace('_desktop', '')
            pascal = to_pascal_case(clean_skill)
            possible_names = [f"{pascal}.jsx", f"{pascal}Page.jsx", f"{pascal}Screen.jsx", f"{pascal}.js", f"{pascal}.tsx"]
            
            filepath = check_file_exists(web_src_dir, possible_names)
            if filepath:
                report['web']['implemented'] += 1
                details = analyze_file(filepath)
                details['skill'] = skill
                details['file'] = os.path.basename(filepath)
                report['web']['implemented_details'].append(details)
            else:
                report['web']['not_implemented'].append(skill)

    with open(r"c:\Users\Suraj\Code\Truehand\audit_results.json", 'w') as f:
        json.dump(report, f, indent=2)

if __name__ == '__main__':
    main()
