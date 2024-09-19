// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import '../fields/FieldStyles.css';

export const LabelForm = ({ labelFocus, id, label }) => {
	return (
		<label
			className={`formLabel-root inputLabel-root inputLabel-formCtrl inputLabel-animated ${
				labelFocus ? 'inputLabel-shrink' : ''
			}`}
			data-shrink={labelFocus}
			htmlFor={id}
		>
			{label}
		</label>
	);
};

LabelForm.propTypes = {
	labelFocus: PropTypes.bool,
	id: PropTypes.any,
	label: PropTypes.string,
};
