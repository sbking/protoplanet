"use strict";

var fs = Npm.require("fs"),
  path = Npm.require("path"),
  glob = Npm.require("glob"),
  css = Npm.require("css"),
  diff = Npm.require("diff"),
  normalizeCss, styleTests;

// Move to generated CSS dir
process.chdir("../client/packages/protoplanet/tests/styles");

// Read, parse, and stringify a CSS file, to ignore insignficant differences
normalizeCss = function(filePath) {
  var file = fs.readFileSync(filePath, {
    encoding: "utf8"
  });
  return css.stringify(css.parse(file));
};

// Recursive list of all CSS file paths, with extensions removed
styleTests = _.uniq(_.map(glob.sync("**/*.css"), function(filePath) {
  return filePath.replace(/(\.styl)?\.css$/, "");
}), true);

// Add a test for each pair of compiled Stylus and expected CSS files
_.each(styleTests, function(styleTest) {
  var testName = "protoplanet - styles - " + styleTest.replace(path.sep, " - ");

  Tinytest.add(testName, function(test) {
    var expectedCss = normalizeCss(styleTest + ".css"),
      actualCss = normalizeCss(styleTest + ".styl.css"),
      diffs = diff.diffCss(expectedCss, actualCss);

    _.each(diffs, function(diff) {
      if (diff.added || diff.removed) {
        test.fail({
          type: "CSS",
          unexpected: diff.added ? diff.value : undefined,
          expected: diff.removed ? diff.value : undefined
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