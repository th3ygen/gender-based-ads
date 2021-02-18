const { ads } = require('../ads.json');
const helper = require('../common/helper.common');

const findMostSuitable = (age, gender) => {
    const res = ads.slice();

    for (const ad of res) {
        ad.suitable = (ad.attr.gender === gender) && (ad.attr.age.min <= age && ad.attr.age.max >= age);
    }

    const suitable = res.filter(q => ( q.suitable ));

    if (suitable.length > 0) {
        return suitable[helper.rnd(0, suitable.length - 1)].path;
    }
    
    return '';
};

module.exports = {
    findMostSuitable,
    ads
};