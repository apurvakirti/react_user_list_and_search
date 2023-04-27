import axios from './axiosInstance';

function throwError(e: {response: unknown}) {
  throw e.response;
}

export async function get(url: string, data?: object) {
  try {
    const resp = await axios.get(url, data);
    return resp.data;
  } catch (e) {
    return throwError(e as {response: unknown});
  }
}
