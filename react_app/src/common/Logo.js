import React, { Component } from 'react';
import './Logo.css'

class Logo extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className={"form-content"}>
                <svg viewBox="0 0 100 20">
                    <defs>
                        <pattern id="wave" x="0" y="0" width="120" height="20" patternUnits="userSpaceOnUse">
                            <path id="wavePath"
                                  d="M-40 9 Q-30 7 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V20 H-40z"
                                  mask="url(#mask)" fill="#326384">
                                <animateTransform
                                    attributeName="transform"
                                    begin="0s"
                                    dur={this.props.speed}
                                    type="translate"
                                    from="0,0"
                                    to="40,0"
                                    repeatCount="indefinite"/>
                            </path>
                        </pattern>
                    </defs>
                    <text text-anchor="middle" x="50" y="15" font-size={this.props.fontSize} fill="url(#wave)" fill-opacity="0.6">
                        {this.props.text}
                    </text>
                    <text text-anchor="middle" x="50" y="15" font-size={this.props.fontSize} fill="#326384" fill-opacity="0.1">
                        {this.props.text}
                    </text>
                </svg>
            </div>
        );
    }
}

export default Logo;