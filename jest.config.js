module.exports = {
  testEnvironment: 'node',
  reporters: [
    'default',
    ['jest-html-reporters', {
      publicPath: './test-report',
      filename: 'report.html',
      pageTitle: 'Test Report',
      expand: true
    }]
  ]
};