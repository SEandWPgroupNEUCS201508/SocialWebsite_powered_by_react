import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import registerServiceWorker from './registerServiceWorker';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import MainPage from "./main/MainPage"
import WrappedNormalLoginForm from "./sign/LoginForm"
import WrappedRegistrationForm from "./sign/Register"


const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
)

const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
        </ul>

        <Route path={`${match.path}/:topicId`} component={Topic}/>
        <Route exact path={match.path} render={() => (
            <h3>Please select a topic.</h3>
        )}/>
    </div>
)

const WebsiteRouter = () => (
    <div>
        <Router>
            <div>
                <Route exact path="/" component={MainPage}/>
                <Route path="/login" component={WrappedNormalLoginForm}/>
                <Route path="/register" component={WrappedRegistrationForm}/>
                <Route path="/topics" component={Topics}/>
            </div>
        </Router>

    </div>

)


function disabledMouseWheel() {
    document.addEventListener('DOMMouseScroll', scrollFunc, false);  //W3C
    window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome
}

function scrollFunc(e) {
    // let direct = 0;

    // let t1 = document.getElementById("wheelDelta");
    // let t2 = document.getElementById("detail");
    // if (e.wheelDelta) {//IE/Opera/Chrome
    //     t1.value = e.wheelDelta;
    // } else if (e.detail) {//Firefox
    //     t2.value = e.detail;
    // }
    // console.log(direct);
    // return false;
    console.dir(e);

    return true;
}

// window.onload=disabledMouseWheel;

ReactDOM.render(<div>
    <WebsiteRouter/>
</div>, document.getElementById('root'));

registerServiceWorker();
