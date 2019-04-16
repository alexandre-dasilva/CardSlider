export const get = <TData>(
  endpoint: string,
  success?: (data: TData) => void,
  fail?: (error: string) => void
) => {
  fetch(endpoint, {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    mode: "cors"
  })
    .then(r => r.json())
    .then(r => success && success(r as TData))
    .catch(
      () =>
        fail &&
        fail(
          "There was an error retriving data from the server. Please try again later."
        )
    );
};
