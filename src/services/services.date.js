angular.module('app.core.services')
  .factory('BusinessDate', function() {
    var formatAsDate = function(date) {
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();

      var text = year + '-';
      if (month < 10) {
        text += '0';
      }
      text += month;

      if (day < 10) {
        text += '0';
      }

      text += day;
      return text;
    };

    var getCurrentDate = function() {
      var now = new Date();
      var today = formatAsDate(now);
      return today;
    };

    return {
      GetCurrentDate: getCurrentDate
    };
  });
