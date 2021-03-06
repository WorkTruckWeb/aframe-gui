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
        canvas.id = getUniqueId('canvasIcon');
        document.body.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.height};`);
        el.setAttribute('material', `shader: flat; transparent: true; opacity: 0.5; side:back; color:${data.backgroundColor};`);

        drawIcon(ctx, canvas, data.icon, data.fontColor, 1);

        var buttonContainer = document.createElement("a-entity");
        buttonContainer.setAttribute('geometry', `primitive: cylinder; radius: ${guiItem.height/2}; height: 0.02;`);
        buttonContainer.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        buttonContainer.setAttribute('rotation', '90 0 0');
        buttonContainer.setAttribute('position', '0 0 0.01');
        el.appendChild(buttonContainer);

        var buttonEntity = document.createElement("a-entity");
        buttonEntity.setAttribute('geometry', `primitive: cylinder; radius: ${(guiItem.height/2.05)}; height: 0.04;`);
        buttonEntity.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.backgroundColor}`);
        buttonEntity.setAttribute('rotation', '90 0 0');
        buttonEntity.setAttribute('position', '0 0 0.02');
        el.appendChild(buttonEntity);

        var textEntity = document.createElement("a-entity");
        textEntity.setAttribute('geometry', `primitive: plane; width: ${guiItem.height/2}; height: ${guiItem.height/2};`);
        textEntity.setAttribute('material', `shader: flat; src: #${canvas.id}; transparent: true; opacity: 1; side:front;`);
        textEntity.setAttribute('position', '0 0 0.041');
        el.appendChild(textEntity);


        el.addEventListener('mouseenter', function () {
            buttonEntity.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            if (!(data.toggle)) {
                buttonEntity.setAttribute('material', 'color', data.backgroundColor);
            }
        });

        el.addEventListener(data.on, function (evt) {
            console.log('I was clicked at: ', evt.detail.intersection.point);
            data.toggle = !(data.toggle);
            var guiInteractable = el.getAttribute("gui-interactable");
            console.log("guiInteractable: "+guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction();

        });


    },
    play: function () {

    },
    update: function (oldData) {
    },
});

