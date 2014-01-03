/* jshint strict: false */

Npm.depends({
  "css": "1.6.0",
  "diff": "1.0.8",
  "glob": "3.2.7"
});

var glob = Npm.require("glob");

Package.describe({
  summary: "Stylus UI framework for Meteor"
});

Package.on_use(function(api) {
  api.imply("stylus");

  api.add_files(glob.sync("styles/**/*.styl"), "client");
});

Package.on_test(function(api) {
  api.use(["tinytest", "test-helpers", "underscore", "protoplanet"]);

  api.add_files(glob.sync("tests/styles/**/*.@(styl|css)"), "client");
  api.add_files(glob.sync("tests/**/*.js"), "server");
});