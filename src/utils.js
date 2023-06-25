export const calculateRewardPoints = (amount) => {
  let points = 0;

  if (amount > 100) {
    points = (amount - 100) * 2;
  }

  if (amount > 50) {
    points = points + (amount - 50);
  }

  return points;
};


  export const calculateTotalRewardPoints = (data) => {
    return data.reduce(
      (total, row) => total + calculateRewardPoints(row.values.amount),
      0
    );
  };