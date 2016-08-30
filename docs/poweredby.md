Several server side technologies send the X-Powered-By header. This gives clients quite a overview of what  the server might be running, which allows malicious users to quite easily search for security vulnerabilities affecting the versions specified.

It is recommended to disable this header to prevent any leaking of potential information that could aid an attacker.

# How do I fix this ?

For PHP, in your `PHP.ini` file:

```
expose_php = off
```

For IIS, by including these lines to the `<system.webServer>` element:

```
<httpProtocol>
    <customHeaders>
        <remove name="X-Powered-By" />
    </customHeaders>
</httpProtocol>
```

For ExpressJS:

```
app.disable('x-powered-by');
```

# Resources

* [Removing X-Powered-By ASP.Net and other version headers](https://ict.ken.be/removing-x-powered-by-aspnet-and-other-version-headers)
* [Removing X-Powered-By](http://stackoverflow.com/questions/2661799/removing-x-powered-by)
* [How to delete IIS custom headers like X-Powered-By](http://stackoverflow.com/questions/4078756/how-to-delete-iis-custom-headers-like-x-powered-by-asp-net-from-response)
* [Remove headers from ExpressJS](http://stackoverflow.com/questions/5867199/cant-get-rid-of-header-x-powered-byexpress/12484642#12484642)
