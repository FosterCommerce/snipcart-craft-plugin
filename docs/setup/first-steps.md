# Installation & Setup

This guide assumes you've established a Craft site and you're setting up a new store for the first time.

## Create a Snipcart Account

Head over to snipcart.com to [register an account](https://app.snipcart.com/register):

![Sign up!](../../resources/sign-up.png)

Note your API keys, which you'll find under _Account_ → _API Keys_ on the right side of the admin interface:

![Public and Private API Keys](../../resources/api-keys.png)

## Install the Plugin

**From the plugin store,** find Snipcart and choose _Install_. Done.

**From your local project,** add with:

```
composer require workingconcept/craft-snipcart
```

You can then install from the Craft CMS control panel: _Settings_ → _Plugins_, choose the gear dropdown to the right of _Snipcart_, and select _Install_.

Or install from the command line:

```
./craft install/plugin snipcart
```

## Configure the Plugin

Visit the plugin's Settings page and provide at least your public+secret API keys. If you're just getting started, you'll probably want to configure your products, orders, and webhooks.