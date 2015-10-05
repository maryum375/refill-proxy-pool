# Refill-Proxy-Pool

Simple NodeJS code that uses [HMA-Proxy-Scraper](https://github.com/sdrobs/HMA-Proxy-Scraper) and  [Xroxy-Proxy-Scraper](https://github.com/maryum375/xroxy-proxy-scraper) to scrape free proxies and insert them to the [JSProxyPool](https://github.com/maryum375/JSProxyPool) db.

To start scraping for proxies simpley create a ```config.js``` file in the same folder as the ```index.js``` with this code:
```js
var config = {};

config.dbConnectionString = "YOUR_MONGODB_CONNECTION_STRING";
config.proxiesCollectionName = "NAME_OF_THE_MONGO_COLLECTION";

module.exports = config;
```


>Don't forget to replace ***YOUR_MONGODB_CONNECTION_STRING*** and ***NAME_OF_THE_MONGO_COLLECTION*** with your actual values.

And then run the code in ```index.js```

## License


MIT

**Feel free to fork and contribute :)**
