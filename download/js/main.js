// ================= 登录状态配置 =================
const LOGIN_KEY = 'download_auth';
const EXPIRY_DAYS = 7;  // 7天内免登录

// 文件数据缓存
let filesData = null;
let rootPath = '';  // 根目录路径（从files.json读取）

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
    document.getElementById('login-box').style.display = 'block';
    document.getElementById('logout-btn').style.display = 'none';
    document.getElementById('pwd-input').value = '';
}

// ============================================

// 纯 JavaScript SHA-256 实现，不依赖 crypto.subtle（兼容非 HTTPS 环境）
function sha256(input) {
    // --- UTF-8 编码 ---
    var msg = [];
    for (var i = 0; i < input.length; i++) {
        var c = input.charCodeAt(i);
        if (c < 0x80) {
            msg.push(c);
        } else if (c < 0x800) {
            msg.push(0xc0 | (c >>> 6));
            msg.push(0x80 | (c & 0x3f));
        } else if (c < 0xd800 || c >= 0xe000) {
            msg.push(0xe0 | (c >>> 12));
            msg.push(0x80 | ((c >>> 6) & 0x3f));
            msg.push(0x80 | (c & 0x3f));
        } else {
            i++;
            var c2 = input.charCodeAt(i);
            var cp = 0x10000 + ((c & 0x3ff) << 10) + (c2 & 0x3ff);
            msg.push(0xf0 | (cp >>> 18));
            msg.push(0x80 | ((cp >>> 12) & 0x3f));
            msg.push(0x80 | ((cp >>> 6) & 0x3f));
            msg.push(0x80 | (cp & 0x3f));
        }
    }

    // --- SHA-256 常量 ---
    var K = [
        0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
        0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
        0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
        0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
        0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
        0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
        0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
        0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2
    ];
    var H = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];

    // --- 消息填充 ---
    var bitLen = msg.length * 8;
    msg.push(0x80);
    while ((msg.length + 8) % 64 !== 0) { msg.push(0); }
    // 64-bit big-endian 消息长度（高32位置0，密码不可能超过4GB）
    msg.push(0, 0, 0, 0);
    msg.push((bitLen >>> 24) & 0xff, (bitLen >>> 16) & 0xff, (bitLen >>> 8) & 0xff, bitLen & 0xff);

    // --- 逐块处理 ---
    for (var chunk = 0; chunk < msg.length; chunk += 64) {
        var W = new Array(64);
        for (var t = 0; t < 16; t++) {
            W[t] = (msg[chunk + t * 4] << 24) | (msg[chunk + t * 4 + 1] << 16) |
                   (msg[chunk + t * 4 + 2] << 8) | msg[chunk + t * 4 + 3];
        }
        for (t = 16; t < 64; t++) {
            var s0 = ((W[t - 15] >>> 7) | (W[t - 15] << 25)) ^
                     ((W[t - 15] >>> 18) | (W[t - 15] << 14)) ^
                     (W[t - 15] >>> 3);
            var s1 = ((W[t - 2] >>> 17) | (W[t - 2] << 15)) ^
                     ((W[t - 2] >>> 19) | (W[t - 2] << 13)) ^
                     (W[t - 2] >>> 10);
            W[t] = (W[t - 16] + s0 + W[t - 7] + s1) | 0;
        }

        var a = H[0], b = H[1], c = H[2], d = H[3],
            e = H[4], f = H[5], g = H[6], h = H[7];

        for (t = 0; t < 64; t++) {
            var S1 = ((e >>> 6) | (e << 26)) ^
                     ((e >>> 11) | (e << 21)) ^
                     ((e >>> 25) | (e << 7));
            var ch = (e & f) ^ (~e & g);
            var temp1 = (h + S1 + ch + K[t] + W[t]) | 0;
            var S0 = ((a >>> 2) | (a << 30)) ^
                     ((a >>> 13) | (a << 19)) ^
                     ((a >>> 22) | (a << 10));
            var maj = (a & b) ^ (a & c) ^ (b & c);
            var temp2 = (S0 + maj) | 0;

            h = g; g = f; f = e; e = (d + temp1) | 0;
            d = c; c = b; b = a; a = (temp1 + temp2) | 0;
        }

        H[0] = (H[0] + a) | 0; H[1] = (H[1] + b) | 0;
        H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0;
        H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0;
        H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
    }

    // --- 输出十六进制 ---
    var hex = '';
    for (var i = 0; i < 8; i++) {
        var hx = (H[i] >>> 0).toString(16);
        while (hx.length < 8) { hx = '0' + hx; }
        hex += hx;
    }
    return hex;
}

// 页面加载时检查登录状态
function initAuth() {
    if (checkAuthStatus()) {
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        document.getElementById('logout-btn').style.display = 'flex';
        loadFiles();
        return true;
    }
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('login-box').style.display = 'block';
    return false;
}

document.getElementById('pwd-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') checkPassword();
});

async function checkPassword() {
    const input = document.getElementById('pwd-input').value;
    const inputHash = await sha256(input);
    if (inputHash === config.downloadPasswordHash) {
        saveAuthStatus();
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        document.getElementById('logout-btn').style.display = 'flex';
        loadFiles();
    } else {
        document.getElementById('error-msg').style.display = 'block';
        document.getElementById('pwd-input').value = '';
    }
}

