sap.ui.define([
    "sap/f/sample/ShellBarWithSplitApp/controller/BaseController"
 ], function (BaseController) {
    "use strict";

    return BaseController.extend("sap.f.sample.ShellBarWithSplitApp.controller.Home", {

         onDisplayNotFound() {
            //display the "notFound" target without changing the hash
            this.getRouter().getTargets().display("home", {
               fromTarget : "home"
            });
         },
         
         onNavToServices() { 
            this.getRouter().navTo("services");
         }
    });
 
 });

