module.exports = {

    auth: '3b502b3f-b1ff-4128-bd99-626e74836d9c',
    dirs: {
        dist: 'public',
        server: 'server/dist'
    },
    server: {
        root: '/hotpads-web',
        env: process.env.NODE_ENV || 'development',
        host: 'localhost',
        port: process.env.PORT || 3000,
        nodeVersion: 'v4.2.4',
        clusterServerType: 'web',

        // Override this (e.g. to 80) if you run haproxy
        apiPort: process.env.PORT || 3000,
        logging: {
            logLevel: 'debug'
        }
    }
};
