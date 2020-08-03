function algorithmGameOfLife(currentState) {
  let newState = [];
  for (let i = 0; i < currentState.length; i++) {
    newState[i] = new Array(currentState[i].length);
    for (let j = 0; j < currentState[i].length; j++) {
      let state = currentState[i][j];
      let sum = sumNeighbors(currentState, i, j);

      if (state === 0 && sum === 3) newState[i][j] = 1;
      else if (state === 1 && (sum < 2 || sum > 3)) newState[i][j] = 0;
      else newState[i][j] = state;
    }
  }
  return newState;
}

function sumNeighbors(currentState, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let row = (x + i + currentState.length) % currentState.length;
      let col = (y + j + currentState[x].length) % currentState[x].length;
      sum += currentState[row][col];
    }
  }
  sum -= currentState[x][y];
  return sum;
}

export default algorithmGameOfLife;
