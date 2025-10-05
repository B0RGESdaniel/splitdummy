module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/.jest/setup-tests.js'],
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': '<rootDir>/.jest/mocks/file-mock.js',
        '\\.(css|less|scss)$': 'identity-obj-proxy',
    },
}