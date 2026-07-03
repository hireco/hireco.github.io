// CDN Library URL Map
// Supported providers: jsdelivr, cdnjs, unpkg
var cdnLibs = {
    jquery: {
        jsdelivr: "https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js",
        cdnjs: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js",
        unpkg: "https://unpkg.com/jquery@3/dist/jquery.min.js"
    },
    bootstrap: {
        jsdelivr: {
            css: "https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css",
            js: "https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/js/bootstrap.min.js"
        },
        cdnjs: {
            css: "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.1/css/bootstrap.min.css",
            js: "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.1/js/bootstrap.min.js"
        },
        unpkg: {
            css: "https://unpkg.com/bootstrap@3.4.1/dist/css/bootstrap.min.css",
            js: "https://unpkg.com/bootstrap@3.4.1/dist/js/bootstrap.min.js"
        }
    },
    "editormd-preview": {
        jsdelivr: { css: "https://cdn.jsdelivr.net/npm/editor.md/css/editormd.preview.css" },
        cdnjs: { css: "" },
        unpkg: { css: "https://unpkg.com/editor.md/css/editormd.preview.css" }
    },
    imagesloaded: {
        jsdelivr: "https://cdn.jsdelivr.net/npm/imagesloaded@4/imagesloaded.pkgd.min.js",
        cdnjs: "",
        unpkg: "https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js"
    },
    masonry: {
        jsdelivr: "https://cdn.jsdelivr.net/npm/masonry-layout@4/dist/masonry.pkgd.min.js",
        cdnjs: "https://cdnjs.cloudflare.com/ajax/libs/masonry/4.2.2/masonry.pkgd.min.js",
        unpkg: "https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"
    },
    marked: {
        jsdelivr: "https://cdn.jsdelivr.net/npm/editor.md/lib/marked.min.js",
        cdnjs: "",
        unpkg: "https://unpkg.com/editor.md/lib/marked.min.js"
    },
    prettify: {
        jsdelivr: "https://cdn.jsdelivr.net/npm/code-prettify@0/src/prettify.min.js",
        cdnjs: "",
        unpkg: "https://unpkg.com/code-prettify@0/src/prettify.min.js"
    },
    raphael: {
        jsdelivr: "https://cdn.jsdelivr.net/npm/raphael@2/raphael.min.js",
        cdnjs: "https://cdnjs.cloudflare.com/ajax/libs/raphael/2.3.0/raphael.min.js",
        unpkg: "https://unpkg.com/raphael@2/raphael.min.js"
    },
    underscore: {
        jsdelivr: "https://cdn.jsdelivr.net/npm/editor.md/lib/underscore.min.js",
        cdnjs: "",
        unpkg: "https://unpkg.com/editor.md/lib/underscore.min.js"
    },
    "sequence-diagram": {
        jsdelivr: "https://cdn.jsdelivr.net/npm/editor.md/lib/sequence-diagram.min.js",
        cdnjs: "",
        unpkg: "https://unpkg.com/editor.md/lib/sequence-diagram.min.js"
    },
    flowchart: {
        jsdelivr: "https://cdn.jsdelivr.net/npm/editor.md/lib/flowchart.min.js",
        cdnjs: "",
        unpkg: "https://unpkg.com/editor.md/lib/flowchart.min.js"
    },
    "jquery-flowchart": {
        jsdelivr: "https://cdn.jsdelivr.net/npm/editor.md/lib/jquery.flowchart.min.js",
        cdnjs: "",
        unpkg: "https://unpkg.com/editor.md/lib/jquery.flowchart.min.js"
    },
    editormd: {
        jsdelivr: "https://cdn.jsdelivr.net/npm/editor.md/editormd.js",
        cdnjs: "",
        unpkg: "https://unpkg.com/editor.md/editormd.js"
    },
    "waline-emojis": {
        jsdelivr: "https://cdn.jsdelivr.net/npm/@waline/emojis@1.4.0",
        cdnjs: "",
        unpkg: "https://unpkg.com/@waline/emojis@1.4.0"
    },
    waline: {
        jsdelivr: {
            css: "https://cdn.jsdelivr.net/npm/@waline/client@3/dist/waline.css",
            js: "https://cdn.jsdelivr.net/npm/@waline/client@3/dist/waline.umd.js"
        },
        cdnjs: {
            css: "",
            js: ""
        },
        unpkg: {
            css: "https://unpkg.com/@waline/client@3/dist/waline.css",
            js: "https://unpkg.com/@waline/client@3/dist/waline.umd.js"
        }
    },
    html5shiv: {
        jsdelivr: "https://cdn.jsdelivr.net/npm/html5shiv@3/dist/html5shiv.min.js",
        cdnjs: "https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js",
        unpkg: "https://unpkg.com/html5shiv@3/dist/html5shiv.min.js"
    },
    respond: {
        jsdelivr: "https://cdn.jsdelivr.net/npm/respond.js@1.4.2/dest/respond.min.js",
        cdnjs: "https://cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js",
        unpkg: "https://unpkg.com/respond.js@1.4.2/dest/respond.min.js"
    },
    remixicon: {
        jsdelivr: { css: "https://cdn.jsdelivr.net/npm/remixicon@4/fonts/remixicon.css" },
        cdnjs: { css: "" },
        unpkg: { css: "https://unpkg.com/remixicon@4/fonts/remixicon.css" }
    },
    sweetalert2: {
        jsdelivr: {
            css: "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css",
            js: "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js"
        },
        cdnjs: {
            css: "https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/11.10.1/sweetalert2.min.css",
            js: "https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/11.10.1/sweetalert2.all.min.js"
        },
        unpkg: {
            css: "https://unpkg.com/sweetalert2@11/dist/sweetalert2.min.css",
            js: "https://unpkg.com/sweetalert2@11/dist/sweetalert2.all.min.js"
        }
    },
    mathjax: {
        jsdelivr: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",
        cdnjs: "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.js",
        unpkg: "https://unpkg.com/mathjax@3/es5/tex-mml-chtml.js"
    },
    katex: {
        jsdelivr: {
            css: "https://cdn.jsdelivr.net/npm/katex@0/dist/katex.min.css",
            js: "https://cdn.jsdelivr.net/npm/katex@0/dist/katex.min.js"
        },
        cdnjs: {
            css: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css",
            js: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js"
        },
        unpkg: {
            css: "https://unpkg.com/katex@0/dist/katex.min.css",
            js: "https://unpkg.com/katex@0/dist/katex.min.js"
        }
    },
    prismjs: {
        jsdelivr: {
            css: "",
            js: "https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js"
        },
        cdnjs: {
            css: "",
            js: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"
        },
        unpkg: {
            css: "",
            js: "https://unpkg.com/prismjs@1/prism.min.js"
        }
    }
};

