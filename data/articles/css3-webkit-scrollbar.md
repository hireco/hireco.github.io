### 浏览器滚动条的控制的问题

浏览器的滚动条会带来一些问题，首先是占据页面有限的空间，当然这个在大屏幕下其实无所谓。更重要的是，容易造成页面抖动，当从一个没有滚动条的页面转到有滚动条的页面时，会发现本来位置相同的元素（例如网站的logo)发生小幅移动，造成一种不好的体验。

对于非webkit浏览器，如下设置可以避免一些问题：
```css
body {
overflow-y: scroll; 
}
```

但最近，本人发现一个更严重的问题。具体是，我根据bootstrap的图片的img-responsive类，加上100%的设置其宽度，代码如下：

```html
<div class="container-fluid" id="body">
  <div class="row">
	 <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
	   <div class="sidePanel"></div>
	 </div>
	 <div class="col-lg-9 col-md-9 col-sm-8 col-xs-12">
	   <div class="mainPanel center-block">
		  <img style="width:100%" src="..." class="img-responsive">
	   </div>
	 </div>
  </div>
</div>
```
结果发现，当窗口的大小在某个临界宽度时，页面一直在自动的抖动。原因是，图片按照100%宽度显示，此时其自动高度会导致页面刚好出现滚动条，但是滚动条一出现之后，图片的自动高度又减小了，宽度也减小，故页面的滚动条又消失，图片又重新获得原来的高度和宽度，此时滚动条又出现了，如此反复。

最后发现，唯一的的出路是，去掉这个讨厌的滚动条，当然这里我指的是竖直的滚动条，水平滚动条根本从来就不需要，正确使用bootstrap能保证水平滚动条不出现。

网上很多人给出了一些方法，但是都导致页面失去了滚动的效果，我当然希望页面仍然能够滚动，经过查询，终于找到了方法，针对webkit的浏览器，可以根据::-webkit-scrollbar来进行设置，先来了解一下。

#### 属性列表

 ::-webkit-scrollbar	滚动条整体部分
 ::-webkit-scrollbar-thumb	     滚动条里面的小方块，能上下左右移动（取决于是垂直滚动条还是水平滚动条）
 ::-webkit-scrollbar-track	滚动条的轨道（里面装有thumb）
 ::-webkit-scrollbar-button	滚动条轨道两端的按钮，允许通过点击微调小方块的位置
 ::-webkit-scrollbar-track-piece	内层轨道，滚动条中间部分（除去）
 ::-webkit-scrollbar-corner	边角，及两个滚动条的交汇处
 ::-webkit-resizer	两个滚动条的交汇处上用于通过拖动调整元素大小的小控件
 
#### 实例代码
 
```css
 /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
.scrollbar::-webkit-scrollbar{
    width: 16px;
    height: 16px;
    background-color: #f5f5f5;
}
/*定义滚动条的轨道，内阴影及圆角*/
.scrollbar::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    border-radius: 10px;
    background-color: #f5f5f5;
}
/*定义滑块，内阴影及圆角*/
.scrollbar::-webkit-scrollbar-thumb{
    /*width: 10px;*/
    height: 20px;
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
}
```

据此，我将页面的body加上如下css代码，终于解决了这个问题。
```css
body {
  /*some other setting*/
  overflow-y: scroll;  
  /*For none webkit browser, avoid shaking caused by repeated occurrence and disappearance of scroll bar when picture width is set to 100%*/
}
body::-webkit-scrollbar{
  display: none;
  /*For webkit browser, hide the scrollbar,but scrolling still effects*/
}
```

#### 参考资料链接地址
[M甲壳虫M](https://www.cnblogs.com/yimuzanghua/p/8482310.html)