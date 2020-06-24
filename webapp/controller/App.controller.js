sap.ui.define([
	'sap/ui/model/json/JSONModel',
	'sap/m/MessageToast',
	'sap/f/sample/ShellBarWithSplitApp/controller/BaseController',
], function ( JSONModel, MessageToast,  BaseController) {
	"use strict";

	var shellBarController = BaseController.extend("sap.f.sample.ShellBarWithSplitApp.controller.App", {
		_toolPage: {},
		onInit() {
			debugger
			this._toolPage = this.byId("toolPage");
			this.getRouter().attachRouteMatched(this.onAfterLoginMatch, this);
        	this.getRouter()
          		.getRoute("login")
          		.attachPatternMatched(this.beforeLogin, this);
			this.oModel = new JSONModel();
			this.oModel.loadData(sap.ui.require.toUrl("sap/f/sample/ShellBarWithSplitApp/model") + "/model.json", null, false);
			this.getView().setModel(this.oModel);
		},

		beforeLogin(oEvent) {
			this.destroyNavigation();
		},

		onAfterLoginMatch(oEvent) {
			debugger
			let route = oEvent.getParameter("name");
			
			if (route != "login") 
				this.createNavigation();
		},

		onLoginPopOver(oEvent) {
			if (!this.getUserSession()) {
			  MessageToast.show("Faça o login para utilizar o sistema");
			  this.getRouter().navTo("login");
			} else this.loggedPopOver(oEvent);
		},  
		
		onLogOut() {
			this.destroyUserSession();
			this.getRouter().navTo("login");
			location.reload();
		},

		loggedPopOver(oEvent) {
			if (!this._oPopoverLogged) {
				this._oPopoverLogged = sap.ui.xmlfragment(
					"sap.f.sample.ShellBarWithSplitApp.view.Logged",
					this
			  	);
			  this.getView().addDependent(this._oPopoverLogged);
			}
			let model = new JSONModel();
			model.setData(this.getUserSession());
			this._oPopoverLogged.setModel(model);
			var oButton = oEvent.getSource();
			jQuery.sap.delayedCall(0, this, function() {
				this._oPopoverLogged.openBy(oButton);
			});
		},

		createNavigation() {
			debugger
			let toogleButton = this.byId("sideNavigationToggleButton");
        
			if (toogleButton.getEnabled()) 
			return;

			toogleButton.setEnabled(true)
			this.oModel = new JSONModel();
			this.oModel.loadData(sap.ui.require.toUrl("sap/f/sample/ShellBarWithSplitApp/model") + "/model.json", null, false);
			this._toolPage.setModel(this.oModel);
		},
		
		destroyNavigation() {
			this.byId("sideNavigationToggleButton").setEnabled(false);
			this._toolPage.setModel(new JSONModel());
		},

		onMenuButtonPress() {
			var toolPage = this.byId("toolPage");
			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},
		
		onItemSelect(oEvent) {
			var item = oEvent.getParameter('item');
			this.byId("pageContainer").to(this.getView().createId(item.getKey()));
			this.getRouter().navTo(item.getKey());
		}
	});


	return shellBarController;

});
	