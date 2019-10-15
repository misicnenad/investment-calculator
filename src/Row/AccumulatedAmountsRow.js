import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';

const AccumulatedAmountsRow = props => {
	return (
		<Row
			firstColumnMainValue={`${props.yearNumber}a`}
			secondColumnMainValue={`${props.defaultAccumulatedAmount}`}
			secondColumnSecondaryValue={`(${props.nonInflatedDefaultAccumulatedAmount})`}
			thirdColumnMainValue={`${props.untaxedAccumulatedAmount}`}
			thirdColumnSecondaryValue={`(${props.nonInflatedUntaxedAccumulatedAmount})`}
			forthColumnMainValue={`${props.taxedAccumulatedAmount}`}
			forthColumnSecondaryValue={`(${props.nonInflatedTaxedAccumulatedAmount})`}
			/>
	);
};

AccumulatedAmountsRow.propTypes = {
	yearNumber: PropTypes.number,
	defaultAccumulatedAmount: PropTypes.number,
	nonInflatedDefaultAccumulatedAmount: PropTypes.number,
	untaxedAccumulatedAmount: PropTypes.number,
	nonInflatedUntaxedAccumulatedAmount: PropTypes.number,
	taxedAccumulatedAmount: PropTypes.number,
	nonInflatedTaxedAccumulatedAmount: PropTypes.number,
};

export default AccumulatedAmountsRow;
