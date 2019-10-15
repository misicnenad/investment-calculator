import React from 'react';
import PropTypes from 'prop-types';

const Field = props => {
	return (
		<div className={`col border`}>
			<p>
				<b>{props.mainValue}</b>
			</p>
			<p>
				<i>{props.secondaryValue}</i>
			</p>
		</div>
	);
};

Field.propTypes = {
	mainValue: PropTypes.string,
	secondaryValue: PropTypes.string,
};

export default Field;