function cdnProvider() {
    return (typeof config !== 'undefined' && config.cdnProvider) || 'jsdelivr';
}

function cdnURL(name, type) {
    var lib = cdnLibs[name];
    if (!lib) return '';
    var provider = cdnProvider();
    var entry = lib[provider];
    if (entry === undefined || entry === '' || entry === null) {
        entry = lib['jsdelivr']; // fallback to jsdelivr
    }
    if (!entry) return '';
    if (typeof entry === 'string') return entry;
    var result = entry[type] || '';
    // Fallback to jsdelivr if the selected provider has empty value
    if (!result && provider !== 'jsdelivr' && lib['jsdelivr']) {
        var fb = lib['jsdelivr'];
        if (typeof fb === 'string') return fb;
        result = fb[type] || '';
    }
    return result;
}

// Output CSS <link> tags for frontend
function cdnCSS() {
    var list = ['bootstrap', 'editormd-preview', 'waline'];
    for (var i = 0; i < list.length; i++) {
        var url = cdnURL(list[i], 'css');
        if (url) document.write('<link href="' + url + '" rel="stylesheet">');
    }
}

// Output JS <script> tags for frontend (in correct load order)
function cdnJS() {
    var list = [
        'jquery', 'bootstrap', 'imagesloaded', 'masonry',
        'marked', 'prettify', 'raphael', 'underscore',
        'sequence-diagram', 'flowchart', 'jquery-flowchart',
        'editormd', 'waline'
    ];
    for (var i = 0; i < list.length; i++) {
        var url = cdnURL(list[i], 'js');
        if (url) document.write('<script src="' + url + '"><\/script>');
    }
}

// Output IE8 conditional scripts
function cdnIE8() {
    var url1 = cdnURL('html5shiv', 'js');
    var url2 = cdnURL('respond', 'js');
    if (url1) document.write('<script src="' + url1 + '"><\/script>');
    if (url2) document.write('<script src="' + url2 + '"><\/script>');
}
