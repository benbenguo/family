/**
 * Created by Dean on 1/19/2016.
 */
'use strict';

// Declare app level module which depends on views, and components
angular.module('family.shared.config', []).

constant('dateConfig', {
    arrows : {
        year: {
            left: 'images/date-arrow/white_arrow_left.svg',
            right: 'images/date-arrow/white_arrow_right.svg'
        },
        month: {
            left: 'images/date-arrow/grey_arrow_left.svg',
            right: 'images/date-arrow/grey_arrow_right.svg'
        }
    },
    header : {
        monday: 'Mon',
        tuesday: 'Tue',
        wednesday: 'Wed',
        thursday: 'Thu',
        friday: 'Fri',
        saturday: 'Sat',
        sunday: 'Sun',
    }
});