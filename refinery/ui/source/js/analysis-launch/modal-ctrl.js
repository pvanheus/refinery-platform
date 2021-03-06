'use strict';

function AnalysisLaunchModalCtrl (
  $log,
  $scope,
  $window,
  $uibModalInstance,
  timeStamp,
  workflow,
  analysisLaunchConfigService,
  analysisLaunchFactory
) {
  var nowTimeStamp = timeStamp.getTimeStamp();
  var workflowName = workflow.getName();

  $scope.analysisLaunchFlag = 'NOCALL';
  $scope.dataObj = {
    name: workflowName + ' ' + nowTimeStamp
  };
  analysisLaunchConfigService.setAnalysisConfig(
    {
      workflowUuid: workflow.getUuid()
    }
  );

  var launchAnalysis = function (params) {
    analysisLaunchConfigService.setAnalysisConfig(params);
    var launchParams = analysisLaunchConfigService.getAnalysisConfig();
    analysisLaunchFactory.postLaunchAnalysis(launchParams)
      .then(function () {
        $scope.analysisLaunchFlag = 'SUCCESS';
      }, function (error) {
        $log.log(error);
        $scope.analysisLaunchFlag = 'FAILED';
      });
  };

  $scope.ok = function () {
    $scope.analysisLaunchFlag = 'LOADING';

    if ($scope.tempName !== null) {
      var analysisParams = {
        name: $scope.dataObj.name
      };

      launchAnalysis(analysisParams);
    }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.close = function () {
    $uibModalInstance.close('close');
  };

  $scope.view = function () {
    $uibModalInstance.close('view');
    $window.location.hash = 'analyses';
  };
}

angular
  .module('refineryAnalysisLaunch')
  .controller('AnalysisLaunchModalCtrl', [
    '$log',
    '$scope',
    '$window',
    '$uibModalInstance',
    'timeStamp',
    'workflow',
    'analysisLaunchConfigService',
    'analysisLaunchFactory',
    AnalysisLaunchModalCtrl
  ]);
