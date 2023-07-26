import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { Helper } from '../helper';

type _T_AxiosOpts = {
    url?: {
        path: string;
        query?: { [key: string]: any } | any;
    };
    config?: AxiosRequestConfig;
};

export class AxiosClientApi {
    public static get<T extends any>(path: string, query?: T, config?: AxiosRequestConfig): Promise<any> {
        const request = new AxiosRequest({
            url: {
                path: path,
                query: query,
            },
            config: config,
        });

        let queryUrl = '';

        if (query) {
            queryUrl += '?query=' + Helper.base64Encode(query);
        }

        return request
            .getClient()
            .request({
                method: 'get',
                url: path + queryUrl,
            })
            .then((res) => res.data);
    }

    public static post<T extends any>(path: string, data?: T, config?: AxiosRequestConfig): Promise<any> {
        const request = new AxiosRequest({
            url: {
                path: path,
            },
            config: config,
        });

        return request
            .getClient()
            .request({
                method: 'post',
                url: path,
                data: data,
            })
            .then((res) => res.data);
    }

    public static patch<T extends any>(path: string, data?: T, config?: AxiosRequestConfig): Promise<any> {
        const request = new AxiosRequest({
            url: {
                path: path,
            },
            config: config,
        });

        return request
            .getClient()
            .request({
                method: 'patch',
                url: path,
                data: data,
            })
            .then((res) => res.data);
    }

    public static put<T extends any>(path: string, data?: T, config?: AxiosRequestConfig): Promise<any> {
        const request = new AxiosRequest({
            url: {
                path: path,
            },
            config: config,
        });

        return request
            .getClient()
            .request({
                method: 'put',
                url: path,
                data: data,
            })
            .then((res) => res.data);
    }

    public static delete(path: string, config?: AxiosRequestConfig): Promise<any> {
        const request = new AxiosRequest({
            url: {
                path: path,
            },
            config: config,
        });

        return request
            .getClient()
            .request({
                method: 'delete',
                url: path,
            })
            .then((res) => res.data);
    }
}

class AxiosRequest {
    protected _client: AxiosInstance;
    protected _opts: _T_AxiosOpts;

    constructor(opts: _T_AxiosOpts) {
        this._opts = opts;
        const client = axios.create(this.getConfig());
        this._client = client;
    }

    getClient = () => this._client;

    protected getConfig = (): AxiosRequestConfig => {
        console.log('urL: ', this._opts);

        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                platform: 'web',
            },
            withCredentials: false,
            baseURL: `http://localhost:3009/`,
        };

        config.headers!.Authorization = `Bearer ${process.env.REACT_APP_API_TOKEN}`;

        return config;
    };
}
