describe('Dashboard.module: unit tests', function () {
  'use strict';

  var module;

  beforeEach(function () {
    module = angular.module('refineryDashboard');
  });

  describe('Module', function () {

    it('should be registered', function () {
      expect(!!module).toEqual(true);
    });

  });

  describe('Dependencies:', function () {

    var deps,
        hasModule = function (m) {
          return deps.indexOf(m) >= 0;
        };

    beforeEach(function () {
      deps = module.value('refineryDashboard').requires;
    });

    it('should have "ngAnimate" as a dependency', function () {
      expect(hasModule('ngAnimate')).toEqual(true);
    });

    it('should have "ngSanitize" as a dependency', function () {
      expect(hasModule('ngSanitize')).toEqual(true);
    });

    it('should have "ui".scroll as a dependency', function () {
      expect(hasModule('ui.scroll')).toEqual(true);
    });

    it('should have "cut" as a dependency', function () {
      expect(hasModule('cut')).toEqual(true);
    });

    it('should have "toolTip" as a dependency', function () {
      expect(hasModule('toolTip')).toEqual(true);
    });

    it('should have "treemap" as a dependency', function () {
      expect(hasModule('treemap')).toEqual(true);
    });

    it('should have "dataSet" as a dependency', function () {
      expect(hasModule('dataSet')).toEqual(true);
    });

  });
});