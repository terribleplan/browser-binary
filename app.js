(function () {
  function ReadResult(data) {
    const transformProxy = {
      _default: function () {
        return data;
      },
      base64: function () {
        return btoa(data);
      },
    };
    this.transform = function (to) {
      if (transformProxy.hasOwnProperty(to)) {
        return transformProxy[to]();
      }
      return transformProxy['_default']();
    };
  }

  window.addEventListener('DOMContentLoaded', function () {
    const fileSelector = document.getElementById('file');
    const output = document.getElementById('output');
    const type = document.getElementById('type');
    let currentResult = null;

    function update() {
      if (currentResult == null) {
        output.innerText = 'No file loaded.';
        return;
      }
      output.innerText = currentResult.transform(type.value);
    }

    fileSelector.onchange = function () {
      const reader = new FileReader();
      reader.onload = function () {
        currentResult = new ReadResult(reader.result);
        update();
      };
      reader.readAsBinaryString(fileSelector.files[0]);
    };

    type.onchange = function () {
      update();
    };

    window.u = update;
  });
})();
