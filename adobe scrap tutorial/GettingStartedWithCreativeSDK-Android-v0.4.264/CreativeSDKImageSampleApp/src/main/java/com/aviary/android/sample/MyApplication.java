package com.aviary.android.sample;

import android.support.multidex.MultiDexApplication;

import com.aviary.android.feather.sdk.IAviaryClientCredentials;

public class MyApplication extends MultiDexApplication implements IAviaryClientCredentials {
    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Override
    public String getBillingKey() {
        return "";
    }

    @Override
    public String getClientID() {
        return "";
    }

    @Override
    public String getClientSecret() {
        return "";
    }
}
