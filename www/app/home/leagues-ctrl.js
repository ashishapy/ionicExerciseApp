'use strict'

angular.module('eliteApp').controller('LeaguesCtrl', LeaguesCtrl);

LeaguesCtrl.$inject = ['eliteApi','$state'];

/* @ngInject */
function LeaguesCtrl(eliteApi,$state) {
  /* jshint validthis: true */
  var vm = this;

  activate();

  ////////////////
  function activate() {
    return eliteApi.getLeagues().then(function (data) {
      vm.leagues = data;
    });
  }

  vm.selectLeague = function (leagueId) {
    eliteApi.setLeagueId(leagueId)
    $state.go("app.teams");
  };
}