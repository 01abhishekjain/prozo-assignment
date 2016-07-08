# prozo-assignment
Small assignment I made for Prozo's recruitment process


*OVERVIEW*
It's a two page app built using the Ionic Framework v1.
The first page consists of a form field that allows a user to register her/himself on the Prozo platform after having entered several data points with strict validation.
On successfull submission, the user is registered in the system and s/he can view her/his details on the following page.


*STEPS TO RUN*
In order to run the project, you need to have the basic Ionic development environment set up:
Assuming you have npm installed:
    npm install -g ionic
    npm install -g cordova (if you wish to build for Android/iOS)
    git pull https://github.com/01abhishekjain/prozo-assignment
    <cd into the folder>
    ionic serve (if you wish to view in the browser*)
    
In order to build for Android (assuming you have the Android SDK configured):
    ionic platform add android
    ionic build Android

NOTE: you can find detailed instructions here: http://ionicframework.com/docs/guide/installation.html
    
* in order for web services to run inside the browser, you need a way to work around the CORS restriction:
  option 1: Install an add-on and enable it: https://goo.gl/SpBzLM
  option 2: set up proxy on your Ionic project: http://blog.ionic.io/handling-cors-issues-in-ionic/


*DEMO*
There's an APK hosted here: https://goo.gl/EGiYWt


*DESIGN/ARCHITECTURE*
As can be seen from the code, the app is modularised page-wise. So, all the controllers and relevant templates for a page can be found inside its folder inside WWW.
The custom services/factories are included in the js folder.
There's a single CSS file for all styles.
