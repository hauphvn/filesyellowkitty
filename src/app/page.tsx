// components/GooglePicker.tsx
'use client';
import React, { useEffect, useState } from 'react';

interface AuthResult {
    access_token?: string;
    error?: string;
}

interface PickerResponse {
    ACTION: string;
    DOCUMENTS?: Document[];
}

interface Document {
    ID: string;
    NAME: string;
}

const GooglePicker: React.FC = () => {
    const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''; // Replace with your Client ID
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''; // Replace with your API Key
    const SCOPES = 'https://www.googleapis.com/auth/drive.file';
    const [gapiLoaded, setGapiLoaded] = useState(false);

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
        if (window.gapi && window.gapi.load) {
            window.gapi.load('auth', { callback: onAuthApiLoad });
            window.gapi.load('picker', { callback: onPickerApiLoad });
        }
    };

    const onAuthApiLoad = () => {
        window.gapi.auth.authorize(
            {
                client_id: CLIENT_ID,
                scope: SCOPES,
                immediate: false,
            },
            handleAuthResult
        );
    };

    const onPickerApiLoad = () => {
        // Picker API loaded
    };

    const handleAuthResult = (authResult: AuthResult) => {
        if (authResult && !authResult.error) {
            createPicker();
        }
    };

    const createPicker = () => {
        if (window.gapi && window.gapi.picker) {
            const picker = new window.gapi.picker.PickerBuilder()
                .addView(window.gapi.picker.ViewId.DOCS)
                .setOAuthToken(window.gapi.auth.getToken().access_token)
                .setDeveloperKey(API_KEY)
                .setCallback(pickerCallback)
                .build();
            picker.setVisible(true);
        }
    };

    const pickerCallback = (data: PickerResponse) => {
        if (data.ACTION === window.gapi.picker.Action.PICKED) {
            const doc = data.DOCUMENTS ? data.DOCUMENTS[0] : null;
            if (doc) {
                const id = doc.ID;
                const name = doc.NAME;
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
        if (gapiLoaded) {
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
