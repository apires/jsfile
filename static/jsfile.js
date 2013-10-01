var jsFile = !(function(undefined){
	var jsFile = function(file) {

		var compareTypes = function(a,b){
			for(var i = 0; i < b.length; b++)
				if(a[i] != b[i]) return false;
			return true;
		};

		var headerMap = {
			"\00\00\00\x14\x66\x74\x79\x70\x69\x73\x6F\x6D": "ISO Base Media file (MPEG-4) v1",
			"\xFF\xD8\xFF": "JPEG/JFIF graphics file",
			"\x47\x49\x46\x38\x37\x61": "GIF file",
			"\x47\x49\x46\x38\x39\x61": "GIF file",
			"\x89\x50\x4E\x47\x0D\x0A\x1A\x0A": "PNG file"
		};

		this.fr = new FileReader();
		this.header = file.slice(0,25);


		this.onloadCallback = function(e, success, failure){
			var h = e.currentTarget.result;
			for( var header in headerMap)
				if(compareTypes(h, header))
					return success(headerMap[header]);
				return failure();
			};

		};

	jsFile.prototype.guess = function(success, failure){
		var self = this;
		this.fr.readAsBinaryString(this.header);
		this.fr.onload = function(e) { self.onloadCallback(e, success, failure); };
	};

	return jsFile;
})();

window.jsFile = jsFile;