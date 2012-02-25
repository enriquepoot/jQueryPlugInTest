if (typeof (Qmk) == 'undefined') Qmk = {};

(function ($) { 
    Qmk.ColorSelector = function(){
        this.initialize.apply(this, arguments);
    };
    Qmk.ColorSelector.prototype = {
        Observator: [],
        //Properties
        Name:null,
        Container: null,
        Colors: [],
        SelectedColor: null,
        ColorListDisplayed: false,
        //Methods
        initialize: function(container, name, colors){
            var me = this;
            me.Observator = [];
            me.Container = $(container);
            me.Name = name;
            me.Colors = [];
            me.SelectedColor = null;
            me.ColorListDisplayed = false;
            for(i=0; i<colors.length; i++){
                me.Colors.push(colors[i]);
            }
            me.renderControl();
        },
        renderControl:function(){
            var me = this;
            me.Container.css({
                'position':'relative'
            });
            var button = $('<a id="'+me.Name+'_'+'Button'+'" href="'+me.Name+'_'+'Button'+'"></a>')
            button.css({
                'width':'20px',
                'height':'20px',
                'background-color':'black',
                'display':'block'
            })
            .click(function(e){
                e.preventDefault();
                if(me.ColorListDisplayed==true)
                { 
                    me.hideColorList(); 
                }
                else
                { 
                    me.showColorList(); 
                }
            });
            me.Container.append(button);
            me.addColorList();
        },
        addColorList: function(){
            var me = this;
            var colorlist = $('<div id="'+me.Name+'_'+'ColorList'+'"></div>');
            colorlist.css({
                'z-index':'5000',
                'background-color':'lightgray',
                'position':'absolute',
                'width':'100px',
                'height':'100px',
                'display':'none'
            })
            .offset({
                top: 20,
                left:0
            });
            me.Container.append(colorlist);
            //Adding selector
            for(i=0;i<me.Colors.length;i++)
            {
                me.addSelector(colorlist, me.Colors[i]);
            }
        },
        showColorList: function(){
            var me = this;
            $('#'+me.Name+'_'+'ColorList').show(500);  
            me.ColorListDisplayed = true;
            $('#'+me.Name+'_'+'ColorList').focusout(function(){
                me.hideColorList();
            });         
        },
        hideColorList: function(){
            var me = this;
            $('#'+me.Name+'_'+'ColorList').hide(500);
            me.ColorListDisplayed = false;
        },
        addSelector:function(container, color){
            var me = this;
            var picker = $('<a href="'+color+'" alt="'+color+'"></a>');
            picker.css({
                'background-color':color,
                'width':'20px',
                'height':'20px',
                'float':'left',
                'margin':'2px'
            })
            .click(function(e){
                e.preventDefault();
                me.setSelectedColor($(this).attr('href'));
                me.hideColorList();
            });
            container.append(picker);
        },
        setSelectedColor:function(color){
            var me = this;
            me.SelectedColor = color;
            $('#'+me.Name+'_'+'Button').css({
                'background-color':color
            });
            me.trigger('onChangeSelectedColor',color);
        },
        //Events
        bind: function(method, callback){
            var me = this;
            me.Observator[method]=callback;
        },
        trigger: function(method, args){
            var me = this;
            if(!me.Observator[method])
                return;
            me.Observator[method](args);
        }
    };
})(jQuery);

/*Editor*/
(function($){
    
    Qmk.QEditor = function(){
        this.initialize.apply(this, arguments);
    };
    Qmk.QEditor.prototype = {
        Observator: [],
        //Properties
        Name:null,
        Container:null,
        PageSize: {
            width:null,
            height:null
        },
        Elements:[],
        Tools:{
            FontColorTool:null
        },
        //Constructor
        initialize: function(container, name, pageSize, elements){
            var me = this;
            me.Container = $(container);     
            me.Name = name; 
            me.PageSize = pageSize;
            me.Elements = elements;
            me.renderControl();     
        },
        //Methods
        renderControl:function(){
            var me = this;
            me.Container.addClass('qeditor_container');
            me.renderToolbar();
            //CreateViewPort
            var viewPort = $('<div id="'+me.Name+'_viewport'+'" class="qeditor_viewport"></div>');
            me.Container.append(viewPort);
            //CreatePage
            var page = $('<div id="'+me.Name+'_page'+'" class="qeditor_page"></div>');
            page.width(me.PageSize.width).height(me.PageSize.height);
            viewPort.append(page);
            //Add elements
            me.renderElements();
        },
        renderToolbar:function(){
            var me = this;
            //Create Toolbar
            var toolbar = $('<div id="'+me.Name+'_toolbar'+'" class="qeditor_toolbar"></div>');
            me.Container.append(toolbar);
            //Add tools------>
            //Add FontColorTool
            var fct = $('<div id="'+me.Name+'_fontcolortool'+'" class="qeditor_fontcolortool"></div>');
            toolbar.append(fct);
            var fontColorTool = new Qmk.ColorSelector('#'+me.Name+'_fontcolortool', 'fontColorTool', ['#123456', '#ff0000', '#ff3455', '#aa1256']);
            me.Tools.FontColorTool = fontColorTool;
        },
        renderElements:function(){
            var me = this;
            var $viewport = $('#'+me.Name+'_viewport');
            for(var i=0; i<me.Elements.length;i++){
                me.Elements[i].MoveTo($viewport);
                //add draggable and sizable
                me.Elements[i].AddDraggableBehavior($viewport);
                //addSeleccionbehavior
                me.Elements[i].AddToolEventBehavior(me.Tools);
            }
        },
        //Events
        bind: function(method, callback){
            var me = this;
            me.Observator[method]=callback;
        },
        trigger: function(method, args){
            var me = this;
            if(!me.Observator[method])
                return;
            me.Observator[method](args);
        }
    };

})( jQuery );

