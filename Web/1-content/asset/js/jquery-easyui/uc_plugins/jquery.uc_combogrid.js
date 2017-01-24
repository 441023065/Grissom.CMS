(function ($) {
    (
        function () {
            var plugin = 'uc_combogrid';
            var idx = $.inArray($.parser.plugins, plugin);
            if (idx < 0) {
                $.parser.plugins[$.parser.plugins.length] = plugin;
            }
        }
    )();
    function create(target) {
        var opts = $.data(target, "uc_combogrid").options;
        $(target).combogrid(opts);


        resize(target);
        setTimeout(function () {
            $(target).parent().find('.combo-text').bind('keydown.combo', function (e) {
                switch (e.keyCode) {
                    case 40: //down
                        $(target).combobox('showPanel');
                        break;
                }
            });

            //$(target).combogrid('resize', $(target).parent().width());
        }, 10);
    }

    function resize(target) {
        var cols = $(target).combogrid('grid').datagrid('options').columns;
        if (cols) {
            var width = 0;
            $.each(cols[0], function (idx, val) {
                if (!isNaN(val.width)) {
                    width += parseInt(val.width);
                }
            });
            if (width > 0) {
                $(target).combogrid('panel').panel('resize', { width: width + 5 });
            }
        }
    }

    $.fn.uc_combogrid = function (options, param) {
        if (typeof options === 'string') {
            var method = $.fn.uc_combogrid.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return $(this).combogrid(options, param);
                //return $.fn.combogrid.methods[options](this, param);
            }
        }
        options = options || {};
        return this.each(function () {
            var state = $.data(this, "uc_combogrid");
            if (state) {
                $.extend(state.options, options);
            } else {
                $.data(this, "uc_combogrid", {
                    options: $.extend({}, $.fn.combogrid.defaults, $.fn.uc_combogrid.defaults, $.fn.combogrid.parseOptions(this), options)
                });
            }
            create(this);
        });
    };
    /* $.fn.uc_combogrid.parseOptions = function (target) {
    return $.extend({}, $.fn.combogrid.parseOptions(target), {
    });
    };
    */

    $.fn.uc_combogrid.methods = {
        options: function (jq) {
            return $.data(jq[0], 'uc_combogrid').options;
        }
    };
    $.fn.uc_combogrid.defaults = {
        editable:false,//--��Ϊ�ÿؼ��ɱ��������в����ڵ�ֵ�����Բ������룬����ֻ����������ֵ
        onHidePanel: function () {
            //-- �������� combo �Ŀؼ��������� hide, mounse down ʱ��
            //   ����ѵ�ǰҳ������ combo hide һ���
            if ($(this).combogrid('panel').not(':visible')) {
                return;
            }
            var rows = $(this).combogrid('grid').datagrid('getSelected');
            if (!rows) {
                $(this).combogrid('setValue', '');
            }

        },
        onShowPanel: function () {
            var panel = $(this).combogrid('grid').datagrid('getPanel');
            // ĳЩҳ��ᵼ�� combogrid �������б���ʾ�������г�������ûָ��һ��,������ͷ�������г��Ȳ�һ
            if (panel.find('.datagrid-htable td:first').width() != panel.find('.datagrid-btable td:first').width()) {
                var data = $(this).combogrid('grid').datagrid('getData');
                $(this).combogrid('grid').datagrid({});
                $(this).combogrid('grid').datagrid('loadData', data);
            }
            //-- grid �ĸ߶ȱ��趨��,���� panel ����ֹ�����
            //var data = $(this).combogrid('grid').datagrid('getRows');
            //$(this).combobox('panel').height(25 * data.length + 100);
        },
        height: 22

    };
}
)(jQuery)