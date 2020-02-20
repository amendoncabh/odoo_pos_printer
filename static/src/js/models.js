/* Copyright (c) 2016-Present Webkul Software Pvt. Ltd. (<https://webkul.com/>) */
/* See LICENSE file for full copyright and licensing details. */
/* License URL : <https://store.webkul.com/license.html/> */

odoo.define('odoo_pos_network_printer.models', function (require) {
    "use strict";

    var models = require("point_of_sale.models");
    var devices = require('point_of_sale.devices');
    var SuperPosModel = models.PosModel.prototype;
    var core = require('web.core');
    var _t      = core._t;

    models.PosModel = models.PosModel.extend({
        initialize: function(session, attributes) {
            var self = this;
            SuperPosModel.initialize.call(this, session, attributes);
            this.nw_printer = new devices.NetworkPrinter({pos:this, printer_name: this.config && this.config.printer_name || false});
        },
        connect_to_nw_printer: function(resolve=null){
            var self = this;
            this.chrome.loading_message(_t('Connecting to the Network Printer'),0);
            return self.nw_printer.disconnect_from_printer().finally(function(e){
                return self.nw_printer.connect_to_printer();
            })
        },
        after_load_server_data: function(){
            var self = this;
            if(self.config.iface_network_printer)
                this.connect_to_nw_printer()
            
            return SuperPosModel.after_load_server_data.call(this);
        },
    });
});