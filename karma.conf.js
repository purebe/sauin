process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
	config.set({
		browsers: ['ChromeHeadless'],
		frameworks: ['mocha'],
		plugins: [
			'karma-chrome-launcher',
			'karma-mocha',
			'karma-webpack'
		],
		webpack: {
			mode: 'development'
		},
		preprocessors: {
			'test/**/*.js': ['webpack']
		},
		files: [
			'test/**/*.js'
		],
		reporters: [
			'progress'
		],
		colors: true,
		autoWatch: false
	});
};
