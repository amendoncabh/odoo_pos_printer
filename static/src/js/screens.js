/* Copyright (c) 2016-Present Webkul Software Pvt. Ltd. (<https://webkul.com/>) */
/* See LICENSE file for full copyright and licensing details. */
/* License URL : <https://store.webkul.com/license.html/> */

odoo.define('odoo_pos_network_printer.screens', function (require) {
    "use strict";

    var screens = require('point_of_sale.screens');
    var core = require('web.core');
    var QWeb = core.qweb;
    var rpc = require('web.rpc')
    var _t      = core._t;

    screens.ReceiptScreenWidget.include({
        network_print: function(){
            var self = this;
            var receipt = QWeb.render('OrderReceipt', self.get_receipt_render_env());
            rpc.query({
                model:'pos.order',
                method:'get_esc_command_set',
                args:[{"data":receipt}]
            })
            .catch(function(unused, event){
                event.preventDefault();
                self.gui.show_popup('error',{
                    title: _t('Failed To Fetch Receipt Details.'),
                    body:  _t('Please make sure you are connected to the network.'),
                });
            })
            .then(function(esc_commands){
                var esc = esc_commands.replace("\n", "\x0A")
                var printer_name = self.pos.config.printer_name;
                if(! qz.websocket.isActive()){
                    self.pos.connect_to_nw_printer().finally(function(){
                        if(self.pos.nw_printer && self.pos.nw_printer.remote_status == "success"){
                            var config = qz.configs.create(printer_name);
                            var data = [esc]
                            // { type: 'raw', format: 'image', data: receipt_data.receipt.company.logo, options: { language: "ESCPOS", dotDensity: 'double'} },
                            qz.print(config, data).then(function() {}).catch(function(e){
                                console.error(e);
                            });
                        }
                    })
                }else{
                    var config = qz.configs.create(printer_name);
                    var data = [esc]
                    // { type: 'raw', format: 'image', data: receipt_data.receipt.company.logo, options: { language: "ESCPOS", dotDensity: 'double'} },
                    qz.print(config, data).then(function() {});
                }
            });
        },
        show: function(options){
            this._super(options);
            this.network_print();
        },
        renderElement: function() {
            var self = this;
            this._super();
            this.$('.next').click(function(){
                if (!self._locked) {
                    self.click_next();
                }
            });
            this.$('.back').click(function(){
                if (!self._locked) {
                    self.click_back();
                }
            });
            this.$('.button.print').click(function(){
                if (!self._locked) {
                    self.print();
                }
            });
            this.$('.button.nw_print').click(function(){
                self.network_print();
            });
        },
    }); 
});