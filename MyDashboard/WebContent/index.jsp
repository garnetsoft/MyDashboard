<%@ page language="java" %>
<%@ page import="java.io.*" %>

<!DOCTYPE html>
<html lang="en"  ng-app="app">


<%
	/* 
	**  Using the Gentellela Admin template as a base to start...  All other elements have 
	**  been customized by me.  -- Amaury Valdes  
	** 
	**  https://github.com/kimlabs/gentelella
	**  
	*/
%>

<%
	String fullProtocol = request.getProtocol().toLowerCase();
	String protocol[] = fullProtocol.split("/");
	String baseUrl = protocol[0] + "://" + request.getHeader("Host");

	boolean isDebug = false;
	String debugParam = request.getParameter("debug");
	if (debugParam != null
			&& (debugParam.toLowerCase().equals("true")
					|| debugParam.toLowerCase().equals("yes") || debugParam
						.equals("1"))) {
		isDebug = true;
	}
%>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    
    <meta charset="utf-8">
    <meta http-equiv="cache-control" content="max-age=0" />
		<meta http-equiv="cache-control" content="no-cache" />
		<meta http-equiv="expires" content="0" />
		<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
		<meta http-equiv="pragma" content="no-cache" />	
		
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>System Dashboard</title>

    <!-- Bootstrap core CSS -->

		<link href="css/dashboard.css" rel="stylesheet" />
    <link href="css/bootstrap.css" rel="stylesheet">

    <link href="fonts/css/font-awesome.min.css" rel="stylesheet">
    <link href="css/animate.min.css" rel="stylesheet">

		<script src="js/jquery-1.11.3.js"></script>
		<script src="js/jquery.layout.js"></script>
		<script src="js/angular.js"></script>
		<script src="js/angular-touch.js"></script>
		<script src="js/angular-animate.js"></script>
		<script src="js/ui-bootstrap-tpls-0.13.0.min.js"></script>
		<script src="js/bootstrap.js"></script>
		<script src="js/angular-spinner.js"></script>
		<script src="js/moment.min.js"></script>
		<script src="js/angular.audio.js"></script>
		<script src="js/spin.js"></script>
		<script src="js/gauge.js"></script>
		<script src="js/ng-canvgauge.js"></script>
		<script src="js/sparkline/jquery.sparkline.min.js"></script>
		
		<!-- angular-chart includes -->
    <script src="js/chartjs/chart.js"></script>
		<script src="js/angular-chart/angular-chart.css"></script>
		<script src="js/angular-chart/angular-chart.js"></script>
		
		<!-- angular-nvd3 includes -->
		<link rel="stylesheet" href="js/angular-nvd3/nv.d3.min.css"/>
		<script src="js/angular-nvd3/d3.min.js"></script>
		<script src="js/angular-nvd3/nv.d3.min.js"></script>
		<script src="js/angular-nvd3/angular-nvd3.min.js"></script>
		
		<!-- angular-justgage includes -->
		<script src="js/justgage/raphael-2.1.4.min.js"></script>
		<script src="js/justgage/justgage-1.1.0.js"></script>
		<script src="js/justgage/angular-gage.js"></script>
		
		<!-- Custom styling plus plugins -->
    <link href="css/custom.css" rel="stylesheet">

		<script src="js/dashapp.js"></script>

    <!--[if lt IE 9]>
        <script src="../assets/js/ie8-responsive-file-warning.js"></script>
        <![endif]-->

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
					<script src="js/html5shiv.min.js"></script>
          <script src="js/respond.min.js"></script>
        <![endif]-->

</head>


