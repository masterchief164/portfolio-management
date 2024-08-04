export function calculateDateRange(period) {
    let fromDate = new Date();
    let toDate = new Date();

    const amount = parseInt(period.slice(0, -1));
    const unit = period.slice(-1);

    switch (unit) {
        case "D":
            fromDate.setDate(toDate.getDate() - amount);
            break;
        case "W":
            fromDate.setDate(toDate.getDate() - amount * 7);
            break;
        case "M":
            fromDate.setMonth(toDate.getMonth() - amount);
            break;
        case "Y":
            fromDate.setFullYear(toDate.getFullYear() - amount);
            break;
        default:
            throw new Error("Unsupported period unit");
    }

    const formatDate = (date) => date.toISOString().split("T")[0];

    return {
        fromDate: formatDate(fromDate).toString(),
        toDate: formatDate(toDate).toString(),
    };
}

// Example usage:
// const period = "5Y";
// const { fromDate, toDate } = calculateDateRange(period);

// console.log("From:", fromDate); // Outputs: From: "2024-08-03"
// console.log("To:", toDate); // Outputs: To: "2024-08-10"
