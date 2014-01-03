"use strict";

var fs = Npm.require("fs"),
  path = Npm.require("path"),
  globSync = Npm.require("glob").sync,
  css = Npm.require("css"),
  diffCss = Npm.require("diff").diffCss,
  normalizeCss, styleTests;

// Move to generated CSS dir
process.chdir(path.join("..", "client", "packages", "protoplanet", "tests", "styles"));

// Read, parse, and stringify a CSS file, to ignore insignficant differences
normalizeCss = function(filePath) {
  var file = fs.readFileSync(filePath, {
    encoding: "utf8"
  });
  return css.stringify(css.parse(file));
};

// Recursive list of all CSS file paths, with extensions removed
styleTests = _.uniq(_.map(globSync("**/*.css"), function(filePath) {
  return filePath.replace(/(\.styl)?\.css$/, "");
}), true);

// Add a test for each pair of compiled Stylus and expected CSS files
_.each(styleTests, function(styleTest) {
  var testName = "Protoplanet - styles - " + styleTest.replace(path.sep, " - ");

  Tinytest.add(testName, function(test) {
    var expectedCss = normalizeCss(styleTest + ".css"),
      actualCss = normalizeCss(styleTest + ".styl.css"),
      diffs = diffCss(expectedCss, actualCss);

    _.each(diffs, function(diff) {
      if (diff.added || diff.removed) {
        test.fail({
          type: "CSS",
          expected: diff.added ? diff.value : undefined,
          unexpected: diff.removed ? diff.value : undefined
        });
      } else {
        test.ok({
          type: "CSS",
          matched: diff.value
        });
      }
    });
  });
});