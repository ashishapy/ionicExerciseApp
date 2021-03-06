'use strict'
angular.module('eliteApp').controller('LocationMapCtrl', LocationMapCtrl);

LocationMapCtrl.$inject = ['$stateParams', 'eliteApi'];

/* @ngInject */
function LocationMapCtrl($stateParams, eliteApi) {
  /* jshint validthis: true */
  var vm = this;

  activate();

  ////////////////

  function activate() {
    vm.locationId = Number($stateParams.id);

    vm.map = {
      center: {
        latitude: 38.897677,
        longitude: -77.036530
      },
      zoom: 12
    };
    vm.marker = {}

    eliteApi.getLeagueData().then(function (data) {

      vm.location = _.find(data.locations, {id: vm.locationId});
      vm.marker = {
        latitude: vm.location.latitude,
        longitude: vm.location.longitude,
        title: vm.location.name + "<br/> (Tap for direction)",
        showWindow: true
      };

      vm.map.center.latitude = vm.location.latitude;
      vm.map.center.longitude = vm.location.longitude;
    });

    vm.locationClicked = function (marker) {
      window.location = 'geo:' + marker.latitude + ',' + marker.longitude + ';u=35';
    };
  }


}