/*
+ jQuery Facturador Electronico Template Editor (fetemp)
+ 
+ Copyright (c) 2012 Quimank - Enrique Poot Poot - kikepoot@gmail.com
*/

/*
fetemp css classes:
fetemp_container
fetemp_viewport
fetemp_page
fetemp_element
fetemp_drag_handler
*/

(function ($) {

    $.fn.fetemp = function (options, args) {

        var $page = $(this);

        var start = function () {

            //Create container and view port
            $page = $page.wrap('<div class="fetemp_container"><div class="fetemp_viewport"></div></div>');

            //Get viewport and container references
            var $viewport = $page.parent();
            var $container = $viewport.parent();

            $page.addClass('fetemp_page');

            //Set width and height of the page
            $page.width(settings.page_width).height(settings.page_height);

            //Set viewport resizable, TODO: add resizable setting
            $viewport.resizable();

            //Adding elements
            addEnterpriceData({});
            addInvoiceData({});
        };

        //Get Values of the global variables
        var getComponentValues = function () {
            $viewport = $page.parent();
            $container = $viewport.parent();
        };

        //Commun element properties
        var element_properties = {
            'x': '10px',
            'y': '10px',
            'width': '100px',
            'height': '100px',
            'font_size': '9px', //Look for size converter
            'font_color': 'rgb(1,22,34)',
            'content': $('<span>Element</span>')
        };

        //Add an element to the page
        var addElement = function (args) {

            getComponentValues();

            var properties = $.extend({}, element_properties, args);

            //Build a position and resizable element for the page
            var $example_element = $('<div class="fetemp_element"><div class="fetemp_drag_handler"></div></div>')
                .css({
                    'width': properties.width,
                    'height': properties.height,
                    'left': properties.x,
                    'top': properties.y
                })
                .draggable({
                    containment: $viewport,
                    handle: 'div.fetemp_drag_handler'
                })
                .resizable({
                    containment: $viewport
                });
                $(properties.content).css({
                'font-size':properties.font_size,
            });
            //Add content
            $example_element.append(properties.content);
            //Add to $viewport
            $viewport.append($example_element);
        };


        //Add Enterprice Data
        var addEnterpriceData = function (args) {
            var $enterprice_data = $('<div class="fe_enterpricedata" style="width:auto; height:auto;"><div style="float:left; display:block; width:100%;">EMPRESA DE DEMOSTRACION S.A. DE C.V</div><div style="float:left; display:block; width:100%;">GOYA780416GM0</div><div style="float:left; display:block; width:100%;">Calle Madero 495 1 Santa Isabel Tola</div><div style="float:left; display:block; width:100%;">Benito Juarez</div><div style="float:left; display:block; width:100%;">Distrito Federal, Mexico</div><div style="float:left; display:block; width:100%;">C.P. 07010</div></div>');
            addElement({
                'x': '12px',
                'y': '13px',
                'content': $enterprice_data
            });
        }


        var addInvoiceData = function (args) {
            var $invoice_data = $('<div class="fe_invoicedata"><div class="fe_id_row"><div class="fe_id_row_l">Folio fiscal:</div><div class="fe_id_row_r">AC589D52-167B-4501-AE15-ED89E9E45D39</div></div><div class="fe_id_row"><div class="fe_id_row_l">No. de serie del CSD del Emisor:</div><div class="fe_id_row_r">20001000000100001708</div></div><div class="fe_id_row"><div class="fe_id_row_l">Fecha y hora de Emisión:</div><div class="fe_id_row_r">19/02/2012 16:41:55</div></div><div class="fe_id_row"><div class="fe_id_row_l">Fecha y hora de Certificación:</div><div class="fe_id_row_r">19/02/2012 16:30:26</div></div><div class="fe_id_row fe_id_row_final"><div class="fe_id_row_l">Tipo de CFDI:</div><div class="fe_id_row_r">Factura</div></div></div>');
            addElement({
                'x': '50px',
                'y': '50px',
                'content': $invoice_data
            });
        }


        var getPageInfo = function(args){
            getComponentValues();
            //collect enterprice data
            var fe_ed = $('.fe_enterpricedata');
            var fe_ed_ps = fe_ed.parent();
            var fe_ed_data = {
                name:'fe_enterpricedata',
                x: parseInt(fe_ed_ps.css('left')),
                y: parseInt(fe_ed_ps.css('top')),
                width: parseInt(fe_ed_ps.css('width')),
                height:parseInt(fe_ed_ps.css('height'))
            };
            //collect invoice data
            var fe_id = $('.fe_invoicedata');
            var fe_id_ps = fe_id.parent();
            var fe_id_data = {
                name:'fe_invoicedata',
                x: parseInt(fe_id_ps.css('left')),
                y: parseInt(fe_id_ps.css('top')),
                width: parseInt(fe_id_ps.css('width')),
                height:parseInt(fe_id_ps.css('height'))
            };
            //Create return data
            var fe_page = {
                elements:[
                    fe_id_data,
                    fe_ed_data
                ]
            };

            return fe_page;
        };
        
        //Set properties to element ed
        var setEnterpriceData = function(args){
            getComponentValues();
            var fe_ed = $('.fe_enterpricedata');
            var fe_ed_ps = fe_ed.parent();
            fe_ed_ps.css({
                'left':args.x,
                'top':args.y,
                'width':args.width,
                'height':args.height
            });
        };
        
        //Set properties to element id
        var setInvoiceData = function(args){
            getComponentValues();
            var fe_id = $('.fe_invoicedata');
            var fe_id_ps = fe_id.parent();
            fe_id_ps.css({
                'left':args.x,
                'top':args.y,
                'width':args.width,
                'height':args.height
            });
        };

        //Set properties to whole page
        var setPageInfo = function(args){
            getComponentValues();
            $.each(args.elements, function(index, value){
                switch(value.name){
                    case 'fe_invoicedata':
                    setEnterpriceData(value);
                    break;
                    case 'fe_enterpricedata':
                    break;
                }
            });
        };

        //Every funtion have been declared before this point

        //Settings
        var settings = {
            'page_width': 610,
            'page_height': 789
        };

        //Get options if those are defined
        if (options && typeof(options) == 'object') {
            $.extend(settings, options);
        }

        if (options && typeof (options) == 'string') {
            //select method
            switch (options) {
                case 'getPageInfo':
                    return getPageInfo(args);
                    break;
                case 'setPageInfo':
                    return setPageInfo(args);
                    break;
            }
            return;
        }

        //Execute set page
        start();
    };

})(jQuery);