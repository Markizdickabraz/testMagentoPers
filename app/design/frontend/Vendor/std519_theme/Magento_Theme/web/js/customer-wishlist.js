define([
    'jquery',
    'Magento_Customer/js/customer-data',
], function ($, customerData) {
    'use strict';

    const itemsRender = 10;

    $.widget('mage.customerDataWidgetWishlist', {
        _create: function () {

            customerData.get('wishlist').subscribe(function () {
                this.updateWishlistCounter();
            }.bind(this));

            this.updateWishlistCounter();
        },

        updateWishlistCounter: function () {
            const wishlistData = customerData.get('wishlist')();
            const counter = wishlistData.counter;

            if (typeof counter === 'undefined') {
                console.error('Wishlist counter is undefined');
                return;
            }

            const counterNumber = parseInt(counter);
            if (isNaN(counterNumber)) {
                console.error('Wishlist counter is NaN');
                return;
            }

            const endItems = counterNumber - itemsRender;

            let wordEnding = '';

            if (endItems === 1 || (endItems % 10 === 1 && endItems % 100 !== 11)) {
                wordEnding = 'товар';
            } else if ((endItems >= 2 && endItems <= 4) || (endItems % 10 >= 2 && endItems % 10 <= 4 && (endItems % 100 < 10 || endItems % 100 >= 20))) {
                wordEnding = 'товари';
            } else {
                wordEnding = 'товарів';
            }

            this.element.html(endItems.toString() + ' ' + wordEnding);
        },
    });

    return $.mage.customerDataWidgetWishlist;
});


