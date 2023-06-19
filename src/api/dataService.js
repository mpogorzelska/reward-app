const transactionData = [
    { id: 1, customer: "Jenifer Lopez", amount: 120, date: "2023-06-01" },
    { id: 2, customer: "Ben Afleck", amount: 80, date: "2023-06-02" },
    { id: 3, customer: "Matt Damon", amount: 55, date: "2023-06-02" },
    { id: 1, customer: "Jenifer Lopez", amount: 10, date: "2023-06-01" },
    { id: 2, customer: "Ben Afleck", amount: 230, date: "2023-06-02" },
    { id: 3, customer: "Matt Damon", amount: 73, date: "2023-06-02" },
    { id: 1, customer: "Jenifer Lopez", amount: 15, date: "2023-06-01" },
    { id: 2, customer: "Ben Afleck", amount: 110, date: "2023-06-02" },
    { id: 3, customer: "Matt Damon", amount: 67, date: "2023-06-02" },
];

export const fetchTransactionData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transactionData);
    }, 1000);
  });
};
