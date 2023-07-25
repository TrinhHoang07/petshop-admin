// UPDATE TYPESCRIPT LATER

import { AxiosClientApi } from './axiosInstance';

export class ApiService {
    get auth() {
        const route = {
            register: 'register',
            login: 'login',
        };

        return {
            register: (data: any): Promise<any> => AxiosClientApi.post(route.register, data),
            login: (data: any): Promise<any> => AxiosClientApi.post(route.login, data),
        };
    }

    get products() {
        const route = {
            getProducts: 'products/all',
            getProduct: (id: string) => `products/product/${id}`,
            createProduct: 'admin/products/create',
            updateProduct: (id: string) => `admin/products/update/${id}`,
            deleteProduct: (id: string) => `admin/products/delete/${id}`,
        };

        return {
            createProduct: (data: any): Promise<any> => AxiosClientApi.post(route.createProduct, data),
            updateProduct: (id: string, data: any): Promise<any> => AxiosClientApi.put(route.updateProduct(id), data),
            deleteProduct: (id: string): Promise<any> => AxiosClientApi.delete(route.deleteProduct(id)),
            getProducts: (query?: any): Promise<any> => AxiosClientApi.get(route.getProducts, query),
            getProduct: (id: string, query?: any): Promise<any> => AxiosClientApi.get(route.getProduct(id), query),

            route: route,
        };
    }
}
