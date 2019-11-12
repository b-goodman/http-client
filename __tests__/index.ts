import {HTTPClient} from "../src"

type CurrencyConversion = {
    rates: {[currency: string]: number};
    base: string;
    date: string;
}

const endpointUrl = "https://api.exchangeratesapi.io/latest?symbols=USD,GBP";

// const data = await HTTPClient.json<CurrencyConversion>(req);

it("Performs GET requests", async () => {
    HTTPClient.get(endpointUrl).then( (req) => {
        expect(req).toBeDefined();
    })
});

it("Parses JSON data", async () => {
    HTTPClient.get(endpointUrl).then( (req) => {
        const data = HTTPClient.json<CurrencyConversion>(req);
        expect(data).toBeDefined();
    })
});


// it("Timeouts after user definition", async () => {
//     HTTPClient.get(endpointUrl, {timeout: 1}).then( (req) => {
//         expect(req).toBeDefined();
//     })
// });

