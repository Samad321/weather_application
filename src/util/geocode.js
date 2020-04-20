const request = require('request')

const geocode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token=pk.eyJ1IjoiZGV2ZiIsImEiOiJjazhzeGR4OXgwMGVtM2hvYmZsMm80aXJuIn0.rw0LeMdRzbdxMMjietfmvw&limit=1'
  
    request({ url, json: true }, (error, {body}) => {
  
      if (error) {
        callback("pleas cheack your enternet", undefined)
      } else if (body.features == 0) {
        callback("pleas make sure that your place is corrent", undefined)
      } else {
        callback(undefined,
          {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            place :body.features[0].place_name
          
          }
  
        )
      }
    })
  }
  module.exports=geocode