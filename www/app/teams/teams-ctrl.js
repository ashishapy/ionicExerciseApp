angular.module('eliteApp').controller('TeamsCtrl', TeamsCtrl);

TeamsCtrl.$inject = ['eliteApi', '$scope'];

/* @ngInject */
function TeamsCtrl(eliteApi, $scope) {
  /* jshint validthis: true */
  var vm = this;

  activate();
  ////////////////

  function activate() {
    //vm.loadList(false);
  }

  vm.loadList = function (forceRefresh) {
    eliteApi.getLeagueData(forceRefresh).then(function (data) {
      vm.teams = data.teams;
    }).finally(function () {
      $scope.$broadcast('scroll.refreshComplete');
    });
  }

  vm.loadList(false);
}