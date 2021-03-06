AFRAME.registerComponent('gui-label', {
    schema: {
        text: {type: 'string', default: 'label text'},
        labelFor: {type: 'selector', default: null},
        fontColor: {type: 'string', default: key_grey_dark},
        fontFamily: {type: 'string', default: 'Helvetica'},
        backgroundColor: {type: 'string', default: key_offwhite},
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
        canvas.id = getUniqueId('canvas');
        document.body.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);
        el.setAttribute('material', `shader: flat; side:front; color:${data.backgroundColor};`);

        drawText(ctx, canvas, data.text, '100px ' + data.fontFamily, data.fontColor, 1);

        var textEntity = document.createElement("a-entity");
        textEntity.setAttribute('geometry', `primitive: plane; width: ${guiItem.width/1.05}; height: ${guiItem.height/1.05};`);
        textEntity.setAttribute('material', `shader: flat; src: #${canvas.id}; transparent: true; opacity: 1; side:front;`);
        textEntity.setAttribute('position', '0 0 0.001');
        el.appendChild(textEntity);

        ////WAI ARIA Support

        if(data.labelFor){
            // el.setAttribute('role', 'button');
        }


    },
});

