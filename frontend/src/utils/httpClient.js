import axios from "axios";

const baseUrl = `${import.meta.env.VITE_BASE_URL}`;

export const getKlinesPerDay = async (from, company = "") => {
    if (company === "") company = "AAPL";
    console.log(
        `https://financialmodelingprep.com/api/v3/historical-price-full/${company}?from=${from}&apikey=${
            import.meta.env.VITE_FIN_MOD_API_KEY
        }`
    );

    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://financialmodelingprep.com/api/v3/historical-price-full/${company}?from=${from}&apikey=${
            import.meta.env.VITE_FIN_MOD_API_KEY
        }`,
        headers: {},
    };

    const response = await axios.request(config);
    let data = response.data.historical;

    data = data.map((item) => {
        return {
            date: item.date,
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.close,
            volume: item.volume,
        };
    });

    return data.sort((x, y) =>
        new Date(x.date).valueOf() < new Date(y.date).valueOf() ? -1 : 1
    );
};

export const getStockInfo = async (stock = "") => {
    if (stock === "") stock = "AAPL";
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://financialmodelingprep.com/api/v3/quote-order/${stock}?apikey=${
            import.meta.env.VITE_FIN_MOD_API_KEY
        }`,
        headers: {},
    };

    const response = await axios.request(config);
    return response.data;
};

export const getUserAssets = async (userId) => {
  const response = await axios.get(`${baseUrl}/balance/user/${userId}`);
    return response.data;
};

export const getPmAssets = async (pmId) => {
    const response = await axios.get(`${baseUrl}/balance/pm/${pmId}`);
    return response.data;
};
