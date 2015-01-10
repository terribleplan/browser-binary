u$.ldGa("UA-58423761-1");
(function() {
    function ReadResult(data) {
        var transformCache = {};
        var transformProxy = {
            _default: function() {
                return data;
            },
            base64: function() {
                return btoa(data);
            }
        };
        this.transform = function(to) {
            if (transformProxy.hasOwnProperty(to)) {
                return transformProxy[to]();
            }
            return transformProxy['_default']();
        }
    }

    u$.r(function() {
        document.getElementById((u$.modern ? "" : "un") + "supported").style.display = "block";
        if (!u$.modern) {
            return;
        }

        var fileSelector = document.getElementById("file");
        var output = document.getElementById("output");
        var type = document.getElementById("type");
        var currentResult = null;

        function update() {
            if (currentResult == null) {
                output.innerText = "No file loaded.";
                return;
            }
            output.innerText = currentResult.transform(type.value);
        }

        fileSelector.onchange = function() {
            var reader = new FileReader();
            reader.onload = function() {
                currentResult = new ReadResult(reader.result);
                update();
            };
            reader.readAsBinaryString(fileSelector.files[0]);
        };

        type.onchange = function() {
            update();
        };

        window.u = update;
    });
})();