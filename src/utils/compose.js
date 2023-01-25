export const compose =
  (...fns) =>
  (inputParams) =>
    fns.reduce((acc, fn) => {
      const result = fn(inputParams, acc);
      return { ...acc, ...result };
    }, {});
