angular.module('eliteApp').controller('RulesCtrl', RulesCtrl);

RulesCtrl.$inject = ['eliteApi'];

/* @ngInject */
function RulesCtrl(eliteApi) {
  /* jshint validthis: true */
  var vm = this;


  activate();

  ////////////////

  function activate() {
    eliteApi.getLeagueData().then(function (data) {
      console.log("data from rules ctrl", data)
      vm.mainContent = data.league.rulesScreen;
    });
  }


}