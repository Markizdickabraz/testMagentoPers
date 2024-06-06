define(['jquery', 'validation', 'jquery-ui-modules/widget'], $ => {
    'use strict';

    $.widget('vendor.customWidget', {
        init() {
            this._on(this.element, {
                submit: this.onSubmit.bind(this)
            })
        },
            onSubmit(event) {
                event.preventDefault();

                if(this.element.validation('isValid')){
                    console.log('form is not valid')
                    return this;
                }

                console.log('form is valid')
        }
    });

    return $.vendor.customWidget;
});
