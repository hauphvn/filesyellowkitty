// google-picker.d.ts
declare module 'google.picker' {
    export interface PickerResponse {
        [key: string]: never; // You can define more specific types based on your needs
    }

    export interface Document {
        ID: string;
        NAME: string;
        [key: string]: never; // You can define more specific types based on your needs
    }

    export interface Response {
        ACTION: string;
        DOCUMENTS: Document[];
        [key: string]: never; // You can define more specific types based on your needs
    }

    export const Response: {
        ACTION: string;
        DOCUMENTS: string;
        // Add other constants as needed
    };

    export const Action: {
        PICKED: string;
        // Add other actions as needed
    };
}
