angular.module('eliteApp').controller('LocationsCtrl', LocationsCtrl);

LocationsCtrl.$inject = ['eliteApi'];

/* @ngInject */
function LocationsCtrl(eliteApi) {
  /* jshint validthis: true */
  var vm = this;

  activate();

  ////////////////

  function activate() {
    return eliteApi.getLeagueData().then(function (data) {
      vm.locations = data.locations;
    });
  }


}