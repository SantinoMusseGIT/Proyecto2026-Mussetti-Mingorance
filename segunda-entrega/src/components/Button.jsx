import PropTypes from 'prop-types'

function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  onClick,
}) {
  const classes = `button button--${variant} ${className}`.trim()

  return (
    <button className={classes} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  className: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button