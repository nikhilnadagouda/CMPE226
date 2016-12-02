var cmpe226= angular.module('app',[]);
 cmpe226.controller('highchartsACtrl', function($scope, $http, $location) {
	
	$scope.getDevInfoPage = function()
	{
		console.log("inside Admin dashboard controller");
		window.location.assign("/getAdminDashInfoPage");
	}
	
	$scope.getHighchartsAInfoPage = function()
	{
		console.log("inside Highcharts A controller");
		window.location.assign("/getHighchartsAInfoPage");
	}
	
	$scope.getHighchartsBInfoPage = function()
	{
		console.log("inside Highcharts B controller");
		window.location.assign("/getHighchartsBInfoPage");
	} 
	
	$scope.logout = function()
	{
		
		window.location.assign("/logout");
	}
	
	$(function () {
	    $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=usdeur.json&callback=?', function (data) {
	        var detailChart;

	        $(document).ready(function () {

	            // create the detail chart
	            function createDetail(masterChart) {

	                // prepare the detail chart
	                var detailData = [],
	                    detailStart = data[0][0];

	                $.each(masterChart.series[0].data, function () {
	                    if (this.x >= detailStart) {
	                        detailData.push(this.y);
	                    }
	                });

	                // create a detail chart referenced by a global variable
	                detailChart = $('#detail-container').highcharts({
	                    chart: {
	                        marginBottom: 120,
	                        reflow: false,
	                        marginLeft: 50,
	                        marginRight: 20,
	                        style: {
	                            position: 'absolute'
	                        }
	                    },
	                    credits: {
	                        enabled: false
	                    },
	                    title: {
	                        text: 'Number of users per month'
	                    },
	                    subtitle: {
	                        text: ''
	                    },
	                    xAxis: {
	                        type: 'datetime'
	                    },
	                    yAxis: {
	                        title: {
	                            text: null
	                        },
	                        maxZoom: 0.1
	                    },
	                    tooltip: {
	                        formatter: function () {
	                            var point = this.points[0];
	                            return '<b>' + point.series.name + '</b><br/>' + Highcharts.dateFormat('%A %B %e %Y', this.x) + ':<br/>' +
	                                ' ' + Highcharts.numberFormat(point.y, 2) + ' ';
	                        },
	                        shared: true
	                    },
	                    legend: {
	                        enabled: false
	                    },
	                    plotOptions: {
	                        series: {
	                            marker: {
	                                enabled: false,
	                                states: {
	                                    hover: {
	                                        enabled: true,
	                                        radius: 3
	                                    }
	                                }
	                            }
	                        }
	                    },
	                    series: [{
	                        name: 'Number of users per month',
	                        pointStart: detailStart,
	                        pointInterval: 24 * 3600 * 10000,
	                        data: detailData
	                    }],

	                    exporting: {
	                        enabled: false
	                    }

	                }).highcharts(); // return chart
	            }

	            // create the master chart
	            function createMaster() {
	                $('#master-container').highcharts({
	                    chart: {
	                        reflow: false,
	                        borderWidth: 0,
	                        backgroundColor: null,
	                        marginLeft: 50,
	                        marginRight: 20,
	                        zoomType: 'x',
	                        events: {

	                            // listen to the selection event on the master chart to update the
	                            // extremes of the detail chart
	                            selection: function (event) {
	                                var extremesObject = event.xAxis[0],
	                                    min = extremesObject.min,
	                                    max = extremesObject.max,
	                                    detailData = [],
	                                    xAxis = this.xAxis[0];

	                                // reverse engineer the last part of the data
	                                $.each(this.series[0].data, function () {
	                                    if (this.x > min && this.x < max) {
	                                        detailData.push([this.x, this.y]);
	                                    }
	                                });

	                                // move the plot bands to reflect the new detail span
	                                xAxis.removePlotBand('mask-before');
	                                xAxis.addPlotBand({
	                                    id: 'mask-before',
	                                    from: data[0][0],
	                                    to: min,
	                                    color: 'rgba(0, 0, 0, 0.2)'
	                                });

	                                xAxis.removePlotBand('mask-after');
	                                xAxis.addPlotBand({
	                                    id: 'mask-after',
	                                    from: max,
	                                    to: data[data.length - 1][0],
	                                    color: 'rgba(0, 0, 0, 0.2)'
	                                });


	                                detailChart.series[0].setData(detailData);

	                                return false;
	                            }
	                        }
	                    },
	                    title: {
	                        text: null
	                    },
	                    xAxis: {
	                        type: 'datetime',
	                        showLastTickLabel: true,
	                        maxZoom: 14 * 24 * 3600000, // fourteen days
	                        plotBands: [{
	                            id: 'mask-before',
	                            from: data[0][0],
	                            to: data[data.length - 1][0],
	                            color: 'rgba(0, 0, 0, 0.2)'
	                        }],
	                        title: {
	                            text: null
	                        }
	                    },
	                    yAxis: {
	                        gridLineWidth: 0,
	                        labels: {
	                            enabled: false
	                        },
	                        title: {
	                            text: null
	                        },
	                        min: 0.6,
	                        showFirstLabel: false
	                    },
	                    tooltip: {
	                        formatter: function () {
	                            return false;
	                        }
	                    },
	                    legend: {
	                        enabled: false
	                    },
	                    credits: {
	                        enabled: false
	                    },
	                    plotOptions: {
	                        series: {
	                            fillColor: {
	                                linearGradient: [0, 0, 0, 70],
	                                stops: [
	                                    [0, Highcharts.getOptions().colors[0]],
	                                    [1, 'rgba(255,255,255,0)']
	                                ]
	                            },
	                            lineWidth: 1,
	                            marker: {
	                                enabled: false
	                            },
	                            shadow: false,
	                            states: {
	                                hover: {
	                                    lineWidth: 1
	                                }
	                            },
	                            enableMouseTracking: false
	                        }
	                    },

	                    series: [{
	                        type: 'area',
	                        name: 'Number of users per month',
	                        pointInterval: 24 * 3600 * 1000,
	                        pointStart: data[0][0],
	                        data: data
	                    }],

	                    exporting: {
	                        enabled: false
	                    }

	                }, function (masterChart) {
	                    createDetail(masterChart);
	                })
	                    .highcharts(); // return chart instance
	            }

	            // make the container smaller and add a second container for the master chart
	            var $container = $('#container')
	                .css('position', 'relative');

	            $('<div id="detail-container">')
	                .appendTo($container);

	            $('<div id="master-container">')
	                .css({
	                    position: 'absolute',
	                    top: 300,
	                    height: 100,
	                    width: '100%'
	                })
	                    .appendTo($container);

	            // create master and in its callback, create the detail chart
	            createMaster();
	        });
	    });
	});
 });