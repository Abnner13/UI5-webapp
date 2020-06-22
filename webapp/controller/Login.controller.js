sap.ui.define([
	"sap/f/sample/ShellBarWithSplitApp/controller/BaseController",
	"sap/m/MessageToast",
], function (BaseController, MessageToast) {
	"use strict";
	return BaseController.extend("sap.f.sample.ShellBarWithSplitApp.controller.Login", {
		onInit : function () {
			var that = this;
			this.byId("InventFilesLoginPage").attachBrowserEvent("keypress", oEvent => {
				if(oEvent.keyCode != jQuery.sap.KeyCodes.ENTER) return;

				that.onLogin();
			});

			this.UserCredentials = {
				UserName: "",
				Password:"",
				grant_type : 'password'
			};
		},

		onLogin : function (oEvent) {
			this.UserCredentials.UserName = this.byId("userName").getValue()
			this.UserCredentials.Password = this.byId("userPass").getValue()

			if(!this.UserCredentials.UserName || !this.UserCredentials.Password) {
				MessageToast.show("Infome o usuário e senha");
				return;
			}else{
				this.setUserSession(this.UserCredentials)
				this.getRouter().navTo("home")
	
			}

			
		}
	});
});
