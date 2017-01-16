'use strict';

function DashboardVisWrapperResizer (localStorageService) {
  function VisWrapperResizer () {}

  /**
   * Window size of the treemap. The size of the list graph is implicitely
   * encoded in this value as well because there are only two voisualizations.
   *
   * @description
   * 0 = minimized
   * 1 = 50%
   * 2 = maximized
   *
   * @author  Fritz Lekschas
   * @date    2017-01-16
   */
  Object.defineProperty(
    VisWrapperResizer.prototype,
    'size',
    {
      get: function () {
        var localValue = localStorageService.get(
          'dashboard.satori.treemapSize'
        );

        if (localValue === null) {
          this.size = 1;
          localValue = 1;
        }

        return localValue;
      },
      set: function (value) {
        localStorageService.set(
          'dashboard.satori.treemapSize', value
        );
      }
    }
  );

  Object.defineProperty(
    VisWrapperResizer.prototype,
    'isMaxmimized',
    {
      get: function () {
        return this.size === 2;
      }
    }
  );

  Object.defineProperty(
    VisWrapperResizer.prototype,
    'isMinimized',
    {
      get: function () {
        return this.size === 0;
      }
    }
  );

  Object.defineProperty(
    VisWrapperResizer.prototype,
    'isEqualized',
    {
      get: function () {
        return this.size === 1;
      }
    }
  );

  VisWrapperResizer.prototype.maximize = function () {
    this.treemap = 2;
  };

  VisWrapperResizer.prototype.minimize = function () {
    this.treemap = 0;
  };

  VisWrapperResizer.prototype.equalize = function () {
    this.treemap = 1;
  };

  return new VisWrapperResizer();
}

angular
  .module('refineryDashboard')
  .factory('dashboardVisWrapperResizer', [
    'localStorageService',
    DashboardVisWrapperResizer
  ]);
