var fs = require('fs');

module.exports = function (gulp, config) { 
  config = config || {};
  if(typeof gulp === 'undefined') {
    throw new Error("Gulp Undefined");
  }

  var pkg = JSON.parse(fs.readFileSync(config.path || 'package.json'));
  var tasks = gulp.tasks;

  pkg.scripts = pkg.scripts || {};
  
  Object.keys(tasks).forEach(function (t) {
    pkg.scripts[t] = 'gulp '+tasks[t].name;
  });

  fs.writeFileSync(config.path || 'package.json', JSON.stringify(pkg));

};
