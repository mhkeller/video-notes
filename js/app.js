(function(){

	var gfx = {

		init: function(){
			this.els = {};

			this.els.progressInner = document.getElementById('progress-inner');
		},

		loading: {

		  updateProgress: function(evt){
				 // evt is an ProgressEvent.
				if (evt.lengthComputable) {
					var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
					// Increase the progress bar length.
					if (percentLoaded < 100) {
						gfx.els.progressInner.style.width = percentLoaded + '%';
						gfx.els.progressInner.textContent = percentLoaded + '%';
					}
				}
		  }

		}

	}

	var loading = {

		init: function(){
			this.setListeners();
		},

		setListeners: function(){
			console.log(this.handleDragOver)
			var dropZone = document.getElementById('drop-zone');
			dropZone.addEventListener('dragover', this.handleDragOver, false);
			dropZone.addEventListener('drop', this.handleFileSelect, false);
		},

		handleDragOver: function(evt) {
			evt.stopPropagation();
			evt.preventDefault();
			evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
		},

		handleFileSelect: function(evt){
		  evt.stopPropagation();
	    evt.preventDefault();
			// Reset progress indicator on new file selection.
			gfx.els.progressInner.style.width = '0%';
			gfx.els.progressInner.textContent = '0%';

			reader = new FileReader();
			reader.onerror = loading.errorHandler;
			reader.onprogress = gfx.loading.updateProgress;
			reader.onabort = function(e) {
			  alert('File read cancelled');
			};
			reader.onloadstart = function(e) {
			  document.getElementById('progress-bar').className = 'loading';
			};
			reader.onload = function(e) {
				console.log(e)
				// Ensure that the progress bar displays 100% at the end.
				gfx.els.progressInner.style.width = '100%';
				gfx.els.progressInner.textContent = '100%';
				// setTimeout("document.getElementById('progress-bar').className='';", 2000);
			}

			// Read in the image file as a binary string.
			reader.readAsDataURL(evt.dataTransfer.files[0]);
	  },

	  errorHandler: function(evt) {
			switch(evt.target.error.code) {
				case evt.target.error.NOT_FOUND_ERR:
					alert('File Not Found!');
					break;
				case evt.target.error.NOT_READABLE_ERR:
					alert('File is not readable');
					break;
				case evt.target.error.ABORT_ERR:
					break; // noop
				default:
					alert('An error occurred reading this file.');
			};
	  }
	}


	var start = {

		go: function(){

			gfx.init();
			loading.init();

			return this;
		}

	}

	// Let's do it!
	start.go();

}).call(this);