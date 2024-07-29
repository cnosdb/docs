import os
import re

exclude_dirs = [
    'node_modules',
    'build',
]

def find_md_files(directory):
    md_files = []
    for root, dirs, files in os.walk(directory):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        for file in files:
            if file.endswith(".md"):
                md_files.append(os.path.join(root, file))
    return md_files

def extract_links(md_file):
    link_pattern = re.compile(r'\[(.*?)\]\((.*?)\)')
    with open(md_file, 'r', encoding='utf-8') as file:
        content = file.read()
    return link_pattern.findall(content)

def is_relative_link(link):
    return link.startswith('/') or link.startswith('./') or link.startswith('../')

def check_link_exists(base_dir, link_url : str):
    if link_url.startswith('/'):
        if link_url.find('.') >= 0 and not link_url.endswith('.md'):
            # `link_url`s such as '/img/simple8b.png' require resources in '$repository/static/'
            abs_path = os.path.normpath(f'./static{link_url}')
        else:
            # `link_url`s such as '/img/simple8b.md' require resources in '$repository/'
            if link_url.startswith('/eco-integration/'):
                abs_path = os.path.normpath(f'./eco-integration/1/{link_url[17:]}')
            else:
                abs_path = os.path.normpath(f'./{link_url[1:]}')
    else:
        abs_path = os.path.normpath(os.path.join(base_dir, link_url))

    exists = os.path.exists(abs_path)
    if not exists:
        abs_path = abs_path + '.md'
        exists = os.path.exists(abs_path)
    return exists, abs_path

def extract_header(md_file, header):
    # For char '-' in title, replace it with '.' to match any character.
    header_re = re.escape(header).replace('\\-', '.');
    header_pattern = re.compile(r'^#+ [`\'"]?' + header_re + r'[`\'"]?$', re.MULTILINE | re.IGNORECASE)
    if not os.path.isfile(md_file):
        return False
    with open(md_file, 'r', encoding='utf-8') as file:
        content = file.read()
    return header_pattern.search(content) is not None

def main(directory):
    md_files = find_md_files(directory)
    for md_file in md_files:
        md_file_dir = os.path.dirname(md_file)
        link_name_urls = extract_links(md_file)
        for (link_name, link) in link_name_urls:
            if is_relative_link(link):
                # Split the link '../a/b/c#header' into path and header
                path, header = (link.split('#') + [None])[:2]
                exists, abs_path = check_link_exists(md_file_dir, path)
                # print(md_file, exists, path, header, abs_path)
                if not exists:
                    print(f'Broken link: [{link_name}]({link}) in file: {md_file}')
                elif header and not extract_header(abs_path, header):
                    print(f'Missing header: #{header} in file: {abs_path} (linked by [{link_name}]({link}) from file: {md_file})')

if __name__ == "__main__":
    # main("./docs")

    directory = input("Enter a directory to scan: ")
    main(directory)