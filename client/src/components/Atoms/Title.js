import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

function Title({ children, h, subtitle }) {
  return (
    <Typography
      component="h2"
      variant={!subtitle ? `h${h || 6}` : `subtitle${subtitle}`}
      color="primary"
      gutterBottom
    >
      {children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
