sap.ui.define(
    ["sap/ui/core/UIComponent"],
    function (UIComponent) {
        "use strict";
        return UIComponent.extend("shiva.Component", {
            metadata: {
                manifest: "json"
            },
            init: function () {
                UIComponent.prototype.init.apply(this, arguments);
                this.getRouter().initialize();
                console.log("Router initialized");
            },
            // createContent: function () {
            //     var oView = sap.ui.view({
            //         viewName: "shiva.view.App",
            //         type: "XML",
            //     })

            //     // step 1: get the container from the view
            //     var oContainer = oView.byId("idApp");
            //     // create object of view1 and add it to the container
            //     var oView1 = sap.ui.view({
            //         viewName: "shiva.view.view1",
            //         id: "id1",
            //         type: "XML",
            //     })
            //     var oView2 = sap.ui.view({
            //         viewName: "shiva.view.view2",
            //         id: "id2",
            //         type: "XML",
            //     })

            //     // addd to ocontainer
            //     oContainer.addPage(oView1);
            //     oContainer.addPage(oView2);


            //     return oView;
            // },
            destroy: function () {

            }
        });
    }
);