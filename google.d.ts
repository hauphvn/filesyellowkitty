// @types/google.d.ts
declare global {
    interface Window {
        gapi: {
            load: (name: string, options?: { callback: () => void }) => void;
            auth: {
                authorize: (params: { client_id: string; scope: string; immediate: boolean }, callback: (authResult: any) => void) => void;
                getToken: () => { access_token: string };
            };
            picker: {
                PickerBuilder: new () => {
                    addView: (viewId: any) => this;
                    setOAuthToken: (token: string) => this;
                    setDeveloperKey: (key: string) => this;
                    setCallback: (callback: (data: any) => void) => this;
                    build: () => { setVisible: (visible: boolean) => void };
                };
                ViewId: {
                    DOCS: any;
                };
                Response: {
                    ACTION: string;
                    DOCUMENTS: string;
                };
                Document: {
                    ID: string;
                    NAME: string;
                };
                Action: {
                    PICKED: string;
                };
            };
        };
    }
}

export {};
