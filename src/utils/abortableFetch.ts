export const abortableFetch = function(url: string) {
  const controller = new AbortController();
  const signal = controller.signal;
  return {
    ready: fetch( url, {signal}),
    abort: () => controller.abort()
  };
};