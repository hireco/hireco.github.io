// ================= 密码配置 =================
const PAGE_PASSWORD_HASH = 'e61b26836f2013c722ce1724f462ed58843b0eb9cb1700ca0d83eef77cc7bf56';

// ================= 登录状态配置 =================
const LOGIN_KEY = 'download_auth';
const EXPIRY_DAYS = 7;  // 7天内免登录

// 检查登录状态
function checkAuthStatus() {
    const authData = localStorage.getItem(LOGIN_KEY);
    if (!authData) return false;
    
    try {
        const { timestamp } = JSON.parse(authData);
        const expiryTime = timestamp + (EXPIRY_DAYS * 24 * 60 * 60 * 1000);
        return Date.now() < expiryTime;
    } catch (e) {
        return false;
    }
}

// 保存登录状态
function saveAuthStatus() {
    const authData = {
        timestamp: Date.now()
    };
    localStorage.setItem(LOGIN_KEY, JSON.stringify(authData));
}

// 清除登录状态
function clearAuth() {
    localStorage.removeItem(LOGIN_KEY);
}

// 退出登录
function logout() {
    clearAuth();
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('login-box').style.display = 'flex';
    document.getElementById('pwd-input').value = '';
}

// ============================================

async function sha256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 页面加载时检查登录状态
function initAuth() {
    if (checkAuthStatus()) {
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        loadPath(ROOT_FOLDER);
        return true;
    }
    return false;
}

document.getElementById('pwd-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') checkPassword();
});

async function checkPassword() {
    const input = document.getElementById('pwd-input').value;
    const inputHash = await sha256(input);
    if (inputHash === PAGE_PASSWORD_HASH) {
        saveAuthStatus();  // 保存登录状态
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        loadPath(ROOT_FOLDER);
    } else {
        document.getElementById('error-msg').style.display = 'block';
        document.getElementById('pwd-input').value = '';
        // 重新触发动画
        const errorMsg = document.getElementById('error-msg');
        errorMsg.style.animation = 'none';
        errorMsg.offsetHeight;
        errorMsg.style.animation = 'shake 0.5s ease';
    }
}

const listElement = document.getElementById('file-list');
const breadcrumbElement = document.getElementById('breadcrumb-text');

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function getFileIcon(item) {
    if (item.type === 'dir') {
        return 'ri-folder-3-line';
    }
    const ext = item.name.split('.').pop().toLowerCase();
    const iconMap = {
        'pdf': 'ri-file-pdf-2-line',
        'doc': 'ri-file-word-2-line',
        'docx': 'ri-file-word-2-line',
        'xls': 'ri-file-excel-2-line',
        'xlsx': 'ri-file-excel-2-line',
        'ppt': 'ri-file-ppt-2-line',
        'pptx': 'ri-file-ppt-2-line',
        'zip': 'ri-file-zip-line',
        'rar': 'ri-file-zip-line',
        '7z': 'ri-file-zip-line',
        'txt': 'ri-file-text-line',
        'jpg': 'ri-image-line',
        'jpeg': 'ri-image-line',
        'png': 'ri-image-line',
        'gif': 'ri-image-line',
        'mp3': 'ri-music-line',
        'mp4': 'ri-video-line',
        'exe': 'ri-gamepad-line',
        'apk': 'ri-android-line',
        'dmg': 'ri-computer-line'
    };
    return iconMap[ext] || 'ri-file-3-line';
}

async function loadPath(currentPath) {
    listElement.innerHTML = '<li class="loading"><i class="ri-loader-4-line"></i><br>正在加载...</li>';
    const friendlyPath = currentPath.replace(ROOT_FOLDER, '') || '/';
    breadcrumbElement.textContent = '当前位置: ' + friendlyPath;
    const apiUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${currentPath}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        listElement.innerHTML = '';

        // 返回上一级
        if (currentPath.length > ROOT_FOLDER.length) {
            const li = document.createElement('li');
            li.className = 'file-item';
            const pathParts = currentPath.split('/');
            pathParts.pop();
            const parentPath = pathParts.join('/');
            li.innerHTML = `<a onclick="loadPath('${parentPath}')">
                <div class="file-icon back"><i class="ri-arrow-go-back-line"></i></div>
                <div class="file-info">
                    <div class="file-name">返回上一级</div>
                </div>
                <i class="ri-arrow-left-s-line file-arrow"></i>
            </a>`;
            listElement.appendChild(li);
        }

        if (!Array.isArray(data) || data.length === 0) {
            listElement.innerHTML = '<li class="empty"><i class="ri-folder-open-line"></i><br>该目录下暂无内容</li>';
            return;
        }

        data.sort((a, b) => (a.type === b.type ? a.name.localeCompare(b.name) : a.type === 'dir' ? -1 : 1));

        data.forEach(item => {
            if (item.name === 'index.html') return;
            const li = document.createElement('li');
            li.className = 'file-item';

            if (item.type === 'dir') {
                li.innerHTML = `<a onclick="loadPath('${item.path}')">
                    <div class="file-icon folder"><i class="ri-folder-3-line"></i></div>
                    <div class="file-info">
                        <div class="file-name">${item.name}</div>
                    </div>
                    <i class="ri-arrow-right-s-line file-arrow"></i>
                </a>`;
            } else {
                li.innerHTML = `<a href="${item.download_url}" target="_blank">
                    <div class="file-icon file"><i class="${getFileIcon(item)}"></i></div>
                    <div class="file-info">
                        <div class="file-name">${item.name}</div>
                        <div class="file-meta">${formatBytes(item.size)}</div>
                    </div>
                    <i class="ri-download-line download-icon"></i>
                </a>`;
            }
            listElement.appendChild(li);
        });
    } catch (error) {
        listElement.innerHTML = `<li class="error"><i class="ri-error-warning-line"></i> 加载失败: ${error.message}</li>`;
    }
}
