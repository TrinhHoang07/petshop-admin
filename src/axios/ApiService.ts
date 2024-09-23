// UPDATE TYPESCRIPT LATER

import { AxiosClientApi } from './axiosInstance';

export class ApiService {
    get auth() {
        const route = {
            login: 'admin/login',
        };

        return {
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

    get customers() {
        const route = {
            createCustomer: 'admin/customers/create',
            updateCustomer: (id: string) => `update/${id}`,
            deleteCustomer: (id: string) => `admin/customers/delete/${id}`,
            getCustomer: (id: string) => `customer/${id}`,
            getCustomers: 'admin/customers/all',
        };

        return {
            createCustomer: (data: any) => AxiosClientApi.post(route.createCustomer, data),
            updateCustomer: (id: string, data: any) => AxiosClientApi.put(route.updateCustomer(id), data),
            deleteCustomer: (id: string) => AxiosClientApi.delete(route.deleteCustomer(id)),
            getCustomer: (id: string) => AxiosClientApi.get(route.getCustomer(id)),
            getCustomers: (query?: any) => AxiosClientApi.get(route.getCustomers, query),

            route: route,
        };
    }

    get orders() {
        const route = {
            getOrders: 'admin/orders/all',
            updateStatus: (id: string) => `admin/orders/status/${id}`,
            deleteOrder: (id: string) => `admin/orders/delete/${id}`,
            dataHome: (year: number) => `admin/statistical-api/${year}`,
        };

        return {
            getOrders: (query?: any): Promise<any> => AxiosClientApi.get(route.getOrders, query),
            updateStatus: (id: string, data: any) => AxiosClientApi.put(route.updateStatus(id), data),
            deleteOrder: (id: string) => AxiosClientApi.delete(route.deleteOrder(id)),
            getDataHome: (year: number) => AxiosClientApi.get(route.dataHome(year)),
            route,
        };
    }

    get blogs() {
        const route = {
            getBlogs: 'blogs/all',
            createBlog: 'admin/blogs/create',
            updateBlog: (id: string) => `admin/blogs/update/${id}`,
            deleteBlog: (id: string) => `admin/blogs/delete/${id}`,
        };

        return {
            getBlogs: () => AxiosClientApi.get(route.getBlogs),
            createBlog: (data: any) => AxiosClientApi.post(route.createBlog, data),
            updateBlog: (id: string, data: any) => AxiosClientApi.put(route.updateBlog(id), data),
            deleteBlog: (id: string) => AxiosClientApi.delete(route.deleteBlog(id)),
        };
    }

    get notis() {
        const route = {
            getNotis: 'admin/notifications/all',
            updateSeen: (id: string) => `notifications/seen/${id}`,
        };

        return {
            getNotis: () => AxiosClientApi.get(route.getNotis),
            updateSeen: (id: string) => AxiosClientApi.get(route.updateSeen(id)),
        };
    }
}
