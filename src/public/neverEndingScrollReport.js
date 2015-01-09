(function () {
    function buildChart (data) {
        var ctx = $("#neverEndingScrollChart").get(0).getContext("2d");
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

        new Chart(ctx).Line(data, {});
    }

    function buildLabels (data) {
        var labels = [];
        _.each(data, function(entry) {
            if (!_.find(labels, function(label) { return entry.sequence === label; })) {
                labels.push(entry.sequence);
            }
        });

        return labels;
    }

    function buildDataSet (data) {
        var set = [],
             start = null,
             end = null;

        _.each(data, function(entry) {
            if (entry.name === "neverEndingScroll.scrollStart") {
                start = entry;
            } else if (entry.name === "neverEndingScroll.scrollFinished") {
                end = entry;
                if (start !== null) {
                    set.push((end.timestamp - start.timestamp));
                }
            }
        });

        return set;
    }

    $(function() {
        $.ajax({
            url: 'http://localhost:8080/V1/session/default',
            headers: {
                "Accept": "application/json"
            },
            success: function(data) {
                buildChart(data);
            },
            error: function () {
                alert('Opps - something went wrong.');
            }
        });
    });
})();
