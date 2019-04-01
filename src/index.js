import React, { Component } from 'react';

import './index.less';

const drawCircles = (ctx, circles, cfgs) => {
    ctx.save();
    ctx.strokeStyle = cfgs.color;
    ctx.lineWidth = cfgs.lineWidth + 'px';
    circles.forEach(c => {
        ctx.moveTo(c.cx + c.r, c.cy);
        ctx.beginPath();
        ctx.arc(c.cx, c.cy, c.r - cfgs.lineWidth / 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
    });
    ctx.restore();
};

const drawPoints = (ctx, points, cfgs) => {
    ctx.save();
    ctx.fillStyle = cfgs.color;
    points.forEach(p => {
        ctx.moveTo(p.cx + p.r, p.cy);
        ctx.beginPath();
        ctx.arc(p.cx, p.cy, p.r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    });
    ctx.restore();
};

class Eyes extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.parentEl = this.cvs.parentNode;
        this.setCvs();
        this.drawEyes();
        this.initAnimate();
    }

    setCvs() {
        const rect = this.parentEl.getBoundingClientRect();
        const cvsWidth = rect.width > 400 ? 400 : rect.width;
        const cvsHeight = Math.floor(cvsWidth / 2);
        const oneOfFour = cvsWidth / 4;
        const r = cvsHeight / 2;
        const rr = 15;
        this.cvs.width = cvsWidth;
        this.cvs.height = cvsHeight;
        this.circles = [
            {
                cx: oneOfFour,
                cy: r,
                r
            },
            {
                cx: 3 * oneOfFour,
                cy: r,
                r
            }
        ];
        this.points = [
            {
                cx: oneOfFour,
                cy: cvsHeight - rr,
                r: rr
            },
            {
                cx: 3 * oneOfFour,
                cy: cvsHeight - rr,
                r: rr
            }
        ];
    }

    drawEyes() {
        const { color = '#000' } = this.props;
        const { circles, points } = this;
        const ctx = this.cvs.getContext('2d');
        drawCircles(ctx, circles, {
            color,
            lineWidth: 2
        });
        drawPoints(ctx, points, {
            color
        });
    }

    initAnimate() {
        document.addEventListener('mousemove', (ev) => {
            const mp = {
                x: ev.clientX,
                y: ev.clientY
            };
            console.log(mp);
        }, false);
    }

    render() {
        const { className } = this.props;
        return (
            <div className={`eyes${className ? ' ' + className : ''}`}>
                <canvas ref={(cvs) => this.cvs = cvs} className="cvs" />
            </div>
        );
    }
}

export default Eyes;
