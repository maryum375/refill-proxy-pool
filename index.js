/**
 * Created by Ran on 22-Sep-15.
 */
var xroxy = require("xroxy-proxy-scraper");
var hma = require("hma-proxy-scraper");
var fplNet = require("fplnet-proxy-scraper");
var jsProxyPool = require("proxy-pool");
var config = require('./config');

var proxypoolDb = new jsProxyPool.MongoAccess(config.dbConnectionString, config.proxiesCollectionName);
var proxyPoolConfiguration = new jsProxyPool.ProxyPoolConfiguration(proxypoolDb, 0);
var proxyPool = new jsProxyPool.ProxyPool(proxyPoolConfiguration);

var writeLog = function(message) {
    var currentTime = new Date().toISOString();
    console.log(currentTime + message);
}

var proxyAddedCallback = function(error, proxy) {
    if (error) {
        console.log(error);
        return;
    }
};

var scrapeCallback = function(error, proxies) {
    if (error) {
        console.log(error);
        return;
    }
    writeLog(" - adding " + Object.keys(proxies).length + " proxies");
    for (var proxy in proxies) {
        if (proxies.hasOwnProperty(proxy)) {
            proxyPool.addProxy(new jsProxyPool.Proxy(proxy, proxies[proxy]), proxyAddedCallback);
        }
    }
};

var startScrapingHma = function() {
    hma.getProxies(scrapeCallback);
    setTimeout(startScrapingHma, 1000 * 60 * 10);
};

var startScrapingXroxy = function() {
    writeLog(" - scraping Xroxy!");
    xroxy.getProxies(scrapeCallback, 100);
    setTimeout(startScrapingXroxy, 1000 * 60 * 60);
};

var startScrapingFplNet = function() {
    writeLog(" - scraping free-proxy-list.net!");
    fplNet.getProxies(scrapeCallback);
    setTimeout(startScrapingFplNet, 1000 * 60 * 10);
};

//startScrapingHma();
startScrapingXroxy();
startScrapingFplNet()