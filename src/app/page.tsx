// components/GooglePicker.tsx
'use client';
import React, {useEffect, useState} from 'react';

interface AuthResult {
    access_token?: string;
    error?: string;
    // Add other properties as needed based on the Google API documentation
}
interface PickerResponse {
    ACTION: string; // The action taken (e.g., PICKED, CANCEL)
    DOCUMENTS?: Document[]; // An array of documents if the action is PICKED
}

interface Document {
    ID: string; // The ID of the document
    NAME: string; // The name of the document
    // You can add more properties based on the Google Picker API documentation
}
const GooglePicker: React.FC = () => {
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; // Replace with your Client ID
    const API_KEY = process.env.GOOGLE_API_KEY; // Replace with your API Key
    // const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
    const SCOPES = 'https://www.googleapis.com/auth/drive.file';
    const [ gapiLoaded, setGapiLoaded] = useState(false);
    const loadGapi = () => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.async = true;
        script.onload = () => {
            setGapiLoaded(true);
        };
        document.body.appendChild(script);
    };
    const loadPicker = () => {
        window.gapi.load('auth', { callback: onAuthApiLoad });
        window.gapi.load('picker');
    };

    const onAuthApiLoad = () => {
        window.gapi.auth.authorize(
            {
                client_id: CLIENT_ID || '',
                scope: SCOPES,
                immediate: false,
            },
            handleAuthResult
        );
    };

    const handleAuthResult = (authResult: AuthResult) => {
        if (authResult && !authResult.error) {
            createPicker();
            console.log('authResult', authResult);
        }
    };

    // const createPicker = () => {
    //     const picker = new window.gapi.picker.PickerBuilder()
    //         .addView(window.gapi.picker.ViewId.DOCS)
    //         .setOAuthToken(window.gapi.auth.getToken().access_token)
    //         .setDeveloperKey(API_KEY)
    //         .setCallback(pickerCallback)
    //         .build();
    //     picker.setVisible(true);
    // };

    const createPicker = () => {
        const picker = new window.gapi.picker.PickerBuilder()
            .addView(window.gapi.picker.ViewId.DOCS)
            .setOAuthToken(window.gapi.auth.getToken().access_token)
            .setDeveloperKey(API_KEY)
            .setCallback(pickerCallback)
            .build();
        picker.setVisible(true);
    };

    const pickerCallback = (data: PickerResponse) => {
        if (data.ACTION === window.gapi.picker.Action.PICKED) {
            const doc = data.DOCUMENTS ? data.DOCUMENTS[0] : null;
            if (doc) {
                const id = doc.ID; // Accessing ID directly
                const name = doc.NAME; // Accessing NAME directly
                console.log('You picked: ' + name + ' (ID: ' + id + ')');
            }
        } else if (data.ACTION === window.gapi.picker.Action.CANCEL) {
            console.log('Picker was canceled.');
        } else {
            console.error('Error in picker callback:', data);
        }
    };

    useEffect(() => {
        loadGapi();
    }, []);
    useEffect(() => {
        if(gapiLoaded){
            loadPicker();
        }
    }, [gapiLoaded, loadPicker]);

    return (
        <div>
            <button onClick={loadPicker}>Open Google Drive Picker</button>
        </div>
    );
};

export default GooglePicker;

