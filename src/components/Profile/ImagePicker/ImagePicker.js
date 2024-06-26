import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import Image from './Image'

class ImagePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      picked: new Map()
    }
  }

  handleImageClick = (image) => {
    const { multiple, onPick } = this.props
    const pickedImage = multiple ? this.state.picked : new Map()
    const newerPickedImage = pickedImage.has(image.value) ?
      pickedImage.delete(image.value) :
      pickedImage.set(image.value, image.src)

    this.setState({ picked: newerPickedImage })
    const pickedImageToArray = []
    newerPickedImage.map((image, i) => pickedImageToArray.push({ src: image, value: i }))
    onPick(multiple ? pickedImageToArray : pickedImageToArray[0])
  }

  renderImage = (image, i) => {
    return (
      <Image
        src={image.src}
        isSelected={this.state.picked.has(image.value)}
        onImageClick={() => this.handleImageClick(image)}
        key={i}
      />
    )
  }

  render() {
    const { images } = this.props
    return (
      <div className="image_picker">
        {images.map(this.renderImage)}
        <div className="clear" />
      </div>
    )
  }
}

ImagePicker.propTypes = {
  images: PropTypes.array.isRequired,
  multiple: PropTypes.bool,
  onPick: PropTypes.func.isRequired
}

export default ImagePicker
