export function request(url: RequestInfo, init?: RequestInit | undefined) {
  let initTmp = init;
  if (initTmp) {
    initTmp.headers = {
      "Content-Type": "application/json",
      ...init?.headers,
    };
  }
  return fetch(url, init).then((res) => res.json());
}
