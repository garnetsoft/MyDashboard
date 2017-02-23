var app = angular.module('app', ['ui.bootstrap', 'angularSpinner', 'chart.js', 'ngCanvGauge', 'nvd3', 'ngAnimate', 'ngAudio', 'frapontillo.gage']);

app.config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
    usSpinnerConfigProvider.setDefaults({
		lines: 13, // The number of lines to draw
		  length: 5, // The length of each line
		  width: 4, // The line thickness
		  radius: 8, // The radius of the inner circle
		  corners: 1, // Corner roundness (0..1)
		  rotate: 0, // The rotation offset
		  direction: 1, // 1: clockwise, -1: counterclockwise
		  color: '#333', // #rgb or #rrggbb or array of colors
		  speed: 1, // Rounds per second
		  trail: 80, // Afterglow percentage
		  shadow: false, // Whether to render a shadow
		  hwaccel: false, // Whether to use hardware acceleration
		  className: 'spinner', // The CSS class to assign to the spinner
		  zIndex: 2e9, // The z-index (defaults to 2000000000)
		  top: '50%', // Top position relative to parent
		  left: '50%' // Left position relative to parent
		});
}]);

app.filter('titlecase', function() {
    return function(s) {
    	//console.log("Inside of titlecase...");
        s = ( s === undefined || s === null ) ? '' : s;
        return s.toString().toLowerCase().replace( /\b([a-z])/g, function(ch) {
            return ch.toUpperCase();
        });
    };
});

app.filter('titleLookup', function() {	
	return function(key, scope) {
		console.log("Inside of titleLookup..." + key + ", titleData: " + scope.titleData);
		/*angular.forEach(scope.titleData, function(k, v) {
			console.log("lookup key=" + k + ", value=" + v);
			if (key.equals(k)) {
				return v;
			}
		});*/
		return key;
	};
 });

app.directive('focusOn', function() {
   return function(scope, elem, attr) {
      scope.$on(attr.focusOn, function(e) {
          elem[0].focus();
      });
   };
});

app.directive('ngElementReady', [function() {
    return {
        priority: Number.MIN_SAFE_INTEGER, // execute last, after all other directives if any.
        restrict: "A",
        link: function($scope, $element, $attributes) {
            $scope.$eval($attributes.ngElementReady); // execute the expression in the attribute.
        }
    };
  }]);

app.directive('errorCondition', ['$animate', function($animate) {
  return function(scope, elem, attr) {
    scope.$watch(attr.errorCondition, function(value) {
      if (value == true) {
    	  $animate.removeClass(elem, 'tile-stats front pulser');
    	  $animate.addClass(elem, 'tile-stats-error front pulser animated flash ');
      } else {
    	  $animate.removeClass(elem, 'tile-stats-error front pulser animated flash');
    	  $animate.addClass(elem, 'tile-stats front pulser');
      }
    });
  };
}]);

app.directive('errorConditionBack', ['$animate', function($animate) {
  return function(scope, elem, attr) {
    scope.$watch(attr.errorConditionBack, function(value) {
      if (value == true) {
    	  $animate.removeClass(elem, 'tile-stats-back back pulser');
    	  $animate.addClass(elem, 'tile-stats-error back pulser animated flash ');
      } else {
    	  $animate.removeClass(elem, 'tile-stats-error back pulser animated flash');
    	  $animate.addClass(elem, 'tile-stats-back back pulser');
      }
    });
  };
}]);

app.directive('animateOnChange', ['$animate', '$timeout', function($animate, $timeout) {
  return function(scope, elem, attr) {
    scope.$watch(attr.animateOnChange, function() {
      $animate.addClass(elem, 'heartbeat animated pulse image').then(function() {
        $timeout(function(){
          $animate.removeClass(elem, 'heartbeat animated pulse');
        }, 0);
      });
    });
  };
}]);

app.directive("sparklinechart", function () {

    return {
        restrict: "E",
        scope: {
            data: "@",
            trigger: "@",
            type: '@',
            width: '@',
            height: '@',
            barWidth: '=',	
            barColor: '@',
            options: '='
        },
        compile: function (tElement, tAttrs, transclude) {
            tElement.replaceWith("<span>" + tAttrs.data + "</span>");
            return function (scope, element, attrs) {
            	var options = {
            			type: scope.type,
                        width: scope.width,
                        height: scope.height,                        
                        barWidth: scope.barWidth,
                        barColor: scope.barColor,
                        //value: scope.value
                      };

                      if (scope.options) {
                          for (var key in scope.options) {
                              options[key] = scope.options[key];
                          }
                      }
                      
                attrs.$observe("data", function (newValue) {
                    //console.log("inside data: " + newValue);
                    element.html(newValue);
                    element.sparkline('html', options);
                    //element.sparkline('html', { type: 'bar', width: '100%', height: '80px', barWidth: 6, barColor: 'blue' });
                });
                
                attrs.$observe("trigger", function (newValue) {
                    console.log("inside trigger: " + newValue);
                    element.html("");
                    element.sparkline('html', options);
                    //element.sparkline('html', { type: 'bar', width: '100%', height: '80px', barWidth: 6, barColor: 'blue' });
                });
            };
        }
    };
});

