sap.ui.define(
    ["shiva/controller/BaseController", "sap/m/MessageToast", "shiva/utils/formatter"],
    function (BaseController, MessageToast, formatter) {
        "use strict";
        return BaseController.extend("shiva.controller.view1", {
            formatter: formatter,
            onInit: function () {
                // step 1: get the router
                // this.oRouter = this.getOwnerComponent().getRouter();
                BaseController.prototype.onInit.apply(this);
                console.log("view1 controller initialized");
            },

            onNext: function (val) {
                // step 1: get the container
                // var oAppContainer = this.getView().getParent();
                // oAppContainer.to("id2");

                // step 2: attach the pattern matched event to the router
                this.oRouter.navTo("second_page", {
                    val: val
                });
            },
            onItemPress: function (oEvent) {
                var oSelected = oEvent.getParameter("listItem");
                var oPath = oSelected.getBindingContextPath();
                var oIndex = oPath.split("/")[oPath.split("/").length - 1];
                this.onNext(oIndex);
            },
            onSubmit: function (oEvent) {
                console.log("Submit button clicked");
                var username = this.byId("username").getValue();
                console.log("Username: " + username);
                var password = this.byId("password").getValue();
                console.log("Password: " + password);
                if (username === password && username || password !== "") {
                    this.onNext();
                } else {
                    sap.m.MessageToast.show("Invalid credentials");
                }
            },
            onPress: function (oEvent) {
                sap.m.MessageToast.show("Button clicked");
            },
            onSearch: function (oEvent) {
                var SearchValue = oEvent.getParameter("query");
                MessageToast.show(SearchValue);
                var oFilter1 = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, SearchValue);
                var oFilter2 = new sap.ui.model.Filter("type", sap.ui.model.FilterOperator.Contains, SearchValue);
                var oFilter = new sap.ui.model.Filter({
                    filters: [oFilter1, oFilter2],
                    and: false
                });
                var oList = this.byId("idList");
                var oBinding = oList.getBinding("items");
                oBinding.filter(oFilter);
            },
            onShowSelectedItems: function () {
                // Get the list control
                var oList = this.getView().byId("idList");
                // Get the selected items 
                var aSelectedItems = oList.getSelectedItems();
                // loop through the selected items and get their names
                aSelectedItems.map(function (oItem) {
                    alert(oItem.getTitle())
                });
            },
            onDelete: function (oEvent) {
                // get the list control
                var oDeletedItem = oEvent.getParameter("listItem");
                var sPath = oDeletedItem.getBindingContextPath();
                var oIndex = sPath.split("/")[sPath.split("/").length - 1];
                // read all the items from the model
                var oModel = this.getOwnerComponent().getModel("local");
                var oData = oModel.getProperty("/fruits");
                // remove the item from the array
                oData.splice(oIndex, 1);
                // update the model
                oModel.setProperty("/fruits", oData);
            }
        });
    });