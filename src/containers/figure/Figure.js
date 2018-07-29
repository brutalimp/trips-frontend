import { connect } from 'react-redux';
import { logIn } from '../../redux/actions/login';
import Figure from '../../components/figure/Figure';

const mapStateToProps = (state) => ({
    userStatus: state.userStatus
})

const mapDispatchToProps = (dispatch) => ({
    logIn: (user) => dispatch(logIn(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Figure);
