define([
    'jquery',
    'Magento_Customer/js/customer-data',
], function ($, customerData) {
    'use strict';

    $.widget('mage.customerDataWidget', {
        _create: function() {
            const id = this.element.attr('id');
            if (id === 'name') {
                const name = this.getFirstName();
                if (!name) {
                    this.element.html('Ввійти');
                } else {
                    this.element.html(name);
                }
            } else if (id === 'fullname') {
                const fullName = this.getFullName();
                if (!fullName) {
                    this.element.html('імʼя');
                } else {
                    this.element.html(fullName);
                }
            }
        },

        /**
         * @return {String}
         */
        getFirstName: function () {
            return customerData.get('customer')()?.firstname;
        },

        /**
         * @return {String}
         */
        getFullName: function () {
            return customerData.get('customer')()?.fullname;
        }
    });

    return $.mage.customerDataWidget;
});
