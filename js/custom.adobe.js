
var dict = {};
// dictionary of elements 
dict['high-level-overview'] = "<div class='textDiv center-block high-level-overview'>\
                            The <span class='toolTip'>Creative Cloud SDK</span> includes a library to easily implement <span class='toolTip'>Creative Cloud</span> file browsing. We do this using the <span class='toolTip'>Asset Browser</span>. The <span class='toolTip'>Asset Browser</span> is used through the <a href='https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeUXAssetBrowser.html'>AdobeUXAssetBrowser</a>\
                             class which provides a simple UI for browsing the user's files as well as selecting one for download. \
                            <br>\
                            <br>                       \
                            In this tutorial we will create a simple minimalist UI for testing purposes, enable the <span class='toolTip'>Asset Browser</span>, enable the ability to select a file from the <span class='toolTip'>Asset Browser</span>, and then display that file in our simple minimalist UI.                            \
                        </div>";

dict['assumptions'] = '<div class="center-block textDiv assumptions"> \
                                Before we start we are going to go through a few assumptions about how prepared we are to integrate the <span class="toolTip">Creative Cloud</span> <span class="toolTip">Asset Browser</span> into our app.                         Make sure to check every box below before moving forward. \
\
                                <br> \
                                <input id="list0" type="checkbox"> Have a basic understanding of Android Development \
                                <br> \
                                <input id="list1" type="checkbox"> Created an Android project using the Blank Activity template \
                                <br> \
                                <input id="list8" type="checkbox"> Purchased and created a <a href="http://www.adobe.com/creativecloud.html">Creative Cloud account</a> \
                                <br> \
                                <input id="list8" type="checkbox"> <a href="https://creativesdk.adobe.com/myapps.html">Registered an Application</a> \
                                 on Creative Cloud \
                                <br> \
                                <input id="list2" type="checkbox"> Completed the Creative Cloud <a href="https://creativesdk.adobe.com/docs/android/#/articles/gettingstarted/index.html">Getting Started</a> tutorial \
                                        <br> \
                                        <input id="list3" type="checkbox"> Integrated the Creative Cloud SDK \
                                        <br> \
                                        <input id="list4" type="checkbox"> Integrated your Client Id and Secret by implementing <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/auth/IAdobeAuthClientCredentials.html">IAdobeAuthClientCredentials</a> \
                                        <br> \
                                        <input id="list5" type="checkbox"> Updated the Android Manifest \
                                        <br> \
                                        <input  id="list6" type="checkbox"> Instantiated the <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/auth/AdobeAuthSessionHelper.html">AdobeAuthSessionHelper</a> \
                                        <br> \
                                        <input id="list7" type="checkbox"> Enabled <span class="toolTip">Creative Cloud</span> login with the <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/auth/AdobeUXAuthManager.html">AdobeUXAuthManager</a> \
                                <br>             \
                            </div>     ';

