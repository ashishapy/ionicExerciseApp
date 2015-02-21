angular.module('eliteApp').controller('teamDetailCtrl', teamDetailCtrl);

teamDetailCtrl.$inject = ['$stateParams', 'eliteApi', '$ionicPopup','myTeamsService'];

/* @ngInject */
function teamDetailCtrl($stateParams, eliteApi, $ionicPopup, myTeamsService) {
  /* jshint validthis: true */
  var vm = this;
  var data = {};

  eliteApi.getLeagueData(false).then(function(d){
    data = d;

  vm.teamId = Number($stateParams.id);

  var team = _.chain(data.teams)
    .pluck('divisionTeams')
    .flatten()
    .find({"id": vm.teamId})
    .value();

  vm.teamName = team.name;

  vm.games = _.chain(data.games)
    .filter(isTeamInGame)
    .map(function (item) {
      var isTeam1 = (item.teamId === vm.teamId ? true : false);
      var opponentName = isTeam1 ? item.team2 : item.team1;///
      var scoreDisplay = getScoreDisplay(isTeam1, item.team1Score, item.team2Score);///

      return {
        gameId: item.id,
        opponent: opponentName,
        time: item.time,
        location: item.location,
        locationUrl: item.locationUrl,
        scoreDisplay: scoreDisplay,
        homeAway: (isTeam1 ? "vs." : "at")
      };
    })
    .value();

  vm.teamStanding = _.chain(data.standings)
    .pluck('divisionStandings')
    .flatten()
    .find({'teamId': vm.teamId})
    .value();

    vm.following = myTeamsService.isFollowingTeam(vm.teamId);

    vm.toggleFollow = function () {
      if(vm.following){
        var confirmPopup = $ionicPopup.confirm({
          title: 'Unfollow?',
          template: 'Are you sure you want to unfollow?'
        });
        confirmPopup.then(function (res) {
          if(res){
            myTeamsService.unfollowTeam(vm.teamId);
            vm.following = myTeamsService.isFollowingTeam(vm.teamId);
          }
        });
      } else {
        myTeamsService.followTeam(team);
        vm.following = myTeamsService.isFollowingTeam(vm.teamId);
      }
    };

  });

  function isTeamInGame(item) {
    return item.teamId === vm.teamId || item.team2Id === vm.teamId;
  }

  function getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = teamScore > opponentScore ? 'W: ' : 'L: ';
      return winIndicator + teamScore + '-' + opponentScore;
    }
    else {
      return "";
    }
  }

}
