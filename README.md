# HTTPClient

An async HTTP Client implementing `Window.XMLHttpRequest`.
Intended to imitate the `Window.fetch` API but still offering full backards compatability with legacy browsers.

## Installation

```bash
npm install @bgoodman/http-client

yarn add @bgoodman/http-client
```

## Usage

```typescript
import {HTTPClient} from "http-client"

interface CurrencyConversion {
    rates: {[currency: string]: number};
    base: string;
    date: string;
}

const endpointUrl = "https://api.exchangeratesapi.io/latest?symbols=USD,GBP";

const req = await HTTPClient.get(endpointUrl);
const data = HTTPClient.json<CurrencyConversion>(req);

console.log(data)
//{"rates":{"USD":1.1158,"GBP":0.86368},"base":"EUR","date":"2019-11-04"
```

### API

#### `get`

Perform a HTTP `get` request.

```typescript
HTTPClient.get(url: string, opts?: HTTPClient.Opts): Promise<XMLHttpRequest>
```

#### `json`

Conveniently parse the response from an earlier request expected to resolve to JSON data.

```typescript
HTTPClient.json<T = any>(req: XMLHttpRequest): T;
```

#### `post`

Perform a HTTP `post` request.

```typescript
HTTPClient.post(url: string, data: FormData, opts?: HTTPClient.Opts): Promise<XMLHttpRequest>
```

#### `delete`

Perform a HTTP `delete` request.

```typescript
HTTPClient.delete(url: string, data: FormData, opts?: HTTPClient.Opts): Promise<XMLHttpRequest>
```

---

#### Options

```typescript
withCredentials?: boolean;
responseType?: XMLHttpRequestResponseType;
```
