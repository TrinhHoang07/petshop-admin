import moment from 'moment';
import { TMes } from '../pages/Chat/Chat';

export class Helper {
    static base64Encode(str: string | object) {
        return btoa(JSON.stringify(str));
    }

    static base64Decode(str: string) {
        return JSON.parse(atob(str));
    }

    static getNameFromStatus(status: string) {
        if (status === 'processing') return 'Đang xử lý';
        else if (status === 'shipping') return 'Đang giao';
        else if (status === 'finished') return 'Đã giao';
        else if (status === 'cancel') return 'Đã hủy';
        else return 'Xảy ra lỗi';
    }

    static handleCreateOrSaveMessage(message: TMes) {
        const data = sessionStorage.getItem('messages-admin');

        if (data) {
            const values = JSON.parse(data) as TMes[];
            sessionStorage.setItem('messages-admin', JSON.stringify([...values, message]));
        } else {
            sessionStorage.setItem('messages-admin', JSON.stringify([message]));
        }
    }

    static formatTime(time: string) {
        return moment(time).format('DD/MM/YYYY HH:mm');
    }

    static formatVND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
}
