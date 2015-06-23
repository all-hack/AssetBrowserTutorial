/*
 * *****************************************************************************
 *  *
 *  * ADOBE CONFIDENTIAL
 *  * ___________________
 *  *
 *  * Copyright 2014 Adobe Systems Incorporated
 *  * All Rights Reserved.
 *  *
 *  * NOTICE:  All information contained herein is, and remains the property of
 *  * Adobe Systems Incorporated and its suppliers, if any. The intellectual and
 *  * technical concepts contained herein are proprietary to Adobe Systems
 *  * Incorporated and its suppliers and are protected by trade secret or
 *  * copyright law. Dissemination of this information or reproduction of this
 *  * material is strictly forbidden unless prior written permission is obtained
 *  * from Adobe Systems Incorporated.
 *  *****************************************************************************
 */
package com.adobe.creativesdk.sample;
import android.app.Application;

import com.adobe.creativesdk.foundation.AdobeCSDKFoundation;
import com.adobe.creativesdk.foundation.auth.IAdobeAuthClientCredentials;
/***************************************************************************************************************************************
*  For using the Creative SDK, the Application will need to do the following mandatory Steps:
*  (1) Initialize AdobeCSDKFoundation
*  (2) Set ClientID and ClientSecret that you have obtained from Adobe(https://creativesdk.adobe.com/myapps.html)
*  (3) Use AuthSessionHelper for listening to the authentication status callbacks.
*
*  This class shows how to initialize the SDK and set the Client ID and Client Secret.
*  The application needs to define an ‘Application’ object and need to implement IAdobeAuthClientCredentials.
*  (1)Call AdobeCSDKFoundation.initializeCSDKFoundation to initialize Adobe Creative SDK.
*  (2)Override getClientID() and getClientSecret() to return the Client ID and Client Secret that you have obtained for your application.
****************************************************************************************************************************************/
public class CreativeSDKSampleApplication extends Application implements IAdobeAuthClientCredentials {
    private static final String CREATIVE_SDK_SAMPLE_CLIENT_ID = "89b22c54ea2e4915b4c0398f7f16dcd1";
    private static final String CREATIVE_SDK_SAMPLE_CLIENT_SECRET = "72dbde3c-348a-417b-9993-2b72304c2087";

    @Override
    public void onCreate() {

        super.onCreate();
        /*Initialize the Creative SDK Foundation library.
        *This is the first call that needs to be made before using Creative SDK Foundation library.*/
        AdobeCSDKFoundation.initializeCSDKFoundation(getApplicationContext());
    }

    @Override
    public String getClientID() {
        return CREATIVE_SDK_SAMPLE_CLIENT_ID;
    }

    @Override
    public String getClientSecret() {
        return CREATIVE_SDK_SAMPLE_CLIENT_SECRET;
    }
}
