/*
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2014 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */

package com.adobe.creativesdk.sample;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Typeface;
import android.content.res.Resources;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;

import com.adobe.creativesdk.foundation.auth.AdobeAuthException;
import com.adobe.creativesdk.foundation.auth.AdobeAuthSessionHelper;
import com.adobe.creativesdk.foundation.auth.AdobeAuthSessionLauncher;
import com.adobe.creativesdk.foundation.auth.AdobeUXAuthManager;

import com.adobe.creativesdk.foundation.storage.AdobeAsset;
import com.adobe.creativesdk.foundation.storage.AdobeAssetException;
import com.adobe.creativesdk.foundation.storage.AdobeAssetFile;
import com.adobe.creativesdk.foundation.storage.AdobeAssetFileRenditionType;
import com.adobe.creativesdk.foundation.storage.AdobeAssetImageDimensions;
import com.adobe.creativesdk.foundation.storage.AdobeSelection;
import com.adobe.creativesdk.foundation.storage.AdobeSelectionAsset;
import com.adobe.creativesdk.foundation.storage.AdobeUXAssetBrowser;
import com.adobe.creativesdk.foundation.storage.AdobeUXAssetBrowserConfiguration;
import com.adobe.creativesdk.foundation.storage.AdobeUXAssetBrowserOption;
import com.adobe.creativesdk.foundation.storage.IAdobeGenericRequestCallback;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.EnumSet;

import static android.util.Log.d;

