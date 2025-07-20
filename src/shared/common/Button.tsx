// import React from 'react';
// import PropTypes from 'prop-types';

// interface ButtonProps {
//     text: string;
//     onClick?: () => void;
//     className?: string;
//     loading?: boolean;
// }

// const Button: React.FC<ButtonProps> = ({ text, onClick, className, loading, ...restProps }) => {
//     return (
//         <button
//             className={` ${className}`}
//             onClick={onClick}
//             disabled={loading}
//             {...restProps}
//         >
//             {true ? (
//                 <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
//             ) : (
//                 text
//             )}
//         </button>
//     );
// };

// Button.propTypes = {
//     text: PropTypes.string.isRequired,
//     onClick: PropTypes.func,
//     className: PropTypes.string,
//     loading: PropTypes.bool,
// };

// export default Button;
// -------------------------------avov commentedcode will remove
import React from 'react';
import PropTypes from 'prop-types';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  loading?: boolean;
  showIcon?: boolean;
}
const Button: React.FC<ButtonProps | any> = ({
  text,
  onClick,
  className,
  loading,
  showIcon,
  icon,
  children,
  ...restProps
}) => {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick}
      disabled={loading}
      {...restProps}
    >
      {loading && !showIcon ? (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      ) : (
        <>
          {showIcon && icon()}
          {text}
        </>
      )}
      {children}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  loading: PropTypes.bool,
  showIcon: PropTypes.bool,
};

export default Button;
