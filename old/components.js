

var normalYPosition = 1.5;
var hiddenYPosition = 1000;
window.selectCinematic = function() {
    var musicTypePanel = document.getElementById("music_type_panel");
    var musicLengthPanel = document.getElementById("music_type_panel");
    var musicPlayerPanel = document.getElementById("music_player_panel");

    musicTypePanel.setAttribute("position", `-0.5 1000 -3`);
    musicLengthPanel.setAttribute("position", `-0.5 1.5 -3`);
    musicPlayerPanel.setAttribute("position", `-0.5 1000 -3`);

    musicTypePanel.setAttribute("scale", `0.001 0.001 0.001`);
    musicLengthPanel.setAttribute("scale", `1 1 1`);
    musicPlayerPanel.setAttribute("scale", `0.001 0.001 0.001`);

    musicTypePanel.setAttribute("visible", `false`);
    musicLengthPanel.setAttribute("visible", `true`);
    musicPlayerPanel.setAttribute("visible", `false`);

    musicType = 'cinematic';
    console.log("in selectCinematic, musicTypePanel: "+musicTypePanel+", musicLengthPanel: "+musicLengthPanel+", musicPlayerPanel: "+musicPlayerPanel);
    console.log("musicType position: "+JSON.stringify(musicTypePanel.getAttribute("position")));
}

window.testButtonAction = function() {
    console.log("in testButtonAction");
}

//default colors
var key_orange       = '#ed5b21' // rgb(237, 91, 33) Light orange
var key_orange_light = '#ef8c60' // rgb (239, 140, 96) Extra Light Orange
var key_grey         = '#22252a' // rgb(34, 37, 42) Standard grey
var key_grey_dark    = '#2c3037' // rgb(44, 48, 55) Medium grey
var key_grey_light   = '#606876' // rgb(96, 104, 118) Light grey
var key_offwhite     = '#d3d3d4' // rgb(211, 211, 212) Extra Light grey
var key_white        = '#fff'

function getUniqueId(stringPrefix) {
    var datestr = new Date().getTime().toString();
    var randomstr = Math.random().toString().replace('.', '');
    return stringPrefix + '_' + datestr + randomstr;
}

function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

AFRAME.registerComponent('gui-item', {
    schema: {
        type: {type: 'string'},
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1}
    },
    init: function () {
    },
    update: function () {
    },
    tick: function () {
    },
    remove: function () {
    },
    pause: function () {
    },
    play: function () {
    },
});

AFRAME.registerComponent('gui-flex-container', {
  schema: {
      flexDirection: { type: 'string' },
      justifyContent: { type: 'string' },
      alignItems: { type: 'string' },
      componentPadding: { type: 'number' },
      fontColor: {type: 'string', default: key_offwhite},
      borderColor: {type: 'string', default: key_offwhite},
      backgroundColor: {type: 'string', default: key_grey},
      opacity: { type: 'number', default: 1.0 }
  },
  init: function () {
	  console.log("in aframe-gui-component init");
	  var guiItem = this.el.getAttribute("gui-item")
      console.log("container gui-item: "+guiItem);
      this.el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);
      this.el.setAttribute('material', `shader: flat; transparent: true; opacity: ${this.data.opacity}; color: ${this.data.backgroundColor};`);
      var cursorX = 0;
      var cursorY = guiItem.height*0.5 - this.data.componentPadding
      if (this.data.flexDirection == 'column') {
          if (this.data.justifyContent == 'center') {
              cursorX = 0; // centered implies cursor X  is 0
          } else if (this.data.justifyContent == 'left') {
              cursorX = -guiItem.width*0.5 + this.data.componentPadding;
          }
      }
      console.log("initial cursor position: "+`${cursorX} ${cursorY} 0.01`)
	  this.children = this.el.getChildEntities();
	  console.log("childElements: "+this.children);
	  for (var i = 0; i < this.children.length; i++) {
          var childElement = this.children[i];
          // TODO: change this to call gedWidth() and setWidth() of component
          var childPositionX = 0;
          var childPositionY = 0;
          var childPositionZ = 0.01;
          var childGuiItem = childElement.getAttribute("gui-item");
		  //console.log("childElement button-text: "+ childElement.getAttribute("button-text"));
          //console.log("childElement data width: "+ childElement.getAttribute("button-text").width);
		  // get object position
          if (this.data.flexDirection == 'column') {
              if (this.data.justifyContent == 'center') {
                  childPositionX = 0; // child position is always 0 to center
              } else if (this.data.justifyContent == 'left') {
                  childPositionX = cursorX + childGuiItem.width*0.5;
              }
              var childPositionY = cursorY - childGuiItem.height*0.5
              if (this.data.alignItems == 'stretch') {
                  // stretch width since we are laying out in column
                  childGuiItem.width = guiItem.width - this.data.componentPadding*2;
                  console.log("childElementWidth: "+childGuiItem.width);
                  // TODO: change this to call setWidth() of component
              }
              // going down column so advance cursorY
              cursorY = cursorY - childGuiItem.height - this.data.componentPadding;
          }
          childElement.setAttribute('position', `${childPositionX} ${childPositionY} ${childPositionZ}`)
          childElement.setAttribute('geometry', `primitive: plane; height: ${childGuiItem.height}; width: ${childGuiItem.width};`)
	  }
  },
  update: function () {},
  tick: function () {},
  remove: function () {},
  pause: function () {},
  play: function () {},
  getElementSize: function () {}
});


