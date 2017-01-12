By displaying the version of your web server, and even the name, you are creating an opportunity for malicious intruders to attack your web application and/or server. Removing any sensitive information of this kind from HTTP headers will make it far more difficult for an attacker to determine whether your server is vulnerable to an attack. It ought to be noted that this is not a guaranteed way of stopping hacking attempts, but it will make it harder for people to deliver an attack.

```
HTTP/1.1 200 OK
Server: nginx/1.4.6 (Ubuntu)
Date: Tue, 01 Dec 2015 09:57:42 GMT
Content-Type: text/html
Content-Length: 12
Last-Modified: Wed, 25 Nov 2015 16:00:16 GMT
```

# How do I fix this ?

* nginx: specify `server_tokens off;` in either a global configuration, server configuration or location configuration.
* Apache: specify `ServerTokens Prod` in your top-most `.htaccess` configuration file.

# Resources

* [nginx HTTP Core Module](http://devdocs.io/nginx/http/ngx_http_core_module#server_tokens)
* [Apache Core](http://devdocs.io/apache_http_server/mod/core#servertokens)
