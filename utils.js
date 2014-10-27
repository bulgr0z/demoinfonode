module.exports = {

	/**
	 * Trims the NULL char trailing the strings in the stream
	 */
	trimString : function (string) {
    return string.replace(/\0/g, '');
  },

  /**
	 * Iterates over an object and trim each string value
	 */
  trimObject : function(obj) {
  	for (var item in obj) {
  		if (typeof obj[item] === 'string') {
  			obj[item] = this.trimString(obj[item])
  		}
  	}
  	return obj;
  }

};