function drawText(ctx, canvas, text, font, color, size) {
    setTimeout(function(){

    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 0;
    ctx.shadowOffsetX = 0;
    ctx.scale(1, 1);
    ctx.fillText(text, canvas.width/2, canvas.height/2); // position x, y
    
    },500); // callback when font is loaded needed

}

function drawIcon(ctx, canvas, icon, color, size) {
    setTimeout(function(){
    
    ctx.font = '120px Ionicons';
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 0;
    ctx.shadowOffsetX = 0;
    ctx.scale(1, 1);

    console.log("icon" + icon);
    if(icon == 'music'){
        ctx.fillText('\uf20c', canvas.width/2, canvas.height/2); // ionicons music
    }else if(icon == 'play'){
       ctx.fillText('\uf215', canvas.width/2, canvas.height/2); // ionicons play       
    }else if(icon == 'stop'){
       ctx.fillText('\uf210', canvas.width/2, canvas.height/2); // ionicons play
    }else if(icon == 'twitter'){
       ctx.fillText('\uf243', canvas.width/2, canvas.height/2); // ionicons play
    }else{
       ctx.fillText('\uf14b', canvas.width/2, canvas.height/2); // ionicons play
    }

    },500); // callback when font is loaded needed

}


function drawLabel(ctx, canvas, text, font, color, size,) {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = "left";
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 0;
    ctx.shadowOffsetX = 0;
    ctx.scale(1, 1);
    ctx.fillText(text, canvas.width/2 - canvas.width/4, canvas.height/2, canvas.width - canvas.width/4); // position x, y
}

