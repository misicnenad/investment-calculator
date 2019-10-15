import React from 'react';
import PropTypes from 'prop-types';
import Field from '../Field/Field';

const Row = props => {
	let backgroundColor = props.isPrimary ? 'bg-primary' : 'bg-light';

	return (
		<div className={`row border ${backgroundColor}`}>
			<Field
				mainValue={props.firstColumnMainValue}
				secondaryValue={props.firstColumnSecondaryValue}
			/>
			<Field
				mainValue={props.secondColumnMainValue}
				secondaryValue={props.secondColumnSecondaryValue}
			/>
			<Field
				mainValue={props.thirdColumnMainValue}
				secondaryValue={props.thirdColumnSecondaryValue}
			/>
			<Field
				mainValue={props.forthColumnMainValue}
				secondaryValue={props.forthColumnSecondaryValue}
			/>
		</div>
	);
};

Row.propTypes = {
	firstColumnMainValue: PropTypes.string,
	firstColumnSecondaryValue: PropTypes.string,
	secondColumnMainValue: PropTypes.string,
	secondColumnSecondaryValue: PropTypes.string,
	thirdColumnMainValue: PropTypes.string,
	thirdColumnSecondaryValue: PropTypes.string,
	forthColumnMainValue: PropTypes.string,
	forthColumnSecondaryValue: PropTypes.string,
	isPrimary: PropTypes.bool,
};

Row.defaultProps = {
	isPrimary: false,
};

export default Row;
