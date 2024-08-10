import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;
export const add_user = async (user) => {
    await axios.post(`${BASE_URL}/users`, [
        {
            fname: user.firstName,
            lname: user.lastName,
            age: user.age,
            ispm: false,
        },
    ]);
};

export const get_users = async () => {
    const users = await axios.get(`${BASE_URL}/users`);
    return users.data;
};

export const get_user_val = async (user_id) => {
    const res = await axios.get(`${BASE_URL}/valuation/user/${user_id}`);
    return res.data;
};

export const get_pm_val = async (pm_id) => {
    console.log(`${BASE_URL}/valuation/pm/${pm_id}`);
    const res = await axios.get(`${BASE_URL}/valuation/pm/${pm_id}`);
    return res.data;
};

export const get_user_invest = async (user_id) => {
    const res = await axios.get(`${BASE_URL}/investment/user/${user_id}`);
    return res.data;
};

export const get_pm_invest = async (pm_id) => {
    // console.log(`${BASE_URL}/investment/pm/${pm_id}`);
    const res = await axios.get(`${BASE_URL}/investment/pm/${pm_id}`);
    return res.data;
};
