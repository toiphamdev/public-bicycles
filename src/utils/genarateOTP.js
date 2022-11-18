const generateRandomNumber = () => {
  var minm = 100000;
  var maxm = 999999;
  return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
};

const generateKeywords = (displayName) => {
  // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
  // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
  const keywords = displayName.split(' ').filter((item) => {
    return item !== '-' && item !== '_' && item !== ' ';
  });
  return keywords;
};
module.exports = {
  generateRandomNumber,
  generateKeywords,
};
