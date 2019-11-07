export declare abstract class HTTPClient {
    static get(url: string, opts?: HTTPClient.Opts): Promise<XMLHttpRequest>;
    static post(url: string, data: FormData, opts?: HTTPClient.Opts): Promise<XMLHttpRequest>;
    static delete(url: string, data: FormData, opts?: HTTPClient.Opts): Promise<XMLHttpRequest>;
    static json<T = any>(resp: XMLHttpRequest): T;
    private static request;
}
export declare namespace HTTPClient {
    interface Opts {
        withCredentials?: boolean;
        responseType?: XMLHttpRequestResponseType;
    }
}
