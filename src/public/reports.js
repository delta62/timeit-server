(function() {
    function buildChart(data) {
        var ctx = $("#myChart").get(0).getContext("2d");
        var data = {
            //labels: ["January", "February", "March", "April", "May", "June", "July"],
            labels: buildLabels(data),
            datasets: [
                {
                    label: 'Sample set',
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: buildDataSet(data)
                }
            ]
            //datasets: [
            //    {
            //        label: "My First dataset",
            //        fillColor: "rgba(220,220,220,0.2)",
            //        strokeColor: "rgba(220,220,220,1)",
            //        pointColor: "rgba(220,220,220,1)",
            //        pointStrokeColor: "#fff",
            //        pointHighlightFill: "#fff",
            //        pointHighlightStroke: "rgba(220,220,220,1)",
            //        data: [65, 59, 80, 81, 56, 55, 40]
            //    },
            //    {
            //        label: "My Second dataset",
            //        fillColor: "rgba(151,187,205,0.2)",
            //        strokeColor: "rgba(151,187,205,1)",
            //        pointColor: "rgba(151,187,205,1)",
            //        pointStrokeColor: "#fff",
            //        pointHighlightFill: "#fff",
            //        pointHighlightStroke: "rgba(151,187,205,1)",
            //        data: [28, 48, 40, 19, 86, 27, 90]
            //    }
            //]
        };

        var myLineChart = new Chart(ctx).Line(data, {});
    }

    function buildLabels (data) {
        var labels = [];
        _.each(data, function(entry) {
            labels.push(entry.name);
        });
        return labels;
    }

    function buildDataSet (data) {
        var set = [];
        _.each(data, function(entry) {
            set.push(entry.timestamp);
        });
        return set;
    }

    $(function() {
        $.ajax({
            url: 'http://localhost:8080/V1/repository',
            headers: {
              "Accept": "application/json"
            },
            success: function(data) {
                buildChart(data);
            },
            error: function () {
                alert('error');
            }
        });
    });
})();
