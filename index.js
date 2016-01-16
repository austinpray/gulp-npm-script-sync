var fs = require('fs');
var detectIndent = require('detect-indent');

module.exports = function (gulp, config) { 
  config = config || {};
  if(typeof gulp === 'undefined') {
    throw new Error("Gulp Undefined");
  }

  var file = fs.readFileSync(config.path || 'package.json', 'utf-8');
  var pkg = JSON.parse(file);
  var indent = detectIndent(file).indent || '  ';
  if (typeof gulp.tasks === 'object') {
    var tasks = gulp.tasks;
  } else if (typeof gulp.registry === 'function') {
    var tasks = gulp.registry().tasks();
  } else {
    throw new Error('Could not find gulp tasks');
  }

  pkg.scripts = pkg.scripts || {};
  
  Object.keys(tasks).forEach(function (t) {
    pkg.scripts[t] = 'gulp ' + tasks[t].displayName || tasks[t].name;
  });

  fs.writeFileSync(config.path || 'package.json', JSON.stringify(pkg, null, indent) + '\n');

};
