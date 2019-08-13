export default function memoize(fn) {
  let memo = [];

  return (...args) => {
    const key = JSON.stringify(args);
    if (memo[key]) return memo[key];
    memo[key] = fn(...args);
    return memo[key];
  };
}
