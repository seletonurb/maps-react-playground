import React from 'react';
import { connect } from 'react-redux';

const CostsView = () => {

    return (
        <>
            <div className="row day-view-title">
                Costs
            </div>
            <div className="row day-view-title">
                <div className="col-12 days-links small text-center">
                    A breakdown of costs coming from each request made to each map API. Available soon.
                </div>
            </div>
        </>
    );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CostsView);
