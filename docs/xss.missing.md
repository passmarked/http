Some browsers have and anti-XSS filter which protects against certain classes of cross-site scripting attacks. 
This HTTP header configures the built in protection.
The recommended value:

```
X-XSS-Protection: 1; mode=block
```
`1` turns it on and `mode=block` ensures that the browser drops the request instead of trying to sanitize it.

# How do I fix this ?

Although you may set http headers in your application code it is often simpler to configure the web server to set it properly.

```
// nginx
add_header X-XSS-Protection "1; mode=block";

// apache
<IfModule mod_headers.c>
  Header set X-XSS-Protection: "1; mode=block"
</IfModule>

```

# Resources

* https://www.quora.com/How-effective-is-x-xss-protection-response-header
