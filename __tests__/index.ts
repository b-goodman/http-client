import {HTTPClient} from "../src"

type CurrencyConversion = {
    rates: {[currency: string]: number};
    base: string;
    date: string;
}

const endpointUrl = "https://api.exchangeratesapi.io/latest?symbols=USD,GBP";

// const data = await HTTPClient.json<CurrencyConversion>(req);

it("Performs GET requests", async () => {
    const req = await HTTPClient.get(endpointUrl);
    expect(req).toBeDefined();
});

it("Parses JSON data", async () => {
    const req = await HTTPClient.get(endpointUrl);
    const data = HTTPClient.json<CurrencyConversion>(req);
    expect(data).toBeDefined();
});

