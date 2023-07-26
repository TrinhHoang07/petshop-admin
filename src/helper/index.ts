export class Helper {
    static base64Encode(str: string | object) {
        return btoa(JSON.stringify(str));
    }

    static base64Decode(str: string) {
        return JSON.parse(atob(str));
    }
}