/*
Types available
-Fields
-images
*/

(function($){

    Qmk.QElement = function(){
        this.initialize.apply(this,arguments);
    };
    Qmk.QElement.prototype = {
        //
        Observator: [],
        //Properties
        Name:null,
        Container:null,
        Properties:{
            Type:'field',
            Position:{ top:10, left:10 },
            Size:{ width:100,height:50 },
            Font:'Arial',
            FontColor:'Black',
            FontSize:'12px',
            LeftBorder:{Visible:false, Color:'Blue'},
            RightBorder:{Visible:false, Color:'Blue'},
            TopBorder:{Visible:false, Color:'Blue'},
            DownBorder:{Visible:false, Color:'Blue'},
            LabelText:'Text',
            DataText:'Data'
        },        
        //Constructor
        initialize:function(container, name, properties){
            var me = this;
            me.Container = $(container);
            me.Name = name;
            me.Properties = $.extend({}, me.Properties,properties);
            me.renderElement(me.Properties.Type);
        },
        //Methods
        renderElement:function(type){
            var me = this;
            switch(type){
                case 'field':
                    me.renderFieldElement();                            
                break;
            }
        },
        renderFieldElement:function(){
            var me = this;
            //Add drag handler
            var drag_handler = $('<div id="'+me.Name+'_draghandler'+'" class="qelement_draghandler"></div>');
            me.Container
            .css({
                    'font-family':me.Properties.Font,
                    'font-size':me.Properties.FontSize,
                    'color':me.Properties.FontColor,
                    'width': me.Properties.Size.width,
                    'height': me.Properties.Size.height,
                    'left': me.Properties.Position.top,
                    'top': me.Properties.Position.left
                });
            me.Container.append(drag_handler);
            var field = $('<div id="'+me.Name+'_fieldborder'+'" class="qelement_fieldborder"><div id="'+me.Name+'_fieldLabel'+'" class="qelement_fieldlabel">'+
            me.Properties.LabelText
            +'</div><div id="'+me.Name+'_fieldData'+'" class="qelement_fielddata">'+
            me.Properties.DataText
            +'</div><div>');
            me.Container.append(field);
        },
        MoveTo:function(newParent){
            var me = this;
            me.Container.detach();
            newParent.append(me.Container);
        },
        AddDraggableBehavior:function($viewport){
            var me = this;
            me.Container
            .draggable({
                containment: $viewport,
                handle: '#'+me.Name+'_draghandler'
            })
            .resizable({
                containment: $viewport
            });
        },
        AddToolEventBehavior:function(tools){
            var me = this;
            me.Container.mousedown(function(e){
                e.preventDefault();
                me.MarkSelect();
                tools.FontColorTool.bind('onChangeSelectedColor',function(color){
                    me.Properties.FontColor = color;
                    me.renderProperties();
                });
            });
        },
        renderProperties:function(){
            var me = this;
            me.Container
            .css({
                    'font-family':me.Properties.Font,
                    'font-size':me.Properties.FontSize,
                    'color':me.Properties.FontColor
                });
        },
        MarkSelect:function(){
            var me = this;
            $('#'+me.Name+'_draghandler').css({
                'border': '1px dashed black'
            });
        },
        MarkUnselect:function(){
            var me = this;
            $('#'+me.Name+'_draghandler').css({
                'border': '1px dotted black'
            });
        },
        //Events
        bind: function(method, callback){
            var me = this;
            me.Observator[method]=callback;
        },
        trigger: function(method, args){
            var me = this;
            if(!me.Observator[method])
                return;
            me.Observator[method](args);
        }
    };

})( jQuery );