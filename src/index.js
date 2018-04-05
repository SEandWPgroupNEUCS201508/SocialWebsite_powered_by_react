import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import BasicExample from './Home';

ReactDOM.render(<div>
    <BasicExample/>
</div>, document.getElementById('root'));

registerServiceWorker();
