sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function(Controller, History, UIComponent) {
	"use strict";

	return Controller.extend("sap.f.sample.ShellBarWithSplitApp.controller.BaseController", {
		USER_SESSION_PATH: "currentUser",

		getRouter : function () {
			return UIComponent.getRouterFor(this);
		},

		onNavBack: function () {
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("appHome", {}, true /*no history*/);
			}
		},

		getUserSession: function () {
			return this.getItem(this.USER_SESSION_PATH);
		},

		setUserSession: function (userData) {
			delete userData.Password;
			this.setItem(this.USER_SESSION_PATH, userData)
		},

		destroyUserSession: function () {
			this.removeItem(this.USER_SESSION_PATH);
		},
		
		setItem(path, data) {
			localStorage.setItem(path, JSON.stringify(data));

		},

		getItem(path) {
			let strData = localStorage.getItem(path)
			if (!strData || strData == '') return null;

			return JSON.parse(strData);
		},

		removeItem(path) {
			localStorage.removeItem(path);
		},
		
	});

});



