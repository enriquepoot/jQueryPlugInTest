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
            var self = this;
            self.Observator = [];
            self.Container = $(container);
            self.Name = name;
            self.Colors = [];
            self.SelectedColor = null;
            self.ColorListDisplayed = false;
            for(i=0; i<colors.length; i++){
                self.Colors.push(colors[i]);
            }
            self.renderControl();
        },
        renderControl:function(){
            var self = this;
            self.Container.css({
                'position':'relative'
            });
            var button = $('<a id="'+self.Name+'_'+'Button'+'" href="'+self.Name+'_'+'Button'+'"></a>')
            button.css({
                'width':'20px',
                'height':'20px',
                'background-color':'black',
                'display':'block'
            })
            .click(function(e){
                e.preventDefault();
                if(self.ColorListDisplayed==true)
                { 
                    self.hideColorList(); 
                }
                else
                { 
                    self.showColorList(); 
                }
            });
            self.Container.append(button);
            self.addColorList();
        },
        addColorList: function(){
            var self = this;
            var colorlist = $('<div id="'+self.Name+'_'+'ColorList'+'"></div>');
            colorlist.css({
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
            self.Container.append(colorlist);
            //Adding selector
            for(i=0;i<self.Colors.length;i++)
            {
                self.addSelector(colorlist, self.Colors[i]);
            }
        },
        showColorList: function(){
            var self = this;
            $('#'+self.Name+'_'+'ColorList').show(500);  
            self.ColorListDisplayed = true;
            $('#'+self.Name+'_'+'ColorList').focusout(function(){
                self.hideColorList();
            });         
        },
        hideColorList: function(){
            var self = this;
            $('#'+self.Name+'_'+'ColorList').hide(500);
            self.ColorListDisplayed = false;
        },
        addSelector:function(container, color){
            var self = this;
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
                self.setSelectedColor($(this).attr('href'));
                self.hideColorList();
            });
            container.append(picker);
        },
        setSelectedColor:function(color){
            var self = this;
            self.SelectedColor = color;
            $('#'+self.Name+'_'+'Button').css({
                'background-color':color
            });
            self.trigger('onChangeSelectedColor',color);
        },
        //Events
        bind: function(method, callback){
            var self = this;
            self.Observator[method]=callback;
        },
        trigger: function(method, args){
            var self = this;
            if(!self.Observator[method])
                return;
            self.Observator[method](args);
        }
    };
})(jQuery);