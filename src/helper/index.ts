import { TMes } from '../pages/Chat/Chat';

export class Helper {
    static base64Encode(str: string | object) {
        return btoa(JSON.stringify(str));
    }

    static base64Decode(str: string) {
        return JSON.parse(atob(str));
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
}
