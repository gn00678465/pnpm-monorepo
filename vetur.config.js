/** @type {import('vls').VeturConfig} */
module.exports = {
    settings: {
        'vetur.ignoreProjectWarning': true,
        'vetur.useWorkspaceDependencies': true,
        'vetur.experimental.templateInterpolationService': true,
    },
    projects: [
        {
            root: './apps/nuxt-admin',
            package: './package.json',
            tsconfig: './tsconfig.json',
        },
        './apps/vue-admin',
    ],
}
