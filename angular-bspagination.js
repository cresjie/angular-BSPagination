(function(angular){

	var app = angular.module('BSPagination',[])
					.filter('range', function() {
						return function(input, range) {
					 		
					 		var max = range.constructor == Number ? parseInt(range) : parseInt(range.max),
					 			min = range.constructor == Object ? parseInt(range.min) :0;
					 		for(var i = min;i<max;i++)
					 			input.push(i);
					 		return input;
					 	}   
					})
					.directive('bsPagination', function(){
						return {
							template: '<ul class="pagination pagination-sm" ng-show="last_page > 1">' +
										'<li ng-class="{disabled: current_page == 1}"><a href="javascript:;" aria-label="Previous" ng-click="_prevPage()">«</a></li>'+
										'<li ng-repeat="index in [] | range: {min:_getPaginationMin(), max: _getPaginationMax()}" ng-class="{active: current_page == index+1}"><a href="javascript:;" ng-click="_setPage(index+1)">{{index+1}}</a></li>'+
										'<li ng-class="{disabled: current_page == last_page}"><a href="javascript:;" aria-label="Next" ng-click="_nextPage()">»</a></li>'+
										'</ul>',
							link: function(scope, elem, attr) {
								
								scope._setPage = function(p) {
									if( scope.current_page != p ){
										scope.current_page = p;
										scope.$emit('pagination.changed',scope.current_page);
									}
									
								}

								scope._nextPage = function(){
									if(scope.current_page+1 <= scope.last_page)
										scope._setPage(scope.current_page+1);
									
										
								}

								scope._prevPage = function() {
									if(scope.current_page-1 >= 1) 
										scope._setPage(scope.current_page-1);
									
								}


								scope._getPaginationMin = function(){
									if(scope.current_page && scope.last_page){
										
										if( scope.current_page == scope.last_page )
											return scope.current_page - 5 > 0?scope.current_page - 5 :0;
										if( scope.current_page == scope.last_page - 1){
											return scope.current_page - 4 > 0 ? scope.current_page - 4 : 0;
										}
										return scope.current_page - 3 >= 0 ? scope.current_page - 3:0;
									}
									return 0;
								}

								scope._getPaginationMax = function(){
									if(  scope.current_page && scope.last_page ){
										if( scope._getPaginationMin() == 0 ){
											if( scope.last_page > 5)
												return 5;
											return scope.last_page;
										}
										return  scope.current_page + 2 < $cope.last_page ? scope.current_page + 2 : scope.last_page;
										
										
									}
									return 0;
								}
							}
						};
					});

})(angular);
