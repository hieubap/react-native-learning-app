package com.react_native_learning_app;
import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class CalendarModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    CalendarModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @Override
    public String getName() {
    return "CalendarModule";
    }

    @ReactMethod
    public void show(String content){
        Toast.makeText(reactContext,content, Toast.LENGTH_LONG).show();
    }
 }