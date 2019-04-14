import React, { Component } from 'react';

import './index.less';

const { atan, floor, PI } = Math;

const drawCircles = (ctx, circles, cfgs) => {
    ctx.save();
    ctx.strokeStyle = cfgs.color;
    ctx.lineWidth = cfgs.lineWidth;
    circles.forEach(c => {
        ctx.moveTo(c.cx + c.r, c.cy);
        ctx.beginPath();
        ctx.arc(c.cx, c.cy, c.r - cfgs.lineWidth / 2, 0, 2 * PI);
        ctx.closePath();
        ctx.stroke();
    });
    ctx.restore();
};

const drawPoints = (ctx, points, cfgs) => {
    ctx.save();
    ctx.fillStyle = cfgs.color;
    points.forEach(p => {
        ctx.moveTo(p.cx, p.cy);
        ctx.translate(p.rx, p.ry);
        ctx.rotate(p.degree);
        ctx.beginPath();
        ctx.arc(p.cx - p.rx - p.r, p.cy - p.ry, p.r, 0, 2 * PI);
        ctx.closePath();
        ctx.rotate(-p.degree);
        ctx.translate(-p.rx, -p.ry);
        ctx.fill();
    });
    ctx.restore();
};

class CvsEyes extends Component {
    constructor(props) {
        super(props);
        this.maxWidth = 400;
        this.lineWidth = 2;
    }

    componentDidMount() {
        this.parentEl = this.cvs.parentNode;
        this.setCvs();
        this.drawEyes();
        this.initAnimate();
    }

    setCvs() {
        const { maxWidth } = this;
        const { PI } = Math;
        const { lineWidth = 2 } = this.props;
        const rect = this.parentEl.getBoundingClientRect();
        const cvsWidth = rect.width > maxWidth ? maxWidth : rect.width;
        const cvsHeight = floor(cvsWidth / 2);
        const oneOfFour = cvsWidth / 4;
        const r = cvsHeight / 2;
        // let rr = 20 * cvsWidth / maxWidth;
        let rr = +this.props.radius || 20 * cvsWidth / maxWidth;
        rr = rr < 2 ? 2 : rr;
        rr = rr >= r ? r - 2 * lineWidth : rr;
        this.cvs.width = cvsWidth;
        this.cvs.height = cvsHeight;
        this.lineWidth = lineWidth;
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
                cx: oneOfFour + r - this.lineWidth, // 圆心X
                cy: cvsHeight / 2, // 圆心Y
                rx: oneOfFour, // 旋转X
                ry: cvsHeight / 2, // 旋转Y
                r: rr, // 圆半径
                degree: PI / 2 // 旋转弧度
            },
            {
                cx: 3 * oneOfFour + r - this.lineWidth,
                cy: cvsHeight / 2,
                rx: 3 * oneOfFour,
                ry: cvsHeight / 2,
                r: rr,
                degree: PI / 2
            }
        ];
        this.ctx = this.cvs.getContext('2d');
    }

    drawEyes() {
        const { color = '#000' } = this.props;
        const { circles, points, ctx } = this;
        drawCircles(ctx, circles, {
            color,
            lineWidth: this.lineWidth
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
            const rect = this.cvs.getBoundingClientRect();
            const { points } = this;
            points.forEach(p => {
                const dx = mp.x - p.rx - rect.left;
                const dy = mp.y - p.ry - rect.top;
                const delta = atan(dy / dx);
                const { color } = this.props;
                p.degree = dx >= 0 ? delta : PI + delta;
                this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
                drawCircles(this.ctx, this.circles, { color, lineWidth: this.lineWidth });
                drawPoints(this.ctx, points, { color });
            });
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

export default CvsEyes;