dict['prepping-the-app'] = '<div class="textDiv center-block prepping-the-app"> \
                        After completing the <span class="toolTip">Creative Cloud</span> <a href="https://creativesdk.adobe.com/docs/android/#/articles/gettingstarted/index.html">Getting Started</a> tutorial, we should have a very simple working Android app that allows the user to <span class="picTip">log into their Creative Cloud account</span>. Before adding the <span class="toolTip">Asset Browser</span> to our app we are going to add a minimal UI to aid us in our testing. \
                        <br> \
                        <br> \
                        To start we are going to change the <span class="picTip">layout XML file</span> of our main activity <code class="prettyprint">SampleActivity.java</code>. \
                        <pre class="prettyprint"><xmp> \
                            <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android" \r \
                                android:layout_width="match_parent" \r \
                                android:orientation="vertical" \r \
                                android:layout_height="match_parent"  \r \
                                android:paddingLeft="@dimen/activity_horizontal_margin" \r \
                                android:paddingRight="@dimen/activity_horizontal_margin" \r \
                                android:paddingTop="@dimen/activity_vertical_margin" \r \
                                android:paddingBottom="@dimen/activity_vertical_margin" \r \
                                android:id="@+id/home" \r \
                                android:weightSum="1"> \r \
\
                                    <TextView \r \
                                        android:layout_width="wrap_content"  \r \
                                        android:layout_height="wrap_content" \r \
                                        android:text="Welcome to Asset Browser" \r \
                                        android:id="@+id/textView" \r \
                                        android:layout_gravity="center_horizontal"  \r\
                                        android:textIsSelectable="false" \r\
                                        android:textSize="25dp" \r\
                                        android:textColor="#000000" \r\
                                        android:layout_marginTop="10dp" /> \r\
\r\
                                    <Button \r\
                                        android:layout_width="match_parent" \r\
                                        android:layout_height="wrap_content" \r\
                                        android:text="Login to Asset Browser" \r\
                                        android:id="@+id/button" \r\
                                        android:layout_weight="0.22" \r\
                                        android:layout_below="@+id/textView" \r\
                                        android:layout_alignParentLeft="true" \r\
                                        android:layout_alignParentStart="true" /> \r\
 \r\
                                    <ImageView \r\
                                        android:layout_width="match_parent" \r\
                                        android:layout_height="wrap_content" \r \
                                        android:id="@+id/imageView" \r\
                                        android:layout_gravity="center_horizontal" \r\
                                        android:layout_marginTop="30dp" /> \r\
\
                            </LinearLayout> \r\
                        </xmp></pre> \
\
                        This creates a vertical <a href="http://developer.android.com/guide/topics/ui/layout/linear.html">LinearLayout</a> \
                        with a <a href="http://developer.android.com/reference/android/widget/TextView.html">TextView</a>, a <a href="http://developer.android.com/reference/android/widget/Button.html">Button</a> and an <a href="http://developer.android.com/reference/android/widget/ImageView.html">ImageView</a>. The <a href="http://developer.android.com/reference/android/widget/TextView.html">TextView</a> displays a welcoming message. The <a href="http://developer.android.com/reference/android/widget/Button.html">Button</a> we will use to log in and launch the <span class="toolTip">Asset Browser</span>. The <a href="http://developer.android.com/reference/android/widget/ImageView.html">ImageView</a> \
                         is where we will display the file we retrieve from the <span class="toolTip">Asset Browser</span>.  \
                        <br> \
                        <br> \
                        Next in our <code class="prettyprint">SampleActivity.java</code> file we are going to <code class="prettyprint">setContentView(R.layout.activity_sample);</code> in the login status logic that we set up in the <a href="https://creativesdk.adobe.com/docs/android/#/articles/gettingstarted/index.html">Getting Started</a> tutorial. This will <span class="picTip">display our new layout</span> if the user is logged in. \
                        <pre class="prettyprint"> \
                        //Session helper to check the login status  \r\
                        private AdobeAuthSessionHelper.IAdobeAuthStatusCallback _statusCallback = <br>                           new AdobeAuthSessionHelper.IAdobeAuthStatusCallback() { \r\
                                    @Override \r\
                                    public void call(AdobeAuthSessionHelper.AdobeAuthStatus status, AdobeAuthException exception) { \r\
                                        if (AdobeAuthSessionHelper.AdobeAuthStatus.AdobeAuthLoggedIn == status) { \r\
//start of change -- start of change -- start of change -- start of change \r\
                                            setContentView(R.layout.activity_sample); \r\
//end of change -- end of change -- end of change -- end of change \r\
                                        } else { \r\
                                           showNotLoggedInUI(); \r\
                                        } \r\
                                    } \r\
                        }; \r\
                        </pre> \
\
                        We want to let the user decide when they want to log in. To do that we are going to create a method called <code class="prettyprint">init()</code>, that will initialize our <a href="http://developer.android.com/reference/android/view/View.html">View</a> \
                        , and set a <a href="http://developer.android.com/reference/android/view/ViewOnClickListener.html">listener</a> \
                        on the button. First we will declare a <a href="http://developer.android.com/reference/android/widget/Button.html">Button</a>object and <a href="http://developerandroid.com/reference/android/widget/ImageView.html">ImageView</a> object in our activity\'s global space. \
                        <pre class="prettyprint"> \
                            //activity delcaration \r\
                            public class SampleActivity extends Activity { \r\
                                //activity global space, we set global variables here     \r\
                                private static int DEFAULT_SIGN_IN_REQUEST_CODE = 2002; \r\
                                private final AdobeUXAuthManager _uxAuthManager = AdobeUXAuthManager.getSharedAuthManager(); \r\
                                private AdobeAuthSessionHelper _authSessionHelper = null; \r\
\r\
//start of change -- start of change -- start of change -- start of change \r\
                                //control minimal UI \r\
                                private ImageView imageView; \r\
                                private Button button; \r\
//end of change -- end of change -- end of change -- end of change \r\
                        </pre> \
\
                        Then we will create our <code class="prettyprint">init()</code> method. \
\
                        <pre class="prettyprint"> \
//start of change -- start of change -- start of change -- start of change \r\
                            private void init() { \r\
                                    setContentView(R.layout.activity_sample); \r\
                                    button = (Button) findViewById(R.id.button); \r\
                                    imageView = (ImageView)  findViewById(R.id.imageView); \r\
                                \r\
                                    findViewById(R.id.button).setOnClickListener(new View.OnClickListener() { \r\
                                        @Override \r\
                                        public void onClick(View v) { \r\
                                            //Call the showNotLoggedInUI function we created in the getting started tutorial \r\
                                            showNotLoggedInUI(); \r\
                                        } \r\
                                    }); \r\
                            } \r\
//end of change -- end of change -- end of change -- end of change \r\
                        </pre> \
\
                        We are going to call the <code class="prettyprint">init()</code> method in our activity\'s <code class="prettyprint">onCreate</code> method, and delete <code class="prettyprint">setContentView(R.layout.activity_sample);</code> from the login status logic. \
\
                        <pre class="prettyprint"> \
                            //Session helper to check the login status  \r\
                            private AdobeAuthSessionHelper.IAdobeAuthStatusCallback _statusCallback = <br>                               new AdobeAuthSessionHelper.IAdobeAuthStatusCallback() { \r\
                                    @Override \r\
                                    public void call(AdobeAuthSessionHelper.AdobeAuthStatus status, AdobeAuthException exception) { \r\
                                        if (AdobeAuthSessionHelper.AdobeAuthStatus.AdobeAuthLoggedIn == status) { \r\
//start of change -- start of change -- start of change -- start of change \r\
                                            //do nothing \r\
//end of change -- end of change -- end of change -- end of change \r\
                                        } else { \r\
//start of change -- start of change -- start of change -- start of change \r\
                                            //do nothing  \r\
//end of change -- end of change -- end of change -- end of change \r\
                                        } \r\
                                    } \r\
                            }; \r\
\r\
                            //onCreate function that is called when the activity is created \r\
                            @Override \r\
                            protected void onCreate(Bundle savedInstanceState) { \r\
                                super.onCreate(savedInstanceState); \r\
//start of change -- start of change -- start of change -- start of change \r\
                                //call the init() function we just created  \r\
                                init(); \r\
//end of change -- end of change -- end of change -- end of change \r\
                                _authSessionHelper = new AdobeAuthSessionHelper(_statusCallback); \r\
                                _authSessionHelper.onCreate(savedInstanceState); \r\
                            } \r\
                        </pre> \
\
                        Now when we click the button and we are not logged in, the login logic will start, allowing the user to log into their <span class="toolTip">Creative Cloud</span> account. We are now going to change the the text inside the button, based on the login status of the user. To do that we are going to add a <span class="toolTip">Boolean</span> variable to the activity\'s global variables. We will set that variable to either true or false and change text in the button according to the login status of the user. We will need to change some of the code in the <code class="prettyprint">init()</code> and <code class="prettyprint">showNotLoggedInUI()</code> methods, as well as the <code class="prettyprint">IAdobeAuthStatusCallback()</code> callback. \
\
                        <pre class="prettyprint"> \
                            //activity delcaration \r\
                            public class SampleActivity extends Activity { \r\
                                //activity global space, we set global variables here                          \r\
                                private static int DEFAULT_SIGN_IN_REQUEST_CODE = 2002; \r\
                                private final AdobeUXAuthManager _uxAuthManager = AdobeUXAuthManager.getSharedAuthManager(); \r\
                                private AdobeAuthSessionHelper _authSessionHelper = null; \r\
\r\
                                //control minimal UI \r\
                                private ImageView imageView; \r\
                                private Button button; \r\
//start of change -- start of change -- start of change -- start of change \r\
                                //tracks login status \r\
                                private boolean signFlag; \r\
//end of change -- end of change -- end of change -- end of change \r\
\r\
                                //Session helper to check the login status \r\
                                private AdobeAuthSessionHelper.IAdobeAuthStatusCallback _statusCallback = <br>                                    new AdobeAuthSessionHelper.IAdobeAuthStatusCallback() { \r\
                                        @Override \r\
                                        public void call(AdobeAuthSessionHelper.AdobeAuthStatus status, AdobeAuthException exception) { \r\
                                            if (AdobeAuthSessionHelper.AdobeAuthStatus.AdobeAuthLoggedIn == status) { \r\
//start of change -- start of change -- start of change -- start of change                                                \r\
                                                signFlag = true; \r\
                                                 //change the text in the button \r\
                                                button.setText("Open Access Browser"); \r\
//end of change -- end of change -- end of change -- end of change \r\
                                            } else { \r\
//start of change -- start of change -- start of change -- start of change \r\
                                                signFlag = false; \r\
//end of change -- end of change -- end of change -- end of change \r\
                                            } \r\
                                        } \r\
                                }; \r\
\r\
                                //function that calls the login logic \r\
                                public void showNotLoggedInUI(){ \r\
                                    _uxAuthManager.login(new AdobeAuthSessionLauncher.Builder().withActivity(this).withRequestCode(DEFAULT_SIGN_IN_REQUEST_CODE).build()); \r\
//start of change -- start of change -- start of change -- start of change \r\
                                    button.setText("Open Access Browser"); \r\
//end of change -- end of change -- end of change -- end of change \r\
                                } \r\
\r\
                                //function to set up the view of our activity  \r\
                                private void init() { \r\
                                        setContentView(R.layout.activity_sample); \r\
                                        button = (Button) findViewById(R.id.button); \r\
                                        imageView = (ImageView)  findViewById(R.id.imageView); \r\
                                        findViewById(R.id.button).setOnClickListener(new View.OnClickListener() { \r\
                                            @Override \r\
                                            public void onClick(View v) { \r\
//start of change -- start of change -- start of change -- start of change \r\
                                                if (!signFlag) { \r\
                                                    showNotLoggedInUI(); \r\
                                                } else { \r\
                                                    //do nothing \r\
                                                } \r\
//end of change -- end of change -- end of change -- end of change \r\
                                            } \r\
                                        }); \r\
                                } \r\
                        </pre> \
\
                        We have a working UI for testing purposese up and running. We are ready to add the <span class="toolTip">Asset Browser</span> to our application. Our <code class="prettyprint">SampleActivity.java</code> fileshould look like the code below. \
\
                        <pre class="prettyprint"> \
                            import ... \r\
\r\
                            //activity delcaration \r\
                            public class SampleActivity extends Activity { \r\
                                //activity global space, we set global variables here                             \r\
                                private static int DEFAULT_SIGN_IN_REQUEST_CODE = 2002; \r\
                                private final AdobeUXAuthManager _uxAuthManager = AdobeUXAuthManager.getSharedAuthManager(); \r\
                                private AdobeAuthSessionHelper _authSessionHelper = null; \r\
\r\
                                //control minimal UI \r\
                                private ImageView imageView; \r\
                                private Button button; \r\
\r\
                                //tracks login status \r\
                                private boolean signFlag; \r\
\r\
                                //Session helper to check the login status  \r\
                                private AdobeAuthSessionHelper.IAdobeAuthStatusCallback _statusCallback = <br>                               new AdobeAuthSessionHelper.IAdobeAuthStatusCallback() { \r\
                                        @Override \r\
                                        public void call(AdobeAuthSessionHelper.AdobeAuthStatus status, AdobeAuthException exception) { \r\
                                            if (AdobeAuthSessionHelper.AdobeAuthStatus.AdobeAuthLoggedIn == status) { \r\
                                                signFlag = true; \r\
                                                //change the text in the button \r\
                                                button.setText("Open Access Browser"); \r\
 \r\
                                            } else { \r\
                                                signFlag = false; \r\
                                            } \r\
                                        } \r\
                                };                               \r\
\r\
                                //function that calls the login logic \r\
                                public void showNotLoggedInUI(){ \r\
                                    _uxAuthManager.login(new AdobeAuthSessionLauncher.Builder().withActivity(this).withRequestCode(DEFAULT_SIGN_IN_REQUEST_CODE).build()); \r\
                                    button.setText("Open Access Browser"); \r\
                                } \r\
\r\
                                //onCreate function that is called when the activity is created \r\
                                @Override \r\
                                protected void onCreate(Bundle savedInstanceState) { \r\
                                    super.onCreate(savedInstanceState); \r\
\r\
                                    //call the init() function to launch the UI \r\
                                    init(); \r\
\r\
                                    _authSessionHelper = new AdobeAuthSessionHelper(_statusCallback); \r\
                                    _authSessionHelper.onCreate(savedInstanceState); \r\
                                } \r\
\r\
                                @Override \r\
                                protected void onResume() { \r\
                                    super.onResume(); \r\
                                    _authSessionHelper.onResume(); \r\
                                } \r\
\r\
                                @Override \r\
                                protected void onPause() { \r\
                                    super.onPause(); \r\
                                    _authSessionHelper.onPause(); \r\
                                } \r\
\r\
                                @Override \r\
                                protected void onStart() { \r\
                                    super.onStart(); \r\
                                    _authSessionHelper.onStart(); \r\
                                } \r\
\r\
                                @Override \r\
                                protected void onStop() { \r\
                                    super.onStop(); \r\
                                    _authSessionHelper.onStop(); \r\
                                } \r\
\r\
                                @Override \r\
                                protected void onDestroy() { \r\
                                    super.onDestroy(); \r\
                                    _authSessionHelper.onDestroy(); \r\
                                } \r\
\r\
                                @Override \r\
                                public void onActivityResult(int requestCode, int resultCode, Intent data) { \r\
                                    super.onActivityResult(requestCode, resultCode, data); \r\
                                    _authSessionHelper.onActivityResult(requestCode, resultCode, data);                                    \r\
                                } \r\
\r\
                                //function to set up the view of our activity  \r\
                                private void init() { \r\
                                        setContentView(R.layout.activity_sample); \r\
                                        button = (Button) findViewById(R.id.button); \r\
                                        imageView = (ImageView)  findViewById(R.id.imageView); \r\
                                        findViewById(R.id.button).setOnClickListener(new View.OnClickListener() { \r\
                                            @Override \r\
                                            public void onClick(View v) { \r\
                                                if (!signFlag) { \r\
                                                    showNotLoggedInUI();\r \
                                                } else { \r\
                                                    //do nothing   \r \
                                                }\r \
                                            } \r\
                                        }); \r\
                                }                                 \r\
                            } \r\
                        </pre> \
\
                        </div>';

