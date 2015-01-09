(function() {
    Chart.defaults.global.animation = false;
    var chart = null;

    function buildChart(data) {
        if (chart) {
            chart.destroy();
        }

        var ctx = $("#myChart").get(0).getContext("2d");
        var data = {
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
        };

        chart = new Chart(ctx).Line(data, {});
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

    function fetchData() {
        $.ajax({
            url: 'http://localhost:8080/V1/session/default',
            headers: {
                "Accept": "application/json"
            },
            success: function(data) {
                buildChart(data);
            },
            complete: function () {
                setTimeout(fetchData.bind(this), 1000);
            }
        });
    }

    $(function() {
        fetchData();
    });
})();
