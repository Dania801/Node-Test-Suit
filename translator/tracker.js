var PageTracking = function(options) {
  this.options = options;
};

PageTracking.prototype.init = function() {
  this.sendTracking(this.options);
};

PageTracking.prototype.sendTracking = function (options) {
  console.log('Tracking sent');
};

module.exports = PageTracking;
