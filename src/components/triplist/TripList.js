import React from 'react';
import { Timeline, Icon } from 'antd';
import { connect } from 'react-redux';
import Trip from '../trip/Trip';
import './triplist.css';

class TripList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const tripList = this.props.tripList;
        const pendingDot = <Icon type="disconnect" />;
        const listItems = tripList.map((trip, index) => {
            const tri = Object.assign({}, trip);
            return <Timeline.Item key={trip.id}><Trip trip={tri} index={index} /></Timeline.Item>
        });
        return <div className='trip-list'>
            <Timeline pending={true} pendingDot={pendingDot}>
                {listItems}
            </Timeline>
        </div>
    }
}

export default connect(state => ({
    tripList: state.trips.tripList
}))(TripList);