dict['file-browsing-with-AdobeUXAssetBrowser'] = ' \
					<div class="textDiv center-block file-browsing-with-AdobeUXAssetBrowser"> \
                        \
                            The <span class="toolTip">Asset Browser</span> is a simple UI that allows the user to browse, select, and download their files saved in the <span class="toolTip">Creative Cloud</span>. It was designed for simple and smooth integration. \
                            <br> \
                            <br> \
                            We use the <span class="toolTip">Asset Browser</span> by instantiating the <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeUXAssetBrowser.html">AdobeUXAssetBrowser</a> class. To do that we are going to add a constant to our activity\'s global variables, add a method to use the <span class="toolTip">Asset Browser</span>, and then have the <a href="http://developer.android.com/reference/android/view/View.OnClickListener.html">listener</a> attached to our button call that method. \
\
                        <pre class="prettyprint"> \
                            //activity delcaration \r\
                            public class SampleActivity extends Activity { \r\
                                //activity global space, we set global variables here                              \r\
                                private static int DEFAULT_SIGN_IN_REQUEST_CODE = 2002; \r\
                                private final AdobeUXAuthManager _uxAuthManager = AdobeUXAuthManager.getSharedAuthManager(); \r\
                                private AdobeAuthSessionHelper _authSessionHelper = null; \r\
 \r\
                                //control minimal UI \r\
                                private ImageView imageView; \r\
                                private Button button; \r\
 \r\
                                //tracks login status \r\
                                private boolean signFlag; \r\
 \r\
//start of change -- start of change -- start of change -- start of change \r\
                                //constant request code for Asset Browser activity \r\
                                private final int CREATIVE_SDK_SAMPLE_REQUEST_CODE = 100; \r\
//end of change -- end of change -- end of change -- end of change \r\
 \r\
//start of change -- start of change -- start of change -- start of change \r\
                                //function to launch the Asset Browser \r\
                                private void gotoAssetBrowserScreen() { \r\
                                     \r\
                                    //Displays a Creative Cloud asset browser component for viewing and selecting Adobe Creative Cloud assets. \r\
                                    //This API pops up the default File Browser as an Activity                                                     \r\
 \r\
                                    //retrieves an instance of the AdobeUXAssetBrowser activity using the Creative Cloud SDK. \r\
                                    AdobeUXAssetBrowser sharedAssetBrowserInstance = AdobeUXAssetBrowser.getSharedInstance(); \r\
      \r\
                                    //launches the AdobeUXAssetBrowser activity \r\
                                    sharedAssetBrowserInstance.popupFileBrowser(this, CREATIVE_SDK_SAMPLE_REQUEST_CODE); \r\
                                } \r\
//end of change -- end of change -- end of change -- end of change \r\
 \r\
                                //function to set up the view of our activity  \r\
                                private void init() { \r\
                                        setContentView(R.layout.activity_sample); \r\
                                        button = (Button) findViewById(R.id.button); \r\
                                        imageView = (ImageView)  findViewById(R.id.imageView);                                         \r\
 \r\
                                        findViewById(R.id.button).setOnClickListener(new View.OnClickListener() { \r\
                                            @Override \r\
                                            public void onClick(View v) { \r\
                                                if (!signFlag) { \r\
                                                    showNotLoggedInUI(); \r\
                                                } else { \r\
//start of change -- start of change -- start of change -- start of change \r\
                                                    //call the gotoAssetBrowserScreen if the user is logged in. \r\
                                                    gotoAssetBrowserScreen(); \r\
//end of change -- end of change -- end of change -- end of change \r\
                                                } \r\
                                            } \r\
                                        }); \r\
                                } \r\
                        </pre> \
\
                        The <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeUXAssetBrowser.html">AdobeUXAssetBrowser</a> class has a few methods. In the above example we used two of those methods, <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeUXAssetBrowser.html">getSharedInstance()</a> and <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeUXAssetBrowser.html">popupFileBrowser()</a>. \
\
                        <br> \
                        <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeUXAssetBrowser.html">AdobeUXAssetBrowser.getSharedInstance()</a> \
                         is a static method that returns an instance of the <span class="toolTip">Asset Browser</span> as a <a href="https://en.wikipedia.org/?title=Singleton_pattern">singleton</a>.  \
                        <br> \
                        <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeUXAssetBrowser.html">popupFileBrowser(Activity activity, int requestCode)</a> is a void method that launches the <span class="toolTip">Asset Browser</span>. It extends the <a href="http://developer.android.com/reference/android/app/Activity.html#startActivityForResult(android.content.Intent, int)">startActivityForResult()</a> method of the Android framework which will be important later when we start to retrieve files from the <span class="toolTip">Asset Browser</span>. \
                        <br> \
                        <br> \
                        The <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeUXAssetBrowser.html">AdobeUXAssetBrowser</a> class also allows a degree of customizability by passing a <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeUXAssetBrowserConfiguration.html">AdobeUXAssetBrowserConfiguation</a> object as a third parameter to the <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeUXAssetBrowser.html">popupFileBrowser()</a> method. The <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeUXAssetBrowserConfiguration.html">AdobeUXAssetBrowserConfiguation</a> object allows for many of different options. We will be only using one, <span class="picTip">My Account</span>, which allows the user to look at their account settings as well as gives the user the ability to log out of their <span class="toolTip">Creative Cloud</span> account. \
                        <pre class="prettyprint">                            \
                                //function to launch the Asset Browser \r\
                                private void gotoAssetBrowserScreen() { \r\
                                     \r\
                                    //Displays a Creative Cloud asset browser component for viewing and selecting Adobe Creative Cloud assets. \r\
                                    //This API pops up the default File Browser as an Activity                                                     \r\
 \r\
                                    //retrieves an instance of the AdobeUXAssetBrowser activity using the Creative Cloud SDK. \r\
                                    AdobeUXAssetBrowser sharedAssetBrowserInstance = AdobeUXAssetBrowser.getSharedInstance(); \r\
 \r\
//start of change -- start of change -- start of change -- start of change \r\
                                    //creates the AssetBrowser configuration object to add options to  \r\
                                    AdobeUXAssetBrowserConfiguration browserConfiguration = new AdobeUXAssetBrowserConfiguration(); \r\
 \r\
                                    //adds an enum of options constants to the options property of AssetBrowser configuration object, in this case ENABLE_MYACCOUNT_OPTION which will enable My Account \r\
                                    browserConfiguration.options = EnumSet.of(AdobeUXAssetBrowserOption.ENABLE_MYACCOUNT_OPTION); \r\
 \r\
                                    //launches the AdobeUXAssetBrowser singleton with customized options, in this case enabling My Account \r\
                                    sharedAssetBrowserInstance.popupFileBrowser(this, CREATIVE_SDK_SAMPLE_REQUEST_CODE, browserConfiguration); \r\
//end of change -- end of change -- end of change -- end of change \r\
                                } \r\
                        </pre> \
\
                        Look at the documentation of the <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeUXAssetBrowserConfiguration.html">AdobeUXAssetBrowserConfiguation</a> class and the <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeUXAssetBrowserOption.html">AdobeUXAssetBrowserOption</a> class to see all the available options to choose from.           \
                        </div>';

