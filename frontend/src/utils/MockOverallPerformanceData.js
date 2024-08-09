export const generateData = () => {
    const labels = [];
    const data = [];
    const currentDate = new Date();
    const numberOfYears = 5; // Data for the past 5 years

    for (let i = 0; i <= numberOfYears; i++) {
        const year = currentDate.getFullYear() - i;
        labels.push(year.toString());
        // Simulate some performance values with a reasonable range
        data.push(Math.floor(Math.random() * 30000) + 50000); // Random values between 50,000 and 80,000
    }

    return {
        labels: labels.reverse(),
        datasets: [
            {
                label: "Portfolio Performance",
                data: data.reverse(),
                borderColor: "#42A5F5",
                backgroundColor: "rgba(66, 165, 245, 0.4)",
                borderWidth: 2,
                pointRadius: 0,
                fill: true,
            },
        ],
    };
};
