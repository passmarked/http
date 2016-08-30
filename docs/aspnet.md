When using ASP.net the framework injects the current version that is running as a header in your response. This gives clients quite a overview of what version of ASP.NET the server might be running, which allows malicious users to quite easily search for security vulnerabilities affecting the serving version of ASP.NET.

It is recommended to disable this header to prevent any leaking of potential information that could aid a attacker.

# How do I fix this ?

In your your `web.config` file on the root of your app add the following:

```
<system.web>
<httpRuntime enableVersionHeader="false" />
</system.web>
```

To disable the versioning from ASP.NET MVC, add to the following to `Global.asax`:

```
MvcHandler.DisableMvcResponseHeader = true;
```

# Resources

* [How to remove ASP.Net MVC Default HTTP Headers?](http://stackoverflow.com/questions/3418557/how-to-remove-asp-net-mvc-default-http-headers)
* [Shhh… don’t let your response headers talk too loudly](http://www.troyhunt.com/2012/02/shhh-dont-let-your-response-headers.html)
