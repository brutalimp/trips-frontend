import { connect } from 'react-redux';
import { startLogIn } from '../../redux/actions/login';
import { WrappedHorizontalLoginForm } from '../../components/login/Login';

const mapStateToProps = (state) => ({
    loggingIn: state.userStatus.loggingIn
})

const mapDispatchToProps = (dispatch) => ({
    startLogIn: (user) => dispatch(startLogIn(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(WrappedHorizontalLoginForm);
