Some browsers have an anti-XSS filter which protects against certain classes of cross-site scripting attacks.
This HTTP header configures the built in protection. Having incorrect values can render this header useless.
The recommended value:

```
X-XSS-Protection: 1; mode=block
```
`1` turns it on and `mode=block` ensures that the browser drops the request instead of trying to sanitize it.

# How do I fix this ?

You can set the raw header:

```
X-XSS-Protection: 1; mode=block
```

It's often simpler to configure the server:

```
// nginx
add_header X-XSS-Protection "1; mode=block";

// apache
<IfModule mod_headers.c>
  Header set X-XSS-Protection: "1; mode=block"
</IfModule>
```

# Resources

* [Guidelines for Setting Security Headers](https://www.veracode.com/blog/2014/03/guidelines-for-setting-security-headers)
* [Security HTTP Headers](http://zinoui.com/blog/security-http-headers#x-xss-protection)
* [List of useful HTTP headers](https://www.owasp.org/index.php/List_of_useful_HTTP_headers)
