import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Autocomplete from 'react-google-autocomplete'
import Input from 'components/FormElements/Input'
import './style.css'

class LocationMap extends Component {
  componentDidMount() {
    const { data, onChangeInput } = this.props
    const { lat, lng } = data
    const map = new window.google.maps.Map(document.getElementById('accr-location-map'), {
      zoom: 14,
      center: { lat, lng }
    })

    this.marker = new window.google.maps.Marker({
      map: map,
      draggable: true,
      animation: window.google.maps.Animation.DROP,
      position: { lat, lng }
    })
    const circle = new window.google.maps.Circle({
      strokeColor: '#0000FF',
      strokeOpacity: 0.35,
      strokeWeight: 2,
      fillColor: '#0000FF',
      fillOpacity: 0.20,
      center: { lat, lng },
      radius: data.radius,
      map: map
    })
    circle.bindTo('center', this.marker, 'position')

    const geocoder = new window.google.maps.Geocoder()
    const reverseGeoCoding = function(latlng) {
      geocoder.geocode({ 'location': latlng }, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            onChangeInput({
              target: {
                name: 'location',
                value: results[0].formatted_address
              }
            })
          }
        }
      })
    }

    window.google.maps.event.addListener(this.marker, 'dragend', function(evt) {
      const lat = parseFloat(evt.latLng.lat().toFixed(3))
      const lng = parseFloat(evt.latLng.lng().toFixed(3))
      onChangeInput({
        target: {
          name: 'lat',
          value: lat
        }
      })
      onChangeInput({
        target: {
          name: 'lng',
          value: lng
        }
      })
      reverseGeoCoding({ lat, lng })
      map.setCenter({ lat, lng })
    })

    const toggleBounce = function() {
      if (this.marker.getAnimation() !== null) {
        this.marker.setAnimation(null)
      } else {
        this.marker.setAnimation(window.google.maps.Animation.BOUNCE)
      }
    }
    this.marker.addListener('click', toggleBounce)
    this.map = map
    this.circle = circle
  }

  onPlaceSelected = (obj) => {
    const { onChangeInput } = this.props
    const lat = obj.geometry.location.lat()
    const lng = obj.geometry.location.lng()

    onChangeInput({
      target: {
        name: 'location',
        value: obj.formatted_address
      }
    })

    onChangeInput({
      target: {
        name: 'lat',
        value: lat
      }
    })

    onChangeInput({
      target: {
        name: 'lng',
        value: lng
      }
    })

    this.marker.setPosition({ lat, lng })
    this.map.setCenter({ lat, lng })
  }

  onClickLocationEnable = () => {
    const { data } = this.props
    this.props.onChangeInput({
      target: {
        name: 'location_enable',
        value: !data.location_enable
      }
    })
  }

  onChangeRadius = (event) => {
    const target = event.target
    this.props.onChangeInput(event)
    this.circle.setRadius(parseInt(target.value, 10))
  }

  onChangePosition = (event) => {
    const { name, value } = event.target
    let position
    if (name === 'lat') {
      position = { lat: parseFloat(value), lng: parseFloat(this.props.data.lng) }
    } else {
      position = { lat: parseFloat(this.props.data.lat), lng: parseFloat(value) }
    }

    if (value !== '') {
      this.marker.setPosition(position)
      this.map.setCenter(position)
    }

    this.props.onChangeInput(event)
  }

  render() {
    const { data } = this.props
    const locationPlaceholder = (data.location) ? data.location : '1 Canada Square, Canary Wharf, London E14 5AB, UK'
    const radius = (data.radius) ? data.radius : 300
    const lat = data.lat.toString()
    const lng = data.lng.toString()

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="radius">Location</label>
              <Autocomplete
                onPlaceSelected={this.onPlaceSelected}
                placeholder={locationPlaceholder}
                types={[ 'address' ]}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Radius</label>
              <input name="radius" value={radius} type="range" onChange={this.onChangeRadius} min="10" max="1000" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Input name="lat" type="number" value={lat} label="Latitude" onChange={this.onChangePosition} />
          </div>
          <div className="col-md-6">
            <Input name="lng" type="number" value={lng} label="Longitude" onChange={this.onChangePosition} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 center">
            <div id="accr-location-map"></div>
          </div>
        </div>
      </div>
    )
  }
}

LocationMap.propTypes = {
  data: PropTypes.object,
  onChangeInput: PropTypes.func.isRequired
}

export default LocationMap
