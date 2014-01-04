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

  var glob = Npm.require("glob");

  api.use(["tinytest", "underscore", "protoplanet"]);

  api.add_files(glob.sync("styles/**/*.styl"), "client");
  api.add_files(glob.sync("tests/styles/**/*.@(styl|css)"), "client");
  api.add_files(glob.sync("tests/**/*.js"), "server");
});