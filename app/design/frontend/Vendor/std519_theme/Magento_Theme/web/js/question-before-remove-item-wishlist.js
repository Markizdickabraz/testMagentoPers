define([
    'jquery',
    'Magento_Ui/js/modal/confirm'
], function ($, confirm) {
    'use strict';

    return function (targetWidget) {
        $.widget('mage.wishlist', targetWidget, {
            _create: function () {
                var _this = this;

                if (!this.options.infoList) {
                    this.element
                        .on('addToCart', function (event, context) {
                            var urlParams;

                            event.stopPropagation(event);
                            $(context).data('stop-processing', true);
                            urlParams = _this._getItemsToCartParams(
                                $(context).parents('[data-row=product-item]').find(_this.options.addToCartSelector)
                            );
                            $.mage.dataPost().postData(urlParams);

                            return false;
                        })
                        .on('click', this.options.btnRemoveSelector, $.proxy(function (event) {
                            event.preventDefault();
                            var postData = $(event.currentTarget).data('post-remove');

                            confirm({
                                content: $.mage.__('Ти впевнений?'),
                                actions: {
                                    confirm: function () {
                                        $.mage.dataPost().postData(postData);
                                    }
                                }
                            });
                        }, this))
                        .on('click', this.options.addToCartSelector, $.proxy(this._beforeAddToCart, this))
                        .on('click', this.options.addAllToCartSelector, $.proxy(this._addAllWItemsToCart, this))
                        .on('focusin focusout', this.options.commentInputType, $.proxy(this._focusComment, this));
                }

                // Setup validation for the form
                this.element.mage('validation', {
                    /** @inheritdoc */
                    errorPlacement: function (error, element) {
                        error.insertAfter(element.next());
                    }
                });
            }
        });

        return $.mage.wishlist;
    };
});

