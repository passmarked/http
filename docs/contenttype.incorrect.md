It is recommend to disable sniffing for content-type. This is done with the `X-Content-Type-Options: nosniff` header, which is expected on your response.

The header was found but was not configured configured according to the recommendation of disabling content sniffing with  `nosniff`.

The recommended value we require is:

```
X-Content-Type-Options: nosniff
```

# How do I fix this ?

Simply configure the header according to the following recommendation.

Although you may set http headers in your application code it is often simpler to configure the web server to set it properly.

```
// nginx
add_header X-Content-Type-Options nosniff;

// apache
<IfModule mod_headers.c>
  Header set X-Content-Type-Options: nosniff
</IfModule>

```

Else the application code needs to be updated to output the header as such:

```
X-Content-Type-Options: nosniff
```

This will disable content sniffing on older browsers like IE6.

# Resources

* http://blog.fox-it.com/2012/05/08/mime-sniffing-feature-or-vulnerability/
* http://security.stackexchange.com/questions/12896/does-x-content-type-options-really-prevent-content-sniffing-attacks
