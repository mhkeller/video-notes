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
				if (e.which == 107){
					hits.logTime()
				}
			})
		},

		logTime: function(){
			var current_time = gfx.els.video.currentTime;
			hits.list.push(current_time);
			localStorage.setItem(settings.video_name, JSON.stringify(hits.list));
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

			var files = evt.dataTransfer.files, // FileList object.
					video_name = evt.dataTransfer.files[0].name;

			gfx.els.$video.attr('src', 'videos/'+video_name).show();
			$(gfx.els.dropzone).hide();

			settings.video_name = video_name;


			if (localStorage[settings.video_name]){
				hits.list = JSON.parse(localStorage[settings.video_name]);
			} else {
				hits.list = [];
			}
	  }
	}

	var settings = {};

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