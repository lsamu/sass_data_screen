var ghpages = require('gh-pages');

ghpages.publish("./dist",{
    branch: 'gh-pages',
    repo: 'https://github.com/lsamu/sass_data_screen.git'
})