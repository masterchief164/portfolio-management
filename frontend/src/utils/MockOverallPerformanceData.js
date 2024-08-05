const baseValue = 10000; // Starting point
const fluctuationRange = 5000; // Random fluctuation amount

export const generateData = () => {
    const data = [];
    const labels = [
        "Jun 2021",
        "Dec 2021",
        "Jun 2022",
        "Dec 2022",
        "Jun 2023",
        "Dec 2023",
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
    ];
    let currentValue = baseValue;
    for (let i = 0; i < labels.length; i++) {
        const fluctuation =
            Math.random() * fluctuationRange - fluctuationRange / 2;
        currentValue += fluctuation + 5000; // Ensure overall increase
        data.push(currentValue);
    }

    return {
        labels,
        datasets: [
            {
                data,
                fill: false,
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0.1,
            },
        ],
    };
};
