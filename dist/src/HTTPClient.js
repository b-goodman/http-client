var HTTPMethod;
(function (HTTPMethod) {
    HTTPMethod["GET"] = "get";
    HTTPMethod["POST"] = "post";
    HTTPMethod["DELETE"] = "delete";
})(HTTPMethod || (HTTPMethod = {}));
var HTTPClient = /** @class */ (function () {
    function HTTPClient() {
    }
    HTTPClient.get = function (url, opts) {
        return HTTPClient.request(HTTPMethod.GET, url, null, opts);
    };
    HTTPClient.post = function (url, data, opts) {
        return HTTPClient.request(HTTPMethod.POST, url, data, opts);
    };
    HTTPClient.delete = function (url, data, opts) {
        return HTTPClient.request(HTTPMethod.DELETE, url, data, opts);
    };
    HTTPClient.json = function (resp) {
        var json = JSON.parse(resp.responseText);
        return json;
    };
    HTTPClient.request = function (method, url, data, opts) {
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
            if (opts && opts.requestHeaders) {
                opts.requestHeaders.forEach(function (header, value) {
                    xhr.setRequestHeader(header, value);
                });
            }
            ;
            try {
                xhr.send(data);
            }
            catch (err) {
                reject(err);
            }
        });
    };
    return HTTPClient;
}());
export { HTTPClient };
//# sourceMappingURL=HTTPClient.js.map