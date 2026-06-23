sap.ui.define(
  [
    "shiva/controller/BaseController",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
  ],
  function (BaseController, MessageToast, Filter, FilterOperator, MessageBox) {
    "use strict";
    return BaseController.extend("shiva.controller.view2", {
      onInit: function () {
        // this.oRouter = this.getOwnerComponent().getRouter();
        BaseController.prototype.onInit.apply(this);
        this.oRouter.getRoute("second_page").attachMatched(this.ghost, this);
      },
      ghost: function (oEvent) {
        var myVal = oEvent.getParameter("arguments").val;
        var oRelativePath = "local>/fruits/" + myVal;
        this.getView().bindElement(oRelativePath);
      },
      onBack: function () {
        // step 1: get the container
        // var oAppContainer = this.getView().getParent();
        // oAppContainer.to("id1");

        this.oRouter.navTo("home");
      },

      myField: null,
      opopupCities: null,
      onValueHelpRequest: function (oEvent) {
        this.myField = oEvent.getSource();
        // MessageToast.show("Value Help is under construction");
        if (!this.opopupCities) {
          this.opopupCities = new sap.ui.xmlfragment(
            "shiva.fragments.popup",
            this,
          );
          this.opopupCities.setTitle("cities");
          this.getView().addDependent(this.opopupCities);
          this.opopupCities.bindAggregation("items", {
            path: "local>/cities",
            template: new sap.m.StandardListItem({
              title: "{local>name}",
              description: "{local>famousFor}",
            }),
          });
        }
        this.opopupCities.open();
      },

      onValueHelpConfirm: function (oEvent) {
        var oSelectedItem = oEvent.getParameter("selectedItem");
        if (oSelectedItem) {
          this.myField.setValue(oSelectedItem.getTitle());
        }
      },

      onFilterPress: function (oEvent) {
        var oFragment = sap.ui.xmlfragment(
          "shiva.fragments.supplierPopup",
          this,
        );
        oFragment.setTitle("Suppliers");
        this.getView().addDependent(oFragment);
        oFragment.bindAggregation("items", {
          path: "local>/suppliers",
          template: new sap.m.StandardListItem({
            title: "{local>name}",
            description: "{local>contactNo}",
          }),
        });
        oFragment.open();
      },

      onSupplierConfirm: function (oEvent) {
        var oSelectedItem = oEvent.getParameter("selectedItem");

        if (!oSelectedItem) {
          return;
        }

        var sSupplierName = oSelectedItem.getTitle();

        var oTable = this.byId("idSupplierTable");

        var oBinding = oTable.getBinding("items");

        var oFilter = new Filter("name", FilterOperator.EQ, sSupplierName);

        oBinding.filter([oFilter]);

        MessageToast.show("Filtered: " + sSupplierName);
      },

      onSupplierSearch: function (oEvent) {
        var sValue = oEvent.getParameter("value");

        var oFilter = new sap.ui.model.Filter(
          "name",
          sap.ui.model.FilterOperator.Contains,
          sValue,
        );
        oEvent.getSource().getBinding("items").filter([oFilter]);
      },

      onClearFilter: function () {
        var oTable = this.byId("idSupplierTable");
        oTable.getBinding("items").filter([]);
        MessageToast.show("Filter Cleared");
      },


      onSave: function() {
        var that = this;
        MessageBox.confirm("Are you sure you want to save?", {
          onClose: function(status) {
            that.onClose(status);
          }
        })
      },
      onClose: function(status) {
        if(status === "OK") {
          MessageToast.show("Saved successfully!");
        } else {
          MessageToast.show("Save cancelled.");
        }
      },
      onSupplierPress: function() {
        this.oRouter.navTo("end", {
           supplierId : "123"
        });
      }
    });
  },
);
