var HTTPClient = /** @class */ (function () {
    function HTTPClient() {
    }
    HTTPClient.get = function (url, opts) {
        return HTTPClient.request("get", url, opts);
    };
    HTTPClient.post = function (url, opts) {
        return HTTPClient.request("post", url, opts);
    };
    HTTPClient.delete = function (url, opts) {
        return HTTPClient.request("delete", url, opts);
    };
    HTTPClient.json = function (resp) {
        var json = JSON.parse(resp.responseText);
        return json;
    };
    HTTPClient.request = function (method, url, opts) {
        return new Promise(function (resolve, reject) {
            var tID = window.setTimeout(function () {
                reject(new Error("Request timeout"));
            }, 15000);
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = opts ? opts.withCredentials || false : false;
            xhr.responseType = opts ? opts.responseType || "" : "";
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    window.clearTimeout(tID);
                    resolve(this);
                }
            });
            xhr.open(method, url);
            try {
                xhr.send(null);
            }
            catch (err) {
                reject(err);
            }
        });
    };
    return HTTPClient;
}());
export { HTTPClient };
//# sourceMappingURL=HTTPRequest.js.map