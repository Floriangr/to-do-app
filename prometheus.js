
var Register = require('prom-client').register;
var Counter = require('prom-client').Counter;
var Histogram = require('prom-client').Histogram;
var Summary = require('prom-client').Summary;
var ResponseTime = require('response-time');

/**
 * A Prometheus counter that counts the invocations of the different HTTP verbs
 * e.g. a GET and a POST call will be counted as 2 different calls
 */
const numOfRequests = new Counter({
    name: 'numOfRequests',
    help: 'Number of requests made',
    labelNames: ['method']
});

/**
 * A Prometheus counter that counts the invocations with different paths
 * e.g. /foo and /bar will be counted as 2 different paths
 */
const pathsTaken = new Counter({
    name: 'pathsTaken',
    help: 'Paths taken in the app',
    labelNames: ['path']
});

/**
 * A Prometheus summary to record the HTTP method, path, response code and response time
 */
const responses = new Summary({
    name: 'responses',
    help: 'Response time in millis',
    labelNames: ['method', 'path', 'status']
});

const responsesHist = new Histogram({
  name: 'responsesHist',
  help: 'Response time in millis',
  labelNames: ['method', 'path', 'status']
})
/**
 * This funtion will start the collection of metrics and should be called from within in the main js file
 */
const startCollection = function () {
    require('prom-client').collectDefaultMetrics();
};

/**
 * This function increments the counters that are executed on the request side of an invocation
 * Currently it increments the counters for numOfPaths and pathsTaken
 */
const requestCounters = function (req, res, next) {
    if (req.path != '/metrics') {
        numOfRequests.inc({ method: req.method });
        pathsTaken.inc({ path: req.path });
    }
    next();
}

/**
 * This function increments the counters that are executed on the response side of an invocation
 * Currently it updates the responses summary
 */
const responseCounters = ResponseTime(function (req, res, time) {
    if(req.url != '/metrics') {
        responsesHist.labels(req.method, req.url, res.statusCode).observe(time);
    }
})

const responseCountersHist = ResponseTime(function (req, res, time) {
  if (req.url != '/metrics') {
    response.labels(req.method, req.url, res.statusCode).observe(time);
  }
})

/**
 * In order to have Prometheus get the data from this app a specific URL is registered
 */
const injectMetricsRoute = function (App) {
    App.get('/metrics', (req, res) => {
        res.set('Content-Type', Register.contentType);
        res.end(Register.metrics());
    });
};

module.exports = {
  injectMetricsRoute,
  responseCountersHist,
  responseCounters,
  requestCounters,
  startCollection,
  responses,
  pathsTaken,
  numOfRequests
}
