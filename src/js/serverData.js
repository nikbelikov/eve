export function getPages(projectId) {
    let pages = localStorage.getItem(projectId.toString());

    if (pages) {
        return JSON.parse(pages)
    } else {
        return []
    }
}

export function getProjects() {
    console.log('get projects');
}

export function addProject(projectId, name) {
    let projects = JSON.parse(localStorage.getItem('projects'));
    console.log(projects);
    projects[projects.length] = {
        projectId,
        name
    };
    localStorage.setItem('projects', JSON.stringify(projects));
}

export function removeProject(projectId) {
    console.log('remove project');
}

export const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export function generateId(chars, length, noRepeat) {
    var res = '';
    var r;
    var i;
    for (i = 1; i <= length; i++) {
        r = Math.floor(Math.random() * chars.length);
        res = res + chars.substring(r, r + 1);
        if (noRepeat === 'true' || noRepeat === true) {
            chars = chars.replace(chars.substring(r, r + 1), '');
        }
    }
    res = res.replace("&", "&amp;");
    res = res.replace(">", "&gt;");
    res = res.replace("<", "&lt;");
    return res;
}

export function getProjectName(projectId) {
    return 'project ' + projectId;
}