public class CreativeSDKSampleActivity extends Activity {
    /**
     * AdobeAuthSessionHelper is used to retrieve the current status and results of authentication
     * related operations.
     *
     * Example: The client Activity which is interested in the authentication status can use it in the
     * following way.
     *
     * Here the callback checks for a status change in Authentication workflow.
     * If the user is still logged in, the user is taken to the last viewed page.
     * */
    private AdobeAuthSessionHelper _authSessionHelper = null;
    private AdobeAuthSessionHelper.IAdobeAuthStatusCallback _statusCallback = new AdobeAuthSessionHelper.IAdobeAuthStatusCallback()
    {
        @Override
        public void call(AdobeAuthSessionHelper.AdobeAuthStatus status, AdobeAuthException exception)
        {
        if ( AdobeAuthSessionHelper.AdobeAuthStatus.AdobeAuthLoggedIn == status )
        {
            moveToScreen();
        }
        }
    };

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        init();
        Log.d("baseContext1", getBaseContext().toString());
        Log.d("Application context1", getApplicationContext().toString());
        _authSessionHelper = new AdobeAuthSessionHelper(_statusCallback);
        _authSessionHelper.onCreate(savedInstanceState);

    }

    @Override
    protected void onStart()
    {
        super.onStart();
        _authSessionHelper.onStart();

    }

    @Override
    protected void onResume()
    {
        super.onResume();
        _authSessionHelper.onResume();
    }

    @Override
    protected void onPause()
    {
        super.onPause();
        _authSessionHelper.onPause();
    }

    @Override
    protected void onStop()
    {
        super.onStop();
        _authSessionHelper.onStop();
    }
    @Override
    protected void onDestroy()
    {
        super.onDestroy();
        _authSessionHelper.onDestroy();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        _authSessionHelper.onActivityResult(requestCode, resultCode, data);

        /* This block will be executed once files are selected in the Asset Browser and user clicks on "Open" Files button to open the selected files.
         * The Application gets a handle to the selected files which can be further used by the application.
        * The sample application created a Grid view of all the selected files from the Asset Browser.
        */
        if (requestCode == CREATIVE_SDK_SAMPLE_REQUEST_CODE && resultCode == RESULT_OK && data != null) {

            Log.d("Data", data.toString());
            Log.d("baseContext",getBaseContext().toString() );
            Log.d("Application context",getApplicationContext().toString() );

            //mCurrentState = STATE_HOME;
            View appMainListView = findViewById(R.id.assetbrowsercontainer);
            appMainListView.setEnabled(true);
        }




        /*This block will be executed when back button is pressed from AssetBrowser Activity*/
        else if(requestCode == CREATIVE_SDK_SAMPLE_REQUEST_CODE && resultCode == RESULT_CANCELED){
            Log.d("onResult", "result canceled, backbutton");

            setCurrentState(STATE_HOME);
            moveToScreen();
        }
    }

    @Override
    public void onBackPressed() {
        switch (mCurrentState) {
            case STATE_ASSET_GRIDVIEW:
                setCurrentState(STATE_HOME);
                gotoHomeScreen();
                break;

            case STATE_ASSET_GRIDVIEW_IMAGE_DETAIL:
                setCurrentState(STATE_ASSET_GRIDVIEW);
                break;

            default:
                super.onBackPressed();
        }
    }
    /* init() initializes the Adobe Creative Cloud Authentication Manager with the CLient ID and Secret that is provided.
     * This initialization should be done before any authentication operations like Sign-in, Login or Logout.
    */


    private void init() {
        //Full screen layout for showing the image information
/*        fullScreenLayout = new LinearLayout(this);
        fullScreenLayout.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        fullScreenLayout.setOrientation(LinearLayout.VERTICAL);
        fullScreenLayout.setPadding(IMAGE_DETAIL_PADDING, IMAGE_DETAIL_PADDING, IMAGE_DETAIL_PADDING, IMAGE_DETAIL_PADDING);
*/
//        fullScreenImageView = new ImageView(this);
//        fullScreenImageView.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));


        adapter = new SampleActionsAdapter(this);


        setCurrentState(STATE_HOME);
        moveToScreen();
    }
    /*
     * startAssetBrowser()
     * Check if the user is authenticated and then invoke the Asset Browser which lists all the files/folders that are present
     * in the users account on Adobe Creative Cloud
     */
    public void startAssetBrowser(View view) {
        //if we are in process of launching the grid view for selected items then prevent further launches.
        if(mCurrentState == STATE_LAUNCH_GRID_FOR_SELECTED)
            return;
        setCurrentState(STATE_ASSET_BROWSER);
        login();
    }

    private void login() {
        final AdobeUXAuthManager sharedAuthManager = AdobeUXAuthManager.getSharedAuthManager();
        sharedAuthManager.login(new AdobeAuthSessionLauncher.Builder().withActivity(this).withRequestCode(DEFAULT_LOGIN_ACTIVITY_REQUEST_CODE).build());
    }


    private void moveToScreen() {
        switch(mCurrentState) {
            case STATE_HOME:
                gotoHomeScreen();
                break;

            case STATE_ASSET_BROWSER:
                gotoAssetBrowserScreen();
                break;

            default:
                break;
        }
    }

    private void gotoHomeScreen() {
        setContentView(R.layout.sampleassetbrowseractivity);
        ListView listView = (ListView) findViewById(R.id.ic_listview);
        listView.setAdapter(adapter);
    }
    /* gotoAssetBrowserScreen
     * 
     * Method to launch the Asset Browser Component in the Creative SDK.
     * Ensure that the AdobeUXAssetOneUpViewerActivity and AdobeUXAssetBrowserActivity are added in your AndroidManifest.xml
     */
    private void gotoAssetBrowserScreen() {
        /**
         * Displays a Creative Cloud asset browser component for viewing and selecting Adobe Creative Cloud assets.
         * This API pops up the default File Browser as an Activity
         *
         * Filters and DataSource can be modified accordingly as shown in the commented example code below.
        **/
    	AdobeUXAssetBrowser sharedAssetBrowserInstance = AdobeUXAssetBrowser.getSharedInstance();
        AdobeUXAssetBrowserConfiguration browserConfiguration = new AdobeUXAssetBrowserConfiguration();

        browserConfiguration.options = EnumSet.of(AdobeUXAssetBrowserOption.ENABLE_MULTI_SELECT,AdobeUXAssetBrowserOption.SHOW_MULTI_SELECT_ON_POPUP,AdobeUXAssetBrowserOption.ENABLE_MYACCOUNT_OPTION);

    	sharedAssetBrowserInstance.popupFileBrowser(this, CREATIVE_SDK_SAMPLE_REQUEST_CODE,browserConfiguration);
    }

    private void setCurrentState(int state) {
        this.mCurrentState = state;
    }
    //member variables

    private int mCurrentState;
    private static final int STATE_HOME = 0;
    private static final int STATE_ASSET_BROWSER = 1;
    private static final int STATE_ASSET_GRIDVIEW = 2;
    private static final int STATE_ASSET_GRIDVIEW_IMAGE_DETAIL = 3;
    private static final int STATE_LAUNCH_GRID_FOR_SELECTED = 5;
    private final int CREATIVE_SDK_SAMPLE_REQUEST_CODE = 100;
    private final int DEFAULT_LOGIN_ACTIVITY_REQUEST_CODE = 202;
    private SampleActionsAdapter adapter;

//    private LinearLayout fullScreenLayout;
//    private ImageView fullScreenImageView;
}

class SampleActionsAdapter extends BaseAdapter {
    public SampleActionsAdapter(CreativeSDKSampleActivity context) {
        this.context = context;
    }

    @Override
    public int getCount() {
        return 1;
    }

    @Override
    public Object getItem(int position) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public long getItemId(int position) {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
       if(convertView == null) {
            View view = inflater.inflate(R.layout.sampleactions, null);

            return view;
        }

        return convertView;
    }

    private CreativeSDKSampleActivity context;
}
