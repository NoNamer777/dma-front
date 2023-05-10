module.exports = function (config) {
    config.set({
        basePath: '',
        client: {
            jasmine: {},
            clearContext: false,
        },
        coverageReporter: {
            check: {
                global: {
                    statements: 80,
                    branches: 80,
                    functions: 80,
                    lines: 80,
                },
            },
            dir: require('path').join(__dirname, './coverage/dma-front'),
            reporters: [{ type: 'html' }, { type: 'text-summary' }],
            subdir: '.',
        },
        customLaunchers: {
            ChromeHeadlessCI: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox', '--disable-gpu'],
            },
        },
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        jasmineHtmlReporter: {
            suppressAll: true,
        },
        logLevel: config.LOG_INFO,
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
            require('@angular-devkit/build-angular/plugins/karma'),
        ],
    });
};
