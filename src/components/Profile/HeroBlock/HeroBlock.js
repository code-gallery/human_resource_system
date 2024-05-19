import React from 'react'
import PropTypes from 'prop-types'
import Assets from './assets'

class HeroBlock extends React.PureComponent {
  shouldComponentUpdate(nextProps) {
    if (this.props.background_image !== nextProps.background_image) {
      return true
    }
    return false
  }

  backgroundParse(background_image) {
    let backgroundStyle
    const d = new Date().getTime()
    if (background_image && (background_image.indexOf('://') !== -1 || background_image.indexOf('data:image') !== -1)) {
      if (background_image.indexOf('://') !== -1) {
        backgroundStyle = {
          backgroundImage: `url('${background_image}?v=${d}')`
        }
      } else {
        backgroundStyle = {
          backgroundImage: `url(${background_image})`
        }
      }
    } else {
      backgroundStyle = {
        backgroundImage: `url(${Assets.placeholder})`,
        height: '200px'
      }
    }
    return backgroundStyle
  }

  render() {
    const { background_image, onImagePick } = this.props

    return (
      <section className="hero-block" style={this.backgroundParse(background_image)}>
        <label className="img-custom-file-upload">
          <input
            type="file"
            accept="image/*"
            value=""
            onChange={(e) => onImagePick(e, 'background_image')}
          />
          <span>Change your <br /> cover photo</span>
        </label>
      </section>
    )
  }

}

HeroBlock.propTypes = {
  background_image: PropTypes.string,
  onImagePick: PropTypes.func.isRequired
}

export default HeroBlock
