export default function ChartDirective () {
  var ChartDirective;

  ChartDirective = {
    restrict: 'E',
    templateUrl: './components/charts/chart.html',
    controllerAs: 'chart',
    scope: {
      chartType:     '@',
      chartDatasets: '=',
      chartLabels:   '=',
      chartId:       '@',
      width:         '@',
      height:        '@'
    }
  }

  ChartDirective.controller = function () {},

  ChartDirective.link = function (scope, element, attributes) {
      var context, canvas, myChart

      canvas =  element.find("canvas")[0];
      context = canvas.getContext("2d");

      scope.$watch('chartDatasets', function(datasets) {
        if (datasets) {
          myChart = _createChart(context, scope.chartType, scope.chartLabels, datasets)
        }
      })
    }

  return ChartDirective;
}

/* Private */

function _createChart(context, type, labels, datasets) {
  return new Chart(context, {
    type: type,
    data: {
      labels:   labels,
      datasets: datasets
    }
  })
}
