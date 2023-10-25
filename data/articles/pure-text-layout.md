###文字段落的排版问题

纯文本内容被提交显示时，会由于编辑时随意的回车换行，看起来非常凌乱，一个常用的方法是，将所有的回车换行符\n\r都用p标签替换掉, 忽略所有单独存在的\n和\r，代码如下：

```php
$content=array_filter(explode("\n\r",$content),function($var){
	return trim($var);
});
$content=implode('</p><p>',$content);
```

```html
<div class="content">
  <p><?php echo $content;?></p>
</div>
```

```css
 .content {
   text-align: justify;
 }
```