app.directive('modal', function () {
    return {
      template: '<div class="modal fade" title="">' + 
          '<div class="modal-dialog" title="">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="false">&times;</button>' +
                '<h4 class="modal-title">'+
                '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>' + 
                '  {{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true) {
            $(element).modal('show');
          	scope.tt_isOpen = false;
          } else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });

app.directive('validShortname', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                // Any way to read the results of a "required" angular validator here?
                var isBlank = viewValue === '';
                var invalidChars = !isBlank && !/^[A-z0-9]+$/.test(viewValue);
                var invalidLen = !isBlank && !invalidChars && (viewValue.length < 5);
                var isValid = !isBlank && !invalidChars && !invalidLen;
                ctrl.$setValidity('isBlank', !isBlank);
                ctrl.$setValidity('invalidChars', !invalidChars);
                ctrl.$setValidity('invalidLen', !invalidLen);
                scope.shortnameGood = isValid;
            });
        }
    };
});

app.service('ajaxService', function($http) {
	this.getData = function(URL, ajaxMethod, ajaxParams) {
		var restURL = URL + ajaxParams;
		//console.log("Inside ajaxService...");
		//console.log("Connection using URL=[" + restURL + "], Method=[" + ajaxMethod + "]");
	    // $http() returns a $promise that we can add handlers with .then()
	    return $http({
	        method: ajaxMethod,
	        url: restURL,
	     });
	 };

	this.postData = function(URL, ajaxMethod, jsonData, ajaxParams) {
		var restURL = URL + ajaxParams;
		//console.log("Inside ajaxService POST...");
		//console.log("Connection using URL=[" + restURL + "], Method=[" + ajaxMethod + "]");
		
	    // $http() returns a $promise that we can add handlers with .then()
	    return $http({
	        method: ajaxMethod,
	        url: restURL,
	        headers: {'Content-Type': 'application/json'},
	        data: jsonData,
	     });
		
	};
});

app.directive('splitArray', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {

            function fromUser(text) {
            	if (text != null)
            		return text.split("\n");
            }

            function toUser(array) {
            	if (array != null)
                return array.join("\n");
            }

            ngModel.$parsers.push(fromUser);
            ngModel.$formatters.push(toUser);
        }
    };
});

