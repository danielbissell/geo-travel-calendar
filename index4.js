var dispatch = d3.dispatch("load", "statechange");


let margin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
// test var delete me
let date = 6/4/2019;
let month = 'July';
let monthNum = 0;
let year = 2019;
let i = 0
let travelerArr = [];
// delete test var above


const w = 1000;
const h = 275;

function testFunction (x) {

  monthNum = x;
   // window.location.reload()
 
   //console.log(monthNum, "monthNum Updated");
   document.getElementById("inOffice").innerHTML = i;

}

d3.queue()
.defer(d3.json, 'data/us.json')
//.defer(d3.json, 'data/cities100.json')
.defer(d3.csv, 'data/travelCalendarInput.csv')
.await(ready)



  console.log('start');
// D3 Projection
var projection = d3.geoAlbersUsa()
  .scale([600]).translate([w/2, h/2]);

// Create the path generator
var path = d3.geoPath()
.projection(projection);



function ready (error, UsaMap, usCities){


console.log(usCities); 


  var states = topojson.feature(UsaMap, UsaMap.objects.us).features  
//  var capitols = topojson.feature(capCities, capCities).features

document.getElementById("inOffice").innerHTML = usCities.length - i;


   
 const svg = d3.select(".chart")
       .append("svg")
       .attr("width", w )
       .attr("height", h)
       .attr("transform", "translate(" + 0 + "," + 0 + ")")
       .append("g");
  
 svg.selectAll("state")
   .data(states)
   .enter()
   .append("path")
   .attr("class", "state")
   .attr("d", path) 

//capitols
var capitols =  svg.selectAll("capitol")
    .data(usCities)  
    .enter()
    .append("circle")
    .attr(
      "fill", 'green')//end fill attr
    .attr("r", 7)
    .attr("cx", function(d){
        var coords = projection([d.Long, d.Lat])
            return coords[0];
            })
    .attr("cy", function(d){
        var coords = projection([d.Long, d.Lat])
            return coords[1];
            })
     

        /// tooltip
        .on("mouseover",  (d, i) => {
          tooltip
              .style("left", (d3.event.pageX + 5) + "px")
              .style("top", (d3.event.pageY + 3) + "px")
              .style("display", "inline-block")
              .html(`AM: ${d.AM} </br> Customer: ${d.Customer} </br> Date: ${d.Date} </br> Location: ${d.CityState}`);
      })
      .on("mouseout", function (d) { tooltip.style("display", "none"); })
        //end tooltip

        //handle slide movement
        .on("onscroll",function(){
                      //console.log('onScroll fired')
        
          d3.select(this)
          .attr("cx", function(d){
            if(d.MonthNumber == monthNum) {
              i += 1; //add travler
              travelerArr.push(d.AM);
              var coords = projection([d.Long, d.Lat])
                  return coords[0];
                  }
                  //handle yearly travel
                  else if(monthNum == 0) {
                    var coords = projection([d.Long, d.Lat])
                        return coords[0];
                        } 
                  else{}
                })
          .attr("cy", function(d){
            if(d.MonthNumber == monthNum) {
          var coords = projection([d.Long, d.Lat])
              return coords[1];
              }
                // handle yearly travel
              else if(monthNum == 0) {
                var coords = projection([d.Long, d.Lat])
                    return coords[1];
                    } 
                else{};
            })


            d3.select(this)
            .attr(
            "fill", function(d) {
              
              if(d.MonthNumber == monthNum) 
              {return "green"} 
              else if (monthNum == 0) 
              {return "green"}
              else {return "#e3e3e3"}
      });



     })


  

   /* var labels =  svg.selectAll("cityLabel")
        .data(usCities)  
        .enter()
        .append("text")
        .attr("class", "cityLabel")
        .attr("fill", 
           function(d) {if(d.MonthNumber == monthNum) {
          return "blue"
      } else {return "#e3e3e3"}
    })
        .attr("x", function(d){
        var coords = projection([d.Long, d.Lat])
        return coords[0];
        })
        .attr("y", function(d){
        var coords = projection([d.Long, d.Lat])
            return coords[1];
        })
        .text(function(d){
        return  d.AM + " - " + d.Customer;
        })
        .attr('dx', 5)
        .attr('dy', 2)
        .on("mouseleave",function(){
          console.log('Mouseleave Text fired')

          d3.select(this)
          .attr(
          "fill", function(d) {if(d.MonthNumber == monthNum) {
          console.log(monthNum, " monthNum")
            return "blue"
      } else {return "#e3e3e3"}
    })
          });
*/
        d3.select("#slide")
        .on("click", function() {
          capitols.dispatch("onscroll");
      //    labels.dispatch("mouseleave");
      document.getElementById("inOffice").innerHTML = usCities.length - i;

      //document.getElementById("onRoad").innerHTML =  i;
      document.getElementById("onRoadAM").innerHTML = travelerArr.map((x) => x + `</br>`).join(' ')
      



          travelerArr = []; //reset travlers
          i = 0; // reset i
        });


        let tooltip = d3
        .select("body")
        .style("position", "absolute")
        .append("div")
        .attr("class", "tooltip")
        .attr("id", "tooltip")
        .style("opacity", 1);   

console.log('end')

};//end UsaMap