fetch("https://restcountries.com/v3/all")
  .then(function(cdata) {
    return cdata.json()
  })
  .then(function(cojson) {
    console.log(cojson)
    var temp = 0
    for (var i = 0; i < (cojson.length / 3) - 1; i++) {
      var div = document.createElement("div")
      div.setAttribute("class", "row")


      for (var j = 0; j < 3; j++) {
        console.log(cojson[temp])

        var div1 = document.createElement("div")
        div1.setAttribute("class", "col-lg-4 col-sm-12 card")

        div.appendChild(div1)

        var div2 = document.createElement("div")
        div2.setAttribute("id", temp)
        div2.style.background = "linear-gradient(to left, #636363, #a2ab58)"

        div1.appendChild(div2)

        var divhead = document.createElement("div")
        divhead.setAttribute("class", "card-header text-center")
        divhead.setAttribute("style", "background-color: #000;")
        divhead.setAttribute("style", "color:white;")
        divhead.innerHTML = "<b>" + cojson[temp].name.common
        div2.appendChild(divhead)

        var divbody = document.createElement("div")
        divbody.setAttribute("class", "card-body text-center")

        var flag = document.createElement("img")
        flag.setAttribute("src", cojson[temp].flags[0])
        flag.setAttribute("height", "100px")
        flag.setAttribute("width", "140px")
        divbody.appendChild(flag)

        var cap = document.createElement("p")
        cap.style.fontSize = "13px"
        cap.style.marginTop = "20px"
        cap.style.marginBottom = "0px"
        if (cojson[temp].hasOwnProperty('capital')) {
          cap.innerHTML = "<b>Capital :</b> " + cojson[temp].capital[0]
        } else {
          cap.innerHTML = "<b>Capital :</b> " + cojson[temp].name.common
        }
        divbody.appendChild(cap)

        var latlng = document.createElement("p")
        latlng.style.fontSize = "13px"
        latlng.style.margin = "0px"
        if (cojson[temp].hasOwnProperty('latlng')) {
          latlng.innerHTML = "<b>latitude :</b> " + cojson[temp].latlng[0] + "<br><b>longitude :</b> " + cojson[temp].latlng[1]
        } else {
          latlng.innerHTML = "<b>latitude :</b> NA<br><b>longitude :</b> NA"
        }
        divbody.appendChild(latlng)

        var reg = document.createElement("p")
        reg.style.fontSize = "13px"
        reg.style.margin = "0px"
        if (cojson[temp].hasOwnProperty('region')) {
          reg.innerHTML = "<b>Region :</b> " + cojson[temp].region
        } else {
          reg.innerHTML = "<b>Region :</b> NA"
        }
        divbody.appendChild(reg)

        var coun = document.createElement("p")
        coun.style.fontSize = "13px"
        coun.style.margin = "0px"
        if (cojson[temp].hasOwnProperty('cca3')) {
          coun.innerHTML = "<b>Country Code :</b> " + cojson[temp].cca3
        } else {
          coun.innerHTML = "<b>Country Code :</b> NA"
        }
        divbody.appendChild(coun)

        var btn = document.createElement("button")
        btn.setAttribute("class", "btn btn-primary")
        btn.setAttribute("data-bs-toggle", "modal")
        btn.setAttribute("data-bs-target", "#exampleModal")
        btn.setAttribute("onclick", "weather(" + temp + ")")
        btn.style.marginTop = "10px"
        btn.innerHTML = "Click for Weather"
        divbody.appendChild(btn)

        div2.appendChild(divbody)

        temp = temp + 1
      }
      document.getElementById("container").appendChild(div)

    }


  })
  .catch(function(error) {
    console.log(error);
  })

function weather(val) {
  fetch("https://restcountries.com/v3/all")
    .then(function(codata) {
      return codata.json()
    })
    .then(function(cojson) {
      var div = document.createElement("div")
      div.setAttribute("class", "card")
      div.setAttribute("id", "pop")

      div.style.display = "block"



      var divbody = document.createElement("h3")
      divbody.setAttribute("class", "col-lg-3 col-sm-10 card-header text-center")
      divbody.setAttribute("id", "pop-content")
      divbody.style.backgroundColor = "lightgreen"
      divbody.innerHTML = cojson[val].name.common
      div.appendChild(divbody)

      var divspan = document.createElement("span")
      divspan.setAttribute("id", "span")
      divspan.setAttribute("class", "close")
      divspan.innerHTML = "X"
      divbody.appendChild(divspan)

      var divhead = document.createElement("div")
      divhead.style.backgroundColor = "red"
      divbody.appendChild(divhead)



      var capital = ""
      if (cojson[val].hasOwnProperty('capital')) {
        capital = cojson[val].capital[0]
      } else {
        capital = cojson[val].name.common
      }
      console.log(cojson[val])
      console.log(capital)

      fetch("https://api.openweathermap.org/data/2.5/weather?q=" + capital + "&appid=5b4d8c39436c1af0eff180e899fde495")
        .then(function(data) {
          return data.json()
        })
        .then(function(data2) {
          console.log(data2)
          var temp = document.createElement("h3")
          temp.style.fontSize = "18px"
          temp.style.marginTop = "20px"
          temp.style.marginBottom = "0px"
          temp.innerHTML = "<b>Temperature : </b>" + data2.main.temp + "&ensp;F"
          divbody.appendChild(temp)

          var temp2 = document.createElement("h3")
          temp2.style.fontSize = "18px"
          temp2.style.marginTop = "20px"
          temp2.style.marginBottom = "0px"
          temp2.innerHTML = "<b>Humidity : </b>" + data2.main.humidity + "&ensp; g/<span>&#13221;</span>"
          divbody.appendChild(temp2)

          var wear = document.createElement("h3")
          wear.style.fontSize = "18px"
          wear.style.marginTop = "20px"
          wear.style.marginBottom = "0px"
          wear.innerHTML = "<b>Weather : </b>" + data2.weather[0].description + ""
          divbody.appendChild(wear)

          var break1 = document.createElement("br")
          divbody.appendChild(break1)

          var divspan = document.createElement("span")
          divspan.setAttribute("id", "span")
          divspan.setAttribute("class", "text-center")

          divspan.style.cursor = "pointer"
          divspan.innerHTML = "Close"
          divbody.appendChild(divspan)

          var break1 = document.createElement("br")
          divbody.appendChild(break1)

        })
        .catch(function(error) {
          console.log(error)
        })

      var cap = document.createElement("h3")
      cap.style.fontSize = "18px"
      cap.style.marginTop = "20px"
      cap.style.marginBottom = "0px"
      if (cojson[val].hasOwnProperty('capital')) {
        cap.innerHTML = "<b>Capital :</b> " + cojson[val].capital[0]
      } else {
        cap.innerHTML = "<b>Capital :</b> " + cojson[val].name.common
      }

      divbody.appendChild(cap)




      document.body.appendChild(div)

      divspan.onclick = function() {
        divbody.style.display = "none";
        div.style.display = "none"
      }

      window.onclick = function(event) {
        if (event.target != divbody) {
          divbody.style.display = "none";
          div.style.display = "none"
        }
      }

    })
    .catch(function(error) {
      document.getElementById("data").innerHTML = error
    })

}
