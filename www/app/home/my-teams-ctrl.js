'use strict';

angular.module('eliteApp').controller('MyTeamsCtrl', MyTeamsCtrl);

MyTeamsCtrl.$inject = ['$state', 'myTeamsService', 'eliteApi'];

/* @ngInject */
function MyTeamsCtrl($state, myTeamsService, eliteApi) {
  /* jshint validthis: true */
  var vm = this;
  activate();

  ////////////////

  function activate() {
    vm.myTeams = myTeamsService.getFollowedTeams();

    console.log(vm.myTeams);

    vm.goToTeam = function(team){
      eliteApi.setLeagueId(team.leagueId);
      $state.go('app.team-detail', {id: team.id});
    };
  }
}