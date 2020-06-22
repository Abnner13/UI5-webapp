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
		_toolPage: {},
		onInit : function() {
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
			let route = oEvent.getParameter("name");
			if (route != "login") this.createNavigation();
		},

		onLoginPopOver: function(oEvent) {
			if (!this.getUserSession()) {
			  MessageToast.show("NoLoggedUser");
			  this.getRouter().navTo("login");
			} else this.loggedPopOver(oEvent);
		},  
		
		onLogOut: function() {
			this.destroyUserSession();
			this.getRouter().navTo("login");
			location.reload();
		  },

		loggedPopOver: function(oEvent) {
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
			let toogleButton = this.byId("sideNavigationToggleButton");
        
			if (toogleButton.getEnabled()) 
			  return;
			
			var model = new JSONModel();
			model
				.get(this.getServerUrl("model.json"))
				.then(toogleButton.setEnabled(true))
				.catch( e => {
					this.showExeption(e);
				});
			
			this._toolPage.setModel(model);
		},
		
		destroyNavigation() {
			this.byId("sideNavigationToggleButton").setEnabled(false);
			this._toolPage.setModel(new JSONModel());
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
	