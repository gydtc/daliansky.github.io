---
title: 出现nginx 405 Not Allowed错误的解决方法
tags:
  - '405'
  - error
  - nginx
categories:
  - linux
  - 网络相关
date: 2015-03-04 17:18:17
---

调试网站程序的时候，出现nginx 405 Not Allowed的错误信息，出现405错误的原因是nginx不允许post静态页。修改方法：

```sh
nano nginx.conf
```

添加以下内容：

```
server {
        listen       80;
        server_name  localhost;
        location / {
            root   html;
            index  index.html index.htm;
        }
        error_page  404     /404.html;
        error_page  403     /403.html;
        # To allow POST on static pages 允许静态页使用POST方法
        error_page  405     =200 $uri;
        }
```


