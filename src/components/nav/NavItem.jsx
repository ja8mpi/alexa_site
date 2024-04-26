
import PropTypes from 'prop-types';

const NavLink = ({ key, text, link }) => {
  return (
    <li key={key} className="inline-block mx-2 py-2 ">
      <a className='hover:text-sky-400' href={`#${link.toLowerCase()}`}>{text}</a>
    </li>
  );
};

NavLink.propTypes = {
  key: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default NavLink;
