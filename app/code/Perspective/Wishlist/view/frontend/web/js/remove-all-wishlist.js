define([
    'jquery',
    'mage/template',
    'Magento_Ui/js/modal/confirm',
    'mage/translate',
    'mage/url'
], function ($, mageTemplate, confirm, $t, url) {
    'use strict';

    $.widget('custom.removeAllWishlist', {
        options: {
            removeAllSelector: '[data-role=remove-all-wishlist]',
            removeAllUrl: url.build('perspective/index/removeAll')
        },

        _create: function () {
            var self = this;

            $(self.options.removeAllSelector).on('click', function (event) {
                event.preventDefault();
                confirm({
                    content: $t('Are you sure you want to remove all items from your wishlist?'),
                    actions: {
                        confirm: function () {
                            self._removeAllItems();
                        }
                    }
                });
            });
        },

        _removeAllItems: function () {
            var self = this;

            $.ajax({
                url: self.options.removeAllUrl,
                type: 'POST',
                success: function () {
                    location.reload();
                },
                error: function (xhr, status, error) {
                    alert($t('An error occurred while trying to remove all items from the wishlist.'));
                }
            });
        }
    });

    return $.custom.removeAllWishlist;
});


