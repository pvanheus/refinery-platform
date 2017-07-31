(function () {
  'use strict';

  angular
  .module('refineryUserFileBrowser')
  .controller('UserFileBrowserFilesCtrl', UserFileBrowserFilesCtrl);

  UserFileBrowserFilesCtrl.$inject = [
    '$log',
    '$q',
    'uiGridConstants',
    'userFileBrowserFactory',
    'userFileSortsService',
    'gridOptionsService'
  ];

  function UserFileBrowserFilesCtrl (
      $log,
      $q,
      uiGridConstants,
      userFileBrowserFactory,
      userFileSortsService,
      gridOptionsService
  ) {
    var vm = this;
    var promise = $q.defer();
    var getUserFiles = userFileBrowserFactory.getUserFiles;
    getUserFiles().then(function (solr) {
      gridOptionsService.columnDefs = userFileBrowserFactory.createColumnDefs();
      gridOptionsService.data = userFileBrowserFactory.createData(solr.nodes);
      promise.resolve();
    }, function () {
      $log.error('/user/files/ request failed');
      promise.reject();
    });

    vm.sortChanged = function (grid, sortColumns) {
      console.log('sort', sortColumns);
      // TODO: This is copy-and-paste from file-browser
      if (typeof sortColumns !== 'undefined') {
        userFileSortsService.fields = [];
        for (var i = 0; i < sortColumns.length; i++) {
          var column = sortColumns[i];
          userFileSortsService.fields[i] = {
            name: column.field,
            direction: column.sort.direction
            // column.sort.priority seems to be redundant with array order,
            // but I don't think we have this guaranteed.
          };
          console.log('service', userFileSortsService);
        }

        // TODO: This is copy-and-paste
        getUserFiles().then(function (solr) {
          // TODO: Should there be something that wraps up this "then"? It is repeated.
          // gridOptionsService.columnDefs = userFileBrowserFactory.createColumnDefs();
          gridOptionsService.data = userFileBrowserFactory.createData(solr.nodes);
          promise.resolve();
        }, function () {
          $log.error('/user/files/ request failed');
          promise.reject();
        });
      }
    };

    gridOptionsService.appScopeProvider = vm;
    vm.gridOptions = gridOptionsService;
    vm.gridOptions.onRegisterApi = function (api) {
      console.log('register!', api);
      api.core.on.sortChanged(null, vm.sortChanged);
    };
  }
})();

