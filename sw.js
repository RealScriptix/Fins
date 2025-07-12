const CACHE_NAME = 'fins-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            })
    );
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Background sync for video uploads
self.addEventListener('sync', event => {
    if (event.tag === 'video-upload') {
        event.waitUntil(syncVideoUploads());
    }
});

// Push notifications
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New video available!',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('Fins', options)
    );
});

// Notification click
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('/')
    );
});

async function syncVideoUploads() {
    // Handle offline video uploads
    const uploads = await getOfflineUploads();
    
    for (const upload of uploads) {
        try {
            await uploadVideo(upload);
            await removeOfflineUpload(upload.id);
        } catch (error) {
            console.error('Failed to sync upload:', error);
        }
    }
}

async function getOfflineUploads() {
    // Implementation for getting offline uploads from IndexedDB
    return [];
}

async function uploadVideo(upload) {
    // Implementation for uploading video to server
    return fetch('/api/videos', {
        method: 'POST',
        body: upload.formData
    });
}

async function removeOfflineUpload(id) {
    // Implementation for removing offline upload from IndexedDB
    return true;
}