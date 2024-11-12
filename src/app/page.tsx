// components/GooglePicker.tsx
'use client';
import React, {useEffect, useState} from 'react';

const GooglePicker: React.FC = () => {
    const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID; // Replace with your Client ID
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; // Replace with your API Key
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

    const handleAuthResult = (authResult: any) => {
        if (authResult && !authResult.error) {
            createPicker();
            console.log('authResult', authResult);
        }
    };

    const createPicker = () => {
        const picker = new window.gapi.picker.PickerBuilder()
            .addView(window.gapi.picker.ViewId.DOCS)
            .setOAuthToken(window.gapi.auth.getToken().access_token)
            .setDeveloperKey(API_KEY)
            .setCallback(pickerCallback)
            .build();
        picker.setVisible(true);
    };

    const pickerCallback = (data: any) => {
        if (data[window.gapi.picker.Response.ACTION] === window.gapi.picker.Action.PICKED) {
            const doc = data[window.gapi.picker.Response.DOCUMENTS][0];
            const id = doc[window.gapi.picker.Document.ID];
            const name = doc[window.gapi.picker.Document.NAME];
            console.log('You picked: ' + name + ' (ID: ' + id + ')');
        }
    };

    useEffect(() => {
        loadGapi();
    }, []);
    useEffect(() => {
        if(gapiLoaded){
            loadPicker();
        }
    }, [gapiLoaded]);

    return (
        <div>
            <button onClick={loadPicker}>Open Google Drive Picker</button>
        </div>
    );
};

export default GooglePicker;

