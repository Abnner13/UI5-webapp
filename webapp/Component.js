sap.ui.define(['sap/ui/core/UIComponent'],
function (UIComponent) {
	"use strict";

	return UIComponent.extend("sap.f.sample.ShellBarWithSplitApp.Component", {
		metadata: {
			manifest: "json"
        },

		init(){
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
		}
	});
});
