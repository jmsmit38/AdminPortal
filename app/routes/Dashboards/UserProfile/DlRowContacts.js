import React from 'react';
import PropTypes from 'prop-types';

const DlRowContacts = (props) => { 
    const userData = props.userData;

    return (
    <React.Fragment>
        <dl className="row">
            <dt className={ `col-sm-3 ${ props.leftSideClassName }` }>Phone</dt>
            <dd className={ `col-sm-9 ${ props.rightSideClassName }` }>{userData.phone}</dd>
            <dt className={ `col-sm-3 ${ props.leftSideClassName }` }>Email</dt>
            <dd className={ `col-sm-9 ${ props.rightSideClassName }` }>
                {userData.email}
            </dd>
        </dl>
    </React.Fragment>);
}
DlRowContacts.propTypes = {
    leftSideClassName: PropTypes.node,
    rightSideClassName: PropTypes.node,
    userData: PropTypes.object
};
DlRowContacts.defaultProps = {
    leftSideClassName: "text-right",
    rightSideClassName: "text-left",
    userData: {
        phone: '',
        email: ''
    }
};

export { DlRowContacts };
