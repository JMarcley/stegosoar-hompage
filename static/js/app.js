var list = [
  "websites",
  "web apps",
  "custom APIs",
  "data analytics"
];

var owAPIKey = '8c737c982d9eadd916aa6df55c7acdf6';

// var code = '`&lt;`html`&gt;`\n`&lt;`head`&gt;`\n`&lt;`title`&gt;`Title of the document`&lt;`/title`&gt;`\n`&lt;`/head`&gt;`\n\n`&lt;`body`&gt;`\n\nThe content of the document......\n`&lt;`/body`&gt;`\n\n`&lt;`/html`&gt;`'
code = ['hello']
var i = 0;

// var scrollText = new Promise(function(resolve, reject) {
//   setInterval()
// });

function convertKtoF (k) {
  var C = k - 273.3;
  var F = C * 9/5 + 32;
  return F.toFixed(0);
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function fillWeatherCard(data) {
  if (data.cod == 404) {
    $('.weather-temp').text("Error");
    $('.weather-desc').text("meteor");
    $('#weather-deg').css('display', 'none');
    $('.weather-loc').text('run!');
    weatherCodeIcon(1);
  } else {
    $('.weather-loc').text(toTitleCase(data.name));
    $('.weather-desc').text(toTitleCase(data.weather[0].description));
    $('.weather-temp').text(convertKtoF(data.main.temp));
    $('#weather-deg').css('display', 'inline');
    weatherCodeIcon(data.weather[0].id);
  }
}

function weatherCodeIcon(code) {
  // remove last icon
  $('.weather-right').find('i').remove();
  if (code >= 200 && code < 300) {
    $('<i class="fas fa-bolt"></i>').appendTo('.weather-right');
  } else if (code >= 300 && code < 400) {
    $('<i class="fas fa-cloud-rain"></i>').appendTo('.weather-right');
  } else if (code >= 500 && code < 600) {
    $('<i class="fas fa-cloud-showers-heavy"></i>').appendTo('.weather-right');
  } else if (code >= 600 && code < 700) {
    $('<i class="far fa-snowflake"></i>').appendTo('.weather-right');
  } else if (code >= 700 && code < 800) {
    $('<i class="fas fa-smog"></i>').appendTo('.weather-right');
  } else if (code > 800 && code < 900) {
    $('<i class="fas fa-cloud-sun"></i>').appendTo('.weather-right');
  } else if (code == 800) {
    $('<i class="fas fa-sun"></i>').appendTo('.weather-right');
  } else {
    $('<i class="fas fa-meteor"></i>').appendTo('.weather-right');
  }
}

function getWeather(zip) {
  $.get('http://api.openweathermap.org/data/2.5/weather?zip=' + zip + '&APPID=8c737c982d9eadd916aa6df55c7acdf6', {
    // method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
  }).then(function(res) {
    fillWeatherCard(res);
  }).catch(function(err) {
    fillWeatherCard({cod: 404});
  });
}

$(function() {

  getWeather(94104);

  // fillWeatherCard({name: 'San Francisco', main: {temp: 290}, weather: [{id: 802, description: 'broken clouds'}]});

  var typed = new Typed('#typed', {
    stringsElement: '#typed-strings',
    typeSpeed: 20,
    backSpeed: 0,
    loop: true
  });
})

$('#get-weather').click(function() {
  var zip = $('#weather-zip');
  getWeather(zip[0].value);
});

function activateRequest() {
  isOpen = true;
  $('#req-cont').addClass('icon-active');
  $('#req-cont').removeClass('icon-container');
  $('#req-cont').removeClass('box');
  $('.popout').css('display', 'block');
  $('.close-btn').css('display', 'block');
  $('.request').css('margin-top', '0px');
}

function deactivateRequest() {
  $('.request').css('margin-top', '15px');
  $('#req-cont').removeClass('icon-active');
  $('#req-cont').addClass('box');
  $('.popout').css('display', 'none');
  $('.close-btn').css('display', 'none');
  $('#req-cont').addClass('icon-container');
  setTimeout(function() {
    isOpen = false;
  }, 500);
}

var isOpen = false;

$('.icon-container').click(function() {
  if (!isOpen) {
    activateRequest();
  }
})

$('#close-btn').click(function() {
  deactivateRequest();
})

$(function() {
  for (var j = list.length - 1; j >= 0; j--) {
    // var $items = $('.items');
    var $p = $( document.createElement("p") );
    $p.text(list[j]);
    $p.attr('id', 'list-' + j.toString());
    $p.addClass('list-hide');
    $('.items').append($p);
  }

  var increment = function() {
    i < list.length - 1 ? i++ : i = 0
  }

  // $('#list-1').text(list[i]);
  $('#list-' + i).removeClass("list-hide");
  $('#list-' + i).addClass("list-show");
  setInterval(function() {
    last = i;
    increment();
    $('#list-' + i).removeClass("list-hide");
    $('#list-' + i).addClass("list-show");
    $('#list-' + last).addClass("list-hide");
    $('#list-' + last).removeClass("list-show");
  }, 4950)
});

// ================== D3 =======================
// var scenarios = [
//   {name: 'Zombies', value: 30},
//   {name: 'Pandemic', value: 10},
//   {name: 'Artificial Intelligence', value: 30},
//   {name: 'New Dominant Species', value: 30},
//   {name: 'Nuclear War', value: 30},
//   {name: 'Aliens', value: 30},
//   {name: 'Climate Catastrophe', value: 30},
//   {name: 'Other', value: 5}
// ];
// var colors = [
//   "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
//   "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
// ];
// var canvas = document.querySelector("canvas"),
//     context = canvas.getContext("2d");
//     context.canvas.height = 300;
//
// var width = canvas.width,
//     height = canvas.height,
//     radius = Math.min(width, height) / 2;
//
// var arc = d3.arc()
//   .outerRadius(radius - 20)
//   .innerRadius(radius - 50)
//   // .cornerRadius(5)
//   .padAngle(.02)
//   .context(context);
//
// var labelArc = d3.arc()
//   .outerRadius(radius - 40)
//   .innerRadius(radius - 40)
//   .context(context);
//
// var dot = d3.symbol()
//   .context(context);
//
// var pie = d3.pie();
//
// var arcs = pie(scenarios.map(function(e) {
//   return e.odds
// }));
//
// context.translate(width / 2, height / 2);
//
// context.globalAlpha = 0.5;
// arcs.forEach(function(d, i) {
//   context.beginPath();
//   arc(d);
//   context.fillStyle = colors[i];
//   context.fill();
// });
//
// context.globalAlpha = 1;
// context.beginPath();
// arcs.forEach(arc);
////////////////////////////////////////////////////////////
//////////////////////// Set-up ////////////////////////////
////////////////////////////////////////////////////////////

var screenWidth = window.innerWidth;

var margin = {left: 20, top: 20, right: 20, bottom: 20},
  width = Math.min(screenWidth, 300) - margin.left - margin.right,
  height = Math.min(screenWidth, 300) - margin.top - margin.bottom;

var svg = d3.select("#d3").append("svg")
      .attr("width", (width + margin.left + margin.right))
      .attr("height", (height + margin.top + margin.bottom))
       .append("g").attr("class", "wrapper")
      .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

//////////////////////////////////////////////////////////////
///////////////////// Data &  Scales /////////////////////////
//////////////////////////////////////////////////////////////

//Some random data
var donutData = [
  {name: 'Zombies', value: 45},
  {name: 'Pandemic', value: 20},
  {name: 'AI', value: 19},
  {name: 'Animals', value: 14},
  {name: 'Nuclear War', value: 38},
  {name: 'Aliens', value: 35},
  {name: 'Climate', value: 13},
  {name: 'Other', value: 15}
];

//Create a color scale
var colors = [
  "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
  "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
];

//Create an arc function
var arc = d3.arc()
  .innerRadius(width*0.75/2)
  .outerRadius(width*0.75/2 + 30);

//Turn the pie chart 90 degrees counter clockwise, so it starts at the left
var pie = d3.pie()
  .startAngle(-90 * Math.PI/180)
  .endAngle(-90 * Math.PI/180 + 2*Math.PI)
  .value(function(d) { return d.value; })
  .padAngle(.01)
  .sort(null);

//////////////////////////////////////////////////////////////
//////////////////// Create Donut Chart //////////////////////
//////////////////////////////////////////////////////////////

//Create the donut slices and also the invisible arcs for the text
svg.selectAll(".donutArcs")
  .data(pie(donutData))
  .enter().append("path")
  .attr("class", "donutArcs")
  .attr("d", arc)
  .style("fill", function(d,i) {
    if(i === 7) return "#CCCCCC"; //Other
    else return colors[i];
  })
.each(function(d,i) {
  //Search pattern for everything between the start and the first capital L
  var firstArcSection = /(^.+?)L/;

  //Grab everything up to the first Line statement
  var newArc = firstArcSection.exec( d3.select(this).attr("d") )[1];
  //Replace all the comma's so that IE can handle it
  newArc = newArc.replace(/,/g , " ");

  //If the end angle lies beyond a quarter of a circle (90 degrees or pi/2)
  //flip the end and start position
  if (d.endAngle > 90 * Math.PI/180) {
    var startLoc 	= /M(.*?)A/,		//Everything between the first capital M and first capital A
      middleLoc 	= /A(.*?)0 0 1/,	//Everything between the first capital A and 0 0 1
      endLoc 		= /0 0 1 (.*?)$/;	//Everything between the first 0 0 1 and the end of the string (denoted by $)
    //Flip the direction of the arc by switching the start en end point (and sweep flag)
    //of those elements that are below the horizontal line
    var newStart = endLoc.exec( newArc )[1];
    var newEnd = startLoc.exec( newArc )[1];
    var middleSec = middleLoc.exec( newArc )[1];

    //Build up the new arc notation, set the sweep-flag to 0
    newArc = "M" + newStart + "A" + middleSec + "0 0 0 " + newEnd;
  }//if

  //Create a new invisible arc that the text can flow along
  svg.append("path")
    .attr("class", "hiddenDonutArcs")
    .attr("id", "donutArc"+i)
    .attr("d", newArc)
    .style("fill", "none");
});

//Append the label names on the outside
svg.selectAll(".donutText")
  .data(pie(donutData))
   .enter().append("text")
  .attr("class", "donutText")
  //Move the labels below the arcs for those slices with an end angle greater than 90 degrees
  .attr("dy", function(d,i) { return (d.endAngle > 90 * Math.PI/180 ? 18 : -11); })
   .append("textPath")
  .attr("startOffset","50%")
  .style("text-anchor","middle")
  .attr("xlink:href",function(d,i){return "#donutArc"+i;})
  .text(function(d){return d.data.name;});
