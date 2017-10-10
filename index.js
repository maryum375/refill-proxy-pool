/**
 * Created by Ran on 22-Sep-15.
 */
var xroxy = require("xroxy-proxy-scraper");
var hma = require("hma-proxy-scraper");
var jsProxyPool = require("proxy-pool");
var config = require('./config');

var proxypoolDb = new jsProxyPool.MongoAccess(config.dbConnectionString, config.proxiesCollectionName);
var proxyPoolConfiguration = new jsProxyPool.ProxyPoolConfiguration(proxypoolDb, 0);
var proxyPool = new jsProxyPool.ProxyPool(proxyPoolConfiguration);

var proxyAddedCallback = function(error, proxy) {
    if (error) {
        console.log(error);
        return;
    }
    var currentTime = new Date().toISOString();
    console.log(currentTime + " - " + proxy + ' added successfully');
};

var scrapeCallback = function(error, proxies) {
    if (error) {
        console.log(error);
        return;
    }
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
    xroxy.getProxies(scrapeCallback, 100);
    setTimeout(startScrapingXroxy, 1000 * 60 * 60);
};

var startScrapingFplNet = function() {
    fplNet.getProxies(scrapeCallback);
    setTimeout(startScrapingXroxy, 1000 * 60 * 5);
};

//startScrapingHma();
startScrapingXroxy();
startScrapingFplNet()