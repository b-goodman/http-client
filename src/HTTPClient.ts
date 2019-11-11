enum HTTPMethod {
    GET = "get",
    POST = "post",
    DELETE = "delete",
}

export abstract class HTTPClient {

    public static get(url: string, opts?: HTTPClient.Opts){
        return HTTPClient.request(HTTPMethod.GET, url, null, opts)
    }

    public static post(url: string, data: FormData, opts?: HTTPClient.Opts){
        return HTTPClient.request(HTTPMethod.POST, url, data, opts)
    }

    public static delete(url: string, data: FormData, opts?: HTTPClient.Opts){
        return HTTPClient.request(HTTPMethod.DELETE, url, data, opts)
    }

    public static json<T = any>(resp: XMLHttpRequest) {
        const json:T = JSON.parse(resp.responseText);
        return json;
    }

    private static request(method: HTTPMethod, url: string, data: FormData | null, opts?: HTTPClient.Opts ) {

        return new Promise<XMLHttpRequest>( (resolve, reject) => {

            const tID = window.setTimeout( () => {
                reject( new Error("Request timeout") );
            }, 15000 );

            const xhr = new XMLHttpRequest();

            xhr.withCredentials = opts ? opts.withCredentials || false : false;
            xhr.responseType = opts ? opts.responseType || "" : "";

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    window.clearTimeout(tID);
                    resolve(this)
                }
            });

            xhr.open(method, url);

            if (opts && opts.requestHeaders) {
                opts.requestHeaders.forEach( (header, value) => {
                    xhr.setRequestHeader(header, value);
                });
            };

            try{
                xhr.send(data);
            } catch (err) {
                reject(err);
            }

        })
    }

}

export namespace HTTPClient {
    export interface Opts {
        withCredentials?: boolean;
        responseType?: XMLHttpRequestResponseType;
        requestHeaders?: Map<string, string>
    }

}
