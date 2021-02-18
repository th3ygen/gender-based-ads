module.exports = {
    sleep: (t) => (
        new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve();
            }, t);
        })
    ),

    rnd: (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}