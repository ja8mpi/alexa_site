import PropTypes from 'prop-types';

export default function HeroImage ({src, alt}){
    return (
          <img
            src={src}
            alt={alt}
            className=" absolute top-0 left-0 h-full w-full object-cover bg-center md:w-10/12 md:aspect-video "
          />
    )
}

HeroImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};
