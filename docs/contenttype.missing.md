When your server serves a file, the browser uses the content-type as specified by your server. Certain (legacy) servers have problems serving the correct MIME type which resulted in Microsoft adding a feature which tries to "sniff" the content-type ([en.wikipedia.org/wiki/Content_sniffing](https://en.wikipedia.org/wiki/Content_sniffing)). This is done by looking at the first 256 bytes of a file.

This introduced an attack vector which could allow an attacker to upload an image file (for example) containing HTML which the browser will execute.

This HTTP header forces the browser to use the declared content-type and stops the browser from MIME sniffing.

The recommended value:

```
X-Content-Type-Options: nosniff
```

<!-- The following heading is enforced by the interpreter -->
# How do I fix this ?

Although you may set http headers in your application code it is often simpler to configure the web server to set it properly.

```
// nginx
add_header X-Content-Type-Options nosniff;

// apache
<IfModule mod_headers.c>
  Header set X-Content-Type-Options: nosniff
</IfModule>

```

# Resources

* http://blog.fox-it.com/2012/05/08/mime-sniffing-feature-or-vulnerability/
* http://security.stackexchange.com/questions/12896/does-x-content-type-options-really-prevent-content-sniffing-attacks