dict['retrieving-selected-files'] = '<div class="textDiv center-block retrieving-selected-files"> \
                            We have a minimal UI, and a functioning <span class="toolTip">Asset Browser</span>, now we are going to retrieve the file that we select from the <span class="toolTip">Asset Browser</span>. \
                            <br> \
                            <br> \
                            Earlier we learned that the <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeUXAssetBrowser.html">popupFileBrowser()</a> extends the <a href="http://developer.android.com/reference/android/app/Activity.html#startActivityForResult(android.content.Intent, int)">startActivityForResult()</a> Android framework method. This enables retrieving a file from the <span class="toolTip">Asset Browser</span> to be no different than retrieving data from another activity upon completion. We do it in our <code class="prettyprint">onActivityResult()</code> method.  \
                            <pre class="prettyprint">\
                                //when the activity receives the result from another activity it executes this function \r\
                                @Override \r\
                                public void onActivityResult(int requestCode, int resultCode, Intent data) { \r\
                                    super.onActivityResult(requestCode, resultCode, data); \r\
                                    _authSessionHelper.onActivityResult(requestCode, resultCode, data); \r\
 \r\
//start of change -- start of change -- start of change -- start of change \r\
                                    //execute if a file from the Asset Browser was selected \r\
                                    if (requestCode == CREATIVE_SDK_SAMPLE_REQUEST_CODE && resultCode == RESULT_OK && data != null) { \r\
                                         \r\
                                        //instatiates the ResultProvider helper class method  \r\
                                        AdobeUXAssetBrowser.ResultProvider assetBrowserResult = new AdobeUXAssetBrowser.ResultProvider(data); \r\
 \r\
                                        //creates a new ArrayList of AdobeSelection objects that is filled in by the ArrayList of AdobeSelection objects returned by the getSelectionAssetArray() method of the instantiated ResultProvider \r\
                                        ArrayList&lt;AdobeSelection&gt; mSelectedAssetsList = assetBrowserResult.getSelectionAssetArray(); \r\
                                         \r\
                                    } \r\
                                     \r\
                                    //execute if no file was selected and the back button was pressed  \r\
                                    else if(requestCode == CREATIVE_SDK_SAMPLE_REQUEST_CODE && resultCode == RESULT_CANCELED){ \r\
                                        //do nothing                                          \r\
                                    } \r\
//end of change -- end of change -- end of change -- end of change \r\
                                } \r\
                        </pre> \
\
                        Here we make use of the <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeUXAssetBrowser.ResultProvider.html">ResultProvider</a> helper class which makes accessing the files selected by the user very simple. We also created an <a href="http://developer.android.com/reference/java/util/ArrayList.html">ArrayList</a> of <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeSelection.html">AdobeSelection</a> objects. \
                        <br> \
                        <br> \
                        Before speaking of <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeSelection.html">AdobeSelection</a> objects we must cover <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeAsset.html">AdobeAsset</a> objects. <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeAsset.html">AdobeAsset</a> is the base class of all objects presented in the <span class="toolTip">Asset Browser</span>, and all objects stored in the Adobe <span class="toolTip">Creative Cloud</span>.  \
                        <br> \
                        <br> \
                        <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeSelection.html">AdobeSelection</a> is the base class of all objects selected from the <span class="toolTip">Asset Browser</span>. The <span class="toolTip">Asset Browser</span> displays many different types of files, that a user can select and retrieve from their <span class="toolTip">Creative Cloud</span> account. Since they all share the common base class of <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeSelection.html">AdobeSelection</a> they can all be passed as an <a href="http://developer.android.com/reference/java/util/ArrayList.html">ArrayList</a> of <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeSelection.html">AdobeSelection</a> objects. This allows us to select different types of files and retrieve them all at the same time.                         \
                        </div> ';

