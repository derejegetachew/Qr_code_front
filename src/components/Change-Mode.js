import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {darkModeAction, getDarkMode} from '../store/mode'

const mapStateToProps = (state) => {
    return {
        darkMode: getDarkMode(state)
    };
}

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        {
            darkModeAction,
        },
        dispatch
    )
})

const ChangeMode = (props) => {
  var  dark = props.darkMode
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('dark');
    if (mode !== null) {
      document.body.classList=''
      dark = false
    switch (mode) {
        case "true":
            document.body.classList='dark'
            dark = true
        break;
        case "false":
             document.body.classList=''
             dark = false
        break;
        default:
             document.body.classList=''
             dark = false
            break;
    }
    }
    // console.log(dark)
    return (
        <div className="change-mode">
            <div className="custom-control custom-switch custom-switch-icon custom-control-inline">
                <div className="custom-switch-inner">
                    <p className="mb-0"> </p>
                    <input type="checkbox" className="custom-control-input" id="dark-mode" onChange={() => {
                        props.darkModeAction(!props.darkMode)
                    }} checked={props.darkMode || dark} data-active={props.darkMode? 'true' : 'false' || dark ? 'true' : 'false'} />
                    <label className="custom-control-label" htmlFor="dark-mode" data-mode="toggle">
                        <span className="switch-icon-left">
                        <svg className="svg-icon" id="h-sun" height="20" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </span>
                        <span className="switch-icon-right">
                            <svg className="svg-icon" id="h-moon" height="20" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        </span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeMode)
