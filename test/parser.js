/**
 * Module Dependencies
 */

var parse = require('../lib/parser');
var assert = require('better-assert');

/**
 * Some predefined dates
 */

var mon = new Date('May 13, 2013 01:30:00');

/**
 * Test parser
 */

/**
 * Minutes
 */

describe('minutes', function () {
  it('10m', function () {
    var date = parse('10m', mon);
    assert('1:40:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('10min', function () {
    var date = parse('10min', mon);
    assert('1:40:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('10 minutes', function () {
    var date = parse('10 minutes', mon);
    assert('1:40:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('dans 10 minutes', function () {
    var date = parse('dans 10 minutes', mon);
    assert('1:40:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('10 minutes à partir de demain', function () {
    var date = parse('10 minutes à partir de demain', mon);
    assert('1:40:00' == t(date));
    assert('5/14/13' == d(date));
  });
});

/**
 * Hours
 */

describe('heures', function() {
  it('dans 5 heures', function () {
    var date = parse('dans 5 heures', mon);
    assert('6:30:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('à 5am', function () {
    var date = parse('5am', mon);
    assert('5:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('à 5pm', function () {
    var date = parse('5pm', mon);
    assert('17:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('à 12:30', function () {
    var date = parse('à 12:30', mon);
    assert('12:30:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('à 23:35', function () {
    var date = parse('à 23:35', mon);
    assert('23:35:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('à 0:30', function () {
    var date = parse('à 0:30', mon);
    assert('0:30:00' == t(date));
    assert('5/14/13' == d(date));
  });
});

/**
 * Days
 */

describe('jours', function () {
  it('dans 2 jours', function () {
    var date = parse('dans 2 jours', mon);
    assert('1:30:00' == t(date));
    assert('5/15/13' == d(date));
  });

  it('dans 2j', function () {
    var date = parse('dans 2j', mon);
    assert('1:30:00' == t(date));
    assert('5/15/13' == d(date));
  });
});

/**
 * Dates
 */

describe('dates', function () {
  it('mardi à 9am', function () {
    var date = parse('mardi à 9am', mon);
    assert('9:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('lundi à 9am', function () {
    var date = parse('lundi à 9am', mon);
    assert('9:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('Lundi à 9am', function () {
    var date = parse('Lundi à 9am', mon);
    assert('9:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('lundi à 1:00am', function () {
    var date = parse('lundi à 1:00am', mon);
    assert('1:00:00' == t(date));
    assert('5/20/13' == d(date));
  });

  it('lundi prochain à 1:00am', function () {
    var date = parse('lundi prochain à 1:00am', mon);
    assert('1:00:00' == t(date));
    assert('5/20/13' == d(date));
  });

  it('lundi dernier à 1:00am', function () {
    var date = parse('lundi dernier à 1:00am', mon);
    assert('1:00:00' == t(date));
    assert('5/6/13' == d(date));
  });
});


/**
 * Tomorrow
 */

describe('demain', function () {
  it('demain à 3pm', function () {
    var date = parse('demain à 3pm', mon);
    assert('15:00:00' == t(date));
    assert('5/14/13' == d(date));
  });
});

/**
 * Yesterday
 */

describe('hier', function () {
  it('hier à 3pm', function () {
    var date = parse('hier à 3pm', mon);
    assert('15:00:00' == t(date));
    assert('5/12/13' == d(date));
  });

  it('hier à 12:30am', function () {
    var date = parse('hier à 12:30am', mon);
    assert('0:30:00' == t(date));
    assert('5/12/13' == d(date));
  });
});

/**
 * Tonight
 */

describe('ce soir', function () {
  it('5pm ce soir', function () {
    var date = parse('5pm ce soir', mon);
    assert('17:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('ce soir à 5pm', function () {
    var date = parse('ce soir à 5pm', mon);
    assert('17:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('ce soir à 5', function () {
    var date = parse('ce soir à 5', mon);
    assert('17:00:00' == t(date));
    assert('5/13/13' == d(date));
  });
});

/**
 * Midnight
 */
describe('minuit', function () {
  it('minuit', function () {
    var date = parse('minuit', mon);

    assert('0:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('demain à minuit', function () {
    var date = parse('demain à minuit', mon);
    assert('0:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('minuit (@ 1:30pm)', function () {
    var afternoon = new Date('May 13, 2013 13:30:00')
    var date = parse('minuit', afternoon);
    assert('0:00:00' == t(date));
    assert('5/14/13' == d(date));
  });
});

/**
 * Noon
 */

describe('midi', function () {
  it('midi', function () {
    var date = parse('midi', mon);
    assert('12:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('demain à midi', function () {
    var date = parse('demain à midi', mon);
    assert('12:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('midi (@ 1:30pm)', function () {
    var afternoon = new Date('May 13, 2013 13:30:00')
    var date = parse('midi', afternoon);
    assert('12:00:00' == t(date));
    assert('5/14/13' == d(date));
  });
});

/**
 * Weeks
 */

describe('semaines', function () {
  it('mardi prochain', function () {
    var date = parse('mardi prochain', mon);
    assert('1:30:00' == t(date));
    assert('5/21/13' == d(date));
  });

  it('mardi proc', function () {
    var date = parse('mardi proc', mon);
    assert('1:30:00' == t(date));
    assert('5/21/13' == d(date));
  });

  it('mardi prochain à 4:30pm', function () {
    var date = parse('mardi prochain à 4:30pm', mon);
    assert('16:30:00' == t(date));
    assert('5/21/13' == d(date));
  });

  it('2 semaines à partir de mercredi', function () {
    var date = parse('2 semaines à partir de mercredi', mon);
    assert('1:30:00' == t(date));
    assert('5/29/13' == d(date));
  });
});

/**
 * Night
 */

describe('soir', function() {
  it('soir', function () {
    var date = parse('soir', mon);
    assert('17:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('demain soir', function () {
    var date = parse('demain soir', mon);
    assert('17:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('demain soir à 9', function () {
    var date = parse('demain soir à 9', mon);
    assert('21:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('la nuit dernière', function () {
    var date = parse('la nuit dernière', mon);
    assert('17:00:00' == t(date));
    assert('5/12/13' == d(date));
  });
})

/**
 * Afternoon
 */

describe('après-midi', function() {
  it('après-midi', function () {
    var date = parse('après-midi', mon);
    assert('14:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('demain après-midi', function () {
    var date = parse('demain après-midi', mon);
    assert('14:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('l\'après-midi passé', function () {
    var date = parse('l\'après-midi passé', mon);
    assert('14:00:00' == t(date));
    assert('5/12/13' == d(date));
  });
})

/**
 * Morning
 */

describe('matin', function() {
  it('matin', function () {
    var date = parse('matin', mon);
    assert('8:00:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('demain matin', function () {
    var date = parse('demain matin', mon);
    assert('8:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('le matin passé', function () {
    var date = parse('le matin passé', mon);
    assert('8:00:00' == t(date));
    assert('5/12/13' == d(date));
  });

  it('ce matin à 9', function () {
    var date = parse('ce matin à 9', mon);
    assert('9:00:00' == t(date));
    assert('5/13/13' == d(date));
  });
})

/**
 * Months
 */

describe('mois', function () {
  it('ce mois-ci', function () {
    var date = parse('ce mois-ci', mon);
    assert('1:30:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('le mois prochain', function () {
    var date = parse('le mois prochain', mon);
    assert('1:30:00' == t(date));
    assert('6/13/13' == d(date));
  });

  it('le mois dernier', function () {
    var date = parse('le mois dernier', mon);
    assert('1:30:00' == t(date));
    assert('4/13/13' == d(date));
  });

  it('dans 2 mois à partir de demain', function () {
    var date = parse('dans 2 mois à partir de demain', mon);
    assert('1:30:00' == t(date));
    assert('7/14/13' == d(date));
  });

  it('should handle month with less days', function () {
    var date = parse('1 mois', new Date('01/31/2011'));
    assert('2/28/11' == d(date))
  });

  it('should handle leap year', function () {
    var date = parse('1 mois', new Date('01/31/2012'));
    assert('2/29/12' == d(date));
  });

  it('demain après-midi à 4:30pm dans 1 mois', function () {
    var date = parse('demain après-midi à 4:30pm dans 1 mois', mon);
    assert('16:30:00' == t(date));
    assert('6/14/13' == d(date));
  });
});

/**
 * Year
 */

describe('an', function() {
  it('cette année', function() {
    var date = parse('cette année', mon);
    assert('1:30:00' == t(date));
    assert('5/13/13' == d(date));
  });

  it('l\'année prochaine', function () {
    var date = parse('l\'année prochaine', mon);
    assert('1:30:00' == t(date));
    assert('5/13/14' == d(date));
  });

  it('l\'année passée', function () {
    var date = parse('l\'année passée', mon);
    assert('1:30:00' == t(date));
    assert('5/13/12' == d(date));
  });

  it('dans 2 ans à partir de demain à 5pm', function () {
    var date = parse('dans 2 ans à partir de demain à 5pm', mon);
    assert('17:00:00' == t(date));
    assert('5/12/15' == d(date));
  });

  it('il y a 2 ans', function() {
    var date = parse('il y a 2 ans', mon);
    assert('1:30:00' == t(date));
    assert('5/13/11' == d(date));
  })

  it('dans 2 ans à partir de demain', function() {
    var date = parse('dans 2 ans à partir de demain', mon);
    assert('1:30:00' == t(date));
    assert('5/14/11' == d(date));
  })
});

/**
 * Dates in the past
 */

describe('dates dans le passé', function() {
  var past = new Date('May 13, 2013 18:00:00')

  it('demain après-midi', function() {
    var date = parse('demain après-midi', past);
    assert('14:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  it('demain après-midi à 3pm', function() {
    var date = parse('demain après-midi à 3pm', past);
    assert('15:00:00' == t(date));
    assert('5/14/13' == d(date));
  });

  // Need to place .nextTime() at the end

  it('3pm demain après-midi', function () {
    var date = parse('3pm demain après-midi', past);
    assert('15:00:00' == t(date));
    assert('5/14/13' == d(date));
  });
});

/**
 * Ignore other input
 */

describe('other inputs', function () {
  it('hier, il y a 2 ans--.', function() {
    var date = parse('hier, il y a 2 ans--.', mon);
    assert('1:30:00' == t(date));
    assert('5/12/11' == d(date))
  });
});

/**
 * Bug fixes
 */

describe('bug fixes', function () {
  it('at 12:30pm (fixes: #6)', function () {
    var after = new Date('May 13, 2013 13:30:00');
    var date = parse('at 12:30pm', after);
    assert('12:30:00' == t(date));
    assert('5/14/13' == d(date));
  });
});

/**
 * Time helper function
 */

function t(date) {
  var t = date.toTimeString().split(' ')[0];
  t = ('0' == t[0]) ? t.slice(1) : t;
  return t;
}

/**
 * Date helper function
 */

function d(date) {
  var d = date.toString();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = '' + date.getFullYear();
  return [month, day, year.slice(2)].join('/');
}