dict['display-the-files'] = '<div class="textDiv center-block display-the-files"> \
\
                            We now have a minimal UI, a working <span class="toolTip">Asset Browser</span>, and the ability to select files from the <span class="toolTip">Asset Browser</span>. The next and last step in this tutorial is to display a file retrieved from the <span class="toolTip">Asset Browser</span>. As mentioned earlier there are many types of files that extend the <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeSelection.html">AdobeSelection</a> class, but for the sake of clarity we will only be covering how to interact with <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeAssetFile.html">AdobeAssetFiles</a> in this tutorial. We do have documentation available for <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobePhotoAsset.html">AdobePhotoAsset</a>, <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeAssetLibrary.html">AdobeAssetLibrary</a>, <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeAssetLineFile.html">AdobeAssetLineFile</a>, <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeAssetDrawFile.html">AdobeAssetDrawFile</a>, <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeAssetSketchbook.html">AdobeAssetSketchbook</a>, <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeAssetCompFile.html">AdobeAssetCompFile</a>, <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeAssetPSMixFile.html">AdobeAssetPSMixFile</a>. \
                            <br> \
                            <br> \
                            To display the file retrieved from the <span class="toolTip">Asset Browser</span>, we must add a method that will convert the file from an <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeAssetFile.html">AdobeAssetFiles</a> to an <a href="http://developer.android.com/reference/android/widget/ImageView.html">ImageView</a>. Then we must call that method from our <code class="prettyprint">onActivityResult()</code> method.  \
 \
                            <pre class="prettyprint">\
                                //when the activity receives the result from another activity it executes this function  \r\
                                @Override \r\
                                public void onActivityResult(int requestCode, int resultCode, Intent data) { \r\
                                    super.onActivityResult(requestCode, resultCode, data); \r\
                                    _authSessionHelper.onActivityResult(requestCode, resultCode, data); \r\
 \r\
                                    //execute if a file from the Asset Browser was selected \r\
                                    if (requestCode == CREATIVE_SDK_SAMPLE_REQUEST_CODE && resultCode == RESULT_OK && data != null) { \r\
                                         \r\
                                        //instatiates the ResultProvider helper class method  \r\
                                        AdobeUXAssetBrowser.ResultProvider assetBrowserResult = new AdobeUXAssetBrowser.ResultProvider(data); \r\
 \r\
                                        //creates a new ArrayList of AdobeSelection objects that is filled in by the ArrayList of AdobeSelection objects returned by the getSelectionAssetArray() method of the instantiated ResultProvider \r\
                                        ArrayList&lt;AdobeSelection&gt; mSelectedAssetsList = assetBrowserResult.getSelectionAssetArray(); \r\
//start of change -- start of change -- start of change -- start of change \r\
                                        //grab the first AdobeSelection object from the ArrayList  \r\
                                        AdobeSelection selectionObj = mSelectedAssetsList.get(0); \r\
 \r\
                                        //check to make sure that the selected object is an AdobeSelectionAsset, then retrieve it and pass it to our convert function  \r\
                                        if (selectionObj instanceof AdobeSelectionAsset) \r\
                                            convertToImage(((AdobeSelectionAsset) selectionObj).getSelectedItem(), imageView); \r\
//end of change -- end of change -- end of change -- end of change                                         \r\
                                     } \r\
                                     \r\
                                    //execute if no file was selected and the back button was pressed  \r\
                                    else if(requestCode == CREATIVE_SDK_SAMPLE_REQUEST_CODE && resultCode == RESULT_CANCELED){ \r\
                                        //do nothing                                          \r\
                                    } \r\
                                } \r\
 \r\
//start of change -- start of change -- start of change -- start of change \r\
                                //method that converts the passed AdobeAsset into an image and sets the passed imageView to that image \r\
                                private void convertToImage(AdobeAsset asset, final ImageView localImageView) { \r\
                                    if (asset instanceof AdobeAssetFile) { \r\
                                        final AdobeAssetFile aFile = (AdobeAssetFile) asset; \r\
                                        Log.d("AtachImage","Calling AtachImage>>>>>>>>>>>>>>>>>>>>>>>"); \r\
                                        aFile.getRenditionWithType(AdobeAssetFileRenditionType.ADOBE_ASSET_FILE_RENDITION_TYPE_PNG, \r\
                                                //set the dimensions of the image to those of the passed imageview \r\
                                                new AdobeAssetImageDimensions(localImageView.getWidth() , localImageView.getHeight()), \r\
 \r\
                                                //if everything succesfull then the AdobeAsset is converted to an image and the image view is set to that image \r\
                                                new IAdobeGenericRequestCallback&lt;byte[], AdobeAssetException&gt;() { \r\
                                                    @Override \r\
                                                    public void onCompletion(byte[] data) { \r\
                                                        InputStream inData = new ByteArrayInputStream(data); \r\
                                                        Bitmap image = BitmapFactory.decodeStream(inData); \r\
                                                        localImageView.setImageBitmap(image); \r\
                                                        Log.d("AtachImage", "COMPLETED getRenditionWithType>>>>>>>>>>>>>>>>>>>>>>>"); \r\
                                                    } \r\
 \r\
                                                    @Override \r\
                                                    public void onCancellation() { \r\
                                                    //do nothing \r\
                                                    } \r\
 \r\
                                                    //if there is an error then we change the image view to have a red background and an error is logged.  \r\
                                                    @Override \r\
                                                    public void onError(AdobeAssetException error) { \r\
                                                        localImageView.setBackgroundColor(Color.parseColor("#ffff251c")); \r\
                                                        Log.d("ERROR", "ERROR getRenditionWithType>>>>>>>>>>>>>>>>>>>>>>>"); \r\
                                                    } \r\
 \r\
                                                    @Override \r\
                                                    public void onProgress(double progress) { \r\
                                                    //do nothing \r\
                                                    } \r\
                                                }); \r\
                                    } \r\
                                } \r\
//end of change -- end of change -- end of change -- end of change                                                                         \r\
                            </pre> \
 \
                            The <code class="prettyprint">convertToImage()</code> method takes an <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeAsset.html">AdobeAsset</a> and an <a href="http://developer.android.com/reference/android/widget/ImageView.html">ImageView</a> as its parameters, converts the <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeAsset.html">AdobeAsset</a> into a <a href="http://developer.android.com/reference/android/graphics/Bitmap.html">Bitmap</a>, and then sets the passed <a href="http://developer.android.com/reference/android/widget/ImageView.html">ImageView</a> to the converted <a href="http://developer.android.com/reference/android/graphics/Bitmap.html">Bitmap</a>. If for some reason an error occurs during this proccess we set the <a href="http://developer.android.com/reference/android/widget/ImageView.html">ImageView</a>\'s background to red, to let us know that something has gone wrong. \
                            <br> \
                            <br> \
                            Our test app is now fully functional! Read through the provided documentation to figure out how to extend the capabilities of this app. The <code class="prettyprint">SampleActivity.java</code> file should look like the code below. \
\
                        </div>';

