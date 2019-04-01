import React, { Component } from 'react';
import { render } from 'react-dom';

import Eyes from '../src';

import './index.less';

class Demo extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="cw" id="J_CW">
                <Eyes color="#f50" />
                <div className="sm">
                    <Eyes />
                </div>
                <div className="mini">
                    <Eyes color="red" />
                </div>
            </div>
        );
    }
}

const page = document.createElement('div');
document.body.appendChild(page);

render(<Demo />, page);
