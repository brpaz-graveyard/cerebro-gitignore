# Cerebro-gitignore

> Cerebro plugin for fetching .gitignore config from [Github](https://developer.github.com/v3/gitignore/).

![](demo.gif)

## Requirements

* Dnsdock should be installed and running on our system. See the respective project [README](https://github.com/aacebedo/dnsdock) for instructions.
* For now this plugin expects the dnsdock to respond to ".docker" tld. This will be configurable in the future.

## Usage

Just type ```gitignore``` in the cerebro box.

A list of available gitignore files will be presented. Selecting an item, will fetch and copy the respective .gitignore to the clipboard.

## Related

* [Cerebro](http://github.com/KELiON/cerebro) – Plugin extracted from core Cerebro app;
* [cerebro-plugin](http://github.com/KELiON/create-cerebro-plugin) – boilerplate to create Cerebro plugins;
* [gitignore](https://developer.github.com/v3/gitignore/)

## License

MIT © [Bruno Paz](http://brunopaz.net)