//dict 2 
var vocabDict = {};

vocabDict['Creative Cloud SDK'] = "Adobe’s Creative SDK gives your users incredible creative power, and provide a seamless workflow between your apps and Adobe’s Creative Cloud services.";
vocabDict['Creative Cloud'] = "Adobe's Creative Cloud storage platform allows user to access their files on the fly from anywhere.";
vocabDict['Asset Browser'] = "A simple UI for browsing the user's files as well as selecting one for download.";
vocabDict['Boolean'] = "A variable of the primitive data type boolean can have two values: true and false.";

//<span class="toolTip">Asset Browser</span>
var picDict = {};
picDict['log into their Creative Cloud account'] = '<img class= "displayPic" src="img/log-into-their-Creative-Cloud-account.png">';
picDict['layout XML file'] = '<img src="img/layout-XML-file.png" class= "displayPic"">';
picDict['display our new layout'] = '<img src="img/display-our-new-layout.png" class= "displayPic">';
picDict['My Account'] = '<img src="img/My Account.png" class= "displayPic">';






/*
<a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeUXAssetBrowser.html">AdobeUXAssetBrowser</a>
<a href="https://developer.android.com/training/index.html">Android Development</a>
<a href="http://www.adobe.com/creativecloud.html">Creative Cloud account</a>
<a href="https://creativesdk.adobe.com/myapps.html">Registered an Application</a>
<a href="http://developer.android.com/guide/topics/ui/layout/linear.html">LinearLayout</a>
<a href="http://developer.android.com/reference/android/widget/TextView.html">TextView</a>
<a href="http://developer.android.com/reference/android/widget/Button.html">Button</a>
<a href="http://developer.android.com/reference/android/widget/ImageView.html">ImageView</a>
<a href="http://developer.android.com/reference/android/view/View.html">View</a>
<a href="http://developer.android.com/reference/android/view/View.OnClickListener.html">listener</a>
<a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeUXAssetBrowser.html">getSharedInstance()</a>
<a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeUXAssetBrowser.html">popupFileBrowser()</a>
<a href="https://en.wikipedia.org/?title=Singleton_pattern">singleton</a>
<a href="http://developer.android.com/reference/android/app/Activity.html#startActivityForResult(android.content.Intent, int)">startActivityForResult()</a>
<a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeUXAssetBrowserConfiguration.html">AdobeUXAssetBrowserConfiguation</a>
<a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeUXAssetBrowserOption.html">AdobeUXAssetBrowserOption</a>
<a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeUXAssetBrowser.ResultProvider.html">ResultProvider</a>
<a href="http://developer.android.com/reference/java/util/ArrayList.html">ArrayList</a>
<a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeSelection.html">AdobeSelection</a>
<a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeAsset.html">AdobeAsset</a>
<a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeAssetFile.html">AdobeAssetFiles</a>
<a href="http://developer.android.com/reference/android/graphics/Bitmap.html">Bitmap</a>
<a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobePhotoAsset.html">AdobePhotoAsset</a>
<a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeAssetLibrary.html">AdobeAssetLibrary</a>, <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeAssetLineFile.html">AdobeAssetLineFile</a>, <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeAssetDrawFile.html">AdobeAssetDrawFile</a>, <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeAssetSketchbook.html">AdobeAssetSketchbook</a>, <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeAssetCompFile.html">AdobeAssetCompFile</a>, <a href="https://creativesdk.adobe.com/docs/android/#/com/adobe/creativesdk/foundation/storage/AdobeAssetPSMixFile.html">AdobeAssetPSMixFile</a>.




<a href=""></a>
<a href=""></a>
*/

//drop down function 
function dropdown(triangle, injectionID){
	console.log($(triangle));
	$(triangle).toggleClass("triangle-down triangle-right");
	if (triangle.className === "triangle-down"){	
		console.log("triangle turned green");
		$('#'+injectionID).append(dict[injectionID]);
		prettyPrint();
		tip();

	}
	else{
		console.log("triangle turned red")
		$("div").remove("."+injectionID);
	}	

}

//hover 
function tip (){
	$(document).ready( function (){
		$('.toolTip, .picTip').tooltip({
		    items: ".picTip, .toolTip",
		    content: function(){
		    	
		    	var text = $(this)[0].innerHTML;

		    	if ($(this)[0].className == "toolTip")
		    	{
		    		return vocabDict[text];
		    	}
		    	else 
		    	{
		    		return picDict[text];
		    	}		 
		    },
			position: { my: "left bottom-25px", at: "center", collision:"fit" }	
		});
		
	});
}



