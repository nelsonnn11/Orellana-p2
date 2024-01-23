// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(/* function */ callback, /* DOMElement */ element){
			  window.setTimeout(callback, 1000 / 60);
			};
  })();
  
  
  // example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/
  
  animate();
  
  var mLastFrameTime = 0;
  var mWaitTime = 5000; //time in ms
  function animate() {
  requestAnimFrame( animate );
  var currentTime = new Date().getTime();
  if (mLastFrameTime === 0) {
  mLastFrameTime = currentTime;
  }
  
  if ((currentTime - mLastFrameTime) > mWaitTime) {
  swapPhoto();
  mLastFrameTime = currentTime;
  }
  }
  
  /************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/
  
  function swapPhoto() {
	document.getElementById('photo').src = mImages[mCurrentIndex].url;
	document.getElementsByClassName('location')[0].innerHTML = "Location: " + mImages[mCurrentIndex].location;
	document.getElementsByClassName('description')[0].innerHTML = "Description: " + mImages[mCurrentIndex].description;
	document.getElementsByClassName('date')[0].innerHTML = "Date: " + mImages[mCurrentIndex].date;
	console.log('swap photo');

	mCurrentIndex++;

  if(
		mCurrentIndex >= mJson.images.length
	) {
		mCurrentIndex = 0;
	}
  
  }
  
  
  // Counter for the mImages array
  var mCurrentIndex = 0;
  
  // XMLHttpRequest variable
  var mRequest = new XMLHttpRequest();
  
  // Array holding GalleryImage objects (see below).
  var mImages = [];
  
  // Holds the retrived JSON information
  var mJson;
  
  // URL for the JSON to load by default
  // Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
  var mUrl = 'images.json';
  
  
  //You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
  //@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
  function makeGalleryImageOnloadCallback(galleryImage) {
  return function(e) {
  galleryImage.img = e.target;
  mImages.push(galleryImage);
  }
  }
  
  $(document).ready( function() {
  
  // This initially hides the photos' metadata information
  //$('.details').eq(0).hide();
  
  });
  
  window.addEventListener('load', function() {
  
  console.log('window loaded');
  fetchJSON();
  
  }, false);
  
  function GalleryImage() {
  //implement me as an object to hold the following data about an image:
  //1. location where photo was taken
  let location;
  //2. description of photo
  let description;
  //3. the date when the photo was taken
  let date;
  //4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
  let url;
  }

  function iterateJSON()
  {
	  for(let i = 0; i < mJson.images.length; i++)
	  {
		  mImages[i] = new GalleryImage();
		  mImages[i].location = mJson.images[i].imgLocation;
		  mImages[i].description = mJson.images[i].description;
		  mImages[i].date = mJson.images[i].date;
		  mImages[i].url = mJson.images[i].imgPath;
	  }
  };
  
  function fetchJSON()
  {
	mRequest.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	 mJson = JSON.parse(mRequest.responseText);
	 iterateJSON();
	}
  
  };
  mRequest.open("GET", mUrl, true)
  mRequest.send();
  }
  
  $(document).ready(function () {
    // Add click handler to img.moreIndicator
    $('img.moreIndicator').click(function () {
        // Check if the element has class "rot90"
        if ($(this).hasClass('rot90')) {
            // If it has, remove "rot90" and add "rot270"
            $(this).removeClass('rot90').addClass('rot270');
        } else {
            // If it doesn't have "rot90", remove "rot270" and add "rot90"
            $(this).removeClass('rot270').addClass('rot90');
        }

        // Slide down/up div.details depending on the arrow direction
        $('div.details').fadeToggle();
    });
});

$(document).ready(function () {
  // Offset #nextPhoto to be flush with the right side of #gallery
  var galleryWidth = $('#gallery').width();
  var nextPhotoWidth = $('#nextPhoto').width();
  var offset = galleryWidth - nextPhotoWidth;
  
  // Set the right offset for #nextPhoto
  $('#nextPhoto').css('right', offset);
});

$(document).ready(function () {
  // Counter for the mImages array
  var mCurrentIndex = 0;

  // Add click handler for #nextPhoto
  $('#nextPhoto').click(function () {
      mCurrentIndex++;
      if (mCurrentIndex >= mImages.length) {

          mCurrentIndex = 0;
      }
      displayPhoto(mCurrentIndex);
  });

  // Add click handler for #prevPhoto
  $('#prevPhoto').click(function () {
      mCurrentIndex--;
      if (mCurrentIndex < 0) {
          mCurrentIndex = mImages.length - 1;
      }
      displayPhoto(mCurrentIndex);
  });

  // Function to display photo based on index
  function displayPhoto(index) {
      $('#photo').attr('src', mImages[index].url);
      $('.location').html("Location: " + mImages[index].location);
      $('.description').html("Description: " + mImages[index].description);
      $('.date').html("Date: " + mImages[index].date);
  }
});

$(document).ready(function () {
  // Counter for the mImages array
  var mCurrentIndex = 0;

  // Add click handler for #nextPhoto
  $('#nextPhoto').click(function () {
      mCurrentIndex++;
      if (mCurrentIndex >= mImages.length) {
          // If it's the last photo, loop back to the first photo
          mCurrentIndex = 0;
      }
      displayPhoto(mCurrentIndex);
  });

  // Add click handler for #prevPhoto
  $('#prevPhoto').click(function () {
      mCurrentIndex--;
      if (mCurrentIndex < 0) {
          // If it's the first photo, loop back to the last photo
          mCurrentIndex = mImages.length - 1;
      }
      displayPhoto(mCurrentIndex);
  });

  // Function to display photo based on index
  function displayPhoto(index) {
      $('#photo').attr('src', mImages[index].url);
      $('.location').html("Location: " + mImages[index].location);
      $('.description').html("Description: " + mImages[index].description);
      $('.date').html("Date: " + mImages[index].date);
  }
});

$(".selector").on("mouseover", function () {
  //stuff to do on mouseover
});

  /*call to access the information in the JSON file. */
  