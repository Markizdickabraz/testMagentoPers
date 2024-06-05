define(['jquery', 'mage/translate'], function($, $t) {
    'use strict';

    return function (validator) {
        $.validator.addMethod(
            'validate-phone-format',
            function(value) {
                var phoneFormat = /^\+380\d{2}\d{3}\d{2}\d{2}$/;
                var cleanedValue = value.replace(/[\s-]/g, '');
                return phoneFormat.test(cleanedValue);
            },
            $t('Please enter a valid phone number in the format +380 dd ddd-dd-dd')
        );

        $.validator.addMethod(
            'validate-phone-operator',
            function(value) {
                var cleanedValue = value.replace(/[\s-]/g, '');
                var operatorCode = cleanedValue.slice(3, 6);
                var validOperators = ['097', '096', '068', '050', '095'];
                return validOperators.includes(operatorCode);
            },
            $t('Please enter a valid operator code')
        );

        $.validator.addMethod(
            'validate-only-digits',
            function(value) {
                var digitsOnly = /^[\d\s\+\-]*$/;
                return digitsOnly.test(value);
            },
            $t('Please enter only digits')
        );

        $.validator.addMethod(
            'validate-name-length',
            function(value) {
                return value.length <= 15;
            },
            $t('Name must be 15 characters or less')
        );

        $.validator.addMethod(
            'validate-email-format',
            function(value) {
                var emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                var hasCyrillic = /[а-яА-ЯЁё]/;
                return emailFormat.test(value) && !hasCyrillic.test(value);
            },
            $t('Please enter a valid email address without Cyrillic characters')
        );

        return validator;
    }
});
