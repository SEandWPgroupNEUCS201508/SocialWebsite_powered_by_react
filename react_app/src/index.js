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
import ChatPage from "./main/ChatPage"

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
                <Route path="/chat" component={ChatPage}/>
                <Route path="/ulogin" component={WrappedNormalLoginForm}/>
                <Route path="/uregister" component={WrappedRegistrationForm}/>
                <Route path="/topics" component={Topics}/>
            </div>
        </Router>

    </div>

)


ReactDOM.render(<div><WebsiteRouter/></div>, document.getElementById('root'));

registerServiceWorker();
