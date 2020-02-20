/* Copyright (c) 2016-Present Webkul Software Pvt. Ltd. (<https://webkul.com/>) */
/* See LICENSE file for full copyright and licensing details. */
/* License URL : <https://store.webkul.com/license.html/> */

odoo.define('odoo_pos_network_printer.chrome', function (require) {
    "use strict";

    var chrome = require('point_of_sale.chrome');

    var SynchNetworkPrinterWidget = chrome.StatusWidget.extend({
        status: ['connected', 'connecting', 'c_error', 'success'],
        template: 'SynchNetworkPrinterWidget',

        set_status: function(status){
            for(var i = 0; i < this.status.length; i++){
                this.$('.js_'+this.status[i]).addClass('oe_hidden');
            }
            this.$('.js_'+status).removeClass('oe_hidden');
        },
        start: function(){
            var self = this;
            this.$el.click(function(){
                self.pos.nw_printer.disconnect_from_printer().finally(function(e){
                    self.pos.nw_printer.connect_to_printer();
                })
            });
        },
    });

    chrome.Chrome.prototype.widgets.unshift({
        'name':   'network_printer',
        'widget': SynchNetworkPrinterWidget,
        'append':  '.pos-rightheader',
        'condition': function(){ return this.pos.config.iface_network_printer; },
    });
});