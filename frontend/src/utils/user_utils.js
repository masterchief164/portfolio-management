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
