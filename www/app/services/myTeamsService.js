angular.module('eliteApp').factory('myTeamsService', myTeamsService);

myTeamsService.$inject = ['DSCacheFactory'];

/* @ngInject */
function myTeamsService(DSCacheFactory) {
  var self = this;

  self.myTeamsCache = DSCacheFactory.get('myTeamsCache');

  return {
    followTeam: followTeam,
    unfollowTeam: unfollowTeam,
    getFollowedTeams: getFollowedTeams,
    isFollowingTeam: isFollowingTeam
  };

  ///////////////////

  function followTeam(team){
    self.myTeamsCache.put(team.id, team);
  }

  function unfollowTeam(teamId){
    self.myTeamsCache.remove(teamId.toString());
  }

  function getFollowedTeams(){
    var teams = [],
      keys = self.myTeamsCache.keys();

    for (var i=0; i<keys.length; i++){
      var team = self.myTeamsCache.get(keys[i]);
      teams.push(team);
    }
    return teams;
  }

  function isFollowingTeam(teamId){
    var team = self.myTeamsCache.get(teamId);
    return team;
  }

}