<body class="nav-md" ng-controller="MainCtrl">

    <div class="container body">
        <div class="main_container">

            <div class="col-md-3 left_col">
  	            <div class="left_col scroll-view">
                    <div class="navbar nav_title" style="border: 0;">
                        <a href="index.jsp" class="site_title">
                        	<span class="image_icon"><img src="images/dashboardIcon.png" alt="logo" /></span> 
                        	<span>Dashboard</span> 
                        </a>
                    </div>
                    <div class="clearfix"></div> 
                    
                    <!-- menu profile quick info -->
                    <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">

                        <div class="menu_section"> 
                            <h3>&nbsp;</h3>
                            <ul class="nav side-menu">
                                <li><a><i class="fa fa-home"></i> Home <span class="fa fa-chevron-down"></span></a>
                                    <ul class="nav child_menu" style="display: none">
                                        <li><a href="index.jsp">Dashboard</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                   </div>
               </div>
            </div>

            <!-- top navigation -->
            <div class="top_nav">

						<div class="nav_menu">
							<nav class="" role="navigation">
								<div class="nav toggle">
									<a id="menu_toggle" data-toggle="tooltip" data-placement="right"
										title="Toggle Sidebar"> <i class="fa fa-bars"></i> </a>
								</div>

                <ul class="nav navbar-nav navbar-right">
                 	<li class="">
                    <a href="test.html" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
											<span class=" fa fa-angle-down"></span> 
										</a>
										<ul role="menu" class="dropdown-menu dropdown-usermenu animated fadeInDown pull-right">
											<li><a href="javascript:;"> Profile</a></li>
											<li><a href="javascript:;"> 
												<span>Settings</span>
												<span class="badge bg-red pull-right">30%</span> 
											</a>
											</li>
											<li><a href="javascript:;">Help</a>
											</li>
											<li><a href="javascript:;"><i
													class="fa fa-sign-out pull-right"></i> Log Out</a>
											</li>
										</ul>
									</li>

									<li role="presentation" class="dropdown">
										<a href="javascript:;" class="dropdown-toggle info-number"
											data-toggle="dropdown" aria-expanded="false"> 
											<i class="fa fa-bell"></i> 
											<span class="badge bg-red">6</span> 
										</a>
										<ul id="menu1"
											class="dropdown-menu list-unstyled msg_list animated fadeInDown"
											role="menu">
											<li><a> <span class="image"> <img
														src="images/users/amaury.png" alt="Profile Image" /> </span> <span>
														<span>Amaury Valdes</span> <span class="time">7 mins ago</span>
												</span> <span class="message"> Dashboard has been running without
												any problems for several weeks... </span> </a></li>
											<li><a> <span class="image"> <img
														src="images/users/amaury.png" alt="Profile Image" /> </span> <span>
														<span>Amaury Valdes</span> <span class="time">39 mins ago</span>
												</span> <span class="message"> Noticed some some inconsistencies in the
												data.  Will mention to Management... </span> </a></li>
											<li><a> <span class="image"> <img
														src="images/users/amaury.png" alt="Profile Image" /> </span> <span>
														<span>Amaury Valdes</span> <span class="time">3 hours ago</span>
												</span> <span class="message"> We are planning on releasing the final
												version of the dashboard next week... </span> </a></li>
											<li><a> <span class="image"> <img
														src="images/users/amaury.png" alt="Profile Image" /> </span> <span>
														<span>Amaury Valdes</span> <span class="time">2 days ago</span>
												</span> <span class="message"> Still working on some last minute changes
												that I think will add to the WOW factor... </span> </a></li>
											<li>
												<div class="text-center">
													<a> <strong>See All Alerts</strong> <i
														class="fa fa-angle-right"></i> </a>
												</div></li>
										</ul>
									</li>
									<li><a id="bolt" data-toggle="tooltip" data-placement="bottom" title="Simulate Log File Error" href="javascript:createAlert();" class="dropdown-toggle info-number"><i class="fa fa-bolt"></i></a></li>
									<li><a id="bomb" data-toggle="tooltip" data-placement="bottom" title="Simulate Server Down" ng-click="causeHeartbeatError()" class="dropdown-toggle info-number"><i class="fa fa-bomb"></i></a></li>
									<li><a id="speaker" data-toggle="tooltip" data-placement="bottom" title="Mute Alarm" ng-click="muteHeartbeatError()" class="dropdown-toggle info-number">
										<i ng-show="!alert_sound.mute" class="glyphicon glyphicon-volume-up"></i>
										<i ng-show="alert_sound.mute" class="glyphicon glyphicon-volume-off"></i>
										</a>
									</li>
	              </ul>
              </nav>
            </div>

            </div>
            <!-- /top navigation -->


            <!-- page content -->
            <div class="right_col" role="main">

                <br />
                <div class="">

                    <div class="row top_tiles" id="row-1">
                        <div id="card-1" class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="tile-stats">
                                <div class="image">
                                	<img src="images/api-icon.png" alt="api" />
                                </div>
                                <div class="count">{{dashboard.today_count}}</div>
                                <h3>{{dashboard.today_heading}}</h3>
                                <p>{{dashboard.today_avg}} Daily Average Duration</p>
                            </div>
                        </div>
                        <div id="card-2" class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="tile-stats">
                                <div class="image">
                                	<img src="images/associate.png" alt="associate" />
                                </div>
                                <div class="count">{{dashboard.onboarded_count}}</div>
                                <h3>{{dashboard.onboarded_heading}}</h3>
                                <p>Number of users recently hired</p>
                            </div>
                        </div>
                        <div id="card-3" class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="tile-stats">
                                <div class="image">
                                	<img src="images/bar-graph.png" alt="graph" />
                                </div>
                                <div class="count">{{dashboard.signups_count}}</div>
                                <h3>{{dashboard.signups_heading}}</h3>
                                <p>Number of users pending hire</p>
                            </div>
                        </div>
                        <div id="card-4" class="animated col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div error-condition="heartbeat.error" class="tile-stats pulser" id="front-4">
                                <div animate-on-change="heartbeat.count" class="heartbeat animated pulse image">
                                	<img src="images/heart-48.png" alt="heart" />
                                </div>
                                <div class="count">{{ heartbeat.count }}</div>
                                <h3>System Heartbeat</h3>
                                <p>Monitors system availability</p>
                            </div>
                        </div>
                    </div>

									<div class="container">
										<ul class="nav nav-tabs">
									    <li class="active"><a data-toggle="tab" href="#cpu_tab" ng-click="setTabIndex(tabIndex.CPU)"><i class="fa fa-laptop"></i> CPU</a></li>
									    <li><a data-toggle="tab" href="#memory_tab" ng-click="setTabIndex(tabIndex.MEMORY)"><i class="fa fa-ticket"></i> Memory</a></li>
									    <li><a data-toggle="tab" href="#disk_tab" ng-click="setTabIndex(tabIndex.DISK)"><i class="fa fa-database"></i> Disk</a></li>
									    <li><a data-toggle="tab" href="#network_tab" ng-click="setTabIndex(tabIndex.IO)"><i class="fa fa-sitemap"></i> I/O & Network</a></li>
									    <li><a data-toggle="tab" href="#os_tab" ng-click="setTabIndex(tabIndex.OS)"><i class="fa fa-windows"></i> OS / Java</a></li>									    
									  </ul>
									  
									  <div class="tab-content">
									  	
	                  <!-- CPU Details Tab -->				
										<div id="cpu_tab" class="tab-pane fade in active">
											<!-- CPU Details Tab -->
											<div class="row">
                        <div class="col-md-12">
                            <div class="x_panel">
                                <div class="x_title">
                                    <h2>CPU Statistics<small>Avg Response Times</small></h2>
                                    <ul class="nav navbar-right panel_toolbox">
                                        <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                        </li>
                                        <!-- <li class="dropdown">
                                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                                            <ul class="dropdown-menu" role="menu">
                                                <li><a href="#">Settings 1</a>
                                                </li>
                                                <li><a href="#">Settings 2</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li><a class="close-link"><i class="fa fa-close"></i></a> -->
                                        </li>
                                    </ul>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="x_content">
                            			<span class="pull-left cpuIcon"></span>
                                   <div class="DetailsSlab">
                                   	 <p class="title">{{cpu.model}}</p>
                                   	 <p class="title">{{cpu.vendor}} {{cpu.mhz}}</p>
                                 	 </div>
                                    <div class="row" style="border-bottom: 1px solid #E0E0E0; padding-bottom: 5px; margin-bottom: 5px;">
                                        <div class="col-md-12" style="overflow:hidden;">
                                        		<div class="col-md-6">
            																	<sparklinechart data="{{cpu.system_history_list}}" trigger="{{tabIndex}}" options="{type: 'line', width: '90%', height: '80px', tooltipFormat: '<span>{{prefix}}{{y}}{{suffix}}</span>', lineColor: 'blue', fillColor: 'lightblue'}"></sparklinechart>
         																			<h4>System CPU History</h4>
         																		</div>
        																		<div class="col-md-6">
            																	<sparklinechart data="{{cpu.user_history_list}}" trigger="{{tabIndex}}" options="{type: 'line', width: '90%', height: '80px', tooltipFormat: '<span>{{prefix}}{{y}}{{suffix}}</span>', lineColor: 'green', fillColor: 'lightgreen'}"></sparklinechart>
        																			<h4>User CPU History</h4>
        																		</div>
                                        			<!-- <span spark-line ng-model="cpu.system_history" style="height: 160px; padding: 10px 25px;" 
                                        			opts={{ {type: 'bar', height: '125', barWidth: 13, barSpacing: 2, barColor: '#26B99A'} }}>
                                            	<span class="system_cpu_history" style="height: 160px; padding: 10px 25px;">
						                                	<canvas width="200" height="60" style="display: inline-block; vertical-align: top; width: 94px; height: 30px;"></canvas>
						                                </span> 
                                            <h4 style="margin:18px">System CPU History</h4>--> 
                                            
                                        </div>
																				
                                        <div class="col-md-12">
                                            <div class="row" style="text-align: center;">
                                                <div class="col-md-3">
                                                    <canvas canv-gauge id="cpu_gauge1" value="{{cpu.system}}" 
                                                    	options="{width: 150, height: 150, glow: true, 
                                                    						title: 'System CPU', units: 'CPU %',                                                    						
                                                    						highlights : [{
																														    		from  : 0,
																														    		to    : 40,
																														    		color : 'PaleGreen'
																														    	}, {
																														    		from  : 40,
																														    		to    : 60,
																														    		color : 'Khaki'
																														    	}, {
																														    		from  : 60,
																														    		to    : 80,
																														    		color : 'LightSalmon'
																														    	}, {
																														    		from  : 80,
																														    		to    : 100,
																														    		color : 'Red'
																														    	}] }">
                                                    </canvas>
                                                    <h4 align="center">System CPU</h4>
                                                </div>
                                                <div class="col-md-3">
                                                    <canvas canv-gauge id="cpu_gauge2" value="{{cpu.user}}" 
                                                    	options="{width: 150, height: 150, glow: true, 
                                                    						title: 'User CPU', units: 'CPU %',                                                    						
                                                    						highlights : [{
																														    		from  : 0,
																														    		to    : 40,
																														    		color : 'PaleGreen'
																														    	}, {
																														    		from  : 40,
																														    		to    : 60,
																														    		color : 'Khaki'
																														    	}, {
																														    		from  : 60,
																														    		to    : 80,
																														    		color : 'LightSalmon'
																														    	}, {
																														    		from  : 80,
																														    		to    : 100,
																														    		color : 'Red'
																														    	}] }">
                                                    </canvas>
                                                    <h4 align="center">User CPU</h4>
                                                </div>
                                                <div class="col-md-3">
                                                    <canvas canv-gauge id="cpu_gauge3" value="{{cpu.idle}}" 
                                                    	options="{width: 150, height: 150, glow: true, 
                                                    						title: 'Idle CPU', units: 'CPU %',                                                    						
                                                    						highlights : [{
																														    		from  : 0,
																														    		to    : 20,
																														    		color : 'Red'
																														    	}, {
																														    		from  : 20,
																														    		to    : 40,
																														    		color : 'LightSalmon'
																														    	}, {
																														    		from  : 40,
																														    		to    : 60,
																														    		color : 'Khaki'
																														    	}, {
																														    		from  : 60,
																														    		to    : 100,
																														    		color : 'PaleGreen'
																														    	}] }">
                                                    </canvas>
                                                    <h4 align="center">Idle CPU</h4>
                                                </div>
                                                <div class="col-md-3">
                                                    <canvas canv-gauge id="cpu_gauge4" value="{{cpu.wait}}" 
                                                    	options="{width: 150, height: 150, glow: true, 
                                                    						title: 'Wait CPU', units: 'CPU %',                                                    						
                                                    						highlights : [{
																														    		from  : 0,
																														    		to    : 40,
																														    		color : 'PaleGreen'
																														    	}, {
																														    		from  : 40,
																														    		to    : 60,
																														    		color : 'Khaki'
																														    	}, {
																														    		from  : 60,
																														    		to    : 80,
																														    		color : 'LightSalmon'
																														    	}, {
																														    		from  : 80,
																														    		to    : 100,
																														    		color : 'Red'
																														    	}] }">
                                                    </canvas>
                                                    <h4 align="center">Wait CPU</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Process Details Tab -->
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="x_panel">
                                <div class="x_title">
                                    <h2>Process Statistics</h2>
                                    <ul class="nav navbar-right panel_toolbox">
                                        <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                        </li>
                                        <!-- <li class="dropdown">
                                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                                            <ul class="dropdown-menu" role="menu">
                                                <li><a ng-click="changeScale('kilobytes')">Display in Kilobytes</a></li>
                                                <li><a ng-click="changeScale('megabytes')">Display in Megabytes</a></li>
                                                <li><a ng-click="changeScale('gigabytes')">Display in Gigabytes</a></li>
                                            </ul>
                                        </li>
                                        <li><a class="close-link"><i class="fa fa-close"></i></a>
                                        </li> -->
                                    </ul>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="x_content">
                            			<span class="pull-left processIcon"></span>
                                   <div class="DetailsSlab">
                                   	 <p class="title">{{procs.threads | number:0 }} Number of Threads, 
                                   	 									{{procs.total_procs | number:0 }} Number of Total Processes</p>
                                   	 <p class="title"><br/><br/><br/></p>
                                 	 </div>
                                    <div class="col-sm-10">
                                      <nvd3 options="procs.options" data="procs.data"></nvd3>
                                    </div> 
                                    <div class="col-sm-2">
                                    	<table class="tableInset">
                                    		<tr><th>Process Details</th></tr>
                                    		<tr><td>{{procs.threads | number:0 }} # of Threads</td></tr>
                                    		<tr><td>{{procs.running_procs | number:0 }} Running</td></tr>
                                    		<tr><td>{{procs.sleeping_procs | number:0 }} Sleeping</td></tr>
                                    		<tr><td>{{procs.idle_procs | number:0 }} Idle</td></tr>
                                    		<tr><td>{{procs.zombie_procs | number:0 }} Zombie</td></tr>
                                    		<tr><td>{{procs.stopped_procs | number:0 }} Stopped</td></tr>
                                    		<tr><td>{{procs.total_procs | number:0 }} Total</td></tr>
                                    	</table>
                                    </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                   </div>
                   
                     <!-- Memory Details Tab -->                    
                    <div id="memory_tab" class="row tab-pane fade">
                        <div class="col-sm-12">
                            <div class="x_panel">
                                <div class="x_title">
                                    <h2>Memory Statistics</h2>
                                    <ul class="nav navbar-right panel_toolbox">
                                        <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                        </li>
                                        <li class="dropdown">
                                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                                            <ul class="dropdown-menu" role="menu">
                                                <li><a ng-click="changeScale('kilobytes')">Display in Kilobytes</a></li>
                                                <li><a ng-click="changeScale('megabytes')">Display in Megabytes</a></li>
                                                <li><a ng-click="changeScale('gigabytes')">Display in Gigabytes</a></li>
                                            </ul>
                                        </li>
                                        <li><a class="close-link"><i class="fa fa-close"></i></a>
                                        </li>
                                    </ul>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="x_content">
                            			<span class="pull-left memoryIcon"></span>
                                   <div class="DetailsSlab">
                                   	 <p class="title">{{memory.total_mem | number:0}} Bytes Total Memory</p>
                                   	 <p class="title"><br/></p>
                                 	 </div>
                                    <div class="col-sm-10">
                                      <canvas id="line" width="500" height="250" class="chart chart-line" chart-data="data"
																		  	chart-labels="labels" chart-colours="colors" chart-legend="false" chart-series="series" chart-options="{animation: false}">
																			</canvas> 
                                    </div>
                                    <div class="col-sm-2">
                                    	<table class="tableInset">
                                    		<tr><th>Memory Details</th></tr>
                                    		<tr><td>{{memory.total_memory | number:0 }} {{memory.scale_precision}} Total</td></tr>
                                    		<tr><td>{{memory.used_memory | number:0 }} {{memory.scale_precision}} Used</td></tr>
                                    		<tr><td>{{memory.free_memory | number:0 }} {{memory.scale_precision}} Free</td></tr>
                                    	</table>
                                    </div>
                                 </div>
                             </div>
                         </div>
                     </div>
									
                    
                    <!-- Disk Details Tab -->
                    <div id="disk_tab" class="row tab-pane fade">
                        <div class="col-sm-12">
                            <div class="x_panel">
                                <div class="x_title">
                                    <h2>Disk Statistics</h2>
                                    <ul class="nav navbar-right panel_toolbox">
                                        <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
                                    </ul>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="x_content">
                                		<div>
                                	 		<ul class="drive-tabs">
                                	 			<li data-ng-repeat="d in disk_details.disk | filter: {type: '!1'}" ng-class="{'active': disk_drive == d.dir_name}">
                                	 				<a id="drive" data-toggle="tooltip" data-placement="bottom" title="{{d.dev_name}}" ng-click="setDiskDrive(d.dir_name)">
                                	 				<div class="diskled" ng-class="{'grey': !d.is_online, 'green': d.is_online && d.used_percentage <= 45, 'yellow': d.is_online && d.used_percentage > 45 && d.used_percentage < 80, 'red': d.is_online && d.used_percentage > 80}"></div>
                                	 				<div class="offline" ng-show="!d.is_online">offline</div>
                                	 				<div class="hardDriveIcon" ng-show="d.type == 2"></div>
                                	 				<div class="networkDriveIcon" ng-show="d.type == 3"></div>
                                	 				<div class="cdDriveIcon" ng-show="d.type == 5"></div>{{d.dir_name}}<br/>{{d.sys_type_name}}<br/>{{d.type_name}}</a>
                                	 			</li>
                                	 		</ul>
                                	 	</div>
                                 	<br/><br/><br/><br/><br/>
                                 		<div class="col-sm-4 centered">
                                      <!-- <nvd3 options="disk_details.options" data="disk_details.data"></nvd3> -->
                                      <div class="centered" justgage
																         title="Disk Space" title-font-color="#999"
																         customSectors="{{disk_details.customSectors}}"
																         value="{{disk_details.use_percentage}}" value-font-color="#999"
																         width="200" height="150" min="0" max="100"
																         label="Used Percentage" label-font-color="#999"
																         start-animation-time="300" start-animation-type="linear"
																         refresh-animation-time="300" refresh-animation-type="linear"
																         counter="true">
																		   </div>
																		</div>
                                 		<div class="col-sm-8">
                                 			<table class="tableInset">
                                    		<tr><th>Disk Details for {{disk_drive}}</th></tr>
                                    		<tr><td>{{disk_details.available_bytes | number:0 }} Available Bytes</td></tr>
                                    		<tr><td>{{disk_details.used_bytes | number:0 }} Used Bytes</td></tr>
                                    		<tr><td>{{disk_details.free_bytes | number:0 }} Free Bytes</td></tr>
                                    		<tr><td>{{disk_details.total_files | number:0 }} Total Bytes</td></tr>
                                    		<tr><td>{{disk_details.use_percentage | number:2 }}% Used Percentage</td></tr>
                                    	</table>
                                 		</div>
                                 </div>
                             </div>
                         </div>
                     </div>
                     
                    <!-- Network Details Tab -->
                    <div id="network_tab" class="tab-pane fade">
                    	<div class="row">
                        <div class="col-md-12">
                            <div class="x_panel">
                                <div class="x_title">
                                    <h2>I/O Statistics</h2>
                                    <ul class="nav navbar-right panel_toolbox">
                                        <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
                                    </ul>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="x_content">
                                		<div class="dropdown">
																		  <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Interface {{network_interface.choice}}
																		  <span class="caret"></span></button>
																		  <ul class="dropdown-menu">
																		  	<li data-ng-repeat="n in network_interface.list track by $index">
																		  	<a id="netinterface" ng-click="setNetworkInterface(n)">
                                	 				<div class="networkIcon-32"></div>
                                	 				{{n}}</a>
                                	 			</li>
																		  </ul>
																		</div>
                                 		<div class="col-sm-6 centered">
                                 			<canvas id="bar" height="350" 
                                 				class="chart chart-line" 
                                 				chart-data="network_interface_stats.data"
																		  	chart-labels="network_interface_stats.labels" 
																		  	chart-series="network_interface_stats.series">
																			</canvas> 
                                      <!-- <nvd3 options="network_interface_stats.options" data="network_interface_stats.data"></nvd3> -->
																		</div>
                                 		<div class="col-sm-6">
                                 			<table class="tableInset">
                                    		<tr><th colspan="8">Network Interface Statistics for {{network_interface.choice}}</th></tr>
                                    		<tr>
                                    			<th>Rx Bytes</th>
                                    			<th>Rx Dropped</th>
                                    			<th>Rx Errors</th>
                                    			<th>Rx Overruns</th>
                                    			<th>Rx Packets</th>
                                    			<th>Rx Frame</th>
                                    		</tr>                                    		
                                    		<tr>
                                    			<td>{{network_interface_stats.rx_bytes | number:0 }}</td>
                                    			<td>{{network_interface_stats.rx_dropped | number:0 }}</td>
                                    			<td>{{network_interface_stats.rx_errors | number:0 }}</td>
                                    			<td>{{network_interface_stats.rx_overruns | number:0 }}</td>
                                    			<td>{{network_interface_stats.rx_packets | number:0 }}</td>
                                    			<td>{{network_interface_stats.rx_frame | number:0 }}</td>
                                    		</tr>
                                    		<tr>
                                    			<th>Tx Bytes</th>
                                    			<th>Tx Dropped</th>
                                    			<th>Tx Errors</th>
                                    			<th>Tx Overruns</th>
                                    			<th>Tx Packets</th>
                                    			<th>Tx Carrier</th>
                                    			<th>Tx Collisions</th>
                                    		</tr> 
                                    		<tr>
                                    			<td>{{network_interface_stats.tx_bytes | number:0 }}</td>
                                    			<td>{{network_interface_stats.tx_droppped | number:0 }}</td>
                                    			<td>{{network_interface_stats.tx_errors | number:0 }}</td>
                                    			<td>{{network_interface_stats.tx_overruns | number:0 }}</td>
                                    			<td>{{network_interface_stats.tx_packets | number:0 }}</td>
                                    			<td>{{network_interface_stats.tx_carrier | number:0 }}</td>
                                    			<td>{{network_interface_stats.tx_collisions | number:0 }}</td>
                                    		</tr>
                                    	</table>
                                 		</div>
                                 </div>
                             </div>
                         </div>
                     	</div>
                     
                     	<!-- Operating Details Details Tab -->
                     	<div class="row">
                        <div class="col-md-12">
                            <div class="x_panel">
                                <div class="x_title">
                                    <h2>Network Interface Details</h2>
                                    <ul class="nav navbar-right panel_toolbox">
                                      <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
                                    </ul>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="x_content">
                                		<div ng-show="network_details.interface_hwaddr != null">
																			<div class="networkIcon"></div>
																			<span class="medium">{{network_details.interface_description}}</span>
																			<br/><br/><br/>
																			<span class="small">Network Interface type is <strong>{{network_details.interface_type}}</strong></span>
																			<br/>
																			<span class="small">Hardware MAC Address is <strong>{{network_details.interface_hwaddr}}</strong></span>
																			<br/>
																			<span class="small">Network Interface name is <strong>{{network_details.interface_name}}</strong></span>
																			<br/>
																			<span class="small">Network Interface Flags are <strong>{{network_details.interface_flags}}</strong></span>
																			<br/>
																			<span class="small">Network Interface MTU is <strong>{{network_details.interface_mtu}}</strong></span>
																			<br/>
																			<span class="small">Network Interface Netmask is <strong>{{network_details.interface_netmask}}</strong></span>
																			<br/>
																			<span class="small">Network Interface Address is <strong>{{network_details.interface_address}}</strong></span>
																			<br/>
																			<span class="small">Network Interface Broadcast is <strong>{{network_details.interface_broadcast}}</strong></span>
																		</div>
                                </div>
                             </div>
                         </div>
                     	</div>
                    </div>
                                       
                    <!-- Operating Details Details Tab -->
                    <div id="os_tab" class="row tab-pane fade">
                        <div class="col-md-12">
                            <div class="x_panel">
                                <div class="x_title">
                                    <h2>Operating System / Java Details</h2>
                                    <ul class="nav navbar-right panel_toolbox">
                                        <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                        </li>
                                        <!-- <li class="dropdown">
                                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                                            <ul class="dropdown-menu" role="menu">
                                                <li><a href="#">Settings 1</a>
                                                </li>
                                                <li><a href="#">Settings 2</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li><a class="close-link"><i class="fa fa-close"></i></a> -->
                                        </li>
                                    </ul>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="x_content darken">
																	<div class="boxEffect effect2">
																		<div ng-show="operating_system.os_vendor != null">
																			<div class="os-icons win-icon" ng-show="operating_system.os_vendor == 'Microsoft'"></div>
																			<div class="os-icons linux-icon" ng-show="operating_system.os_vendor == 'Debian'"></div>
																			<div class="os-icons redhat-icon" ng-show="operating_system.os_vendor == 'Red Hat'"></div>
																			<div class="os-icons ios-icon" ng-show="operating_system.os_vendor == 'iOS'"></div>
																			<div class="os-icons macos-icon" ng-show="operating_system.os_vendor == 'Apple'"></div>
																			<span class="large">{{operating_system.os_description}}</span>
																			<br/>
																			<span class="medium">{{operating_system.os_vendor}}</span>
																			<br/><br/>
																			<span class="small">System Architecture is <strong>{{operating_system.os_architecture}}</strong></span>
																			<br/>
																			<span class="small">Patch Level is <strong>{{operating_system.os_patch_level}}</strong></span>
																			<br/>
																			<span class="small">Name is <strong>{{operating_system.os_name}}</strong></span>
																			<br/>
																			<span class="small">Code Name is <strong>{{operating_system.os_code_name}}</strong></span>
																			<br/>
																			<span class="small">Version is <strong>{{operating_system.os_version}}</strong></span>
																			<br/>
																			<span class="small">Data Model <strong>{{operating_system.os_data_model}}</strong></span>
																		</div>
																	</div>
																	
																	<hr class="style-two"/>
																	
																	<div class="boxEffect effect2">
																		<div ng-show="operating_system.os_vendor != null">
																			<div class="java-icon"></div>
	                                   	<span class="large">Java Virtual Machine</span>
																			<br/>
																			<span class="medium">{{java_jvm.jvm_vendor}}</span>
																			<br/><br/>
																			<span class="small">Java Version <strong>{{java_jvm.jvm_version}}</strong></span>
																			<br/>
	  																	<span class="small">Java Home Path: <strong>{{java_jvm.jvm_home}}</strong></span>
	  																</div>
																	</div>
                                </div>
                             </div>
                         </div>
                     </div>
                	</div>	<!-- tab content -->	
								</div>  <!-- container content -->
								
                <!-- footer content -->
                <footer>
                    <div class="">
                        <p class="pull-right">Dashboard Sample -- Amaury Valdes |
                            <span class="image_icon_footer"><img src="images/dashboardIcon.png" alt="logo" /></span> avaldes.com
                        </p>
                    </div>
                    <div class="clearfix"></div>
                </footer>
                <!-- /footer content -->

            </div>
            <!-- /page content -->
        </div>
    </div>

    <div id="custom_notifications" class="custom-notifications dsp_none">
        <ul class="list-unstyled notifications clearfix" data-tabbed_notifications="notif-group">
        </ul>
        <div class="clearfix"></div>
        <div id="notif-group" class="tabbed_notifications"></div>
    </div>

		<!-- PNotify -->
    <script type="text/javascript" src="js/notify/pnotify.core.js"></script>
    <script type="text/javascript" src="js/notify/pnotify.buttons.js"></script>
    <script type="text/javascript" src="js/notify/pnotify.nonblock.js"></script>
        
    <script src="js/custom.js"></script>

    <script type="text/javascript">        
       function createAlert() {
    	   console.log("Inside createAlert()...");
    	   new PNotify({
               title: 'Log File Alert',
               text: 'Log File Alert... System has detected a log file error that needs your attention...',
               type: 'error',
               hide: false
           });
       }
       </script>
    
    <div ng-element-ready="setDefaults('<%=isDebug%>', '<%=baseUrl%>')"></div>
</body>

</html>