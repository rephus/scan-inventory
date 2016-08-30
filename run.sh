#!/bin/bash
#cordova platform add android

#cordova plugin remove net.coconauts.notification-listener
#cordova plugin add net.coconauts.notification-listener/

cordova run android --device

adb logcat  -T 1 | grep "CONSOLE\|NotificationService\|Notification" | grep -v "invalid message"
