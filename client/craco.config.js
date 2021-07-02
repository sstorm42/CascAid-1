const path = require(`path`);

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@Actions': path.resolve(__dirname, 'src/actions'),
            '@Components': path.resolve(__dirname, 'src/components'),
            '@Constants': path.resolve(__dirname, 'src/constants'),
            '@Containers': path.resolve(__dirname, 'src/containers'),
            '@DA': path.resolve(__dirname, 'src/data_accesses'),
            '@HOC': path.resolve(__dirname, 'src/hoc'),
            '@Reducers': path.resolve(__dirname, 'src/reducers'),
        },
    },
};
