/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js','jsx', 'reducer.js', 'thunk.js', 'constraints.js' , 'actions.js','admin/login',
        'pages/admin/login', 'login/index.js', 'login.reducer.js', 'login.thunk.js', 'login.constraints.js' , 'login.actions.js',
        'index.js','pages/admin/login/index.js', 'admin/login/index.js'],
}
module.exports = {
    experimental: {
        nextScriptWorkers: true,
    },
}

module.exports = nextConfig;
