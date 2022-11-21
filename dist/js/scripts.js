// FRAGMENT BUILT FOR THE WIDGET

$(function() {
	var fragmentIncludes = $('fragment-include'),
		fragmentsToLoad = fragmentIncludes.length,
		fragmentLoadedCallback = function() {
			fragmentsToLoad--;
			if (fragmentsToLoad === 0) {
				var mainHeader = $('.main-header:not(.services-header)'),
					clockTime = $('.widget.clock'),
					temperature = $('.widget.temperature'),
					videoElement = $('video').on('contextmenu', function() {
						return false;
					})[0];


					// SKY VIDEO
				if (videoElement && mainHeader.length > 0) {
					$(window).on('scroll', function() {
						if (this.scrollY + mainHeader[0].offsetHeight >= videoElement.offsetHeight) {
							mainHeader.addClass('opaque');
						} else {
							mainHeader.removeClass('opaque');
						}
					});
				}

				// MENU TOGGLE
				$('.menu-toggle').on('click', function() {
					$('body').toggleClass('menu-expanded');
				});

				// SLIDER
				if ($.fn.slider) {
					$('.slider').slider({
						slides: [{
							image: "dubai.jpg",
							caption: {
								header: "Dubai City",
								details: "Dubai is a destination that mixes modern culture with history, adventure with world-class shopping and entertainment. Catch a show at the Dubai Opera, see downtown from atop the Burj Khalifa and spend an afternoon along Dubai Creek exploring the gold, textile and spice souks. If you’re looking for thrills, you can float above the desert dunes in a hot air balloon, climb aboard a high-speed ride at IMG Worlds of Adventure or skydive over the Palm Jumeirah."
							}
						}, 

						{
							image: "lnd.jpg",
							caption: {
								header: "London City",
								details: "How much do you know about London? A lively and eclectic metropolis, London has always something new to discover.There are so many things to do in London! Get started with our guide for first-time visitors. Stay in some of the country's grandest hotels, see some of the best theatre in the world in the West End, take a tour and allow let’s take you through the city’s hidden gems."
							}
						}, 
							

						{
							image: "sedney.jpg",
							caption: {
								header: "Sedney City",
								details: "Sydney is the largest and most populous city in Australia and the state capital of New South Wales. Sydney is located on Australia's south-east coast of the Tasman Sea. Inhabitants of Sydney are called Sydneysiders, comprising a cosmopolitan and international population of people from numerous places around the world.The city is built on hills surrounding Port Jackson which is commonly known as Sydney."
							}
						}, 
							
							
						{
							image: "singapore.jpg",
							caption: {
								header: "Singapore City",
								details: "Singapore has emerged as one of the world’s most prosperous countries. It’s a financial center, an achievement in urban planning, and serves as a model for developing nations. It’s also one of our most popular travel destinations!.It is a financial center, an achievement in urban planning, and it serves as a model for many developing nations. Custom university travel to Singapore makes it your classroom for business students or other disciplines."
							}
							
						},

						{
							image: "cyp.jpg",
							caption: {
								header: "Cyprus City",
								details: " Cyprus is the third largest island in the Mediterranean Sea, after the Italian islands of Sicily and Sardinia. It is also the world's 80th largest by area and world's 51st largest by population. It measures 240 kilometres long from end to end and 100 kilometres wide at its widest point, with Turkey 75 kilometres to the north with Several traditional food, beverages Hospitality. We ensure that you have the best experience as you may wish to explore the world."
							}
							
						},
							{
							image: "kampala-city.jpg",
							caption: {
								header: "Kampala City",
								details: "Kampala is the Capital and largest city of Uganda. With over 2.5 million people, the city is built on seven hills and now spreading way beyond.  One thing you will note upon arrival is how green Kampala is but more so how it buzzes with life. Its bustling town is alive, filled with activities from business to cultural, with numerous Hotels that will fit every price range and provide an enjoyable stay while your explore Kampala, it reflects the heart of Africa."
							}
						}, {
							image: "kigali.jpg",
							caption: {
								header: "Kigali City",
								details: "Kigali is the capital and largest city of Rwanda. The city has been Rwanda's economic, cultural, and transport hub since it became capital at independence in 1962. Kigali is the cleanest city in Africa. The fact that it is so green and hilly adds to the aesthetic allure of the place. It is not surprising thus that Kigali is considered to be one of the most liveable cities in Africa."
							}
						}, 
						
						{
							image: "nairobi.jpg",
							caption: {
								header: "Nairobi City",
								details: "Nairobi, popularly known as \"Green City in the Sun\" has over 3.5 million people and an amazing culture, which is unparalleled in any other city. The city is known for its sheer natural beauty that will take your breath away. ... Nairobi is a lively city, full of culture, historically rich, home to beautiful national parks and wildlife."
							}
						}, 

						{
							image: "daressalaam.jpg",
							caption: {
								header: "Dar es salaam City",
								details: "Dar es Salaam is the largest and former capital city of Tanzania with an estimated population of over 5.3 million people it’s an economic capital of Tanzania. Located in a quiet bay off the Indian Ocean coast, the city has developed into an economic importance to become a prosperous centre of the entire East African region. Its bustling harbour is the main port in Tanzania."
							}
						}]
					});
				}

				// TIME DISPPLAY
				var displayTime;
				setInterval(function() {
					var currentDateTime = new Date();
					currentDateTime = currentDateTime.toString("hh:mm") + ' ' + (currentDateTime.getHours() >= 12 ? "PM" : "AM");
					if (displayTime !== currentDateTime) {
						displayTime = currentDateTime;
						clockTime.text(currentDateTime);
					}
				}, 1000);
				// WEATHER DISPPLAAY
				var updateWeather = function() {
					$.get("https://api.openweathermap.org/data/2.5/weather?q=Kampala,ug&appid=6ca744f52c9249f074c38af65f845302&units=metric", function(weather) {
						temperature.html(weather.main.temp + "&#8451;").css('background-image', 'url(https://www.openweathermap.org/img/w/' + weather.weather[0].icon + '.png)');
					}, "jsonp");
					setTimeout(updateWeather, 1000 * 60);
				}
				updateWeather();
				$('body').removeAttr('style').scrollspy({
					target: '#main-menu',
					offset: 100
				});
				$('.nav-link').on('click', function(e) {
					e.preventDefault();
					var offset = 80;
					var target = this.hash;
					$('html, body').stop().animate({
						'scrollTop': $(target).offset().top - offset
					}, 500, 'swing', function() {
						// window.location.hash = target;
					});
				});
			}
		};

		// FRAGMENT BUILD FOR THE PATIALS
	fragmentIncludes.each(function() {
		var fragmentPlaceholder = $(this),
			fragmentBaseName = this.innerHTML;
		$.ajax({
			url: 'partials/' + fragmentBaseName,
			type: "GET",
			success: function(fragment) {
				if (fragmentPlaceholder.attr('class') !== undefined) {
					fragment = $(fragment).addClass(fragmentPlaceholder.attr('class'));
				}
				switch (fragmentBaseName) {
					case "site-css.html":
					case "site-js-libs.html":
						$('head').append(fragment);
						fragmentPlaceholder.remove();
						break;
					default:
						fragmentPlaceholder.after(fragment).remove();
				}
				fragmentLoadedCallback();
			}
		})
	});
});
