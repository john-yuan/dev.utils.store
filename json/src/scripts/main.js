define(['zepto', 'vs/editor/editor.main'], function ($, monaco) {
    var editor = monaco.editor.create(document.getElementById('editor'), {
        value: localStorage.getItem('utils.json.content') || '',
        fontSize: 14,
        theme: 'vs-dark',
        language: 'json'
    });

    editor.onDidChangeModelContent(function () {
        localStorage.setItem('utils.json.content', editor.getValue());
    });

    var tabSize = localStorage.getItem('utils.json.tabSize');

    if (tabSize) {
        $('#tabSize').val(tabSize);
    }

    $('#tabSize').on('change', function () {
        var tabSize = +$('#tabSize').val();
        localStorage.setItem('utils.json.tabSize', tabSize);
    });

    $('.beautify-button button').on('click', function () {
        var tabSize = +$('#tabSize').val();
        var content = editor.getValue().trim();
        var data = null;

        if (content) {
            try {
                data = JSON.parse(content);
            } catch (err) {
                console.error(err);
                alert(err);
                return;
            }
            editor.getModel().updateOptions({ tabSize: tabSize });
            editor.setValue(JSON.stringify(data, null, tabSize));
        }
    });

    $('.loading-mask').hide();
});
