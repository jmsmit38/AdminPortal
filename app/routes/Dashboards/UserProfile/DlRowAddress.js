import React from 'react';
import PropTypes from 'prop-types';

const DlRowAddress = (props) => {
    const userData = props.userData;


    return (<React.Fragment>
        <dl className="row">
            <dt className={ `col-sm-3 ${ props.leftSideClassName }` }>Address</dt>
            <dd className={ `col-sm-9 ${ props.rightSideClassName }` }>{userData.address1}</dd>
            <dt className={ `col-sm-3 ${ props.leftSideClassName }` }>City</dt>
            <dd className={ `col-sm-9 ${ props.rightSideClassName }` }>{userData.city}</dd>
            <dt className={ `col-sm-3 ${ props.leftSideClassName }` }>State</dt>
            <dd className={ `col-sm-9 ${ props.rightSideClassName }` }>{userData.stateCode}</dd>
            <dt className={ `col-sm-3 ${ props.leftSideClassName }` }>ZIP</dt>
            <dd className={ `col-sm-9 ${ props.rightSideClassName }` }>{userData.zip}</dd>
        </dl>
    </React.Fragment>);
}

DlRowAddress.propTypes = {
    leftSideClassName: PropTypes.node,
    rightSideClassName: PropTypes.node,
    userData: PropTypes.object
};

DlRowAddress.defaultProps = {
    leftSideClassName: "",
    rightSideClassName: "",
    userData: {
        address1: '',
        city: '',
        stateCode: '',
        zip: ''
    }
};

export { DlRowAddress };
