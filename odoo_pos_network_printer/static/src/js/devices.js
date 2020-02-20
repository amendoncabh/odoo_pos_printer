/* Copyright (c) 2016-Present Webkul Software Pvt. Ltd. (<https://webkul.com/>) */
/* See LICENSE file for full copyright and licensing details. */
/* License URL : <https://store.webkul.com/license.html/> */

odoo.define('odoo_pos_network_printer.devices', function (require) {
    "use strict";

    var devices = require('point_of_sale.devices');
    var core    = require('web.core');

    devices.NetworkPrinter = core.Class.extend({
        init: function(attributes){
            this.pos = attributes.pos;
            this.remote_status = 'disconnected';
            this.config = false;
            this.printer_name = false;
        },
        connect_to_printer: function(){
            var self = this
            self.pos.chrome.widget.network_printer.set_status("connecting");
            return qz.websocket.connect().then(function(){
                var printer_name = self.pos.config.printer_name
                self.remote_status = 'connected';
                self.pos.chrome.widget.network_printer.set_status(self.remote_status);
                return qz.printers.find(printer_name).then(function(found){
                    self.config = qz.configs.create(printer_name);
                    self.remote_status = 'success';
                    self.pos.chrome.widget.network_printer.set_status(self.remote_status);
                }).catch(function(e){
                    self.remote_status = 'c_error';
                    self.pos.chrome.widget.network_printer.set_status(self.remote_status);
                });
            }).catch(function(e){
                console.error(e);
                self.remote_status = 'c_error';
                self.pos.chrome.widget.network_printer.set_status(self.remote_status);
            });
        },
        disconnect_from_printer: function(){
            return qz.websocket.disconnect();
        },
    });
});