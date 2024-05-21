importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// working *
firebase.initializeApp({
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background message body.',
        icon: '/firebase-logo.png',
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('install', function (e) {
    console.log('fcm sw install..');
    self.skipWaiting();
});

self.addEventListener('activate', function (e) {
    console.log('fcm sw activate..');
});

self.addEventListener('push', function (e) {
    console.log('push: ', e.data.json());
    if (!e.data.json()) return;

    const resultData = e.data.json().notification;
    const notificationTitle = resultData.title;
    const notificationOptions = {
        body: resultData.body,
        icon: resultData.image,
        tag: resultData.tag,
        ...resultData,
    };
    console.log('push: ', { resultData, notificationTitle, notificationOptions });

    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
    console.log('notification click');
    const url = '/';
    event.notification.close();
    event.waitUntil(clients.openWindow(url));
});
