sap.ui.define([
	'sap/ui/Device',
	'sap/ui/model/json/JSONModel',
	'sap/m/Popover',
	'sap/m/Button',
	'sap/m/library',
	"sap/f/sample/ShellBarWithSplitApp/controller/BaseController",
], function ( Device, JSONModel, Popover, Button, mobileLibrary, BaseController) {
	"use strict";

	var shellBarController = BaseController.extend("sap.f.sample.ShellBarWithSplitApp.controller.ShellBarWithSplitApp", {
		onInit : function() {
			this.oModel = new JSONModel();
			this.oModel.loadData(sap.ui.require.toUrl("sap/f/sample/ShellBarWithSplitApp/model") + "/model.json", null, false);
			this.getView().setModel(this.oModel);
		},

		
		onMenuButtonPress : function() {
			var toolPage = this.byId("toolPage");
			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},


		onItemSelect : function(oEvent) {
			var item = oEvent.getParameter('item');
			this.byId("pageContainer").to(this.getView().createId(item.getKey()));
			this.getRouter().navTo(item.getKey());
		}
	});


	return shellBarController;

});