AFRAME.registerComponent('gui-button', {
    schema: {
        on: {default: 'click'},
        text: {type: 'string', default: 'text'},
        fontColor: {type: 'string', default: key_offwhite},
        fontFamily: {type: 'string', default: 'Arial'},
        borderColor: {type: 'string', default: key_offwhite},
        backgroundColor: {type: 'string', default: key_grey},
        hoverColor: {type: 'string', default: key_grey_dark},
        activeColor: {type: 'string', default: key_orange},
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        var multiplier = 350;
        var canvasWidth = guiItem.width*multiplier;
        var canvasHeight = guiItem.height*multiplier;

        var canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.id = getUniqueId('canvasObjFront');
        document.body.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('material', `shader: flat; transparent: true; opacity: 0.7; side:double; color:${data.backgroundColor};`);

        this.el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);

        drawText(ctx, canvas, data.text, '100px' + data.fontFamily, data.fontColor, 1);

        var buttonContainer = document.createElement("a-entity");
        buttonContainer.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        buttonContainer.setAttribute('geometry', `primitive: box; width: ${guiItem.width}; height: ${guiItem.height}; depth: 0.02;`);
        buttonContainer.setAttribute('rotation', '0 0 0');
        buttonContainer.setAttribute('position', '0 0 0.01');
        this.el.appendChild(buttonContainer);

        var buttonEntity = document.createElement("a-entity");
        buttonEntity.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.backgroundColor}`);
        buttonEntity.setAttribute('geometry', `primitive: box; width: ${(guiItem.width-0.025)}; height: ${(guiItem.height-0.025)}; depth: 0.04;`);
        buttonEntity.setAttribute('rotation', '0 0 0');
        buttonEntity.setAttribute('position', '0 0 0.02');
        this.el.appendChild(buttonEntity);


        var textEntity = document.createElement("a-entity");
        textEntity.setAttribute('material', `shader: flat; src: #${canvas.id}; transparent: true; opacity: 1; side:double;`);
        textEntity.setAttribute('geometry', `primitive: plane; width: ${guiItem.width}; height: ${guiItem.height};`);
        textEntity.setAttribute('position', '0 0 0.042');
        this.el.appendChild(textEntity);

        el.addEventListener('mouseenter', function () {
            buttonEntity.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            buttonEntity.setAttribute('material', 'color', data.backgroundColor);
        });

        el.addEventListener(data.on, function (evt) {
            buttonEntity.setAttribute('material', 'color', data.activeColor);
            console.log('I was clicked at: ', evt.detail.intersection.point);
            var guiInteractable = el.getAttribute("gui-interactable");
            console.log("guiInteractable: "+guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction();
        });


    },
    play: function () {

    },
});

AFRAME.registerComponent('gui-icon-button', {
    schema: {
        on: {default: 'click'},
        icon: {type: 'string', default: ''},
        iconActive: {type: 'string', default: ''},
        fontColor: {type: 'string', default: key_offwhite},
        fontFamily: {type: 'string', default: 'Helvetica'},
        borderColor: {type: 'string', default: key_offwhite},
        backgroundColor: {type: 'string', default: key_grey},
        hoverColor: {type: 'string', default: key_grey_dark},
        activeColor: {type: 'string', default: key_orange},
        toggle: {type: 'boolean', default: false},
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        var multiplier = 350;
        var canvasWidth = guiItem.height*multiplier; //square
        var canvasHeight = guiItem.height*multiplier;

        var canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.id = getUniqueId('canvasObjFront');
        document.body.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('material', `shader: flat; transparent: true; opacity: 0.7; side:double; color:${data.backgroundColor};`);

        this.el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.height};`);

        drawIcon(ctx, canvas, data.icon, data.fontColor, 1);

        var buttonContainer = document.createElement("a-entity");
        buttonContainer.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        buttonContainer.setAttribute('geometry', `primitive: cylinder; radius: ${guiItem.height/2}; height: 0.02;`);
        buttonContainer.setAttribute('rotation', '90 0 0');
        buttonContainer.setAttribute('position', '0 0 0.01');
        this.el.appendChild(buttonContainer);

        var buttonEntity = document.createElement("a-entity");
        buttonEntity.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.backgroundColor}`);
        buttonEntity.setAttribute('geometry', `primitive: cylinder; radius: ${(guiItem.height/2.05)}; height: 0.04;`);
        buttonEntity.setAttribute('rotation', '90 0 0');
        buttonEntity.setAttribute('position', '0 0 0.02');
        this.el.appendChild(buttonEntity);


        var textEntity = document.createElement("a-entity");
        textEntity.setAttribute('material', `shader: flat; src: #${canvas.id}; transparent: true; opacity: 1; side:double;`);
        textEntity.setAttribute('geometry', `primitive: plane; width: ${guiItem.height}; height: ${guiItem.height};`);
        textEntity.setAttribute('position', '0 0 0.042');
        this.el.appendChild(textEntity);


        el.addEventListener('mouseenter', function () {
            buttonEntity.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            buttonEntity.setAttribute('material', 'color', data.backgroundColor);
        });

        el.addEventListener(data.on, function (evt) {
            buttonEntity.setAttribute('material', 'color', data.activeColor);
            console.log('I was clicked at: ', evt.detail.intersection.point);
            var guiInteractable = el.getAttribute("gui-interactable");
            console.log("guiInteractable: "+guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction();

            // if(toggle){
            //     drawIcon(ctx, canvas, data.iconActive, '150px' + data.fontFamily, data.fontColor);
            // }else{
            //     drawIcon(ctx, canvas, data.icon, '150px' + data.fontFamily, data.fontColor);                
            // }

        });


    },
    play: function () {

    },
});

