# -*- coding: utf-8 -*-
#################################################################################
#
#   Copyright (c) 2016-Present Webkul Software Pvt. Ltd. (<https://webkul.com/>)
#   See LICENSE file for full copyright and licensing details.
#   License URL : <https://store.webkul.com/license.html/>
# 
#################################################################################

from odoo import api, fields, models
from odoo.exceptions import Warning,ValidationError

class PosConfig(models.Model):
    _inherit = 'pos.config'

    iface_network_printer = fields.Boolean(string="Network Printer")
    printer_name = fields.Char(string='Network Printer Name')