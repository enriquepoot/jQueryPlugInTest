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