(function(){
	var app = angular.module("routedTabs", ["ui.router", "ui.bootstrap"]);

	app.config(function($stateProvider, $urlRouterProvider){

		$urlRouterProvider.otherwise("/main/tab1");

		$stateProvider
			.state("main", {
				abtract: true,
				url:"/main",
				templateUrl:"main.html"
			})
			.state("main.tab1", { url: "/tab1", templateUrl: "tab1.html" })
			.state("main.tab2", {
				url: "/tab2",
				templateUrl: "tab2.html",
				controller: function($scope) {
					$scope.title = "Tab 2 controller";
				}
			})
			.state("main.tab3", {
				url: "/tab3",
				templateUrl: "tab3.html",
				controller: function($scope) {
					$scope.title = "Tab 3 controller";
				}
			})
			.state('main.tab4', {
				url: '/tab4',
				templateUrl: 'tab4.html',
				resolve: { title: function() {return 'Tab 4 title';} },
				controller: function ($scope, title) {
					$scope.title = title;
					console.log("BG tab 4 state", $scope.title);
				},
				onEnter: function(title){
					console.log("State on enter");
				},
				onExit: function(title){
					console.log("State on enter");
				}
			})
		;

	});

	app.controller("mainController", function($rootScope, $scope, $state) {

		$scope.go = function(route){
			console.log("go to route", route);
			$state.go(route);
		};

		$scope.active = function(route){
			return $state.is(route);
		};

		$scope.tabs = [
			{ heading: "Tab 1", route:"main.tab1", active:false },
			{ heading: "Tab 2", route:"main.tab2", active:false },
			{ heading: "Tab 3", route:"main.tab3", active:false },
			{ heading: "Tab 4", route:"main.tab4", active:false }
		];

		$scope.$on("$stateChangeSuccess", function() {
			console.log("stateChangeSuccess");
			$scope.tabs.forEach(function(tab) {
				tab.active = $scope.active(tab.route);
				console.log("active", tab.route, tab.active);
			});
		});
	});

}());