/* -----------------------------------------------------------------------
* MAIN CONTROLLER  
--------------------------------------------------------------------------*/
app.controller('MainCtrl', function ($scope, $rootScope, $http, $log, $interval, $modal, $filter, ajaxService, usSpinnerService, ngAudio) {

  $scope.heartbeat = {};
  $scope.heartbeat.count = 0;
  $scope.heartbeat.error = false;
  
  $scope.alert_sound = ngAudio.load("sounds/Red Alert.mp3");
  $scope.alert_sound.loop = true;
  $scope.alert_sound.mute = false;

  $scope.dashboard = {};
  $scope.dashboard.today_heading = "API Calls Today"
  $scope.dashboard.today_count = 0;
  $scope.dashboard.today_avg = 0;
  $scope.dashboard.today_avg_subheading = "Daily Average Duration";
  $scope.dashboard.onboarded_heading = "Users Onboarded";
  $scope.dashboard.onboarded_count = 0;
  $scope.dashboard.onboarded_subheading = "Work in Progress";
  $scope.dashboard.signups_heading = "New Sign Ups";
  $scope.dashboard.signups_count = 0;
  $scope.dashboard.signups_subheading = "Work in Progress";
  
  $scope.tabIndex = {};
  $scope.tabIndex.current = 1;
  $scope.tabIndex.CPU = 1;
  $scope.tabIndex.MEMORY = 2;
  $scope.tabIndex.DISK = 3;
  $scope.tabIndex.IO = 4;
  $scope.tabIndex.OS = 5;
  
  $scope.operating_system = {};
  $scope.java_jvm = {};
  $scope.network_details = {};
  $scope.disk_details ={};
  $scope.disk_drive = {};
  
  $scope.network_interface = {};
  $scope.network_interface_stats = {};
  
  $scope.disk_details.customSectors = [
                          {
                              color: "#18FF0D",
                              lo: 0,
                              hi: 50
                          },
                          {
                              color: "#FF9B0C",
                              lo: 51,
                              hi: 75
                          },
                          {
                              color: "#FF320A",
                              lo: 76,
                              hi: 100
                          }
                      ];
  
  $scope.disk_details.options = {
      chart: {
          type: 'pieChart',
          width: 300,
          height: 300,
          x: function(d){return d.key;},
          y: function(d){return d.y;},
          showLabels: true,
          transitionDuration: 500,
          labelThreshold: 0.01,
          legend: {
              margin: {
                  top: 5,
                  right: 35,
                  bottom: 5,
                  left: 0
              }
          },
          yAxis: {
              tickFormat: function(d){
                  return d3.format(',.0f')(d);
              }
          }
      }
  };
  
  $scope.cpu = {};
  $scope.cpu.system = 100;
  $scope.cpu.user = 100;
  $scope.cpu.idle = 100;
  $scope.cpu.nice = 100;
  $scope.cpu.wait = 100;  

  $scope.procs = {};
  $scope.procs.historical = {};
  $scope.procs.data = [];
  $scope.procs.backup = [];
  $scope.procs.data.actual = [];
  
  $scope.memory = {};
  $scope.memory.historical = {};
  
  $scope.io = {};
  
  $scope.memory.precision= 'kilobytes';
  $scope.memory.scale = 1024;
  $scope.memory.scale_precision = "Kb";
  
  $scope.memory.stack = {};
  $scope.memory.stack.backup = [];
  $scope.memory.stack.actual = [];
  $scope.memory.stack.data = [];
  
  $scope.procs.options = {
          chart: {
              type: 'lineChart',
              height: 400,
              margin : {
                  top: 20,
                  right: 20,
                  bottom: 60,
                  left: 40
              },
              x: function(d){return d[0];},
              y: function(d){return d[1];},
              useVoronoi: false,
              clipEdge: true,
              transitionDuration: 0,
              useInteractiveGuideline: true,
              xAxis: {
                  showMaxMin: false,
                  tickFormat: function(d) {
                      return d3.time.format('%H:%M:%S')(new Date(d))
                  }
              },
              yAxis: {
                  tickFormat: function(d){
                      return d3.format(',.0f')(d);
                  }
              }
          }
      };
  
  $scope.labels = [];
  $scope.data = [];  
  $scope.series = ['Memory (total)', 'Memory (used)', 'Memory (free)'];
  $scope.colors = ['#79B8E8', '#F58F9B', '#ECD30C'];
  
  $scope.setTabIndex = function(idx) {
	  $scope.tabIndex.current = idx;
	  console.log("Inside setTabIndex..: " + $scope.tabIndex.current);
  }
  
  $scope.animateHeartbeat = function() {
	  $scope.heartbeats = $scope.heartbeats + 1;
  };
  
  $scope.startSpin = function(key) {
  	usSpinnerService.spin(key);
  };
  
  $scope.stopSpin = function(key) {
  	usSpinnerService.stop(key);
  };
 
  $scope.setTitleCase = function(input) {
  	if (input != null ) {
  		return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  	}
  };

  $scope.setLowerCase = function(input) {
  	if (input != null ) {
 		return input.replace(/\w\S*/g, function(txt){return txt.toLowerCase();});
  	}
  };

  $scope.setUpperCase = function(input) {
  	if (input != null ) {
 		return input.replace(/\w\S*/g, function(txt){return txt.toUpperCase();});
  	}
  };
  
  $scope.split = function(input, index) {
	if (input != null ) {  
		var array = input.split(':'); 
		return array[index];
	}
  };

  $scope.SplitCommas = function(input) {
  if (input != null ) {  
	  var str = input.replace(/,/g, '<br>');
	  return str;
	} 
  };
  
  $scope.currentTimeMillis = function(ts) {
	var date = new Date().getTime();
	return date;
  };

  $scope.$watch('heartbeat.error', function(newValue, oldValue) {
	//console.log("+++++inside heartbeat.error watch, " + newValue);
	if (newValue == true && !$scope.alert_sound.mute) {
	  $scope.alert_sound.play();		
	} else {
	  $scope.alert_sound.stop();
	}
  });
 	  
  $scope.processHeartbeats = function () {
    //console.log("Inside heartbeatUrl " + $scope.heartbeatUrl);

	function onSuccess(response) {
		$scope.heartbeat.error = false;
		//console.log("+++++getHeartbeats SUCCESS++++++");
		if ($scope.debugFlag == 'true') {
			//console.log("Inside getHeartbeats response..." + JSON.stringify(response.data));
		} else {
			//console.log("Inside getHeartbeats response...(XML response is being skipped, debug=false)");
		}
		$scope.heartbeat.count = response.data.count;
		$scope.heartbeat.ip_address = response.data.ip_address;
		$scope.heartbeat.start_date_long = response.data.start_date_long;
		$scope.heartbeat.current_date_long = response.data.current_date_long;
		
		//console.log('getHeartbeats loaded successfully...');
	};
		
	function onError(response) {
		//console.log("Inside getHeartbeats error condition...");
		$scope.heartbeat.error = true;
	};  
	
	//----MAKE AJAX REQUEST CALL to GET DATA----
	ajaxService.getData($scope.heartbeatUrl, 'GET', '').then(onSuccess, onError);  
  };

  $scope.muteHeartbeatError = function() {
	  console.log("Inside muteHeartbeatError...");
	  $scope.alert_sound.mute = !$scope.alert_sound.mute;
	  
	  if ($scope.heartbeat.error == true && !$scope.alert_sound.mute) {
		  $scope.alert_sound.play();		
		} else {
		  $scope.alert_sound.stop();
		}
  };
  
  $scope.causeHeartbeatError = function() {
	  //console.log("Inside causeHeartbeatError...");
	  if ($scope.heartbeatUrl == "1") {
		  $scope.heartbeatUrl = $scope.baseUrl + "/MyDashboard/rest/heartbeat";
	  } else {
		  $scope.heartbeatUrl = "1";
	  }
  }
  
  $scope.changeScale = function(precision) {
	  if (precision == 'kilobytes') {
		  $scope.memory.precision = 'kilobytes';
		  $scope.memory.scale = 1024;
		  $scope.memory.scale_precision = "Kb"; 
	  } else if (precision == 'megabytes') {
		  $scope.memory.precision = 'megabytes';
		  $scope.memory.scale = 1048576;
		  $scope.memory.scale_precision = "Mb"; 
	  } else if (precision == 'gigabytes') {
		  $scope.memory.precision = 'gigabytes';
		  $scope.memory.scale = 1073741824;
		  $scope.memory.scale_precision = "Gb"; 
	  }
  };
  
  $scope.$watch('memory.precision', function(newValue, oldValue) {
	//console.log("+++++inside heartbeat.error watch, " + newValue);
	if (newValue) {
		
		$scope.memory.total_memory = (Math.round($scope.memory.total_mem / $scope.memory.scale)).toFixed(0);
		$scope.memory.used_memory = (Math.round($scope.memory.used_mem / $scope.memory.scale)).toFixed(0);
		$scope.memory.free_memory = (Math.round($scope.memory.free_mem / $scope.memory.scale)).toFixed(0);
		
		$scope.memory.historical = {};
		$scope.memory.historical.memoryTotal = [];
		$scope.memory.historical.memoryUsed = [];
		$scope.memory.historical.memoryFree = [];
		
		$scope.memory.nvd3 = {};
		$scope.memory.nvd3.total = [];
		$scope.memory.nvd3.used = [];
		$scope.memory.nvd3.free = [];
		
		var i = 0;
		angular.forEach($scope.memory.history, function(k, v) {
			$scope.memory.historical.memoryTotal[i] = (Math.round(k.memoryTotal / $scope.memory.scale)).toFixed(0);
			$scope.memory.historical.memoryUsed[i] = (Math.round(k.memoryUsed / $scope.memory.scale)).toFixed(0);
			$scope.memory.historical.memoryFree[i] = (Math.round(k.memoryFree / $scope.memory.scale)).toFixed(0);
			var totmem= new Array(k.creationTime, (Math.round(k.memoryTotal / $scope.memory.scale)));
			var usedmem= new Array(k.creationTime, (Math.round(k.memoryUsed / $scope.memory.scale)));
			var freemem= new Array(k.creationTime, (Math.round(k.memoryFree / $scope.memory.scale)));
			$scope.memory.nvd3.total[i] = totmem;
			$scope.memory.nvd3.used[i] = usedmem;
			$scope.memory.nvd3.free[i] = freemem;
			i = i + 1;
		});
		
		$scope.data = [
		                $scope.memory.historical.memoryTotal,
		                $scope.memory.historical.memoryUsed,
		                $scope.memory.historical.memoryFree
		                ];
		
		$scope.memory.stack.backup = [{ 	"key": "Total Memory",
			"values": $scope.memory.nvd3.total,
			"seriesIndex":0
		},
		{
			"key": "Used Memory",
			"values": $scope.memory.nvd3.used,
			"seriesIndex":1
		},
		{
			"key": "Free Memory",
			"values": $scope.memory.nvd3.free,
			"seriesIndex":2
		}];
	}
  });
  
  $scope.processJVMStats = function () {
    //console.log("Inside processJVMStats " + $scope.jvmUrl);

	function onSuccess(response) {
		//console.log("+++++processJVMStats SUCCESS++++++");
		if ($scope.debugFlag == 'true') {
			//console.log("Inside processJVMStats response..." + JSON.stringify(response.data));
		} else {
			//console.log("Inside processJVMStats response...(XML response is being skipped, debug=false)");
		}
		$scope.procs.threads = response.data.threads;
		$scope.procs.stopped_procs = response.data.stopped_procs;
		$scope.procs.idle_procs = response.data.idle_procs;
		$scope.procs.sleeping_procs = response.data.sleeping_procs;
		$scope.procs.running_procs = response.data.running_procs;
		$scope.procs.zombie_procs = response.data.zombie_procs;
		$scope.procs.total_procs = response.data.total_procs;
		$scope.procs.process_history = response.data.process_history;
		
		$scope.cpu.system = response.data.system_cpu;
		$scope.cpu.user = response.data.user_cpu;
		$scope.cpu.idle = response.data.idle_cpu;
		$scope.cpu.wait = response.data.wait_cpu;
		$scope.cpu.nice = response.data.nice_cpu;
		$scope.cpu.model = response.data.cpu_model;
		$scope.cpu.vendor = response.data.cpu_vendor;
		$scope.cpu.mhz = response.data.cpu_mhz + " Mhz";
		$scope.cpu.user_history = response.data.user_cpu_history;
		$scope.cpu.system_history = response.data.system_cpu_history;
		$scope.cpu.user_history_list = $scope.cpu.user_history.join(", ");
		$scope.cpu.system_history_list = $scope.cpu.system_history.join(", ");
		
		$scope.memory.total_mem = response.data.total_mem;
		$scope.memory.used_mem = response.data.used_mem;
		$scope.memory.free_mem = response.data.free_mem;
		$scope.memory.total_memory = (Math.round($scope.memory.total_mem / $scope.memory.scale)).toFixed(0);
		$scope.memory.used_memory = (Math.round($scope.memory.used_mem / $scope.memory.scale)).toFixed(0);
		$scope.memory.free_memory = (Math.round($scope.memory.free_mem / $scope.memory.scale)).toFixed(0);
		$scope.memory.history = response.data.memory_history;
		//console.log("$scope.memory.history = " + JSON.stringify($scope.memory.history));
		
		$scope.memory.historical = {};
		$scope.memory.historical.memoryTotal = [];
		$scope.memory.historical.memoryUsed = [];
		$scope.memory.historical.memoryFree = [];
		$scope.memory.historical.currentTime = [];
		
		$scope.memory.nvd3 = {};
		$scope.memory.nvd3.total = [];
		$scope.memory.nvd3.used = [];
		$scope.memory.nvd3.free = [];
		
		var i = 0;
		angular.forEach($scope.memory.history, function(k, v) {
			var creationDateTime = moment(k.creationTime);
			$scope.memory.historical.memoryTotal[i] = (Math.round(k.memoryTotal / $scope.memory.scale)).toFixed(0);
			$scope.memory.historical.memoryUsed[i] = (Math.round(k.memoryUsed / $scope.memory.scale)).toFixed(0);
			$scope.memory.historical.memoryFree[i] = (Math.round(k.memoryFree / $scope.memory.scale)).toFixed(0);
			$scope.memory.historical.currentTime[i] = creationDateTime.format("hh:mm:ss");
			var totmem= new Array(k.creationTime, (Math.round(k.memoryTotal / $scope.memory.scale)));
			var usedmem= new Array(k.creationTime, (Math.round(k.memoryUsed / $scope.memory.scale)));
			var freemem= new Array(k.creationTime, (Math.round(k.memoryFree / $scope.memory.scale)));
			$scope.memory.nvd3.total[i] = totmem;
			$scope.memory.nvd3.used[i] = usedmem;
			$scope.memory.nvd3.free[i] = freemem;
			
			//console.log("lookup tot=" + k.memoryTotal + ", used=" + k.memoryUsed + ", free=" + k.memoryFree + ", moment=" + creationDateTime.format("hh:mm:ss"));
			i = i + 1;
		});
		
		 $scope.labels = $scope.memory.historical.currentTime;
		 
		 $scope.data.backup = [ $scope.memory.historical.memoryTotal,
				                 $scope.memory.historical.memoryUsed,
				                 $scope.memory.historical.memoryFree ];
		 
		if (JSON.stringify($scope.data.backup) != JSON.stringify($scope.data)) {
			$scope.data = JSON.parse(JSON.stringify( $scope.data.backup ));
		}
		
		$scope.procs.nvd3 = {};
		$scope.procs.nvd3.threads = [];
		$scope.procs.nvd3.stopped_procs = [];
		$scope.procs.nvd3.idle_procs = [];
		$scope.procs.nvd3.sleeping_procs = [];
		$scope.procs.nvd3.running_procs = [];
		$scope.procs.nvd3.zombie_procs = [];
		$scope.procs.nvd3.total_procs = [];
		
		var i = 0;
		angular.forEach($scope.procs.process_history, function(k, v) {
			var creationDateTime = moment(k.creationTime);
			var totThreads= new Array(k.creationTime, k.threads);
			var stoppedProcs= new Array(k.creationTime, k.stopped_procs);
			var idleProcs= new Array(k.creationTime, k.idle_procs);
			var sleepingProcs= new Array(k.creationTime, k.sleeping_procs);
			var runningProcs= new Array(k.creationTime, k.running_procs);
			var zombieProcs= new Array(k.creationTime, k.zombie_procs);
			var totalProcs= new Array(k.creationTime, k.total_procs);
			$scope.procs.nvd3.threads[i] = totThreads;
			$scope.procs.nvd3.stopped_procs[i] = stoppedProcs;
			$scope.procs.nvd3.idle_procs[i] = idleProcs;
			$scope.procs.nvd3.sleeping_procs[i] = sleepingProcs;
			$scope.procs.nvd3.running_procs[i] = runningProcs;
			$scope.procs.nvd3.zombie_procs[i] = zombieProcs;
			$scope.procs.nvd3.total_procs[i] = totalProcs;
			i = i + 1;
		});
		
		$scope.procs.backup = [{ 	"key": "Total Threads",
			"values": $scope.procs.nvd3.threads,
			"seriesIndex":0
		},
		{
			"key": "Stopped Processes",
			"values": $scope.procs.nvd3.stopped_procs,
			"seriesIndex":1
		},
		{
			"key": "Idle Processes",
			"values": $scope.procs.nvd3.idle_procs,
			"seriesIndex":2
		},
		{
			"key": "Sleeping Processes",
			"values": $scope.procs.nvd3.sleeping_procs,
			"seriesIndex":3
		},
		{
			"key": "Running Processes",
			"values": $scope.procs.nvd3.running_procs,
			"seriesIndex":4
		},
		{
			"key": "Zombie Processes",
			"values": $scope.procs.nvd3.zombie_procs,
			"seriesIndex":5
		},
		{
			"key": "Total Processes",
			"values": $scope.procs.nvd3.total_procs,
			"seriesIndex":6
		}];
		
		
		
		if (JSON.stringify($scope.procs.backup) !== JSON.stringify($scope.procs.actual)) {
			if ($scope.tabIndex.current == $scope.tabIndex.CPU) {
				console.log("Updating $scope.procs.data...")
				$scope.procs.actual = JSON.parse(JSON.stringify( $scope.procs.backup ));
				$scope.procs.data = JSON.parse(JSON.stringify( $scope.procs.backup ));
				//console.log("$scope.procs.data: " + JSON.stringify($scope.procs.data));				
			}
		}
		
	};
		
	function onError(response) {
		//console.log("Inside processJVMStats error condition...");
		$scope.heartbeat.error = true;
	};  
	
	//----MAKE AJAX REQUEST CALL to GET DATA----
	ajaxService.getData($scope.jvmUrl, 'GET', '').then(onSuccess, onError);  
  };

  $scope.processOSDetails = function () {
    console.log("Inside processOSDetails " + $scope.osDetailsUrl);

	function onSuccess(response) {
		console.log("+++++processOSDetails SUCCESS++++++");
		if ($scope.debugFlag == 'true') {
			//console.log("Inside processOSDetails response..." + JSON.stringify(response.data));
		} else {
			//console.log("Inside processOSDetails response...(XML response is being skipped, debug=false)");
		}
		$scope.operating_system.os_description = response.data.os_description;
		$scope.operating_system.os_architecture = response.data.os_architecture;
		$scope.operating_system.os_patch_level = response.data.os_patch_level;
		$scope.operating_system.os_vendor = response.data.os_vendor;
		$scope.operating_system.os_name = response.data.os_name;
		$scope.operating_system.os_version = response.data.os_version;
		$scope.operating_system.os_code_name = response.data.os_code_name;
		$scope.operating_system.os_data_model = response.data.os_data_model;
		
		$scope.java_jvm.jvm_vendor = response.data.jvm_vendor;
		$scope.java_jvm.jvm_version = response.data.jvm_version;
		$scope.java_jvm.jvm_home = response.data.jvm_home;
	};
		
	function onError(response) {
		//console.log("Inside processOSDetails error condition...");
	};  
	
	//----MAKE AJAX REQUEST CALL to GET DATA----
	ajaxService.getData($scope.osDetailsUrl, 'GET', '').then(onSuccess, onError);  
  };

  $scope.processNetworkDetails = function () {
	var netDetailsUrl = $scope.networkDetailsUrl + "?interface=" + $scope.network_interface.choice;
    console.log("Inside processNetworkDetails " + netDetailsUrl);

	function onSuccess(response) {
		console.log("+++++processNetworkDetails SUCCESS++++++");
		if ($scope.debugFlag == 'true') {
			//console.log("Inside processNetworkDetails response..." + JSON.stringify(response.data));
		} else {
			//console.log("Inside processNetworkDetails response...(XML response is being skipped, debug=false)");
		}
		$scope.network_details.interface_address = response.data.interface_address;
		$scope.network_details.interface_name = response.data.interface_name;
		$scope.network_details.interface_type = response.data.interface_type;
		$scope.network_details.interface_description = response.data.interface_description;
		$scope.network_details.interface_hwaddr = response.data.interface_hwaddr;
		$scope.network_details.interface_flags = response.data.interface_flags;
		$scope.network_details.interface_broadcast = response.data.interface_broadcast;
		$scope.network_details.interface_netmask = response.data.interface_netmask;
		$scope.network_details.interface_mtu = response.data.interface_mtu;
		$scope.network_details.interface_destination = response.data.interface_destination;
	};
		
	function onError(response) {
		//console.log("Inside processOSDetails error condition...");
	};  
	
	//----MAKE AJAX REQUEST CALL to GET DATA----
	ajaxService.getData(netDetailsUrl, 'GET', '').then(onSuccess, onError);  
  };

  $scope.setDiskDrive = function(drive) {
	  console.log("Inside setDiskDrive...: " + drive);
	  $scope.disk_drive = drive;
	  $scope.processGetAllDisks(false);
	  $scope.processDiskStatistics($scope.disk_drive);
  };
  
  $scope.processDiskStatistics = function (drive) {
	var diskUrl = $scope.allDiskDetailsUrl + "?drive=" + drive;
    console.log("Inside processDiskStatistics " + diskUrl);

	function onSuccess(response) {
		console.log("+++++processDiskStatistics SUCCESS++++++");
		if ($scope.debugFlag == 'true') {
			//console.log("Inside processDiskStatistics response..." + JSON.stringify(response.data));
		} else {
			//console.log("Inside processDiskStatistics response...(XML response is being skipped, debug=false)");
		}
		$scope.disk_details.use_percentage = 0;
		$scope.disk_details.available_bytes = 0;
		$scope.disk_details.free_bytes = 0;
		$scope.disk_details.total_files = 0;
		$scope.disk_details.used_bytes = 0;
	
		if (response.data) {
			$scope.disk_details.available_bytes = response.data.available_bytes;
			$scope.disk_details.free_bytes = response.data.free_bytes;
			$scope.disk_details.total_files = response.data.total_files;
			$scope.disk_details.used_bytes = response.data.used_bytes;
			$scope.disk_details.use_percentage = (response.data.use_percentage * 100.0);
		}
	};
		
	function onError(response) {
		//console.log("Inside processDiskStatistics error condition...");
	};  
	
	//----MAKE AJAX REQUEST CALL to GET DATA----
	ajaxService.getData(diskUrl, 'GET', '').then(onSuccess, onError);  
  };
  
  $scope.processGetAllDisks = function (initial) {
    console.log("Inside processGetAllDisks " + $scope.allDisksUrl);

	function onSuccess(response) {
		console.log("+++++processGetAllDisks SUCCESS++++++");
		if ($scope.debugFlag == 'true') {
			//console.log("Inside processGetAllDisks response..." + JSON.stringify(response.data));
		} else {
			//console.log("Inside processGetAllDisks response...(XML response is being skipped, debug=false)");
		}
		$scope.disk_details.disk = response.data.disk;
		if (initial) {
			$scope.disk_drive = $scope.disk_details.disk[0].dir_name;
			$scope.processDiskStatistics($scope.disk_drive);
		}
	};
		
	function onError(response) {
		//console.log("Inside processGetAllDisks error condition...");
	};  
	
	//----MAKE AJAX REQUEST CALL to GET DATA----
	ajaxService.getData($scope.allDisksUrl, 'GET', '').then(onSuccess, onError);  
  };

  $scope.processNetworkInterfaceStats = function () {
	var netStatsUrl = $scope.allNetworkInterfaceStatsUrl + "?interface=" + $scope.network_interface.choice;
    console.log("Inside processNetworkInterfaceStats " + netStatsUrl);

	function onSuccess(response) {
		console.log("+++++processNetworkInterfaceStats SUCCESS++++++");
		if ($scope.debugFlag == 'true') {
			//console.log("Inside processNetworkInterfaceStats response..." + JSON.stringify(response.data));
		} else {
			//console.log("Inside processNetworkInterfaceStats response...(XML response is being skipped, debug=false)");
		}
	
		if (response.data) {
			$scope.network_interface_stats.speed = response.data.speed;
			$scope.network_interface_stats.rx_bytes = ((response.data.rx_bytes < 0) ? 0 : response.data.rx_bytes);
			$scope.network_interface_stats.rx_dropped = ((response.data.rx_dropped < 0) ? 0 : response.data.rx_dropped);
			$scope.network_interface_stats.rx_errors = ((response.data.rx_errors < 0) ? 0 : response.data.rx_errors);
			$scope.network_interface_stats.rx_frame = ((response.data.rx_frame < 0) ? 0 : response.data.rx_frame);
			$scope.network_interface_stats.rx_overruns = ((response.data.rx_overruns < 0) ? 0 : response.data.rx_overruns);
			$scope.network_interface_stats.rx_packets = ((response.data.rx_packets < 0) ? 0 : response.data.rx_packets);
			$scope.network_interface_stats.tx_bytes = ((response.data.tx_bytes < 0) ? 0 : response.data.tx_bytes);
			$scope.network_interface_stats.tx_carrier = ((response.data.tx_carrier < 0) ? 0 : response.data.tx_carrier);
			$scope.network_interface_stats.tx_collisions = ((response.data.tx_collisions < 0) ? 0 : response.data.tx_collisions);
			$scope.network_interface_stats.tx_droppped = ((response.data.tx_droppped < 0) ? 0 : response.data.tx_droppped);
			$scope.network_interface_stats.tx_errors = ((response.data.tx_errors < 0) ? 0 : response.data.tx_errors);
			$scope.network_interface_stats.tx_overruns = ((response.data.tx_overruns < 0) ? 0 : response.data.tx_overruns);
			$scope.network_interface_stats.tx_packets = ((response.data.tx_packets < 0) ? 0 : response.data.tx_packets);
			
			$scope.network_interface_stats.max = $scope.network_interface_stats.rx_bytes;
			if ($scope.network_interface_stats.tx_bytes > $scope.network_interface_stats.max) {
				$scope.network_interface_stats.max = $scope.network_interface_stats.tx_bytes;
			}
			$scope.network_interface_stats.steps = 10;
			$scope.network_interface_stats.scale = $scope.network_interface_stats.max + 2000 / $scope.network_interface_stats.steps;			
		}
		
		$scope.network_interface_stats.options={ scaleOverride: true, 
								     			scaleSteps: $scope.network_interface_stats.steps,
								     			scaleStepWidth: $scope.network_interface_stats.scale,
								     			scaleStartValue: 0 }
										
		$scope.network_interface_stats.series = ["Received", "Transmitted"];
		
		$scope.network_interface_stats.labels = ['Rx Bytes', 
		                                         'Rx Dropped Bytes', 
		                                         'Rx Errors',
		                                         'Rx Overruns', 
		                                         'Rx Packets',
		                                         'Rx Frame',
		                                         'Tx Bytes', 
		                                         'Tx Dropped Bytes', 
		                                         'Tx Errors',
		                                         'Tx Overruns', 
		                                         'Tx Packets',
		                                         'Tx Carrier', 
		                                         'Tx Collisions'
		                                         ];
		
		$scope.network_interface_stats.data = [[$scope.network_interface_stats.rx_bytes,
		                                       $scope.network_interface_stats.rx_dropped,
		                                       $scope.network_interface_stats.rx_errors,
		                                       $scope.network_interface_stats.rx_overruns,
		                                       $scope.network_interface_stats.rx_packets,
		                                       $scope.network_interface_stats.rx_frame],
		                                       [$scope.network_interface_stats.tx_bytes,
		                                       $scope.network_interface_stats.tx_droppped,
		                                       $scope.network_interface_stats.tx_errors,
		                                       $scope.network_interface_stats.tx_overruns,
		                                       $scope.network_interface_stats.tx_packets,
		                                       $scope.network_interface_stats.tx_carrier,
		                                       $scope.network_interface_stats.tx_collisions]
											];
	};
		
	function onError(response) {
		//console.log("Inside processNetworkInterfaceStats error condition...");
	};  
	
	//----MAKE AJAX REQUEST CALL to GET DATA----
	if ($scope.network_interface.choice) {
		ajaxService.getData(netStatsUrl, 'GET', '').then(onSuccess, onError);  		
	}
  };
	  
  $scope.setNetworkInterface = function(netInterface) {
	  console.log("Inside setNetworkInterface...: " + netInterface);
	  $scope.network_interface.choice = netInterface;
	  $scope.processNetworkInterfaceStats($scope.network_interface.choice);
  };
  
  $scope.processGetAllNetworkInterfaces = function (initial) {
    console.log("Inside processGetAllNetworkInterfaces " + $scope.allNetworkInterfaceUrl);

	function onSuccess(response) {
		console.log("+++++processGetAllNetworkInterfaces SUCCESS++++++");
		if ($scope.debugFlag == 'true') {
			//console.log("Inside processGetAllNetworkInterfaces response..." + JSON.stringify(response.data));
		} else {
			//console.log("Inside processGetAllNetworkInterfaces response...(XML response is being skipped, debug=false)");
		}
		$scope.network_interface.list = response.data.interface;
		console.log("Inside $scope.network_interface.list..." + JSON.stringify($scope.network_interface.list));
		if (initial) {
			$scope.network_interface.choice = $scope.network_interface.list[0];
			$scope.processNetworkInterfaceStats($scope.network_interface.choice);
			$scope.processNetworkDetails($scope.network_interface.choice);
		}
	};
		
	function onError(response) {
		//console.log("Inside processGetAllDisks error condition...");
	};  
	
	//----MAKE AJAX REQUEST CALL to GET DATA----
	ajaxService.getData($scope.allNetworkInterfaceUrl, 'GET', '').then(onSuccess, onError);  
  };

  $scope.processStatistics = function () {
    console.log("Inside processStatistics " + $scope.statisticsUrl);

	function onSuccess(response) {
		console.log("+++++processStatistics SUCCESS++++++");
		if ($scope.debugFlag == 'true') {
			//console.log("Inside processStatistics response..." + JSON.stringify(response.data));
		} else {
			//console.log("Inside processStatistics response...(XML response is being skipped, debug=false)");
		}
		if (response.data) {
			$scope.dashboard.today_heading = response.data.today_heading;
			$scope.dashboard.today_count = response.data.today_count;
			$scope.dashboard.today_avg = response.data.today_avg;
			$scope.dashboard.today_avg_subheading = response.data.today_avg_subheading;
			$scope.dashboard.onboarded_heading = response.data.onboarded_heading;
			$scope.dashboard.onboarded_count = response.data.onboarded_count;
			$scope.dashboard.onboarded_subheading = response.data.onboarded_subheading;
			$scope.dashboard.signups_heading = response.data.signups_heading;
			$scope.dashboard.signups_count = response.data.signups_count;
			$scope.dashboard.signups_subheading = response.data.signups_subheading;
		}
	};
		
	function onError(response) {
		console.log("Inside processStatistics error condition...");
	};  
	
	//----MAKE AJAX REQUEST CALL to GET DATA----
	ajaxService.getData($scope.statisticsUrl, 'GET', '').then(onSuccess, onError);  
  };
	  

 $scope.setDefaults = function(debugFlag, baseUrl) {
	  $scope.baseUrl 						= baseUrl;
	  $scope.heartbeatUrl 					= baseUrl + "/MyDashboard/rest/heartbeat";
	  $scope.osDetailsUrl 					= baseUrl + "/MyDashboard/rest/osdetails";
	  $scope.allDisksUrl 					= baseUrl + "/MyDashboard/rest/getalldisks";
	  $scope.allDiskDetailsUrl 				= baseUrl + "/MyDashboard/rest/diskdetails";
	  $scope.networkDetailsUrl 				= baseUrl + "/MyDashboard/rest/networkdetails";
	  $scope.allNetworkInterfaceUrl			= baseUrl + "/MyDashboard/rest/getallnetworkinterfaces";
	  $scope.allNetworkInterfaceStatsUrl	= baseUrl + "/MyDashboard/rest/getnetworkstats";
	  $scope.statisticsUrl 					= baseUrl + "/MyDashboard/rest/statistics";
	  $scope.jvmUrl 						= baseUrl + "/MyDashboard/rest/cpu";
	  $scope.debugFlag 						= debugFlag;
	  
	  console.log("Setting Defaults");
	  console.log("DebugFlag.....................: " + $scope.debugFlag);
	  console.log("allDisksUrl...................: " + $scope.allDisksUrl);
	  console.log("heartbeatUrl..................: " + $scope.heartbeatUrl);
	  console.log("statisticsUrl.................: " + $scope.statisticsUrl);
	  console.log("osDetailsUrl..................: " + $scope.osDetailsUrl);
	  console.log("networkDetailsUrl.............: " + $scope.networkDetailsUrl);
	  console.log("allNetworkInterfaceUrl........: " + $scope.allNetworkInterfaceUrl);
	  console.log("allNetworkInterfaceStatsUrl...: " + $scope.allNetworkInterfaceStatsUrl);
	  console.log("allDiskDetailsUrl.............: " + $scope.allDiskDetailsUrl);
	  console.log("jvmUrl........................: " + $scope.jvmUrl);
	  
	  $interval($scope.processHeartbeats, 3000);
	  $interval($scope.processJVMStats, 2000);
	  $interval($scope.processStatistics, 5000);
	  $scope.processOSDetails();
	  $scope.processGetAllDisks(true);
	  $scope.processGetAllNetworkInterfaces(true);
	  $interval($scope.processNetworkInterfaceStats, 2000);

  };
});	  
