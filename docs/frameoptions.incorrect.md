Clickjacking attacks happen when your site is loaded within an IFrame and the attacker has control over your input by layering over it.

This HTTP header configures whether your site may be loaded in an IFrame or not.

To secure your website `X-Frame-Options` should be configured as one of the following scopes:

* `SAMEORIGIN` - instructs browsers that you only url's on the same domain maybe frame the page
* `DENY` - denies all requests to frame your page.
* `ALLOW-FROM http://example.com` - instructs browsers that only example.com may frame your page.

# How do I fix this ?

First decide on what scope makes sense for your page / website.

After which continue to update the responses to include the `X-Frame-Options` header.

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
