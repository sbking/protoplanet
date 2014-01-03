/* jshint strict: false */

Package.describe({
  summary: "Stylus UI framework for Meteor"
});

Package.on_use(function(api) {
  api.imply("stylus");
});

Package.on_test(function(api) {
  Npm.depends({
    "css": "1.6.0",
    "diff": "1.0.8",
    "glob": "3.2.7"
  });

  api.use(["tinytest", "underscore", "protoplanet"]);

  var glob = Npm.require("glob");
  if (glob) {
    api.add_files(glob.sync("styles/**/*.styl"), "client");
    api.add_files(glob.sync("tests/styles/**/*.@(styl|css)"), "client");
    api.add_files(glob.sync("tests/**/*.js"), "server");
  } else {
    console.log("Updating NPM dependencies. Meteor may crash. Re-run the test-packages command.");
  }
});