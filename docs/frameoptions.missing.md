Clickjacking attacks happen when your site is loaded within an IFrame and the attacker has control over your input by layering over it.
This HTTP header configures whether your site may be loaded in an IFrame or not.

The recommended value:

```
X-Frame-Options: SAMEORIGIN

// or

X-Frame-Options: DENY

// or

X-Frame-Options: ALLOW-FROM http://passmarked.com

```
`SAMEORIGIN` instructs that you may frame your own site while `DENY` says that it may not be framed at all. 
You may allow specific sites to frame you by using `ALLOW-FROM`.

# How do I fix this ?

Although you may set http headers in your application code it is often simpler to configure the web server to set it properly.

```
// nginx
add_header X-Frame-Options SAMEORIGIN;

// apache
<IfModule mod_headers.c>
  Header set X-Frame-Options: SAMEORIGIN;
</IfModule>

```

# Resources

* https://www.owasp.org/index.php/Clickjacking_Defense_Cheat_Sheet
* https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options
