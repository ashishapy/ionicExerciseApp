angular.module('eliteApp').controller('StandingsCtrl', StandingsCtrl);

StandingsCtrl.$inject = ['eliteApi'];

/* @ngInject */
function StandingsCtrl(eliteApi) {
  /* jshint validthis: true */
  var vm = this;
  var data;

  activate();

  ////////////////

  function activate() {
    eliteApi.getLeagueData().then(function (data) {
      vm.standings = data.standings;
    });
  }
}