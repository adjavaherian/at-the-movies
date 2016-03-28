module.exports = {

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
        },
        static: {
            dotfiles: 'ignore',
            etag: true,
            extensions: false,
            index: false,
            lastModified: true,
            maxAge: 31557600000,
            redirect: false
        }
    }
};
