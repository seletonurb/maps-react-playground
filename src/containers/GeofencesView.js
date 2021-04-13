import React from 'react';
import { connect } from 'react-redux';

const GeofencesView = () => {

    return (
        <>
            <div className="row day-view-title">
                Geofences
            </div>

        </>
    );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(GeofencesView);
