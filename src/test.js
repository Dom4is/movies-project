const n = 3;
const m = 3;

function solve(matrix) {
  const path = [];
  const steps = {
    D: [1, 0],
    R: [0, 1],
  };

  const dp = Array.from({ length: n }, () => new Array(m).fill(0));
  console.log(dp);
  dp[0][0] = matrix[0][0];

  for (let j = 1; j < m; j++) {
    dp[0][j] = dp[0][j - 1] + matrix[0][j]; // строка 0
  }

  for (let i = 1; i < n; i++) {
    dp[i][0] = dp[i - 1][0] + matrix[i][0]; // столбец 0
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      dp[i][j] = matrix[i][j] + Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  const maxSum = dp[n - 1][m - 1];

  console.log(dp);
  console.log(maxSum);
}

solve([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);
