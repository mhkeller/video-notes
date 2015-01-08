(function(){

	var gfx = {
		init: function(){
			this.els = {};
			this.els.video = document.getElementById('video');
			this.els.$video = $(this.els.video);
			this.els.dropzone = document.getElementById('dropzone');
		}
	}

	var hits = {

		init: function(){
			this.setListeners();
		},

		setListeners: function(){
			$(document).on('keypress', function(e){
				console.log(e)
				if (e.which == 107){
					var current_time = gfx.els.video.currentTime;
					console.log(current_time);
				}
			})
		}

	}

	var loading = {

		init: function(){
			this.setListeners();
		},

		setListeners: function(){
			gfx.els.dropzone.addEventListener('dragover', this.handleDragOver, false);
			gfx.els.dropzone.addEventListener('drop', this.handleFileSelect, false);
		},

		handleDragOver: function(evt) {
			evt.stopPropagation();
			evt.preventDefault();
			evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
		},

		handleFileSelect: function(evt){
			evt.stopPropagation();
			evt.preventDefault();

			var files = evt.dataTransfer.files; // FileList object.

			gfx.els.$video.attr('src', 'videos/'+evt.dataTransfer.files[0].name).show();
			$(gfx.els.dropzone).hide();

			// videojs("#video", {}, function(){
			// 	// Player (this) is initialized and ready.
			// 	console.log('ready', this)
			// });

	  }
	}


	var start = {

		go: function(){

			hits.init();
			gfx.init();
			loading.init();

			return this;
		}

	}

	// Let's do it!
	start.go();

}).call(this);