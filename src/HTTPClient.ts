
export abstract class HTTPClient {

    public static get(url: string, opts?: HTTPClient.Opts){
        return HTTPClient.request("get", url, opts)
    }

    public static post(url: string, opts?: HTTPClient.Opts){
        return HTTPClient.request("post", url, opts)
    }

    public static delete(url: string, opts?: HTTPClient.Opts){
        return HTTPClient.request("delete", url, opts)
    }

    public static json<T = any>(resp: XMLHttpRequest) {
        const json:T = JSON.parse(resp.responseText);
        return json;
    }

    private static request(method: "get"|"post"|"delete", url: string, opts?: HTTPClient.Opts ) {

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

            try{
                xhr.send(null);
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
    }

}