let listElement = document.getElementById('file-list');
let breadcrumbElement = document.getElementById('breadcrumb-text');

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

// 根据路径在 filesData 中查找节点
function findNode(path) {
    if (!filesData) return null;
    if (path === '' || path === rootPath) return filesData;

    const parts = path.split('/').filter(p => p !== '');
    let node = filesData;
    for (const part of parts) {
        if (!node.children) return null;
        node = node.children.find(c => c.name === part);
        if (!node) return null;
    }
    return node;
}

// 获取当前路径的子项（过滤隐藏目录）
function getChildren(path) {
    const node = findNode(path);
    if (!node || !node.children) return [];
    return node.children.filter(item => {
        // 过滤隐藏的目录
        if (item.type === 'dir' && item.hidden) return false;
        // 过滤 index.html
        if (item.name === 'index.html') return false;
        return true;
    });
}

// 构建面包屑路径
function buildBreadcrumb(path) {
    return '当前位置: /' + (path || '');
}

// 获取父路径
function getParentPath(path) {
    if (!path || path === '' || path === rootPath) return null;
    const parts = path.split('/');
    parts.pop();
    return parts.join('/');
}

// 将短key JSON 还原为完整 key 格式（递归）
function normalize(node) {
    if (node.n !== undefined) { node.name = node.n; delete node.n; }
    if (node.t !== undefined) { node.type = node.t === 'd' ? 'dir' : 'file'; delete node.t; }
    if (node.c !== undefined) { node.children = node.c; delete node.c; }
    if (node.s !== undefined) { node.size = node.s; delete node.s; }
    if (node.e !== undefined) { node.ext = node.e; delete node.e; }
    if (node.m !== undefined) { node.modified = node.m; delete node.m; }
    if (node.h !== undefined) { node.hidden = node.h; delete node.h; }
    if (node.p !== undefined) { node.path = node.p; delete node.p; }
    if (node.children) { node.children.forEach(normalize); }
    return node;
}

// 加载 files.json 数据
async function loadFiles() {
    listElement.innerHTML = '<li class="loading"><i class="ri-loader-4-line"></i><br>正在加载...</li>';

    try {
        const response = await fetch('../data/files.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        filesData = normalize(await response.json());
        rootPath = filesData.path;
        loadPath(rootPath);
    } catch (error) {
        listElement.innerHTML = `<li class="error"><i class="ri-error-warning-line"></i> 加载文件列表失败: ${error.message}</li>`;
    }
}

// 渲染指定路径的文件列表
async function loadPath(currentPath) {
    listElement = document.getElementById('file-list') || listElement;
    breadcrumbElement = document.getElementById('breadcrumb-text') || breadcrumbElement;
    listElement.innerHTML = '<li class="loading"><i class="ri-loader-4-line"></i><br>正在加载...</li>';
    breadcrumbElement.textContent = buildBreadcrumb(currentPath);

    try {
        const items = getChildren(currentPath);
        listElement.innerHTML = '';

        // 返回上一级
        const parentPath = getParentPath(currentPath);
        if (parentPath !== null) {
            const li = document.createElement('li');
            li.className = 'file-item';
            li.innerHTML = `<a onclick="loadPath('${parentPath}')">
                <div class="file-icon back"><i class="ri-arrow-go-back-line"></i></div>
                <div class="file-info">
                    <div class="file-name">返回上一级</div>
                </div>
                <i class="ri-arrow-left-s-line file-arrow"></i>
            </a>`;
            listElement.appendChild(li);
        }

        if (items.length === 0) {
            listElement.innerHTML = '<li class="empty"><i class="ri-folder-open-line"></i><br>该目录下暂无内容</li>';
            return;
        }

        items.sort((a, b) => (a.type === b.type ? a.name.localeCompare(b.name) : a.type === 'dir' ? -1 : 1));

        items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'file-item';

            if (item.type === 'dir') {
                const childPath = currentPath ? currentPath + '/' + item.name : item.name;
                li.innerHTML = `<a onclick="loadPath('${childPath}')">
                    <div class="file-icon folder"><i class="ri-folder-3-line"></i></div>
                    <div class="file-info">
                        <div class="file-name">${item.name}</div>
                    </div>
                    <i class="ri-arrow-right-s-line file-arrow"></i>
                </a>`;
            } else {
                const filesDomain = config.filesDomain || config.siteDomain;
                const filePath = currentPath ? currentPath + '/' + item.name : item.name;
                const downloadUrl = filesDomain + '/' + filePath;
                li.innerHTML = `<a href="${downloadUrl}" target="_blank">
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

// 显示打赏弹窗
function showDonate() {
    var modal = document.getElementById('donate-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

// 关闭打赏弹窗
function closeDonate() {
    var modal = document.getElementById('donate-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// 点击弹窗背景关闭
document.addEventListener('click', function(e) {
    var modal = document.getElementById('donate-modal');
    if (modal && e.target === modal) {
        closeDonate();
    }
});
