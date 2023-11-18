const BASE_URL = 'http://ec2-3-208-10-133.compute-1.amazonaws.com/cafe-guide';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

// returns a promise resolved after a given delay
function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
  authToken?: string,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': authToken ? `Bearer ${authToken}` : '',
    };
  }

  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any, authToken?: string) => request<T>(url, 'POST', data, authToken),
  patch: <T>(url: string, data: any, authToken?: string) => request<T>(url, 'PATCH', data, authToken),
  delete: (url: string, authToken?: string) => request(url, 'DELETE', null, authToken),
};

