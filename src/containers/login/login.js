import { connect } from 'react-redux';
import { startLogIn, renewForm } from '../../redux/actions/login';
import { WrappedHorizontalLoginForm } from '../../components/login/Login';

const mapStateToProps = (state) => ({
    error: state.userStatus.error
})

const mapDispatchToProps = (dispatch) => ({
    startLogIn: (user) => dispatch(startLogIn(user)),
    renewFrom: () => dispatch(renewForm())
})


export default connect(mapStateToProps, mapDispatchToProps)(WrappedHorizontalLoginForm);
