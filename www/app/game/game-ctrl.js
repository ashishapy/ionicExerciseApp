'use strict'
angular.module('eliteApp').controller('GameCtrl', GameCtrl);

GameCtrl.$inject = ['$stateParams', 'eliteApi'];

/* @ngInject */
function GameCtrl($stateParams, eliteApi) {
  /* jshint validthis: true */
  var vm = this;

  activate();

  ////////////////

  function activate() {
    var gameId = Number($stateParams.id);
    return eliteApi.getLeagueData(false).then(function(data){

      console.log(data);

      vm.game = _.find(data.games, {'id': gameId});

      console.log(vm.game);
    });
  }
}