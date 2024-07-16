// define([
//     'jquery',
//     'Magento_Customer/js/customer-data',
//     'jquery/ui'
// ], function ($, customerData) {
//     'use strict';
//
//     $.widget('mage.customerDataWidget', {
//
//         _create: function() {
//             const name = this.getFullName();
//             // console.log(name);
//             const $element = this.element;
//             console.log($element)
//             $element.html(name);
//         },
//         /**
//          * @return {String}
//          */
//         getFullName: function () {
//             console.log(customerData.get('customer')())
//             return customerData.get('customer')()?.fullname;
//         }
//     });
//
//     return $.mage.customerDataWidget;
//
// });
define([
    'jquery',
    'Magento_Customer/js/customer-data',
], function ($, customerData) {
    'use strict';

    $.widget('mage.customerDataWidget', {
        _create: function() {
            const name = this.getFirstName();
            if(!name) {
                this.element.html('Ввійти')
            }
            this.element.html(name);
        },

        /**
         * @return {String}
         */
        getFirstName: function () {
            console.log(customerData)
            // return customerData.get('customer')()?.firstname;
        },
    });

    return $.mage.customerDataWidget;
});
