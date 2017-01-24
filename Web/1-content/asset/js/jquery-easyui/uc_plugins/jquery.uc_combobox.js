(function () {
    (function () {
        if ($.inArray($.parser.plugins, 'uc_combobox') < 0) {
            $.parser.plugins[$.parser.plugins.length] = 'uc_combobox';
        }
    })();

    function create(target) {
        var opts = $.data(target, 'uc_combobox').options;
        if (opts.width == 'auto')
            opts.width = undefined;// Ĭ�� width='auto' ���µ� chrome 43 �ᵼ�¿��Ϊ0, �� default ��������ʱ���� auto 
        $(target).combobox(opts);
        //$($.data(target).combo.combo).find('span:eq(1)').css('height', '100%');
        //$(target).combogrid('resize', $(target).parent().width());

        $(target).parent().find('.textbox-text').bind('keydown.combo', function (e) {
            switch (e.keyCode) {
                case 40: //down
                    $(target).combobox('showPanel');
                    break;
            }
        });
    }

    function findDataItem(data, valueField, value) {
        for (var i = 0; i < data.length; ++i) {
            if (data[i][valueField] == value) return data[i];
        }
    }

    $.fn.uc_combobox = function (options, param) {
        if (typeof options === 'string') {
            var method = $.fn.uc_combobox.methods[options];
            if (method) return method(this, param);
            else return $(this).combobox(options, param);
        }
        options = options || {};
        return this.each(function () {
            var state = $.data(this, 'uc_combobox');
            if (state) $.extend(state.options, options);
            else {
                $.data(this, 'uc_combobox', { options: $.extend({}, $.fn.combobox.defaults, $.fn.uc_combobox.defaults, $.fn.combobox.parseOptions(this), options) });
            }
            create(this);
        });
    }

    $.fn.uc_combobox.methods = {
        loadData: function (jq, data) {
            $(jq[0]).combobox('panel').css('height', 50);
            return $.fn.combobox.methods.loadData(jq, data);
        }
    };


    $.fn.uc_combobox.defaults = {
        onHidePanel: function () {
            var target = $(this)[0];
            var opts = $.data(target, 'uc_combobox').options;
            var data = $.data(target, 'combobox').data;
            var values = $(target).uc_combobox('getValues');
            for (var i = 0; i < values.length; ++i) {
                var item = findDataItem(data, opts.valueField, values[i]);
                if (!item) {
                    $(target).uc_combobox('setValue', '');
                    break;
                }
            }
        },
        onShowPanel: function () {
            var data = $(this).combobox('getData');
            var opts = $.data(this, 'uc_combobox').options;
            if (!opts.panelMaxHeight)
                $(this).combobox('panel').height(24 * data.length + 20);
        },
        valueField: 'id',
        textField: 'text',
        /*
        ������д keyhandler, ����Ḳ��combobox ʵ�ֵ��¼�
        keyHandler: {
        down: function (object) {
        if ($(this).combogrid('panel').is(':visible')) {
        return;
        }

        $(this).combobox('showPanel');
        }
        }*/

    };
})(jQuery)