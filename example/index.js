import React, { Component } from 'react';
import { render } from 'react-dom';

import CvsEyes from '../src';

import './index.less';

class Demo extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="cw" id="J_CW">
                <CvsEyes color="#f50" lineWidth={4} />
                <div className="sm">
                    <CvsEyes radius={20} />
                </div>
                <div className="mini">
                    <CvsEyes color="#39f" radius={100} />
                </div>
            </div>
        );
    }
}

const page = document.createElement('div');
document.body.appendChild(page);

render(<Demo />, page);
