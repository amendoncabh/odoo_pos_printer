# -*- coding: utf-8 -*-
#################################################################################
# Author      : Webkul Software Pvt. Ltd. (<https://webkul.com/>)
# Copyright(c): 2015-Present Webkul Software Pvt. Ltd.
# All Rights Reserved.
#
#
#
# This program is copyright property of the author mentioned above.
# You can`t redistribute it and/or modify it.
#
#
# You should have received a copy of the License along with this program.
# If not, see <https://store.webkul.com/license.html/>
#################################################################################
{
  "name"                 :  "POS Network Printer",
  "summary"              :  """Odoo POS Network printer allows you to print the POS order receipt using a network printer. It allows you to configure ESC/POS network printer with Odoo POS.""",
  "category"             :  "Point of Sale",
  "version"              :  "1.0",
  "author"               :  "Webkul Software Pvt. Ltd.",
  "license"              :  "Other proprietary",
  "website"              :  "https://store.webkul.com/odoo-pos-network-printer.html",
  "description"          :  """Odoo POS Network Printer
POS print receipt with network printer
POS order receipt
POS order receipt print
Add network printer to POS
Connect Network printer to POS
Odoo POS network printer
Install network printer with POS
Print receipt without POS Box
POS receipt without POS Box""",
  "depends"              :  ['point_of_sale'],
  "data"                 :  [
                             'views/template.xml',
                             'views/pos_config.xml',
                            ],
  "qweb"                 :  ['static/src/xml/pos.xml'],
  "images"               :  ['static/description/Banner.png'],
  "application"          :  True,
  "installable"          :  True,
  "auto_install"         :  False,
  "price"                :  149,
  "currency"             :  "EUR",
  "pre_init_hook"        :  "pre_init_check",
}