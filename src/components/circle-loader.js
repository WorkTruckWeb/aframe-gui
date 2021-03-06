AFRAME.registerComponent('gui-circle-loader', {
    schema: {
        count: {type: 'number', default: '100'},
        fontColor: {type: 'string', default: key_grey},
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
        canvas.id = getUniqueId('canvas');
        document.body.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.height};`);
        el.setAttribute('material', `shader: flat; transparent: true; opacity: 0.5; side:back; color:${data.backgroundColor};`);

        drawText(ctx, canvas, data.count+'%', '110px ' + data.fontFamily, data.fontColor, 1);

        var loaderContainer = document.createElement("a-entity");
        loaderContainer.setAttribute('geometry', `primitive: cylinder; radius: ${guiItem.height/2}; height: 0.02;`);
        loaderContainer.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        loaderContainer.setAttribute('rotation', '90 0 0');
        loaderContainer.setAttribute('position', '0 0 0.01');
        el.appendChild(loaderContainer);

        var loaderRing = document.createElement("a-ring");
        loaderRing.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.activeColor}`);
        loaderRing.setAttribute('radius-inner', `${guiItem.height/3}`);
        loaderRing.setAttribute('radius-outer', `${guiItem.height/2}`);
        loaderRing.setAttribute('theta-start', '90');
        loaderRing.setAttribute('theta-length', '10'); // this has to count 0 to 360 when loading
        loaderRing.setAttribute('rotation', '0 0 0');
        loaderRing.setAttribute('position', '0 0 0.04');
        loaderRing.id = "loader_ring";
        el.appendChild(loaderRing);

        var countLoaded = document.createElement("a-entity");
        countLoaded.setAttribute('geometry', `primitive: plane; width: ${guiItem.height/1.75}; height: ${guiItem.height/1.75};`);
        countLoaded.setAttribute('material', `shader: flat; src: #${canvas.id}; transparent: true; opacity: 1; side:front;`);
        countLoaded.setAttribute('position', '0 0 0.022');
        countLoaded.id = "loader_ring_count";
        el.appendChild(countLoaded);


    },
    play: function () {

    },
    update: function (oldData) {
    },
});

