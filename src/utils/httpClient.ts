import axios, { AxiosInstance, CancelToken } from "axios";
interface ApiRequest {}
interface ApiResponse {
  [x: string]: any;
  url: any;
  user: any;
  message: any;
}
interface ApiParams {
  // lang?: string;
}

type RequestOptions<P extends ApiParams> = {
  params?: P;
  cancelToken?: CancelToken;
  token?: string;
};

const generateClient = (host: string) => {
  const getDefaultParams = (): ApiParams => {
    return {
      lang: "en",
    };
  };

  const validateStatus = (status: number): boolean => {
    return status >= 200 && status < 400;
  };

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: host,
    validateStatus: validateStatus,
  });

  function isTokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split(".")[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  const get = async <
    T extends ApiRequest,
    R extends ApiResponse,
    P extends ApiParams = ApiParams,
  >(
    path: string,
    request?: T,
    options?: RequestOptions<P>
  ): Promise<R> => {
    return axiosInstance
      .get(encodeURI(path), {
        params: {
          ...getDefaultParams(),
          ...request,
          ...options?.params,
        },
        headers: options?.token
          ? { Authorization: `Bearer ${options?.token}` }
          : {},
        cancelToken: options?.cancelToken,
      })
      .then((response) => response.data);
  };

  const post = async <
    T extends ApiRequest,
    R extends ApiResponse,
    P extends ApiParams = ApiParams,
  >(
    path: string,
    request: T,
    options?: RequestOptions<P>
  ): Promise<R> => {
    return axiosInstance
      .post(path, request, {
        params: {
          ...getDefaultParams(),
          ...options?.params,
        },
        cancelToken: options?.cancelToken,
      })
      .then((response) => response.data);
  };

  const put = async <
    T extends ApiRequest,
    R extends ApiResponse,
    P extends ApiParams = ApiParams,
  >(
    path: string,
    request: T,
    options?: RequestOptions<P>
  ): Promise<R> => {
    return axiosInstance
      .put(path, request, {
        params: {
          ...getDefaultParams(),
          ...options?.params,
        },
        cancelToken: options?.cancelToken,
      })
      .then((response) => response.data);
  };

  const deleteRequest = async <
    T extends ApiRequest,
    R extends ApiResponse,
    P extends ApiParams = ApiParams,
  >(
    path: string,
    request?: T,
    options?: RequestOptions<P>
  ): Promise<R> => {
    return axiosInstance
      .delete(path, {
        data: request,
        params: {
          ...getDefaultParams(),
          ...options?.params,
        },
        cancelToken: options?.cancelToken,
      })
      .then((response) => response.data);
  };

  return {
    get,
    put,
    post,
    delete: deleteRequest,
  };
};

export const httpClient = generateClient("http://localhost:3001");
