var curPath = window.location.pathname.split('/');
var curPage = curPath.pop();

if(curPage!='index.html' && curPage) {
  curPath.pop(); // 移除 'pages' 目录，回到根级
  let toPage = curPath.join('/');
  
  toPage = toPage?toPage:'index.html';
  
  window.location.replace(toPage);
  
  setTimeout(function(){
     document.write('<p>Access Denied</p><a href="'+ toPage+'">Click here to redirect</a>');
  },1000);
}