AFRAME.registerComponent('gui-toggle', {
    schema: {
        on: {default: 'click'},
        text: {type: 'string', default: 'text'},
        fontColor: {type: 'string', default: key_grey_dark},
        fontFamily: {type: 'string', default: 'Arial'},
        borderColor: {type: 'string', default: key_grey},
        borderWidth: {type: 'number', default: 1},
        toggleColor: {type: 'string', default: key_offwhite},
        toggleOnColor: {type: 'string', default: key_orange},
        toggleOffColor: {type: 'string', default: key_grey_dark},
        hoverColor: {type: 'string', default: key_grey_light},
        backgroundColor: {type: 'string', default: key_offwhite},
        activeColor: {type: 'string', default: key_orange},
        opacity: {type: 'number', default: 1.0},
        active: {type: 'boolean', default: true}
    },
    init: function() {

        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        var data = this.data;

        el.setAttribute('material', `shader: flat; transparent: true; opacity: 0.7; side:double; color:${data.backgroundColor};`);

        el.setAttribute('geometry', 'width', guiItem.width);
        el.setAttribute('geometry', 'height', guiItem.height);

        var toggleBoxWidth = 0.50
        var toggleBoxX = -guiItem.width*0.5 + toggleBoxWidth*0.5 + 0.1;
        var toggleBox = document.createElement("a-box");
        toggleBox.setAttribute('width', `${toggleBoxWidth}`);
        toggleBox.setAttribute('height', '0.35');
        toggleBox.setAttribute('depth', '0.01');
        toggleBox.setAttribute('material', `color:${data.toggleOffColor}; shader: flat;`);
        toggleBox.setAttribute('position', `${toggleBoxX} 0 0`);
        this.el.appendChild(toggleBox);

        var toggleColorAnimation = document.createElement("a-animation");
        toggleColorAnimation.setAttribute('begin', 'toggleAnimation');
        toggleColorAnimation.setAttribute('direction', 'alternate');
        toggleColorAnimation.setAttribute('attribute', 'material.color');
        toggleColorAnimation.setAttribute('from', `${data.toggleOffColor}`);
        toggleColorAnimation.setAttribute('to', `${data.toggleOnColor}`);
        toggleColorAnimation.setAttribute('dur', '500');
        toggleColorAnimation.setAttribute('easing', 'ease-in-out-cubic');
        toggleBox.appendChild(toggleColorAnimation);

        var toggleHandleWidth = 0.15
        var toggleHandleX = -toggleBoxWidth*0.5 + toggleHandleWidth*0.5 + 0.05;
        var toggleHandle = document.createElement("a-box");
        toggleHandle.setAttribute('width', `${toggleHandleWidth}`);
        toggleHandle.setAttribute('height', '0.30');
        toggleHandle.setAttribute('depth', '0.02');
        toggleHandle.setAttribute('material', `color:${data.toggleColor}`);
        toggleHandle.setAttribute('position', `${toggleHandleX} 0 0`);
        toggleBox.appendChild(toggleHandle);

        var toggleHandleAnimation = document.createElement("a-animation");
        toggleHandleAnimation.setAttribute('begin', 'toggleAnimation');
        toggleHandleAnimation.setAttribute('direction', 'alternate');
        toggleHandleAnimation.setAttribute('attribute', 'position');
        toggleHandleAnimation.setAttribute('from', `${toggleHandleX} 0 0`);
        toggleHandleAnimation.setAttribute('to', `${toggleHandleX + toggleBoxWidth - 0.25} 0 0`);
        toggleHandleAnimation.setAttribute('dur', '500');
        toggleHandleAnimation.setAttribute('easing', 'ease-in-out-cubic');
        toggleHandle.appendChild(toggleHandleAnimation);


        var labelWidth = guiItem.width - toggleBoxWidth;
        var multiplier = 350;
        var canvasWidth = labelWidth*multiplier;
        var canvasHeight = guiItem.height*multiplier;
        var labelCanvas = document.createElement("canvas");
        this.labelCanvas = labelCanvas
        labelCanvas.setAttribute('width', canvasWidth);
        labelCanvas.setAttribute('height', canvasHeight);
        labelCanvas.id = getUniqueId('canvas');
        document.body.appendChild(labelCanvas);

        var ctxLabel = this.ctxLabel = labelCanvas.getContext('2d');

        drawLabel(this.ctxLabel, this.labelCanvas, this.data.text, '100px'+ data.fontFamily, this.data.fontColor);

        var labelEntity = document.createElement("a-entity");
        labelEntity.setAttribute('material', `shader: flat; src: #${labelCanvas.id}; transparent: true; opacity: 1; side:double;`);
        labelEntity.setAttribute('geometry', `primitive: plane; width: ${labelWidth}; height: ${guiItem.height};`);
        labelEntity.setAttribute('position', '0 0 0.02');
        this.el.appendChild(labelEntity);


        this.updateToggle(data.active);

        el.addEventListener('mouseenter', function () {
            toggleHandle.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            toggleHandle.setAttribute('material', 'color', data.toggleColor);
        });

        el.addEventListener(data.on, function (evt) {
            console.log('I was clicked at: ', evt.detail.intersection.point);
            toggleColorAnimation.emit('toggleAnimation');
            toggleHandleAnimation.emit('toggleAnimation');
            var guiInteractable = el.getAttribute("gui-interactable");
            console.log("guiInteractable: "+guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction();
        });

    },
    update: function(){
        var data = this.data;
        this.updateToggle(data.active)
    },


    updateToggle: function(active){

        if(active){

        }else{
        }

    }

});

AFRAME.registerComponent('gui-cursor', {
    schema: {
        cursorColor: {type: 'string', default: key_white},
        cursorActiveColor: {type: 'string', default: key_orange_light},
    },
    init: function () {
        var cursor = this.cursor = this.el.getAttribute('cursor');
        var fuse = cursor.fuse; // true if cursor fuse is enabled.
        var fuseTimeout = cursor.fuseTimeout; // animation lenght should be based on this value
        var defaultHoverAnimationDuration = 400;
        console.log("fuse: "+fuse+", fuseTimeout: "+fuseTimeout);

        var el = this.el;
/*
        var cursorShadow = document.createElement("a-entity");
        cursorShadow.setAttribute('material', 'color: #000000; shader: flat; opacity:0.5;');
        cursorShadow.setAttribute('geometry', 'primitive: ring; radiusInner:0.025; radiusOuter:0.03');
        this.el.appendChild(cursorShadow);

        var hoverGuiAnimationShadow = document.createElement("a-animation");
        hoverGuiAnimationShadow.setAttribute('begin', 'hovergui');
        hoverGuiAnimationShadow.setAttribute('easing', 'linear');
        hoverGuiAnimationShadow.setAttribute('attribute', 'geometry.radiusInner');
        hoverGuiAnimationShadow.setAttribute('fill', 'forwards');
        hoverGuiAnimationShadow.setAttribute('from', '0.025');
        hoverGuiAnimationShadow.setAttribute('to', '0.035');
        hoverGuiAnimationShadow.setAttribute('dur', `${defaultHoverAnimationDuration}`);
        cursorShadow.appendChild(hoverGuiAnimationShadow);
*/

        var hoverGuiAnimation = document.createElement("a-animation");
        hoverGuiAnimation.setAttribute('begin', 'hovergui');
        hoverGuiAnimation.setAttribute('easing', 'linear');
        hoverGuiAnimation.setAttribute('attribute', 'geometry.radiusInner');
        hoverGuiAnimation.setAttribute('fill', 'forwards');
        hoverGuiAnimation.setAttribute('from', '0.000001');
        hoverGuiAnimation.setAttribute('to', '0.025');
        hoverGuiAnimation.setAttribute('dur', `${defaultHoverAnimationDuration}`);
        this.el.appendChild(hoverGuiAnimation);

        var hoverGuiAnimation2 = document.createElement("a-animation");
        hoverGuiAnimation2.setAttribute('begin', 'hovergui');
        hoverGuiAnimation2.setAttribute('easing', 'linear');
        hoverGuiAnimation2.setAttribute('attribute', 'geometry.radiusOuter');
        hoverGuiAnimation2.setAttribute('fill', 'forwards');
        hoverGuiAnimation2.setAttribute('from', '0.025');
        hoverGuiAnimation2.setAttribute('to', '0.035');
        hoverGuiAnimation2.setAttribute('dur', `${defaultHoverAnimationDuration}`);
        this.el.appendChild(hoverGuiAnimation2);


        var leaveGuiAnimation = document.createElement("a-animation");
        leaveGuiAnimation.setAttribute('begin', 'leavegui');
        leaveGuiAnimation.setAttribute('easing', 'linear');
        leaveGuiAnimation.setAttribute('attribute', 'geometry.radiusInner');
        leaveGuiAnimation.setAttribute('fill', 'forwards');
        leaveGuiAnimation.setAttribute('from', '0.02');
        leaveGuiAnimation.setAttribute('to', '0.000001');
        leaveGuiAnimation.setAttribute('dur', `${defaultHoverAnimationDuration}`);
        this.el.appendChild(leaveGuiAnimation);

        var leaveGuiAnimation2 = document.createElement("a-animation");
        leaveGuiAnimation2.setAttribute('begin', 'leavegui');
        leaveGuiAnimation2.setAttribute('easing', 'linear');
        leaveGuiAnimation2.setAttribute('attribute', 'geometry.radiusOuter');
        leaveGuiAnimation2.setAttribute('fill', 'forwards');
        leaveGuiAnimation2.setAttribute('from', '0.035');
        leaveGuiAnimation2.setAttribute('to', '0.025');
        leaveGuiAnimation2.setAttribute('dur', `${defaultHoverAnimationDuration}`);
        this.el.appendChild(leaveGuiAnimation2);

        var leaveGuiAnimation3 = document.createElement("a-animation");
        leaveGuiAnimation3.setAttribute('begin', 'leavegui');
        leaveGuiAnimation3.setAttribute('easing', 'linear');
        leaveGuiAnimation3.setAttribute('attribute', 'material.color');
        leaveGuiAnimation3.setAttribute('fill', 'forwards');
        leaveGuiAnimation3.setAttribute('from', this.data.cursorActiveColor);
        leaveGuiAnimation3.setAttribute('to', this.data.cursorColor);
        leaveGuiAnimation3.setAttribute('dur', '0');
        this.el.appendChild(leaveGuiAnimation3);

        var leaveGuiAnimation4 = document.createElement("a-animation");
        leaveGuiAnimation4.setAttribute('begin', 'leavegui');
        leaveGuiAnimation4.setAttribute('easing', 'linear');
        leaveGuiAnimation4.setAttribute('attribute', 'scale');
        leaveGuiAnimation4.setAttribute('fill', 'forwards');
        leaveGuiAnimation4.setAttribute('to', '1 1 1');
        leaveGuiAnimation4.setAttribute('dur', '0');
        this.el.appendChild(leaveGuiAnimation4);

        var leaveGuiAnimation5 = document.createElement("a-animation");
        leaveGuiAnimation5.setAttribute('begin', 'leavegui');
        leaveGuiAnimation5.setAttribute('easing', 'linear');
        leaveGuiAnimation5.setAttribute('attribute', 'geometry.thetaLength');
        leaveGuiAnimation5.setAttribute('fill', 'forwards');
        leaveGuiAnimation5.setAttribute('to', '360');
        leaveGuiAnimation5.setAttribute('dur', '0');
        this.el.appendChild(leaveGuiAnimation5);


/*
        var fuseScaleAnimation = document.createElement("a-animation");
        fuseScaleAnimation.setAttribute('begin', 'cursor-fusing');
        fuseScaleAnimation.setAttribute('easing', 'linear');
        fuseScaleAnimation.setAttribute('attribute', 'scale');
        fuseScaleAnimation.setAttribute('fill', 'forwards');
        fuseScaleAnimation.setAttribute('from', '1 1 1');
        fuseScaleAnimation.setAttribute('to', '2 2 2');
        fuseScaleAnimation.setAttribute('delay', `${defaultHoverAnimationDuration}`);
        fuseScaleAnimation.setAttribute('dur', '400');
        this.el.appendChild(fuseScaleAnimation);
*/

        var fuseAnimationDuration = fuseTimeout - defaultHoverAnimationDuration;
        var fuseColorAnimation = document.createElement("a-animation");
        fuseColorAnimation.setAttribute('begin', 'cursor-fusing');
        fuseColorAnimation.setAttribute('easing', 'linear');
        fuseColorAnimation.setAttribute('attribute', 'material.color');
        fuseColorAnimation.setAttribute('fill', 'forwards');
        fuseColorAnimation.setAttribute('from', this.data.cursorColor);
        fuseColorAnimation.setAttribute('to', this.data.cursorActiveColor);
        fuseColorAnimation.setAttribute('delay', `${defaultHoverAnimationDuration}`);
        fuseColorAnimation.setAttribute('dur', `${fuseAnimationDuration}`);
        this.el.appendChild(fuseColorAnimation);

        var fuseFillAnimation = document.createElement("a-animation");
        fuseFillAnimation.setAttribute('begin', 'cursor-fusing');
        fuseFillAnimation.setAttribute('easing', 'linear');
        fuseFillAnimation.setAttribute('attribute', 'geometry.thetaLength');
        fuseFillAnimation.setAttribute('fill', 'forwards');
        fuseFillAnimation.setAttribute('from', '0');
        fuseFillAnimation.setAttribute('to', '360');
        fuseFillAnimation.setAttribute('delay', `${defaultHoverAnimationDuration}`);
        fuseFillAnimation.setAttribute('dur', `${fuseAnimationDuration}`);
        this.el.appendChild(fuseFillAnimation);

        var clickAnimation = document.createElement("a-animation");
        clickAnimation.setAttribute('begin', 'click');
        clickAnimation.setAttribute('easing', 'ease-in');
        clickAnimation.setAttribute('attribute', 'scale');
        clickAnimation.setAttribute('fill', 'forwards');
        clickAnimation.setAttribute('from', '1 1 1');
        clickAnimation.setAttribute('to', '1.25 1.25 1.25');
        clickAnimation.setAttribute('dur', '300');
        this.el.appendChild(clickAnimation);

        el.addEventListener('mouseenter', function () {
            console.log("in gui-cursor mousenter, el: "+el);
            el.emit('hovergui');
        });

        el.addEventListener('mouseleave', function () {
            console.log("in gui-cursor mouseleave, el: "+el);
            el.emit('leavegui');
        });

        //this.el.addEventListener("mouseenter", this.hovergui());
        //this.el.addEventListener("mouseleave", this.leavegui());
        // this.el.addEventListener("stateremoved", this.reset(this.ev)); 

    },
    update: function () {

       
    },
    tick: function () {
    },
    remove: function () {
    },
    pause: function () {
    },
    play: function () {
    },
    hovergui: function () {
        //this.cursor.emit('hovergui');
    },
    leavegui: function (evt) {
       // this.cursor.emit('leavegui');
    },
    resetcursor: function(){
        if (evt.detail.state === 'cursor-fusing') {
            AFRAME.utils.entity.setComponentProperty(this, "geometry.thetaLength", 360);
            AFRAME.utils.entity.setComponentProperty(this, "material.color", "#ffffff");
            AFRAME.utils.entity.setComponentProperty(this, "scale", "1 1 1");
        }        
    }
});

AFRAME.registerComponent('gui-interactable', {
    schema: {
        clickAction: {type: 'string'},
        hoverAction: {type: 'string'},
    },
    init: function () {

    },
    update: function () {


    },
    tick: function () {
    },
    remove: function () {
    },
    pause: function () {
    },
    play: function () {
    },

});


// Reset cursor
var cursor = document.querySelector("#cursor");
if (cursor) {
  cursor.addEventListener("stateremoved", function (evt) {
    if (evt.detail.state === 'cursor-fusing') {
      AFRAME.utils.entity.setComponentProperty(this, "geometry.thetaLength", 360);
      AFRAME.utils.entity.setComponentProperty(this, "material.color", "#ffffff");
      AFRAME.utils.entity.setComponentProperty(this, "scale", "1 1 1");
    }
  });
}