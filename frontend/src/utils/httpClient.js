import axios from "axios";

const baseUrl = `${import.meta.env.VITE_BASE_URL}`;

export const getKlinesPerDay = async (from, company = "AAPL") => {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://financialmodelingprep.com/api/v3/historical-price-full/${company}?from=${from}&apikey=${
            import.meta.env.VITE_FIN_MOD_API_KEY
        }`,
        headers: {},
    };

    try {
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
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getStockInfo = async (stock = "AAPL") => {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://financialmodelingprep.com/api/v3/quote-order/${stock}?apikey=${
            import.meta.env.VITE_FIN_MOD_API_KEY
        }`,
        headers: {},
    };
    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getUserAssets = async (userId) => {
    try {
        const response = await axios.get(`${baseUrl}/balance/user/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getPmAssets = async (pmId) => {
    try {
        const response = await axios.get(`${baseUrl}/balance/pm/${pmId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getAssets = async () => {
    try {
        const response = await axios.get(`${baseUrl}/assets`);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getPmTransactions = async (pmId) => {
    try {
        const response = await axios.get(`${baseUrl}/transactions/pm/${pmId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getUserWatchlist = async (userId) => {
    try {
        const response = await axios.get(`${baseUrl}/watchlist/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const addTxn = async (
    pm_id,
    user_id,
    asset_symbol,
    quantity,
    price_per_unit,
    tx_type
) => {
    try {
        await axios.post(`${baseUrl}/transactions`, [
            {
                pm_id,
                user_id,
                asset_symbol,
                quantity,
                price_per_unit,
                tx_type,
            },
        ]);
    } catch (error) {
        console.log(error);
    }
};
