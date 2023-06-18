export const wrapAsyncFunc = (asyncFunc: () => Promise<void>) => () => {
  void asyncFunc();
};
