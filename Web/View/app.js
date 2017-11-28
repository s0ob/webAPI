var InstaApi=angular.module('InstaApi',['ngResource']);

InstaApi.controller('InstaApiCtrl',function($scope,$http){
   $scope.search='';
    
$scope.fetch=function(){
   $http.jsonp('https://api.themoviedb.org/3/search/movie?api_key=ca79a6ea91d221034bf6c18bfcb5944c&query='+$scope.search+'&callback=JSON_CALLBACK')
    .success(function(result){
       console.log(result);
       $scope.data=result;
   });
}
    $scope.showDetail=function(movie)
    {
        $http.jsonp('https://api.themoviedb.org/3/movie/'+movie.id+'?api_key=ca79a6ea91d221034bf6c18bfcb5944c&callback=JSON_CALLBACK')
        .success(function(result)
                {
             
                $('.modal').modal({
                    show:true
                });
            
            $scope.q=result;
            console.log(result);
        });
    }
    $scope.hide=function(){
        $('.modal').modal({
                    show:false
                });
        
    }
    $scope.changebox=function()
    {
        var input = $('input[type="text"]');
        input.css({width:'400px'});
    }
   
    
})  ;
InstaApi.controller('InstaApiCtrls',function($scope,$http){
		$scope.SITE_PATH="http://image.tmdb.org/t/p/w500/"
		$scope.moviesLoaded=false;
	     
		$scope.getActors=function(){
   var promise=$http.jsonp('https://api.themoviedb.org/3/search/person?api_key=53eab4965ee8e679cd230dc20af022c8&query='+$scope.searchActors+'&callback=JSON_CALLBACK');
   	promise.then(successCallback, failureCallback)

			function successCallback(result) {
				console.log("successCallback", result.data.results)
				$scope.actors = result.data.results;
			}

			function failureCallback(result) {
				console.log("failureCallback", result)
			}

		}

		$scope.getMoviesById = function(id) {
			var id="/" + id + "/";
			var promise = $http.jsonp('https://api.themoviedb.org/3/person'+id+'movie_credits?api_key=53eab4965ee8e679cd230dc20af022c8&callback=JSON_CALLBACK');
			promise.then(successCallback, failureCallback)
			function successCallback(result) {
				console.log("successCallback", result.data.cast)
				$scope.cast = result.data.cast;
				$scope.moviesLoaded=true;
			}

			function failureCallback(result) {
				console.log("failureCallback", result)
			}
		}
		  $scope.showDetail=function(movie)
    {
        
    }
    $scope.hide=function(){
        $('.modal').modal({
                    show:false
                });
        
    }
    $scope.changebox=function()
    {
        var input = $('input[type="text"]');
        input.css({width:'400px'});
    }
	});